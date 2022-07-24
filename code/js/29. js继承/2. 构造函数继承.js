function Super() {
  this.colors = ['red']
}

function Sub() {
  // 继承Super, 相当于在自己的作用域里面去执行Super
  Super.call(this)
}

var instance1 = new Sub()
instance1.colors.push('black')

var instance2 = new Sub()

console.log(instance1.colors) // ['red', 'black']
console.log(instance2.colors) // ['red']

// 解决了两个实例引用类型的操作会被篡改
// 缺点是只能继承父类实例的属性和方法，不能继承原型上的属性和方法
