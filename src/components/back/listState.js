import { Tag, Icon, Tooltip, Popconfirm } from 'antd'
import styles from './article.scss'
import { Fragment, Component } from 'react'

export function ListState(props) {
  return (
    <Fragment>
      {
        props.flag !== undefined &&
        <Tag color={props.flag ? 'green' : ''}>
          {props.flag ? '已发布' : '未发布'}
        </Tag>
      }
      {
        props.totop && <Tag color='magenta'>置顶</Tag>
      }
    </Fragment>
  )
}

export class ListTool extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deleteVisible: false,
      publishVisible: false
    }
  }

  handleVisible(val, type) {
    if (this.props.item.flag && type === 'publishVisible') {
      this.props.onPublish()
      return
    }
    let updateVisible = {}
    updateVisible[type] = val
    this.setState(updateVisible)
  }

  visibleChange(type, visible) {
    let updateVisible = {}
    updateVisible[type] = visible
    !visible && this.setState(updateVisible)
  }

  render() {
    const { props, state } = this

    return (
      <Fragment>
        {/* look */}
        <Tooltip
          title="查看详情"
          mouseEnterDelay={2}
          className={styles.row_btn}>
          <Icon
            type="file-search"
            style={{ color: '#1890ff' }}
            onClick={props.onLook} />
        </Tooltip>
        {/* edit */}
        <Tooltip
          title="编辑"
          mouseEnterDelay={2}
          className={styles.row_btn}>
          <Icon
            style={{ color: '#1890ff' }}
            type="edit"
            onClick={props.onEdit} />
        </Tooltip>
        {/* to top */}
        <Tooltip
          title={props.item.totop ? '取消置顶' : '置定'}
          mouseEnterDelay={2}
          className={styles.row_btn}>
          <Icon
            style={{ color: props.item.totop ? '#1890ff' : '' }}
            type="to-top"
            onClick={props.onTotop} />
        </Tooltip>
        <Popconfirm
          placement="topRight"
          title="确定发布文章？发布后将在列表显示"
          arrowPointAtCenter={true}
          visible={state.publishVisible}
          onVisibleChange={this.visibleChange.bind(this, 'publishVisible')}
          onConfirm={props.onPublish}
          onCancel={this.handleVisible.bind(this, false, 'publishVisible')}>
          <Tooltip
            title={props.item.flag ? '取消发布' : '发布'}
            mouseEnterDelay={2}
            className={styles.row_btn}>
            <Icon
              style={{ color: props.item.flag ? '#1890ff' : '' }}
              type="file-done"
              onClick={this.handleVisible.bind(this, true, 'publishVisible')} />
          </Tooltip>
        </Popconfirm>
        <Popconfirm
          placement="topRight"
          title="确定删除此文章？(删除不可恢复)"
          arrowPointAtCenter={true}
          visible={state.deleteVisible}
          onVisibleChange={this.visibleChange.bind(this, 'deleteVisible')}
          onConfirm={props.onDelete}
          onCancel={this.handleVisible.bind(this, false, 'deleteVisible')}>
          <Tooltip
            title="删除"
            mouseEnterDelay={2}
            className={styles.row_btn}>
            <Icon
              style={{ color: '#ff4d4f' }}
              type="delete"
              onClick={this.handleVisible.bind(this, true, 'deleteVisible')} />
          </Tooltip>
        </Popconfirm>
      </Fragment>
    )
  }
}