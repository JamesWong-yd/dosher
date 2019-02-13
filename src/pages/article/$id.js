import { Component, Fragment } from "react"
import router from "umi/router"
import styles from './index.scss'
import ArticleView from '@/components/articleView/index'
import { Icon } from 'antd'

class Article extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  handleBack() {
    router.push('/article')
  }

  render() {
    const { id } = this.props.computedMatch.params
    const backToList = (
      <div
        className={styles.back}
        onClick={this.handleBack}>
        <Icon type="left" />
        back
      </div>
    )
    return (
      <Fragment>
        {backToList}
        <ArticleView id={id} />
      </Fragment>
    )
  }
}

export default Article