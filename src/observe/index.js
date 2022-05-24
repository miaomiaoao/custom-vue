import { newArrayProto } from "./array"

class Observer {
  constructor(data) {
    // __ob__ 这个属性是做什么的呢？
    // Object.defineProperty只能劫持已经存在的属性(vue里面会为此单独写一些api $set $delete)
    // !!!! 为什么给data赋值ob的属性，因为想要在重写数组的方法里面能够取到this
    Object.defineProperty(data, '__ob__', {
      value: this,
      enumerable: false // 将__ob__变成不可枚举的(循环的时候无法获取到)
    })
    debugger
    if (Array.isArray(data)) {
      debugger
      data.__proto__ = newArrayProto
      this.observeArray(data)
    } else {
      this.walk(data)
    }
  }
  walk(data) { // 循环对象 对对象属性一次劫持
    // "重新定义"属性 性能差
    Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
  }
  observeArray(data) {
    data.forEach(item => observe(item))
  }
}


export function defineReactive(target, key, value) {
  observe(value)
  Object.defineProperty(target, key, {
    get() {
      console.log('get', key, value)
      return value
    },
    set(newValue) {
      console.log('set', key)
      if (newValue === value) return 
      observe(newValue) // 如果设置的值是一个对象，再次对数据进行劫持
      value = newValue
    }
  }) 
}

export function observe(data) {
  if (typeof data !== 'object' || data == null) {
    return
  }
  if (data.__ob__ instanceof Observer) { // 已经被劫持过了，不需要被再次劫持
    return data.__ob__
  }
  return new Observer(data)
}