import axios from 'axios'

// 创建axios实例
const instance = axios.create({
  baseURL: 'http://192.168.148.14:8090',
  timeout: 5 * 1000
})

// 添加请求拦截器 在请求头中加上token
instance.interceptors.request.use(
  config => {
    // 判断token是否存在
    if(localStorage.getItem('token')) {
      // 在请求头中添加token
      config.headers.token = localStorage.getItem('token');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

export default instance
