import axios from 'axios'
import store from "@/store";

// 创建axios实例
const instance = axios.create({
  baseURL: 'http://192.168.148.163:8090',
  timeout: 5000
})

// 添加请求拦截器 在请求头中加上token
instance.interceptors.request.use(
  config => {
    let token = store.getters.getLocalStorage
    // 判断token是否存在
    if(token) {
      // 在请求头中添加token
      config.headers.Authorization = 'Bearer ' + token
      // config.headers.token = store.getters.getLocalStorage;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

export default instance
