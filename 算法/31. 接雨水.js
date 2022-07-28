// 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
// 输出：6
// 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。


// 输入：height = [4,2,0,3,2,5]
// 输出：9

/**
 * n == height.length
 * 0 <= n <= 3 * 104
 * 0 <= height[i] <= 105
 */

/**
 * 木桶原理，每根柱子的雨水的深度取决于它两侧最高的柱子中较短的那根柱子的长度
 * 如果这个较短的柱子的长度大于等于当前柱子，那么雨水的深度就是较短的柱子减去当前柱子的长度
 * 如果这个较短的柱子的长度等于当前柱子，那么雨水的深度就是0
 */

function trap(height) {
  let len = height.length, sum = 0
  for (let i = 0; i < len - 1; i++) {
    // 计算当前柱子左侧的最大值
    let left = 0
    for (let j = i - 1; j >= 0; j--) {
      left = height[j] >= left ? height[j] : left
    }

    // 计算当前柱子右侧的最大值
    let right = 0
    for (let j = i + 1; j < len; j++) {
      right = height[j] >= right ? height[j] : right
    }

    let min = Math.min(left, right) // 求left 和 right中较小的值
    // 计算当前柱子能接的雨水量
    if (min > height[i]) {
      sum += min - height[i]
    }
  }
  console.log(sum)
  return sum
}

trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])