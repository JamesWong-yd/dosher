import { Component } from "react"
import ArticleView from '@/components/articleView/index'

class Article extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div>
        <ArticleView />
      </div>
    )
  }
}

export default Article