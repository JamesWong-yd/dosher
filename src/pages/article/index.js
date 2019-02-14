import styles from '../../styles/index.scss'
import { Component } from "react"
import { Empty, Skeleton } from 'antd'
import router from 'umi/router'
import moment from 'moment'
import { fontGetArticle } from '@/api/font/article'
class Article extends Component {

  constructor(props) {
    super(props)
    this.state = {
      article: [],
      formdata: {
        page: 1,
        pageSize: 10
      },
      total: 0,
      loading: true
    }
  }

  UNSAFE_componentWillMount() {
    this._getArticleList()
  }
  //
  async _getArticleList() {
    this.setState({
      loading: true
    })
    let timer = new Date() * 1
    let res = await fontGetArticle(this.state.formdata)
    if (res.state === 'success') {
      this.setState({
        article: res.data,
        total: res.count
      })
    }
    let timeDelay = Math.max(500 - (new Date() * 1 - timer), 1)
    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, timeDelay)
  }

  // 跳转
  handleLookList(val) {
    router.push(`/article/${val._id}`)
  }

  render() {
    // item
    let listItem

    const { state } = this

    if (this.state.article.length) {
      listItem = this.state.article.map(item =>
        <div
          className={styles.list_item}
          onClick={this.handleLookList.bind(this, item)}
          key={item._id}>
          <time>{moment(item.time).format('MMM DD, YYYY')}</time>
          <p>{item.title}</p>
        </div>
      )
    } else {
      listItem = <Empty />
    }

    // return
    return (
      <div className={styles.list_box}>
        <Skeleton
          active
          loading={state.loading}>
          {listItem}
        </Skeleton>
      </div>
    )
  }
}

export default Article