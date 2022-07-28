/**
 * 给定一个包含 m * n 个元素的矩阵(m行，n列)，请按照顺时针螺旋顺序，返回矩阵中的所有元素
 * 输入：
 *[
   [1, 2, 3],
   [4, 5, 6],
   [7, 8, 9]
 ]

 输出: [1, 2, 3, 6, 9, 8, 7, 4, 5]

 输入: [
   [1, 2, 3, 4],
   [5, 6, 7, 8],
   [9, 10, 11, 12]
 ]
 输出: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]


 解题思路： 在每一行每一列遍历的时候，不遍历到头，这样就形成了一个个圆环
 并且可以减少横向和竖向遍历之间的影响，经过一轮遍历之后，就四个边界都进行缩窄1，这样就可以往内部进行不断循环

 上边界 top: 0,
 下边界 bottom: matrix.length - 1
 左边界 left: 0
 有边界 right: matrix[0].length - 1

 需要注意的是，最后有可能剩余一列或者一行，它是无法构成圆环的，这种情况要单独处理

 剩一行的情况： top === bottom && left < right || top < bottom && left === right
 剩一项(也是一行/列)的情况： top === bottom && left == right
 */


function spiralOrder(matrix) {
  if (!matrix.length) {
    return []
  }
  let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1
  const res = []
  // [
  //   [1, 2, 3, 4],
  //   [5, 6, 7, 8],
  //   [9, 10, 11, 12]
  // ]
  while(top < bottom  && left < right) {
    for(let i = left; i < right; i++) {
      res.push(matrix[top][i])
    }
    for (let i = top; i < bottom; i++) {
      res.push(matrix[i][right])
    }
    for (let i = right; i > left; i--) {
      res.push(matrix[bottom][i])
    }
    for (let i = bottom; i > top; i--) {
      res.push(matrix[i][left])
    }
    right--
    top++
    bottom--
    left++
  }

  if (bottom === top) { // 剩下最后一行的情况
    for (let i = left; i <= right; i++) {
      res.push(matrix[top][i])
    }
  } else if (left === right) { // 剩下一列的情况
    for (let i = top; i <= bottom; i++) {
      res.push(matrix[i][left])
    }
  }

  return res
}
