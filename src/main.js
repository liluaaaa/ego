import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/base.css'
//引入i18n
import i18n from './lang'
//挂载api
import api from './api'
Vue.prototype.$api=api;

Vue.config.productionTip = false
//刷新读取本地存储
let userinfo=localStorage.getItem('userinfo');
if(userinfo){
  let obj=JSON.parse(userinfo)
  store.commit('LoginModule/setUser',obj)
}
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
