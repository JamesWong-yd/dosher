/*
 * @Author: JamesWong
 * @Description: 全局layout
 * @Date: 2019-01-12 16:52:35
 * @Last Modified by: JamesWong
 * @Last Modified time: 2019-01-22 13:52:03
 */
import styles from './index.scss'
import item from './config/item'
import Main from './main'
import router from 'umi/router'

require('normalize-css')

function BasicLayout(props) {
  if (props.location.pathname === '/') {
    router.replace(item[0].router)
  }
  if (props.location.pathname === '/login') {
    return (
      <div className={styles.normal}>
        {props.children}
      </div>
    )
  }
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Dosher</h1>
      <Main />
      {props.children}
    </div>
  )
}

export default BasicLayout;
