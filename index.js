function debounce(fn, delay) {
  if (typeof fn !== 'function' || fn === null) {
    throw new Error('类型错误')
  }

  if (typeof delay !== 'number') {
    throw new Error('第二个参数类型错误')
  }

  let timer = null
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}

function log() {
  console.log('1111')
}

const logDebounce = debounce(log, 2000)
logDebounce()
logDebounce()
logDebounce()
logDebounce()
logDebounce()
logDebounce()