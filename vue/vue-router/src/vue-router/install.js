export let _Vue
import Link from "./components/link"
import View from "./components/view"
// 安装插件
export default function install(Vue, options) {
  debugger;
  // 给vue挂一些全局组件
  // vue-router中的核心
  // 插件，一般用于往全局挂载全局指令、过滤器、原型方法
  _Vue = Vue // 这样别的文件都可以使用vue变量

  // 可以去给所有的组件都混入一个属性router
  // 正常是在根组件注入一个router属性，但是希望home.vue, about.vue都能拿到router和route
  Vue.mixin({
    // 混入到每个组件的beforeCreate方法
    beforeCreate() {
      // console.log('----------') // 第一次打印了五次，因为有两个组件，home还用到了route-link和router-view
      // 将父亲传入的router实例共享给子组件
      if (this.$options.router) { // 父亲组件
        this._routerRoot = this // 代表它自己，给当前根组件增加一个属性
        this._router = this.$options.router

        // 执行
        this._router.init(this) // 当前根组件的实例

        // 如何获取到current属性 实例上有一个history属性  history上有一个current属性
        Vue.util.defineReactive(this, '_route', this._router.history.current)

      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot // 取父亲的_routerRoot
      }
      
      // 无论父组件还是子组件，都可以通过this_routerRoot_.router获取共同的实例
    }
  })


  Vue.component('router-link', Link)

  Vue.component('router-view', View)

  Object.defineProperty(Vue.prototype, '$route', {
    get() {
      return this._routerRoot._route // 实际上是current对象
    }
  })

  // 其实最后就是把this._routerRoot._router赋值到这个上面
  Object.defineProperty(Vue.prototype, '$router', {
    get() {
      return this._routerRoot._router // 是加上是router的实例
    }
  })
}

// 为什么要传入Vue， 因为我的vue可能是2.5版本的，别人的可能是2.8的。所以就用别人传入的