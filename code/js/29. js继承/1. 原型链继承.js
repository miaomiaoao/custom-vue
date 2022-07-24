// 1. 原型链继承
function Super() {
  this.colors = ['red']
  this.prop = true
}

Super.prototype.getSuperValue = function() {
  return this.prop
}


function Sub() {
  this.subProp = false
}


Sub.prototype = new Super()

Sub.prototype.getSubValue = function() {
  return this.subProp
}

var instance = new Sub()
console.log(instance.getSuperValue())

// 缺点：多个实例引用类型的操作会被篡改

var instance1 = new Sub()

instance1.colors.push('black')

var instance2 = new Sub()

console.log(instance1.colors) // ['red', 'black']
console.log(instance2.colors) // ['red', 'black']
