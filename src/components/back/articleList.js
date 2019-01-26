import styles from './article.scss'
import { Component, Fragment } from 'react'
import moment from 'moment'
import { Form, Tooltip, Icon, Input, Button, DatePicker, Table } from 'antd'
import { getArticleList } from '@/api/back/article'

const { RangePicker } = DatePicker

const action = [
  { icon: 'file-search', type: 'search', title: '查看', color: '#1890ff' },
  { icon: 'edit', type: 'edit', title: '编辑', color: '#1890ff' },
  { icon: 'to-top', type: 'totop', title: '置顶', color: '' },
  { icon: 'file-done', type: 'publish', title: '发布', color: '' },
  { icon: 'delete', type: 'delete', title: '删除', color: '#ff4d4f' },
]

export class ArticleList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tableLoading: false,
      searchLoading: false,
      resetLoading: false,
      formdata: {
        page: 1,
        pageSize: 10,
        title: '',
        startDate: moment().subtract('month', 6).format('YYYY-MM-DD hh:mm:ss'),
        endDate: moment().format('YYYY-MM-DD hh:mm:ss')
      },
      dataSource: [],
      total: 30
    }
  }

  UNSAFE_componentWillMount() {
    this._getArticleList()
  }

  // get list
  async _getArticleList() {
    let res = await getArticleList(this.state.formdata)
    if (res.state === 'success') {
      this.setState({
        dataSource: res.data,
        total: res.count,
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
        startDate: '',
        endDate: ''
      })
    })
    this._getArticleList()
  }

  // handle Action
  handleAction(val, type) {
    switch (type) {
      case 'edit':

        break;
      case 'totop':

        break;
      case 'publish':

        break;
      case 'delete':

        break;
      default:
        break;
    }
  }

  // action edit

  // action totop

  // action publish

  // action delete


  render() {
    const state = this.state
    const { formdata } = this.state
    // defind action

    // defined col
    const columns = [
      { title: '标题', dataIndex: 'title' },
      { title: '创建时间', dataIndex: 'create_time', render: text => text ? moment(new Date(text)).format('YYYY-MM-DD HH:mm:ss') : '--' },
      { title: '修改日期', dataIndex: 'time', render: text => text ? moment(new Date(text)).format('YYYY-MM-DD HH:mm:ss') : '--' },
      { title: '状态', dataIndex: 'flag', render: flag => <div>{flag ? 1 : 2}</div> },
      {
        title: '操作', key: 'operation', fixed: 'right', width: 140, render: row => (
          < div >
            {action.map(item =>
              <Tooltip
                key={item.title}
                title={item.title}
                mouseEnterDelay={0.5}
                className={styles.row_btn}>
                <Icon
                  style={{ color: item.color ? item.color : row.flag ? '#1890ff' : '' }}
                  type={item.icon}
                  onClick={this.handleAction.bind(this, row, item.icon)} />
              </Tooltip>
            )}
          </div >
        )
      }
    ]

    return (
      <Fragment>
        {/* form */}
        <Form layout="inline">
          <Form.Item label="标题">
            <Input placeholder="请输入标题搜索..." />
          </Form.Item>
          <Form.Item label="修改日期">
            <RangePicker
              defaultValue={[
                moment(formdata.startDate, 'YYYY-MM-DD hh:mm:ss'),
                moment(formdata.endDate, 'YYYY-MM-DD hh:mm:ss')
              ]}
              showTime={{
                hideDisabledOptions: true,
              }}
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
      </Fragment>
    )
  }
}

