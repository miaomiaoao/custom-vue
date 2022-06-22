/**
 * 针对new一个实例的第三步，返回对象，要分为两种情况来看
   第一种：构造函数本身返回一个对象
   第二种：构造函数返回一个值类型的数据
 */


   // 构造函数返回一个对象
function Person(name, age) {
  this.name = name
  this.age = age
  return {
    name: name,
    hobby: 'sleep'
  }
}

const person = new Person('xuying', 30)
console.log(person.name) // xuying
console.log(person.age) // undefined
console.log(person.hobby) // sleep

// 构造函数返回一个值类型的数据
function Person(name, age) {
  this.name = name
  this.age = age
  return 'xuxu'
}
// const person = new Person('xuying', 30)
// console.log(person.name) // xuying
// console.log(person.age) // 30


function objectFactory(fn, ...args) {
  // 传入新创建对象的原型
  // 等于 let obj = {}; obj.__proto__ = fn.prototype
  let obj = object.create(fn.prototype)
  
  const res = fn.apply(obj, args)
  
  return res instanceof Object ? res : obj
}


function fn(name) {
  this.name = name
}
const res = objectFactory(fn, 'xuying')
