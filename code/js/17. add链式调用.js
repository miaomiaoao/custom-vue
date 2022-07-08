/**
 * 实现add方法 使计算结果能够满足如下预期  add(1)(2)(3) = 6  add(1, 2, 3)(4) = 10
 * 主要就是考虑函数柯里化
 */

function add(...args) {
  let allArgs = []
  function fn(...newArgs) {
    allArgs = [...args, ...newArgs]
    return fn
  }

  fn.toString = function() {
    if (!allArgs.length) {
      return
    }

    return allArgs.reduce((sum, cur) => sum + cur)
  }
  return fn
}
