import styles from './back.scss'
import { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import router from 'umi/router'
import { connect } from 'dva'
import { getMenuItemAndKey } from '@/utils/utils'

const SubMenu = Menu.SubMenu;
const { Header, Content, Footer, Sider } = Layout;

class backIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemMenu: [],
      defaultOpenKeys: [],
      defaultSelectItem: []
    }
  }

  UNSAFE_componentWillMount() {
    const { props } = this
    // init
    let items = getMenuItemAndKey(props.location.pathname, props.route.routes)
    // patch breadcrumb
    props.dispatch({
      type: 'back/changeBreadcrumb',
      payload: items
    })
    // set store route
    props.dispatch({
      type: 'back/initRouter',
      payload: props.route.routes
    })
    this.setState({
      itemMenu: items.itemMenu
    })
  }



  handleItemMenuRouter(val) {
    router.push(val.path)
    let items = getMenuItemAndKey(val.path, this.props.route.routes)
    this.props.dispatch({
      type: 'back/changeBreadcrumb',
      payload: items
    })
  }

  render() {
    const state = this.state
    let { breadcrumb, defaultOpenKeys, defaultSelectItem } = this.props
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
              openKeys={defaultOpenKeys}
              selectedKeys={defaultSelectItem}
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
  const { breadcrumb, defaultOpenKeys, defaultSelectItem } = state.back
  return {
    breadcrumb,
    defaultOpenKeys,
    defaultSelectItem
  }
}

export default connect(mapStateToProps)(backIndex)