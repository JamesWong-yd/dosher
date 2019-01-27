import styles from './back.scss'
import { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import router from 'umi/router'
import { connect } from 'dva'

const SubMenu = Menu.SubMenu;
const { Header, Content, Footer, Sider } = Layout;

class backIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemMenu: [],
      defaultSelectItem: [],
      defaultOpenKeys: []
    }
  }

  UNSAFE_componentWillMount() {
    // init
    let items = this.getMenuItemAndKey()
    this.setState({
      itemMenu: items.itemMenu,
      defaultSelectItem: items.locationRoutes,
      defaultOpenKeys: items.openkeys
    })

    // patch breadcrumb
    this.props.dispatch({
      type: 'back/changeBreadcrumb',
      payload: items.payload
    })
  }

  // get menuItem
  getMenuItemAndKey() {
    let { location } = this.props
    let { routes } = this.props.route || []
    let locationRoutes = []
    let openkeys = []
    let payload = []
    //  items
    let itemMenu = routes.map(item => {
      if (!item.routes && item.path === location.pathname) {
        payload.push(item.itemMenu)
        locationRoutes.push(`item-${item.path}`)
      }
      if (item.routes) {
        payload.push(item.itemMenu)
        openkeys.push(`subitem-${item.path}`)
        item.routes = item.routes.slice(0, routes.length - 1).sort((a, b) => a.index - b.index)
        item.routes.some(subitem => {
          if (subitem.path === location.pathname) {
            locationRoutes.push(`item-${subitem.path}`)
            payload.push(subitem.itemMenu)
            return true
          }
        })
      }
      return item
    }).slice(0, routes.length - 1).sort((a, b) => a.index - b.index)

    return {
      itemMenu,
      locationRoutes,
      openkeys,
      payload
    }
  }

  handleItemMenuRouter(val, subitem) {
    router.push(val.path)
    let handlePayload = []
    if (subitem) {
      handlePayload.push(subitem)
    }
    handlePayload.push(val.itemMenu)
    this.props.dispatch({
      type: 'back/changeBreadcrumb',
      payload: handlePayload
    })
  }

  render() {
    const state = this.state
    const { breadcrumb } = this.props

    // item Menu
    const itemMenuRender = state.itemMenu.map(item => {
      if (!item.routes) {
        return (
          <Menu.Item
            key={`item-${item.path}`}
            onClick={this.handleItemMenuRouter.bind(this, item, '')}>
            <Icon type={item.icon} />{item.itemMenu}
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu
            key={`subitem-${item.path}`}
            title={<span><Icon type={item.icon} /><span>{item.itemMenu}</span></span>}>
            {item.routes.map(subitem => (
              <Menu.Item
                key={`item-${subitem.path}`}
                onClick={this.handleItemMenuRouter.bind(this, subitem, item.itemMenu)}>
                <Icon type={subitem.icon} />{subitem.itemMenu}
              </Menu.Item>
            ))}
          </SubMenu>
        )
      }

    })

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
              defaultOpenKeys={state.defaultOpenKeys}
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
    breadcrumb
  }
}

export default connect(mapStateToProps)(backIndex)