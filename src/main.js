import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入element-ui库
import ElementUI from 'element-ui';
// 引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
