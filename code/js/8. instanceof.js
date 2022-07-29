function myInstanceof(instance, origin) {
  if (instance === null) return false

  const type = typeof instance
  if (type !== 'object' && type !== 'function') {
    // 值类型
    return false
  }

  let tempInstance = instance // 为了防止修改instance
  while (tempInstance) {
    if (tempInstance.__proto__ === origin.prototype) {
      return true
    }
    tempInstance = tempInstance.__proto__ // 顺着原型链往上
  }

  return false
}

const arr = ['1', '2']
console.log(myInstanceof(arr, Array))
console.log(myInstanceof(arr, Object))
