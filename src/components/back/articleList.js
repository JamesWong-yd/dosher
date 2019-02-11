import styles from './article.scss'
import { Component, Fragment } from 'react'
import moment from 'moment'
import ArticleView from '@/components/articleView/index'
import { Form, Input, Button, DatePicker, Table, message, Modal } from 'antd'
import {
  getArticleList,
  deleteArticle,
  updateArticleFlag,
  updateArticleTotop
} from '@/api/back/article'
import { ListState, ListTool } from './listState'

const { RangePicker } = DatePicker

export class ArticleList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tableLoading: false,
      searchLoading: false,
      resetLoading: false,
      title: '',
      formdata: {
        page: 1,
        pageSize: 10,
        title: '',
        startDate: '',
        endDate: ''
      },
      dataSource: [],
      total: 0,
      modalVisible: false,
      lookId: ''
    }
  }

  UNSAFE_componentWillMount() {
    this.handleReset()
  }

  // get list
  async _getArticleList() {
    this.setState({
      tableLoading: true
    })
    let res = await getArticleList(this.state.formdata)
    if (res.state === 'success') {
      this.setState({
        dataSource: res.data,
        total: res.count,
        tableLoading: false,
        searchLoading: false,
        resetLoading: false
      })
    }
  }

  // handle page change
  handlePageChange(val) {
    this.setState({
      formdata: Object.assign(this.state.formdata, { page: val })
    })
  }

  // handle search list
  handleSearch() {
    this.setState({
      formdata: Object.assign(this.state.formdata, { title: this.state.title }),
      searchLoading: true
    })
    this._getArticleList()
  }

  // handle reset list
  handleReset() {
    this.setState({
      resetLoading: true,
      formdata: Object.assign(this.state.formdata, {
        page: 1,
        title: '',
        startDate: moment().subtract(6, 'month').format('YYYY-MM-DD') + ' 00:00:00',
        endDate: moment().format('YYYY-MM-DD') + ' 23:59:59'
      }),
      title: ''
    })
    this._getArticleList()
  }

  // action look
  handleLook(val) {
    this.setState({
      modalVisible: true,
      lookId: val._id
    })
  }

  // action edit
  handleEdit(val) {
    console.log('edit')
  }

  // action totop
  async handleTotop(val) {
    this.setState({
      tableLoading: true
    })
    let res = await updateArticleTotop(
      Object.assign(val, { totop: !val.totop })
    )
    if (res.state === 'success') {
      message.success(!val.totop ? '取消置顶成功' : '置顶成功')
      this.setState({
        formdata: Object.assign(this.state.formdata, { page: 1 })
      })
      this._getArticleList()
    }
  }

  // action publish
  async handlePublish(val) {
    this.setState({
      tableLoading: true
    })
    let res = await updateArticleFlag(
      Object.assign(val, { flag: !val.flag })
    )
    if (res.state === 'success') {
      message.success(!val.flag ? '取消发布成功' : '发布成功')
      this.setState({
        formdata: Object.assign(this.state.formdata, { page: 1 })
      })
      this._getArticleList()
    }
  }

  // action delete
  async handleDelete(val) {
    let res = await deleteArticle(val._id)
    if (res.state === 'success') {
      message.success('删除成功')
      this.setState({
        formdata: Object.assign(this.state.formdata, { page: 1 })
      })
      this._getArticleList()
    }
  }

  handleCloseModal() {
    this.setState({
      modalVisible: false
    })
  }

  // set state
  setStateSearch(val) {
    this.setState({
      formdata: Object.assign(this.state.formdata, val)
    })
    this._getArticleList()
  }
  // changeTime
  changeTime(val) {
    this.setStateSearch({
      page: 1,
      startDate: moment(val[0]._d).format(val[0]._f),
      endDate: moment(val[1]._d).format(val[1]._f),
    })
  }
  // changeTitle
  changTitle(e) {
    this.setState({ title: e.target.value })
  }

  render() {
    const state = this.state
    const { formdata } = this.state
    // defind action

    // defined col
    const columns = [
      {
        title: '#', key: 'index', width: '60', render: (row, record, index) => (<span>{(formdata.page - 1) * formdata.pageSize + index + 1}</span>)
      },
      { title: '标题', dataIndex: 'title' },
      { title: '创建时间', dataIndex: 'create_time', render: text => text ? moment(new Date(text)).format('YYYY-MM-DD HH:mm:ss') : '--' },
      { title: '修改日期', dataIndex: 'time', render: text => text ? moment(new Date(text)).format('YYYY-MM-DD HH:mm:ss') : '--' },
      { title: '状态', key: 'flag', render: row => (<ListState flag={row.flag} totop={row.totop} />) },
      {
        title: '操作', key: 'operation', fixed: 'right', width: 140, render: row => (
          <ListTool
            item={row}
            onLook={this.handleLook.bind(this, row)}
            onEdit={this.handleEdit.bind(this, row)}
            onTotop={this.handleTotop.bind(this, row)}
            onPublish={this.handlePublish.bind(this, row)}
            onDelete={this.handleDelete.bind(this, row)} />
        )
      }
    ]

    return (
      <Fragment>
        {/* form */}
        <Form layout="inline">
          <Form.Item label="标题">
            <Input
              placeholder="请输入标题搜索..."
              value={state.title}
              onChange={this.changTitle.bind(this)} />
          </Form.Item>
          <Form.Item label="修改日期">
            <RangePicker
              defaultValue={[
                moment(formdata.startDate, 'YYYY-MM-DD HH:mm:ss'),
                moment(formdata.endDate, 'YYYY-MM-DD HH:mm:ss')
              ]}
              allowClear={false}
              showTime={{
                hideDisabledOptions: true,
              }}
              onOk={this.changeTime.bind(this)}
              format="YYYY-MM-DD HH:mm:ss"
            />
          </Form.Item>
          <Button
            loading={state.searchLoading}
            className={styles.btn}
            icon="search"
            onClick={this.handleSearch.bind(this)}
            type="primary">搜索</Button>
          <Button
            loading={state.resetLoading}
            icon="reload"
            onClick={this.handleReset.bind(this)}
            className={styles.btn}>重置</Button>
        </Form>
        {/* table */}
        <Table
          style={{ "margin": "10px 0" }}
          rowKey="_id"
          loading={state.tableLoading}
          dataSource={state.dataSource}
          columns={columns}
          pagination={{
            current: formdata.page,
            pageSize: formdata.pageSize,
            total: state.total,
            onChange: this.handlePageChange.bind(this)
          }}
          size="middle" />
        {/* look */}
        <Modal
          destroyOnClose
          centered
          width="700px"
          visible={state.modalVisible}
          onCancel={this.handleCloseModal.bind(this)}
          footer={null}>
          <div
            className={styles.modal}>
            <ArticleView
              id={state.lookId} />
          </div>
        </Modal>
      </Fragment>
    )
  }
}

