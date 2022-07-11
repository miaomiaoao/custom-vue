// 1. Vue.use(Vuex) Vuex是一个对象 install方法
// 2. Vuex中有个Store类
// 3. 
import { Store, install } from './store'
export * from './helpers'

export default {
  Store,
  install
}


// 这个文件是入口文件，核心就是导出所有写好的方法