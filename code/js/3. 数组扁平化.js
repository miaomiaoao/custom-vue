这篇文章写的非常全面

[1, [2, [3]], 4]
思路：
● 定义空数组，arr = []。遍历当前数组
● 如果item非数组，则累加到arr
● 如果item是数组，则遍历之后累加到arr
递归
function flattenDeep2(arr: any[]): any[] {
  const res: any[] = []
  arr.forEach(item => {
    if(Array.isArray(item)) {
      const flattenItem = flattenDeep2(item)
      res = res.contact(flatItem)
    } else {
      res = res.contact(item)
    }
  })
  return res
}
reduce
function flatten() {
    // 空数组作为初始值 pre是累加值
    return arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? flatten2(cur) : cur)
        }, [])
    }
 
传入扁平层数
// reduce + 递归
function flat(arr, num = 1) {
  if (num > 0) {
    return arr.reduce((acc, cur) => {
      return acc.concat(Array.isArray(cur) ? flatten2(cur, num - 1) : cur)
    }, [])
  } else {
    return arr.slice() // 复制了一个arr
  }
}
const arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, "string", { name: "弹铁蛋同学" }]
flat(arr, Infinity);
// [1, 2, 3, 4, 1, 2, 3, 1, 2, 3, 1, 2, 3, 5, "string", { name: "弹铁蛋同学" }];
原型上重写递归
Array.prototype.fakeFlat = function(num = 1) {
  if (!Number(num) || Number(num) < 0) {
    return this;
  }
  let arr = this.concat();    // 获得调用 fakeFlat 函数的数组
  while (num > 0) {           
    if (arr.some(x => Array.isArray(x))) {
      arr = [].concat.apply([], arr);    // 数组中还有数组元素的话并且 num > 0，继续展开一层数组 
    } else {
      break; // 数组中没有数组元素并且不管 num 是否依旧大于 0，停止循环。
    }
    num--;
  }
  return arr;
};
const arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, "string", { name: "弹铁蛋同学" }]
arr.fakeFlat(Infinity)
// [1, 2, 3, 4, 1, 2, 3, 1, 2, 3, 1, 2, 3, 5, "string", { name: "弹铁蛋同学" }];