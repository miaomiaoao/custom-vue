Function.prototype.customBind = function(context, ...bindArgs) {
  const _this = this
  let fn = function(...args) {
    const newArgs = bindArgs.concat(args)

    const newContext = this instanceof fn ? this : Object(context)

    return  _this.apply(newContext, newArgs)
  
  }

  if (this.prototype) {
    fn.prototype = Object.create(this.prototype)
  }
  return fn
}


var value = 2

var foo = {
  value: 1
}

function bar(name, age) {
  this.habit = 'shopping'
  console.log(this.value)
  console.log(name)
  console.log(age)
}

bar.prototype.friend = 'kevin'

var bindFoo = bar.customBind(foo, 'daisy')

bindFoo()

// var obj = new bindFoo('17')



