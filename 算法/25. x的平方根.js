/**
 * 实现 int sqrt(int x)函数
 * 计算并且返回x的平方根，其中x是非负数。由于返回类型是整数，
 * 结果只保留整数的部分，小数部分将被舍去
 * 
 * 输入: 4, 输出: 2
 * 输入: 8, 输出: 2
 * 
 * 使用二分法来解决
 */


function mySqart(x) {
  if (x < 2) return x

  let left = 1, right = x >> 1, mid

  while(left <= right) {
    mid = (left + right) >> 1
    if (mid * mid === x) {
      return mid
    }
    mid * mid < x ? left = mid + 1 : right = mid - 1
  }

  return right
}

