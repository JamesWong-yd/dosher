/**
 * itemMenu: 编写文章
 * icon: edit
 * index: 30
 */
import styles from './index.scss'
import { Component, Fragment } from 'react'
import { Card, Row, Col, Button, Form, Radio, Input } from 'antd'
import ReactMarkdown from 'react-markdown'
import { createArticle } from '@/api/back/article'
import CodeBlock from '@/utils/codeblock'

const { TextArea } = Input

export default class extends Component {
  constructor(props) {
    super(props)
    // state
    this.state = {
      reviewVisible: false,
      formdata: {
        title: '',
        flag: false,
        totop: false,
        content: ''
      }
    }
  }

  // handle visible
  handleReviewVisible(val) {
    this.setState({
      reviewVisible: val
    })
  }

  async handleSubmit(type) {
    let newFormData = Object.assign(this.state.formdata)
    if (type === 'publish') {
      newFormData.flag = true
    }
    if (type === 'save') {
      newFormData.flag = false
    }
    let res = await createArticle(this.state.formdata)
    console.log(res)
  }

  handleOk() {
    this.setState({
      reviewVisible: false
    })
  }

  formlayoutChange(type, e) {
    let newFormData = Object.assign({}, this.state.formdata)
    newFormData[type] = e.target.value
    this.setState({
      formdata: newFormData
    })
  }

  render() {

    const { state } = this

    const formlayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    }

    const extraBtn = !state.reviewVisible ? (
      <div>
        <div
          className={styles.review}
          onClick={this.handleReviewVisible.bind(this, true)}>
          预览
            </div>
      </div>
    ) :
      (
        <div>
          <div
            className={styles.review}
            onClick={this.handleReviewVisible.bind(this, false)}>
            关闭预览
          </div>
        </div>
      )

    // review
    const ReviewCard = (
      <ReactMarkdown
        className={styles.markdownRender}
        source={state.formdata.content}
        renderers={{ code: CodeBlock }}
      />
    )

    // write
    const WriteCard = (
      <Card
        className={styles.inputCard}
        title={'编写文章'}
        extra={extraBtn}>
        <input
          type="text"
          className={styles.titleinput}
          onChange={this.formlayoutChange.bind(this, 'title')}
          placeholder="Please enter title"
        />
        <Row className={styles.textrow}>
          <Col span={state.reviewVisible ? 12 : 24}>
            <TextArea
              className={styles.content}
              autosize={{ minRows: 20 }}
              onChange={this.formlayoutChange.bind(this, 'content')} />
          </Col>
          <Col span={state.reviewVisible ? 12 : 0}>{ReviewCard}</Col>
        </Row>
      </Card>
    )

    // operation
    const OperateCard = (
      <Card
        title={'文章操作'}>
        <div>
          {/* form */}
          <div>
            <Form layout="horizontal">
              <Form.Item
                label="置顶"
                {...formlayout}>
                <Radio.Group
                  defaultValue={false}
                  buttonStyle="solid"
                  onChange={this.formlayoutChange.bind(this, 'totop')}>
                  <Radio.Button value={true}>是</Radio.Button>
                  <Radio.Button value={false}>否</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Form>
          </div>
          {/* submit */}
          <div>
            <Button
              style={{ 'marginRight': '10px' }}
              type="primary"
              onClick={this.handleSubmit.bind(this, 'publish')}>发布</Button>
            <Button
              onClick={this.handleSubmit.bind(this, 'save')}>暂存</Button>
          </div>
        </div>
      </Card>
    )

    return (
      <Fragment>
        <Row gutter={3}>
          <Col span={18}>
            {WriteCard}
          </Col>
          <Col span={6}>
            {OperateCard}
          </Col>
        </Row>
      </Fragment>
    )
  }
}