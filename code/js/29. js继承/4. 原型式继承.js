function object(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}


var person = {
  name: 'xuxu',
  hobbies: ['sleep']
}

var anotherPerson = obj(object)
anotherPerson.name = 'tc'
anotherPerson.hobbies.push('basketball')


console.log(anotherPerson.hobbies) // ['sleep', 'basketball']

// 原型链继承多个实例的引用类型属性指向相同，存在篡改的可能
// 无法传递参数

