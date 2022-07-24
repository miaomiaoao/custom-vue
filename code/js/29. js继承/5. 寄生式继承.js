function createAnother(name) {
  var clone = object(name)
  clone.sayHi = function() {
    console.log('sayHi')
  }
  return clone
}


var person = {
  name: 'xuxu'
}

var anotherPerson = createAnother(person)
anotherPerson.sayHi()