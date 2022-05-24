import { observe } from "./observe"

export function initState(vm) {
  const opts = vm.$options // 获取所有选项

  if (opts.data) {
    initData(vm)
  }
}

function proxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[target][key]
    },
    set(newValue) {
      vm[target][key] = newValue
    }
  })
}


function initData(vm) {
  let data = vm.$options.data // data可能是函数或者对象
  data = typeof data === 'function' ? data.call(vm) : data

  vm._data = data
  observe(data) // 对data进行数据劫持

  // 如果想要直接通过this.xxx访问属性。使用vm来进行代理
  for (let key in data) {
    proxy(vm, '_data', key)
  }
}