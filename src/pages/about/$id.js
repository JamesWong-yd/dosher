import { Component } from "react";

class Article extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div> about {this.props.computedMatch.params.id}</div>
    )
  }
}

export default Article