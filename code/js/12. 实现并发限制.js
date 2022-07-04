/**
 * (滴滴、 头条)
 * 同时发出n个请求， 只要其中一个完成请求， 立马又加入一个请求，
 * 让请求队列始终保持n个请求， 直到没有任务再加入， 并且返回的结果必须按照任务队列的顺序返回，
 * 返回结果类似于promise.all()
 */


// 举例：concurrence([req1, req2, req3], 2)
// ● 同时发出请求req1, req2
// ● req2完成请求，req1还没有完成，因为并发最多可以有两个请求，所以这个时候req3也发出请求
function concurrenceLimits(tasks, limit) {
  let count = 0
  let result = [] // 结果队列
  
  // 任务队列
  let queue = []
  let len = tasks.length
  
  function run() {
    // 执行完所有任务后返回
    if (count === len) {
      return Promise.resolve()
    }
    
    let task = tasks[count++]
    
    // 每个任务都以Promise返回，防止传入非Promise任务
    let taskPromise = Promise.resolve(task())
    
    // 将当前正在执行的任务放入结果队列
    result.push(taskPromise)
    
    // 当前任务执行完以后，从任务队列中删除，这样才能继续添加新任务
    let _taskPromise = taskPromise.then(() => {
      queue.slice(queue.indexOf(_taskPromise), 1)
    })
    
    // 当前任务放入任务队列中
    queue.push(_taskPromise)
     
    
    let p = Promise.resolve()
    
    // 当任务队列长度达到并发限制数目，暂停往任务队列添加任务
    if (queue.length >= limit) {
      // race表明只要任务完成一个后，p就可以执行回调，执行下面的p.then(() => run()), 继续添加任务
      p = Promise.race(queue)
    }
    
    // 注意这里，任务队列小于并发限制，跳过queue.length >= limit, 直接执行p.then的回调run添加任务队列
    // 任务队列达到并发限制数目后，必须等Promise.race(queue)执行完一个任务后，执行p.then的回调run添加任务队列
    return p.then(() => run())
    
  }
  
  // 所有任务执行完以后回调，按顺序返回执行结果
  return run().then(() => Promise.all(result))
}