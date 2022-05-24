import { initState } from "./state"

export function initMixin(Vue) { // 就是为了给Vue增加init方法的
  Vue.prototype._init = function(options) {
    const vm = this
    vm.$options = options

    initState(vm)
  }

}