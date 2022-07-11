import createMatcher from './create-matcher'
import install from './install'
import BrowserHistory from './history/history'
import HashHistory from './history/hash'
class VueRouter {
  constructor(options) {
    // 根据用户的配置 和当前请求的路径  渲染对应的组件

    // 创建匹配器  可用于后序的匹配操作
    // 用户没有传递配置 就默认传入一个空数组
    /**
     * 1. match通过路由匹配组件
     * 2. addRoutes 动态添加路由
     */
    // matcher上面就有addRoutes了
    // 给实例添加matcher属性
    this.matcher = createMatcher(options.routes || [])

    // 需要根据不同的路径进行切换
    // hash h5api abstract(浏览器用不到)
    let mode = options.mode || 'hash' // 默认没有传就是hash模式
    
    // 源码用的switch case
    if (mode === 'hash') {
      this.history = new HashHistory(this)
    } else if (mode === 'history') {
      this.history = new BrowserHistory(this)
    }

  }

  init(app) { // 根实例
    // 监听hash值变化 默认跳转到对应的路径中

    const history = this.history

    const setupListeners = () => {
      history.setupListeners() // 监听路由变化
    }

    // 整个跳转的核心，包括调用this.$router.push 也是调用这个方法
    history.transitionTo(
      history.getCurrentLocation(), // 跳转当前位置
      setupListeners // 设置hash
    )

    // 更新_route
    history.listen(route => {  // 每次路径变化，都调用此方法
      app._route = route
    })

    // 当current变化后，更新_route属性
    // 当current中的path或者matched的其他属性变化 也是响应式的

    // setupListeners // 监听hash变化，放到 has中
    // transitionTo 放到base中 做成公共方法
    // getCurrentLocation // 放到自己家 可能是hash 可能是 browser

  
  }

  beforeEach(fn) {
    // 路径切换，函数依次执行
    this.beforeHooks.push(fn)
  }

  push(to) {
    // 调用的是history自己的push
    this.history.push(to) // 跳转路由
  }

  go() {

  }

  match(location) {
    return this.matcher.match(location)
  }
}

VueRouter.install = install

export default VueRouter
