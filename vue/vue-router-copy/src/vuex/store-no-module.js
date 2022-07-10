import applyMixin from "./mixin"
import { forEachValue } from "./util"

export let Vue
class Store {
  constructor(options) {
    const state = options.state // 需要变成响应式
    
    // 1. 添加状态逻辑 数据在哪儿使用 就会收集对应的依赖
    const computed = {}

    // 2.处理getter属性 具有缓存 like computed 带有缓存(多次取值如果值不变是不会重新计算的)
    this.getters = {}
    forEachValue(options.getters, (fn, key) => {
      // 将自己的getters定义在计算属性上
      computed[key] = () => {
        return fn(this.state)
      }
      // 当我取值时，去执行计算属性的逻辑
      Object.defineProperty(this.getters, key, {
        get: () => this._vm[key]
      })
    })
    // Object.keys(options.getters).forEach(key => {
    //   Object.defineProperty(this.getters, key, {
    //     // 没有缓存功能
    //     get: () => options.getters[key](this.state)
    //   })
    // })

    // 3. 计算属性实现
    this._vm = new Vue({
      data: {
        $$state: state // 会将$$state都通过defineProperty进行属性劫持
        // 如果属性以$开头，vue内部不会将这个属性挂在到vm上
      },
      computed
    })

    // 4. 实现mutations 
    this.mutations = {}
    this.actions = {}

    forEachValue(options.mutations, (fn, key) => {
      this.mutations[key] = (payload) => fn(this.state, payload)
    })
    
    // 5. 实现actions

    forEachValue(options.actions, (fn, key) => {
      // 传store 因为需要解析 commit
      this.actions[key] = (payload) => fn(this, payload)
    })
  }
  // 在严格模式下，actions和mutation 是有区别的
  // payload 载荷
  commit = (type, payload) => { // 保证当前this指向store实例
    // 调用commit其实就是去找 刚才绑定好的mutation
    this.mutations[type](payload)
  }

  dispatch = (type, payload) => {
    this.actions[type](payload)
  }

  get state() { // 属性访问器
    return this._vm._data.$$state
  }
  
}

const install = (_Vue) => {
  Vue = _Vue

  // 需要将根组件中注入的store，分派给每个组件(子组件)
  applyMixin(Vue)
}

export {
  Store,
  install
}