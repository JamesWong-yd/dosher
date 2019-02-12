import { Component } from "react"
import ArticleView from '@/components/articleView/index'

class Article extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  UNSAFE_componentWillMount() {
    console.log(this.props.computedMatch)
  }

  render() {
    const { id } = this.props.computedMatch.params
    return (
      <div>
        <ArticleView id={id} />
      </div>
    )
  }
}

export default Article