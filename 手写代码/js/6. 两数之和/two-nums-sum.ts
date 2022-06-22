/**
 * @description 找出和为n的两个元素
 * [1, 2, 4, 7, 11, 15] n = 15
 */

function findTwoNums(arr: number[], n: number): number[] {
  if(arr.length === 0) {
    return []
  }
  let p1: number = 0;
  let p2: number = arr.length - 1
  while(p1 < p2) {
    if(arr[p1] + arr[p2] < n) {
      p1++
    } else if(arr[p1] + arr[p2] > n) {
      p2--
    } else {
      console.log(p1, p2)
      console.log(arr[p1], arr[p2])
      return [arr[p1], arr[p2]]
    }
  }
  return []
}

console.log(findTwoNums([1, 2, 4, 7, 11, 15], 15))