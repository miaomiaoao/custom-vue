/**
 * 有两个请求，按照优先有序打印结果
 * 例1：req1需要10ms, req2需要5ms，两个请求同时发出去，10ms后打印出req1，
 * req2的结果
 * 例2：req1需要5ms， req2需要10ms，两个请求同事发出去。5ms打印出req1的结果，
 * 再过5ms后打印出req2的结果
 */


function simulateRequest(response, time) {
  const r = `${response}--耗时`
  console.time(r)

  return () => {
    console.log(`开始请求 ----${response}`)
    return new Promise(resolve => setTimeout(() => {
      console.log(`请求完成 --- ${response}`)
      console.timeEnd(r)
      resolve(response)
    }, time, response))
  }
}

function demo(tasks) {
  const queue = new Array(tasks.length).fill()
  let i = 0

  tasks.forEach((task, index) => {
    task().then(res => {
      queue[index] = res
      execute(index)
    })
  })

  function execute(index) {
    if (i === index && queue[i]) {
      console.log(queue[i])
      i++
      execute(i)
    }
  }
}

demo([simulateRequest('req1', 5000), simulateRequest('req1', 2000)])

// 开始请求 ---req1
// 开始请求 ---req2
// 请求完成 ---req2
// req2--耗时：
// 请求完成 -- req1
// req1--耗时:
// 响应结果 req1
// 响应结果 req2
