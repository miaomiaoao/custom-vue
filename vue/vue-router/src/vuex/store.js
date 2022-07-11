import ModuleCollection from "./module/module-collection";
import { forEachValue } from "./util";

export let Vue;

function getState(store, path) {
  return path.reduce((newState, current) => {
    return newState[current]
  }, store.state)
}
/**
 * 
 * @param {*} store 容器
 * @param {*} rootState 根模块
 * @param {*} path 所有路径
 * @param {*} module 我们格式化后的结果
 */
const installModule = (store, rootState, path, module) => {

  // 这里我要对当前模块进行操作
  // 这里我需要遍历当前模块上的actions、mutations、getters 都把它定义

  // 将所有子模块的状态安装到父模块的状态上

  // 给当前订阅的事件 增加一个命名空间
  let namespaced = store._modules.getNamespaced(path);

  // 命名空间在根模块下 a/changAge  如果在a模块下 a/c/changAge

  if (path.length > 0) { // 儿子
    let parent = path.slice(0, -1).reduce((memo, current) => {
      return memo[current]
    }, rootState)
    Vue.set(parent, path[path.length - 1], module.state) // 可以定制响应式的数据。给不是响应式的对象添加值
  }

  module.forEachMutation((mutation, key) => {
    store._mutations[namespaced + key] = (store._mutations[namespced + key] || [])
    store._mutations[namespaced + key].push((payload) => {
      // mutation.call(store, module.state, payload) // 如果这样写，在插件更新时，获取不到最新值
      mutation.call(store, getState(store, path), payload) // 取最新的状态
      store._subscribes.forEach(fn => {
        fn(mutation, store.state)
      })
    })
  })

  module.forEachAction((action, key) => {
    store._actions[namespaced + key] = (store._actions[namespced + key] || [])
    store._actions[namespaced + key].push(payload => {
      action.call(store, store, payload)
    })
  })

  module.forEachGetters((getter, key) => {
    // 模块中getter的名字重复了 会覆盖
    store._wrappedGetters[namespaced + key] = function() {
      return getter(getState(store, path))
    }
  })

  module.forEachChild((child, key) => {
    // 递归加载模块
    installModule(store, rootState, path.concat(key), child)
  })


}


function resetStoreVM(store, state) {
  const computed = {}
  store.getters = {}

  forEachValue(store._wrappedGetters, (fn, key) => {
    computed[key] = () => {
      return fn(store.state)
    }

    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key]
    })
  })
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })
}

export class Store {
  constructor(options) {
    const state = options.state

    this._actions = {}
    this._mutations = {}
    this._wrappedGetters = {}
    this._subscribes = {}


    // 数据的格式化 格式化成为我想要的结果(树)
    this._modules = new ModuleCollection(options)

    // 根模块的状态中  要将子模块通过模块名 定义在根模块上
    installModule(this.state, [], this._modules)

    // 将状态和getters都定义在当前的vm上
    resetStoreVM(this, state)

    // 实现插件,插件内部会依次执行
    options.plugins.forEach(plugin => plugin(this))
  }

  replaceState(state) {
    this._vm.data.$$state = state
  }


  subscribe(fn) {
    this._subscribes.push(fn)
  }

  commit = (type, payload) => {
    this._mutations[type].forEach(mutation => mutation.call(this, payload))
  }

  dispatch = (type, payload) => {
    this._actions[type].forEach(action => action.call(this, payload))
  }

  get state() { // 属性访问器 new Store().state
    return this._vm._data.$$state
  }
}