// apply，call，bind都可以改变this的指向(除了箭头函数哈)
// bind改变后不执行。而是返回一个新的函数

// call、apply改变this指向后立即指向。但是接收的参数不同。call(context, arg1, arg2....)  apply(context, 数组 | 类数组)
// bind
// ● 返回一个新函数，但是不执行
// ● 绑定this和部分参数
// ● 如果是箭头函数，无法改变this，只能改变参数
// ● bind在调用时可接收参数，返回的函数执行时也可以接收参数


// 但是bind返回的函数，又可以做为构造函数。此时就是作为实例的情况，bind指定的this会失效(根据new函数的实现原理)
var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'daisy');

var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin
Function.prototype.customBind = function(context, ...bindArgs) {
  // context是bind传入的this
  // bindArgs是bind传入的各个参数
  
  const self = this // 当前的函数本身
  
  let fn = function(...args) {
    
    const newArgs = bindArgs.contact(args) // 拼接参数
    
    const _context = this instanceof fn ? this: Object(context)
    
    return self.apply(_context, newArgs)
  }
  if (this.prototype) {
    // 复制源函数的prototype给fn  一些情况下函数没有prototype 比如箭头函数
    fn.prototype = Object.create(this.prototype)
  }
  return fn
  
}


call
Function.prototype.customCall = function(context, ...args) {
  if(context === null || context === undefined) {
    context = window
  } else if(!(context instanceof Object)) {
    context = Object(context)
  }
  
  // 利用Symbol唯一性,防止参数被覆盖
  const temp = Symbol('temp')
  
  // 函数this指向，隐式绑定到context上 这句没看懂!!!!
  // 我发现，调用customCall时，this就是指向当前的函数。相当于把sum的this，赋值给obj
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

sum.customCall(obj, 9, 10)

// apply
// 类数组
// ● 具有length属性
// ● 其他属性(索引)为非负数(对象中的索引会被当做字符串来处理)
// ● 不具有所有数组所具有的方法

// args是数组或者类数组
Function.prototype.customApply = function(context, args) {
  if(context === null || context === undefined) {
    context = window
  } else {
    context = Object(context)
  }
  
  const temp = Symbol(temp)
  
  context[temp] = this
  
  let result = null
  if(!args) {
    result = context[temp]();
  } else if(Array.isArray(args) || isLikeArray(args)) { // 如果是数组或者类数组
    args = Array.from(args)
    result = context[temp](...args) // 转为数组
  } else { // 如果都不是
    throw new Error('第二个参数必须是数组或者类数组')
  }
  
  delete context[temp]
  
  return result
}

function isLikeArray(obj) {
  // 4294967296 2的32次幂
  if(typeof obj === 'object' && isFinite(obj.length) && obj.length >= 0 && obj.length < Math.pow(2, 32)) {
    return true
  }
  return false
}