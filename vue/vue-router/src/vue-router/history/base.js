export function createRoute(record, location) {
  // 要看这个record有没有父亲
  let res = []
  
  if (record) {
    // 插入的顺序，先/about 再 /about/a 先父再子
    while(record) {
      res.unshift(record)
      record = record.parent
    }
  }

  return {
    ...location,
    matched: res
  }
}


// function runQueue(queue, iterator, cb) {
//   let index = 0
//   if (index >= queue.length) return 
//   // 异步迭代 QA钩子函数？QA是什么库
//   function step(index) { // 对原有逻辑劫持，中间件逻辑
//     let hook = queue[index] // 先执行第一个，讲第二个hook执行的逻辑当做参数传入。传入之后用户会调用这个方法，执行
//     iterator(hook, () => step(index + 1))
//   }
//   step(0)
// }

// hash 和 history 公共方法
class History {
  constructor(router) {
    this.router = router
    
    // 当我们创建完路由后，先有一个默认值 路径和匹配到的记录做成一个映射表
    // 一个路径可能匹配多个记录
    // '/about/a'  => matches: [Record, Record]

    // 默认当创建history时，路径应该是/ 并且匹配到的记录是[]
    this.current = createRoute(null, { // 存放路由状态
      path: '/'
    })

  }


  listen(cb) {
    this.cb = cb
  }

  transitionTo(location, onComplete) {
    // 跳转时都会调用此方法
    // 路径变了 视图刷新 (响应式数据的原理)

    let route = this.router.match(location) 

    // 路由未发生变化，视图就不渲染了，防止重复跳转
    if (location === this.current.path && route.matched.length === this.current.matched.length) {
      return
    }

    // 在更新之前先调用注册好的导航守卫

    // 内部使用了一个队列
    // let queue = [].concat(this.router.beforeHooks) // 拿到了注册的方法

    // // 每次都需要把用户传来的方法传进去
    // const iterator = (hook, next) => {
    //   hook(this.current, route, () => {
    //     next()
    //   })
    // }
    // runQueue(queue, iterator, () => { // 源码中经常问到的runQueue是做什么的

    this.updateRoute(route)



    // route是当前匹配到的最新的结果

    // 执行完成函数
    onComplete && onComplete()
    // 根据路径加载不同的组件
    // 渲染组件
    // })

  }

  updateRoute(route) {
    // 路由变了，会触发一些钩子函数
    this.current = route
    this.cb && this.cb(route)

    // 视图重新渲染有几个要求？ 响应式(current是响应式的) + 变量用到模板中用 
  }
}

export {
  History
}

