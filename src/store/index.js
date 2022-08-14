import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const state = {
  token: localStorage.getItem('token') ? localStorage.getItem('token'):'', // 存储token
  role: '' // 存储当前登录用户的角色
}

const store = new Vuex.Store({
  state,
  mutations: {
    // 保存token
    setToken(state, value) { 
      state.token = value
      // 将token本地存储到回话中
      localStorage.setItem('token', value);
    },
    // 删除token
    removeToken(state) { 
      localStorage.removeItem('token');
      state.token = ''
    },
    // 保存角色
    SET_ROLE(state, role) {
      state.role = role
    }
  },
  actions: {

  },
  getters: {
    getLocalStorage(state) { // 获取本地存储的token信息
      return state.token
    },
    getRole(state) {
      return state.role
    }
  }
})

export default store
