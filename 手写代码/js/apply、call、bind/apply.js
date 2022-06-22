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
  if(typeof obj === 'object' && isFinite(obj.length) && obj.length >= 0 && obj.length < 4294967296) {
    return true
  }
  return false
}


/**
 * 1. Array.isArray()
 * 2. arr instanceof Array
 * 3. Object.prototype.toString.call() '[object Array]'
 * 4. arr.__proto__ = Array.prototype
 * arr.constructor = Array
 */