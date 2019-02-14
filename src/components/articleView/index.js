import styles from './style.scss'
import CodeBlock from '@/utils/codeblock'
import ReactMarkdown from 'react-markdown'
import { Component } from 'react'
import moment from 'moment'
import { getArticle } from '@/api/back/article'
import { Skeleton } from 'antd'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      time: '',
      content: '',
      loading: true
    }
  }

  UNSAFE_componentWillMount() {
    this._getArticle(this.props.id)
  }

  async _getArticle(id) {
    this.setState({
      loading: true
    })
    let timer = new Date() * 1
    let res = await getArticle(id)
    if (res.state === 'success') {
      this.setState({
        title: res.data.title,
        time: res.data.time,
        content: res.data.content
      })
    }
    // 延时处理
    let timeDelay = Math.max(500 - (new Date() * 1 - timer), 1)
    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, timeDelay)
  }

  render() {

    const { state } = this

    return (
      <div className={styles.articlebox}>
        <Skeleton
          active
          loading={state.loading}>
          <div className={styles.title}>{state.title}</div>
          <div className={styles.time}>{state.time ? moment(state.time).format('YYYY-MM-DD hh:mm:ss') : ''}</div>
          <div className={styles.content}>
            <ReactMarkdown
              source={state.content}
              renderers={{ code: CodeBlock }}
            />
          </div>
        </Skeleton>
      </div>
    )
  }
}