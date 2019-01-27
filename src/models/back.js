export default {
  state: {
    breadcrumb: []
  },
  reducers: {
    // 面包屑切入
    addBreadcrumb(state, { payload: val }) {
      state.breadcrumb.push(val)
    },
    // 面包屑全替换
    changeBreadcrumb(state, { payload: val }) {
      state.breadcrumb = val
    }
  }
}