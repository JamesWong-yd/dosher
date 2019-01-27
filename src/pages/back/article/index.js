/**
 * itemMenu: 文章管理
 * icon: appstore
 * index: 10
 */
import styles from './index.scss'
import { Component, Fragment } from 'react'
import { Card, Icon } from 'antd'
import { ArticleList } from '@/components/back/articleList'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handleAddItem() {
    console.log('handleItemAdd')
  }

  render() {

    const addItem = (
      <span
        className={styles.add}
        onClick={this.handleAddItem}>
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