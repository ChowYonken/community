import Vue from 'vue'
// 引入element-ui库
import ElementUI from 'element-ui';
// 引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
    el: '#app',
    render: h => h(App)
})
