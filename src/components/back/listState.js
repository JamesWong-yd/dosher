import { Tag, Icon, Tooltip } from 'antd'
import styles from './article.scss'
import { Fragment } from 'react'

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

export function ListTool(props) {

  return (
    <Fragment>
      {/* look */}
      <Tooltip
        title="查看详情"
        mouseEnterDelay={0.5}
        className={styles.row_btn}>
        <Icon
          type="file-search"
          style={{ color: '#1890ff' }}
          onClick={props.onLook} />
      </Tooltip>
      {/* edit */}
      <Tooltip
        title="编辑"
        mouseEnterDelay={0.5}
        className={styles.row_btn}>
        <Icon
          style={{ color: '#1890ff' }}
          type="edit"
          onClick={props.onEdit} />
      </Tooltip>
      {/* to top */}
      <Tooltip
        title={props.item.totop ? '取消置顶' : '置定'}
        mouseEnterDelay={0.5}
        className={styles.row_btn}>
        <Icon
          style={{ color: props.item.totop ? '#1890ff' : '' }}
          type="to-top"
          onClick={props.onTotop} />
      </Tooltip>
      <Tooltip
        title={props.item.flag ? '取消发布' : '发布'}
        mouseEnterDelay={0.5}
        className={styles.row_btn}>
        <Icon
          style={{ color: props.item.flag ? '#1890ff' : '' }}
          type="file-done"
          onClick={props.onPublish} />
      </Tooltip>
      <Tooltip
        title="删除"
        mouseEnterDelay={0.5}
        className={styles.row_btn}>
        <Icon
          style={{ color: '#ff4d4f' }}
          type="delete"
          onClick={props.onDelete} />
      </Tooltip>
    </Fragment>
  )
}