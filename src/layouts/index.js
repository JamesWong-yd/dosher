import 'antd/dist/antd.css'
import styles from './index.scss'
import item from './config/item'
import Main from './main'
import router from 'umi/router'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { LocaleProvider } from 'antd'
import { Fragment } from 'react';

require('normalize-css')

function BasicLayout(props) {

  let { pathname } = props.location

  if (pathname === '/') {
    router.replace(item[0].router)
  }

  if (pathname === '/login') {
    return (
      <Fragment className={styles.normal}>
        {props.children}
      </Fragment>
    )
  }

  if (pathname.slice(0, 5) === '/back') {
    return (
      <LocaleProvider locale={zhCN}>
        {props.children}
      </LocaleProvider>
    )
  }
  return (
    <div className={styles.normal}>
      < Main />
      {props.children}
      <div className={styles.company}>
        Design by James Wong.
      </div>
    </div>
  )
}


export default BasicLayout 
