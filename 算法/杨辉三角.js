/**
 * 给定一个非负的索引 rowIndex 返回杨辉三角的第rowIndex行
 * 
 * 在杨辉三角中，每个数都是它左上方 和 右上方的数的和
 * 
 * 输入: rowIndex = 3
 * 输出: [1, 3, 3, 1]
 * 示例 2:

 * 输入: rowIndex = 0
 * 输出: [1]
 * 示例 3:

 * 输入: rowIndex = 1
 * 输出: [1, 1]
 */

function getRow(rowIndex) {
  let res = [[1]]
  if (rowIndex) {
    for (let i = 1; i <= rowIndex; i++) {
      res[i] = []
      for(let j = 0; j < i + 1; j++) {
        res[i][j] = (res[i - 1][j] || 0) + (res[i - 1][j - 1] || 0)
      }
      return res[rowIndex]
    }
  } else {
    return [1]
  }
}