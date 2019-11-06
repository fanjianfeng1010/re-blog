import Axios from 'axios'
 import Qs from 'qs'
const ENV = process.env.NODE_ENV

// 开发环境使用本地后台搭建的服务器
Axios.defaults.withCredentials = true
Axios.defaults.transformRequest = (data = {}) => {
  return Qs.stringify(data)
}
Axios.defaults.baseURL = ENV === 'development' ? 'http://0.0.0.0:2300' : ''

export default Axios
