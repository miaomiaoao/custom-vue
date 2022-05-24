// 重写数组中的部分方法
let oldArrayProto = Array.prototype

export let newArrayProto = Object.create(oldArrayProto)


// 数组的变异方法
let methods = [
  'pop',
  'push',
  'shift',
  'unshift',
  'splice',
  'reverse',
  'sort'
] //concat 和 slice 不会改变数组

methods.forEach(method => {
  newArrayProto[method] = function(...args) {
    debugger;
    // 内部调用原来的方法, 函数的劫持,切片编程
    const result = oldArrayProto[method].call(this, ...args)

    // 对新增的数据再次劫持
    let inserted

    let ob = this.__ob__
    switch(method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
      default:
        break
    }
    if (inserted) {
      ob.observeArray(inserted)
    }
    return result
  }
})