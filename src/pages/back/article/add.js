/**
 * itemMenu: 编写文章
 * icon: edit
 * index: 30
 */
import styles from './index.scss'
import { Component, Fragment } from 'react'
import { Card, Row, Col } from 'antd'
import ReactMarkdown from 'react-markdown'

export default class extends Component {
  constructor(props) {
    super(props)
    // state
    this.state = {
      reviewVisible: false
    }
  }

  // handle visible
  handleReviewVisible(val) {
    this.setState({
      reviewVisible: val
    })
  }

  render() {

    const { state } = this
    const input = '# This is a header\n\nAnd this is a paragraph \n\n ### kjahsdkj`akshdk`'
    // write
    const WriteCard = (
      <Card
        title={'编写文章'}>
        <input
          type="text"
          className={styles.titleinput}
          placeholder="Please enter title"
        />
        <ReactMarkdown
          source={input}
        />
      </Card>
    )

    // operation
    const OperateCard = (
      <Card
        title={'文章操作'}>
      </Card>
    )

    // review
    const ReviewCard = (
      <div>文章预览</div>
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
        {state.reviewVisible && ReviewCard}
      </Fragment>
    )
  }
}