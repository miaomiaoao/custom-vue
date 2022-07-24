function Super(name) {
  this.name = name
  this.colors = ['red']
}

Super.prototype.sayName = function() {
  console.log(this.name)
}


function Sub(name, age) {
  Super.call(this, name)
  this.age = age
}

Sub.prototype = new Super()
// 重写Sub.prototype的constructor属性，指向自己的构造函数
Sub.prototype.constructor = Super
Sub.prototype.sayAge = function() {
  console.log(this.age)
}


var instance1 = new Sub('xy', 1)
instance1.colors.push('black')
console.log(instance1.colors)
instance1.sayName()
instance1.sayAge()

var instance2 = new Sub('tc', 2)
console.log(instance2.colors)

instance2.sayName()
instance2.sayAge()


// 缺点，在写入Sub.prototype和在实例化的时候，会调用两次父类。
