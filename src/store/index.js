import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  token:localStorage.getItem('token') ? localStorage.getItem('token'):'' // 存储token
}

const store = new Vuex.Store({
  state,
  mutations: {
    setToken(state, value) { // 保存token
      state.token = value
      // 将token本地存储到回话中
      localStorage.setItem('token', value);
    },
    removeToken(state, token) { // 删除token
      localStorage.removeItem('token');
    }
  },
  actions: {},
  getters: {
    getLocalStorage(state) { // 获取本地存储的token信息
      return state.token
    }
  }
})

export default store
