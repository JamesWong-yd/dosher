export default {
  state: {
    route: [],
    breadcrumb: [],
    defaultSelectItem: [],
    defaultOpenKeys: []
  },
  reducers: {
    // 初始化路由
    initRouter(state, { payload: val }) {
      state.route = val
    },
    // 面包屑全替换
    changeBreadcrumb(state, { payload: val }) {
      state.breadcrumb = val.breadcrumb
      state.defaultOpenKeys = val.openkeys
      state.defaultSelectItem = val.locationRoutes
    }
  }
}