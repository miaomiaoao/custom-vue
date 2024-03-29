import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router'
// import store from './store'

Vue.config.productionTip = false
Vue.use(VueRouter)
debugger;
const router = new VueRouter(routes)
new Vue({
  // store,
  name: 'root',
  render: h => h(App),
  router
}).$mount('#app')
