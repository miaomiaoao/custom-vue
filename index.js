function compose(...fns) {
  if (!fns.length) return v => v
  if (fns.length === 1) return fns[0]()

  // return fns.reduce((pre, cur) => {
  //   return (...args) => pre(cur(...args))
  // })

  return fns.reduce((pre, cur) => {
    return (...args) => pre(cur(...args))
  })
}



function fn1(x) {
  return x + 1
}

function fn2(x) {
  return x + 2
}

function fn3(x) {
  return x + 3
}

function fn4(x) {
  return x + 4
}

const a = compose(fn1, fn2, fn3, fn4)
console.log(a(0))


// function curry(fn) {
//   const fnLength = fn.fnLength
//   const allArgs = []
//   function calc(...args) {
//     allArgs = allArgs.concat(args)
//     if (allArgs.length < fnLength) {
//       return calc
//     } else {
//       fn.apply(this, allArgs.slice(0, fnLength))
//     }
//   }
//   return calc
// }

// function add(a, b, c) {
//   return a + b + c
// }

// const curryAdd = curry(add)
// curryAdd(1)(2)(3)