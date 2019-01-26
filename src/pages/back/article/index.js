/**
 * itemMenu: 文章管理
 * icon: bars
 * index: 20
 */
import styles from './index.scss'
import { Component, Fragment } from 'react'
import { Card, Icon } from 'antd'
import { ArticleList } from '@/components/back/articleList'

class BackTitle extends Component {
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

export default BackTitle