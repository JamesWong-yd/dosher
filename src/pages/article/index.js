import styles from '../../styles/index.scss'
import { Component } from "react"
import { Empty } from 'antd'
import router from 'umi/router'
import moment from 'moment'

class Article extends Component {

  constructor(props) {
    super(props)
    this.state = {
      article: []
    }
  }

  componentDidMount() {
    this.setState({
      article: [
        { id: 1, time: '2018-10-30', title: "Don't forget, a person's greatest emotional need is to feel appreciated." },
        { id: 2, time: '2018-11-20', title: "Do your know what is the problem" },
        { id: 3, time: '2018-12-11', title: "We are always ambivalent about folk singers, hoping for fire but afraid of fire" },
        { id: 4, time: '2018-10-30', title: "Don't forget, a person's greatest emotional need is to feel appreciated." },
        { id: 5, time: '2018-11-20', title: "Do your know what is the problem" },
        { id: 6, time: '2018-12-11', title: "We are always ambivalent about folk singers, hoping for fire but afraid of fire" },
        { id: 7, time: '2018-10-30', title: "Don't forget, a person's greatest emotional need is to feel appreciated." },
        { id: 8, time: '2018-11-20', title: "Do your know what is the problem" },
        { id: 9, time: '2018-12-11', title: "We are always ambivalent about folk singers, hoping for fire but afraid of fire" },
        { id: 10, time: '2018-10-30', title: "Don't forget, a person's greatest emotional need is to feel appreciated." },
        { id: 11, time: '2018-11-20', title: "Do your know what is the problem" },
        { id: 12, time: '2018-12-11', title: "We are always ambivalent about folk singers, hoping for fire but afraid of fire" },
        { id: 13, time: '2018-10-30', title: "Don't forget, a person's greatest emotional need is to feel appreciated." },
        { id: 14, time: '2018-11-20', title: "Do your know what is the problem" },
        { id: 15, time: '2018-12-11', title: "We are always ambivalent about folk singers, hoping for fire but afraid of fire" },
        { id: 16, time: '2018-10-30', title: "Don't forget, a person's greatest emotional need is to feel appreciated." },
        { id: 17, time: '2018-11-20', title: "Do your know what is the problem" },
        { id: 18, time: '2018-12-11', title: "We are always ambivalent about folk singers, hoping for fire but afraid of fire" },
        { id: 19, time: '2018-09-01', title: "Find your own place, find your own people" }
      ]
    })
  }

  // 跳转
  handleLookList(val) {
    router.push(`/article/${val.id}`)
  }

  render() {
    // item
    let listItem

    if (this.state.article.length) {
      listItem = this.state.article.map(item =>
        <div
          className={styles.list_item}
          onClick={this.handleLookList.bind(this, item)}
          key={item.id}>
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
        {listItem}
      </div>
    )
  }
}

export default Article