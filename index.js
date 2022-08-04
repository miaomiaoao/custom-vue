function deepClone(obj, map=new WeakMap()) {
  if (obj === null) return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)

  if (typeof obj !== 'object') return obj

  if (map.has(obj)) return map.get(obj)

  let cloneObj = new obj.constructor()
  map.set(obj, cloneObj)
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], map)
    }
  }
  return cloneObj
}

var obj = {
  a: 1,
  b: 2,
  c: {
    a: 1,
    b: {
      a: 1
    }
  },
  e: undefined,
  d: Symbol('d'),
  g: []
}
obj.f = obj
var cloneObj = deepClone(obj)
cloneObj.c.b.a = 3
console.log(cloneObj)
console.log(obj.c.b.a)



function debounce(fn, delay = 3000) {
  const timer = null, self = this
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(self, ...args)
      timer = null
    }, delay)
  }
}

function throttle(fn, delay = 3000) {
  let pre = Date.now()
  return function(...args) {
    let cur = Date.now()
    if (cur - pre > delay) {
      fn.apply(this, args)
      pre = now
    }
  }
}