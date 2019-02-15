import styles from '../styles/index.scss'
import { Component } from 'react'
import item from './config/item'
import router from 'umi/router'

class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      item,
      active: 0
    }
  }

  handleClick(val) {
    this.setState({
      active: val.active
    })
    router.push(val.router)
  }

  render() {
    let state = this.state

    // items
    const navItem = state.item.map(item =>
      <div
        key={item.active}
        onClick={this.handleClick.bind(this, item)}
        className={styles.nav_item}>
        <span className={state.active === item.active ? styles.nav_active : ''}>{item.title}</span>
      </div>
    )

    // return
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Dosher</h1>
        <div className={styles.nav_group}>
          {navItem}
        </div>
      </div>
    )
  }
}

export default Index