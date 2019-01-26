export default {
  "proxy": {
    "/api": {
      "target": 'http://120.79.203.126:7001/api/',
      "changeOrigin": true,
      "pathRewrite": { "^/api": "" }
    }
  }
}