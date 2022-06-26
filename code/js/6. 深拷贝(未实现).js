// 深拷贝 拷贝后的结果不影响拷贝之前的 拷贝前后无关系
// 浅拷贝 改变拷贝前的内容，会对拷贝之后的有影响 拷贝前后有关系


// 递归实现一个拷贝
function deepClone(obj, hash = new WeakMap()) {
  // null || undefined null === undefined
  if (obj == null) return obj
  // new Date也是一个对象类型
  if (obj instanceof Date) return new Date(obj)
  // 如果是一个正则
  if (obj instanceof RegExp) return new RegExp(obj)

  // 可能是对象或者普通的值  但是对象typeof obj 返回的是function
  // 如果是函数的画是不需要深拷贝的
  if (typeof obj !== 'object') return obj

  if (hash.get(obj)) return hash.get(obj)

  // 如果是对象，需要进行深拷贝
  // [], {}

  let cloneObj = new obj.constructor()
  hash.set(obj, cloneObj);
  for (let key in obj) {
    // 原始的一次拷贝给cloneObj
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], hash)
    }
  }
  return cloneObj
}

// 可能对象会循环引用, 如果对象已经拷贝过了，就不再拷贝。
// es6中的weakMap, 若引用
// 什么是尾递归优化？？？