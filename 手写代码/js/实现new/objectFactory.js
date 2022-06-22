function ObjectFactory(fn, ...args) {
  // 传入新创建对象的原型
  // 等于 let obj = {}; obj.__proto__ = fn.prototype
  let obj = Object.create(fn.prototype)

  const res = fn.apply(obj, args)

  return res instanceof Object ? res : obj
}


function A(name) {
  this.name = name
}

A.prototype.getName = function() {
  console.log(this.name)
}
const a = ObjectFactory(A, 'xuying')
console.log(a)
a.getName()