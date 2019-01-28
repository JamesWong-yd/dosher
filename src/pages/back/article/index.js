/**
 * itemMenu: 文章管理
 * icon: appstore
 * index: 10
 */
import styles from './index.scss'
import { Component, Fragment } from 'react'
import { Card, Icon } from 'antd'
import { ArticleList } from '@/components/back/articleList'
import { connect } from 'dva'
import router from 'umi/router'
import { getMenuItemAndKey } from '@/utils/utils'

class Article extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handleAddItem() {
    const path = '/back/article/add'
    router.push(path)
    let newItem = getMenuItemAndKey(path, this.props.route)
    this.props.dispatch({
      type: 'back/changeBreadcrumb',
      payload: newItem
    })
  }

  render() {

    const addItem = (
      <span
        className={styles.add}
        onClick={this.handleAddItem.bind(this)}>
        <Icon type="edit" /> 写文章
      </span>
    )

    return (
      <Fragment>
        <Card
          title="文章管理"
          extra={addItem}>
          <div>
            <ArticleList />
          </div>
        </Card>
      </Fragment >
    )
  }
}

function mapStateToProps(state) {
  const { route } = state.back
  return {
    route
  }
}

export default connect(mapStateToProps)(Article)