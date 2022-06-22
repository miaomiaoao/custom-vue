function curry(fn) {
  const fnArgsLength = fn.length // 传入函数的参数长度
  let args = []
  
  // ts中，独立的函数，this需要声明类型
  function calc(...newArgs) {
    // 累计参数
    args = [
      ...args,
      ...newArgs
    ]
    if(args.length < fnArgsLength) {
      // 参数不够，返回函数
      return calc
    } else {
      // 参数够了，返回执行结果
      return fn.apply(this, args.slice(0, fnArgsLength))
    }
  }
  
  return calc
}


function add(a, b, c) {
  return a + b + c
}

const curryAdd = curry(add)
curryAdd(10)(20)(30)