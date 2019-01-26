import 'antd/dist/antd.css'
import styles from './index.scss'
import item from './config/item'
import Main from './main'
import router from 'umi/router'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { LocaleProvider } from 'antd'

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
      <LocaleProvider locale={zhCN}>
        {props.children}
      </LocaleProvider>
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
