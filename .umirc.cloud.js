export default {
  "proxy": {
    "/api": {
      "target": 'http://120.79.203.126:8083/api/',
      "changeOrigin": true,
      "pathRewrite": { "^/api": "" }
    }
  }
}