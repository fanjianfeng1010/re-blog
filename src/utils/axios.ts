import Axios from 'axios'
// import Qs from 'qs'
import { APP_TOKEN_KEY, history } from '../config/default.config'
const ENV = process.env.NODE_ENV
const JwtToken = localStorage.getItem(APP_TOKEN_KEY)

// 开发环境使用本地后台搭建的服务器
Axios.defaults.baseURL = ENV === 'development' ? '0.0.0.0:2300' : ''
Axios.interceptors.request.use((config) => {
  let { method } = config
  if (method!.toLocaleLowerCase() === 'delete' || 'put' || 'post') {
    // delete,put,post 这三个请求都需要权限校验同时也需要发送数据,设置数据格式,并设置把 token 一并发送过去
    config.headers['content-type'] = 'application/x-www-form-urlencoded'
    // localStorage 中存在 token 表明已经登录过,否则表明没登录,操作者并没有权限
    if (JwtToken) {
      config.headers['Authorization'] = `Bearer ${JwtToken}`
    } else {
      // 没有 token 让用户跳转到登录页
      history.push('/user/login')
    }
  }
  return config
})

export default Axios
