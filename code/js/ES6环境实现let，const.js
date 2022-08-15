// 在es5的环境下实现let
// let 和 var const的区别
(function() {
  for(var i = 0; i < 2; i++) {
    console.log(i); 
  }
})()
// console.log(i); 

// 实现const, const的核心是不能修改
function _const(key, value) {
  Object.defineProperty(window, key, {
    value,
    writable: false
  })
}
try {
  _const('obj', { a: 1 })
  obj.b = 2
  obj = {}
  console.log(obj)
} catch(e) {
  console.log(e)
}

