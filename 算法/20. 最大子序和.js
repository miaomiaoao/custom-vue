/**
 * 题目描述：给定一个整数数组nums，找到一个具有最大子和的连续子数组(子数组最少包含一个元素)，
 * 返回其最大和
 * 
 * 输入: [-2,1,-3,4,-1,2,1,-5,4]
 * 输出: 6
 * 解释: 连续子数组 [4, -1, 2, 1] 的和最大，为 6。
 * 
 * 解题思路: 使用动态规划，当前最大连续子序和sum，结果为res:
 * 1. 如果sum > 0, 则说明sum对结果有增益效果，则sum保留并加上当前遍历数字
 * 2. 如果sum < 0, 则说明sum对结果无增益效果，需要舍弃，则sum直接更新为当前遍历数字
 * 
 * 每次遍历都比较res和sum的大小，将最大赋值为sum，遍历结束后就返回结果
 */


function maxSubArray(nums) {
  let sum = 0; res = nums[0]
  for(let num of nums) {
    sum > 0 ? sum += sum : sum = num
    res = Math.max(sum, res)
  }

  return res
}