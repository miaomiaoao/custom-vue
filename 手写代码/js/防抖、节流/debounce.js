/**
 * @description 任意时间内，如果执行某个函数，那么就重新计时
 * 某段时间只执行一次
 */

// 用途：输入框输入后，搜索数据
// 拖动滚动条或者改变窗口大小之后执行
// 简单版本的防抖
// 希望立即执行，停止触发n秒后，才重新触发执行
function debounce(fn, delay, immediate) {
  let timer;
  if (timer) {
    clearTimeout(timer)
  }
  return function() {
    const self = this;
    timer = setTimeout(function() {
      fn.apply(self, arguments)
    }, delay)
  }  
}


// 加入立即执行版本的防抖
function debounce(fn, delay, immediate) {
  var timer;

  return function() {
    var context = this
    if (timer) clearTimeout(timer)
    if (immediate) {
      var callNow = !timer
      timer = setTimeout(function() {
        timer = null
      }, delay)
      if (callNow) {
        fn.apply(context, arguments)
      }
    } else {
      setTimeout(function() {
        fn.apply(context, arguments)
        timer = null
      }, delay)
    }
  }
}

/**
 * @description 间隔多久执行一次
 * 时间戳
 */
function throttle(fn, delay) {
  var previous = 0
  return function() {
    var now = +new Date()
    var context = this
    if (now - previous > delay) {
      fn.apply(context, arguments)
      previous = now
    }
  }
}

function throttle(fn, delay) {
  var timer;
  return function() {
    if (timer) return false
    var context = this
    timer = setTimeout(function() {
      timeout = null
      fn.apply(context, arguments)
    }, delay)
  }
}


function test() {
  this.aa = 1;
  console.log(this.aa)
}
debounce(test, 1000)