import { Component } from "react"
import styles from '../../styles/index.scss'

class Timer extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className={styles.about_box}>timer</div>
    )
  }
}

export default Timer