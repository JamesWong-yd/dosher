import axios from 'axios'

const service = axios.create({
  timeout: 5000
})
// request拦截器
service.interceptors.request.use(
  config => {
    if (config.method === 'get') {
      config.params = Object.assign(config.params, { t: new Date() * 1 })
    }
    return config
  },
  error => {
    console.log(error)
  }
)

// response
service.interceptors.response.use(
  response => {
    // response.status
    return response.data
  },
  error => {
    console.log(error)
  }
)

export default service