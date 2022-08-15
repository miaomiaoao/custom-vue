function ajax(url) {
  return new Promise((resolve, rejecct) => {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url, false) // 第三个参数是同步请求还是异步请求
    xhr.setRequestHeader('Content-type', '/json')
    xhr.onreadystatechange=function() {
      if (xhr.readyState !== 4) return false
      if (xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.responseText)
      } else {
        rejecct(xhr.responseText)
      }
    }
    xhr.send()
  })
  
}

