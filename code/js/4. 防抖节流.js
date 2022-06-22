防抖和节流有什么区别，分别用在什么场景
区别
防抖：防止抖动
节流：n秒钟只能执行一次
场景
防抖:
搜索输入框，输入停止了之后才会去搜索
节流：drag 或者 scroll
防抖
问题
1. 为什么返回一个函数 container.onmousemove = debounce(getUserAction, 1000);
2. immediate控制什么？
正常的防抖函数是n秒内如果执行依次，则重新计时
而加入immediate函数后，如果immediate为true，是立即执行，但是停止触发n秒后才能继续执行
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
节流


//  时间戳立即执行一次
function throttle(fn,time){
  let pre = 0
  return function(...args){
    let now = Date.now()
    if(now - pre > time){
      fn.apply(this,args)
      pre = now
    }
  }
}
// 定时器
function throttle(fn,time){
  let timer = null
  return function(...args){
    if(!timer){
      timer = setTimeout(() => {
        fn.apply(this,args)
        timer = null
      },time)
    }
    
  }
  
}