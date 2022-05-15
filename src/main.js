import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入element-ui库
import ElementUI from 'element-ui';
// 引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';
// 引入vue-router库
import Router from 'vue-router'

Vue.config.productionTip = false

Vue.use(Router)

// 防止路由重复点击报错
const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
