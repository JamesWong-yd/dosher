/*
 * @Author: JamesWong
 * @Description: 全局layout
 * @Date: 2019-01-12 16:52:35
 * @Last Modified by: JamesWong
 * @Last Modified time: 2019-01-24 15:49:31
 */
import 'antd/dist/antd.css'
import styles from './index.scss'
import item from './config/item'
import Main from './main'
import router from 'umi/router'
import { Fragment } from 'react';

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
  if (props.location.pathname.slice(0, 5) === '/back') {
    return (
      <Fragment>
        {props.children}
      </Fragment>
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
