
// 使用递归
function flatten(arr) {
  let res = []
  arr.forEach(item => {
    if (Array.isArray(item)) {
      res = res.concat(flatten(item))
    } else {
      res = res.concat(item)
    }
  })

  return res

}

function flatten2(arr, num) {
  if (num > 0) {
    return arr.reduce((acc, cur) => {
      return acc.concat(Array.isArray(cur) ? flatten2(cur, num - 1) : cur)
    }, [])
  } else {
    return arr.slice() // 复制了一个arr
  }
}

Array.prototype.customFlat = function(num = 1) {
  if (!Number(num) || Number(num) < 0) {
    return this;
  }

  let arr = this.concat()
  while(num > 0) {
    if (arr.some(x => Array.isArray(x))) {
      arr = Array.prototype.concat.apply([], arr)
    } else {
      break
    }
    num--
  }
  return arr
}

const arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, "string", { name: "xuying" }]
console.log(arr.customFlat(1))
// arr.fakeFlat(Infinity)
// [1, 2, 3, 4, 1, 2, 3, 1, 2, 3, 1, 2, 3, 5, "string", { name: "弹铁蛋同学" }];