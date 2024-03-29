import axios from 'axios'
import store from "@/store";
import { resolve } from 'core-js/fn/promise';

// 创建axios实例
const instance = axios.create({
  // baseURL: 'http://192.168.149.198:8090',
  // baseURL: 'http://172.20.10.2:8090',
  baseURL: 'http://api.fanzibang.xyz',
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

// 响应拦截
instance.interceptors.response.use(
  response => {
    // 判断token是否过期
    if(response.status === 205) {
      // 退出登录，清空token
      this.$store.commit('removeToken');
      const token = localStorage.getItem('token')
      localStorage.removeItem(token);
      this.$router.push('/login');
      location.reload()
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
)

export default instance
