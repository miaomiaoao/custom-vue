import Vue from 'vue'
import App from './App.vue'
import VueRouter from './vue-router'
import routes from './router'
// import store from './store'

Vue.config.productionTip = false
debugger;
Vue.use(VueRouter)

const router = new VueRouter(routes)
new Vue({
  // store,
  name: 'root',
  render: h => h(App),
  router
}).$mount('#app')
