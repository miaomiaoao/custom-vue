// 给定 matrix = 
// [
//   [1,2,3],
//   [4,5,6],
//   [7,8,9]
// ],
// 原地旋转输入矩阵，使其变为:
// [
//   [7,4,1],
//   [8,5,2],
//   [9,6,3]
// ]

// 给定 matrix =
// [
//   [ 5, 1, 9,11],
//   [ 2, 4, 8,10],
//   [13, 3, 6, 7],
//   [15,14,12,16]
// ], 
// 原地旋转输入矩阵，使其变为:
// [
//   [15,13, 2, 5],
//   [14, 3, 4, 1],
//   [12, 6, 8, 9],
//   [16, 7,10,11]
// ]


/**
 * 给定一个 n× n 的二维矩阵表示一个图像。
 * 将图像顺时针旋转 90 度。
 * 你必须在原地旋转图像， 这意味着你需要直接修改输入的二维矩阵。 请不要使用另一个矩阵来旋转图像。
 */

/**
 * 解题思路： 先沿左上角到右下角进行翻转，再沿垂直的中心对称翻转
 */

// 初始的矩阵
// [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9]
// ]
// //（1）沿着左上角到右下角对角线进行翻转
// [
//   [1, 4, 7],
//   [2, 5, 8],
//   [3, 6, 9]
// ]
// //（2）沿着垂直的中心进行对称
// [
//   [7, 4, 1],
//   [8, 5, 2],
//   [9, 6, 3]
// ]


function rotateMatrix(matrix) {
  const n = matrix.length
  for (let i = 0; i < n; i++) {
    for(let j = i; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
    }
  }

  for (let k = 0; k < n; k++) {
    for (let l = 0; l < Math.floor(n / 2); l++) {
      [matrix[k][l], matrix[k][n - 1 - l]] = [matrix[k][n - 1 - l], matrix[k][l]]
    }
  }
}