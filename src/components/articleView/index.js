import styles from './style.scss'
import CodeBlock from '@/utils/codeblock'
import ReactMarkdown from 'react-markdown'
import { Component } from 'react'
import moment from 'moment'
import { getArticle } from '@/api/back/article'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'not find',
      time: '',
      content: ''
    }
  }

  UNSAFE_componentWillMount() {
    this._getArticle(this.props.id)
  }

  async _getArticle(id) {
    let res = await getArticle(id)
    if (res.state === 'success') {
      this.setState({
        title: res.data.title,
        time: res.data.time,
        content: res.data.content
      })
    }
  }

  render() {

    const { state } = this

    return (
      <div className={styles.articlebox}>
        <div className={styles.title}>{state.title}</div>
        <div className={styles.time}>{state.time ? moment(state.time).format('YYYY-MM-DD hh:mm:ss') : ''}</div>
        <ReactMarkdown
          className={styles.content}
          source={state.content}
          renderers={{ code: CodeBlock }}
        />
      </div>
    )
  }
}