import styles from './back.scss'
import { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import router from 'umi/router'
import { connect } from 'dva'

const { Header, Content, Footer, Sider } = Layout;

class backIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemMenu: [],
      defaultSelectItem: []
    }
  }

  UNSAFE_componentWillMount() {
    // init
    let { routes } = this.props.route || []
    let itemMenu = routes.slice(0, routes.length - 1).sort((a, b) => a.index - b.index)
    let locationRoutes = this.props.location.pathname
    this.setState({
      itemMenu,
      defaultSelectItem: [locationRoutes]
    })
    // patch breadcrumb
    this.props.dispatch({
      type: 'back/changeBreadcrumb',
      payload: routes.filter(item => item.path === locationRoutes)[0].itemMenu
    })
  }

  handleItemMenuRouter(val) {
    router.push(val.path)
    this.props.dispatch({
      type: 'back/changeBreadcrumb',
      payload: val.itemMenu
    })
  }

  render() {
    const state = this.state
    const { breadcrumb } = this.props

    // item Menu
    const itemMenuRender = state.itemMenu.map(item =>
      <Menu.Item
        key={item.path}
        onClick={this.handleItemMenuRouter.bind(this, item)}>
        <Icon type={item.icon} />{item.itemMenu}
      </Menu.Item>
    )

    // breadcrumb
    const breadcrumbRender = breadcrumb.map((item, index) =>
      <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
    )

    return (
      <Layout className={styles.backlayout}>
        <Header className={styles.backheader}>
          <span className={styles.backlogo}>Dosher Management</span>
        </Header>
        <Layout className={styles.content}>
          <Sider width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={state.defaultSelectItem}
              style={{ height: '100%' }}>
              {itemMenuRender}
            </Menu>
          </Sider>
          <Layout>
            <Breadcrumb className={styles.breadcrumb}>
              {breadcrumbRender}
            </Breadcrumb>
            <Content className={styles.content_layout}>
              {this.props.children}
            </Content>
            <Footer className={styles.backfooter}>
              Design By JamesWong.
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  const { breadcrumb } = state.back
  return {
    breadcrumb, // 在这return,上面才能获取到
  }
}

export default connect(mapStateToProps)(backIndex)