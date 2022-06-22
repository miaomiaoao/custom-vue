Function.prototype.customCall = function(context, ...args) {
  if(context === null || context === undefined) {
    context = window
  } else if(!(context instanceof Object)) {
    context = Object(context)
  }

  console.log(context)

  // 利用Symbol唯一性,防止参数被覆盖
  const temp = Symbol('temp')

  // 函数this指向，隐式绑定到context上 这句没看懂!!!!
  // 我发现，调用函数原型时，this就是指向当前的函数。相当于把sum的this，赋值给obj
  // 为什么用symbol生成一个属性，可能是怕跟上下文中本身的属性重复吧
  context[temp] = this

  // 执行函数
  let result = context[temp](...args)
  delete context[temp]

  return result
}

function sum(arg1, arg2) {
  console.log(this.a)
  console.log(this.b)
  console.log(arg1 + arg2)
}

const obj = {
  a: 1,
  b: 2
}

sum.customCall(1, 9, 10)