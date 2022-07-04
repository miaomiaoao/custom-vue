/**
 * @param {number[]} nums
 * @return {number[][]}
 * 给你一个包含 n 个整数的数组 nums，
 * 判断 nums 中是否存在三个元素 a， b， c， 使得 a + b + c = 0？
 * 请你找出所有和为 0 且不重复的三元组。
 */
var threeSum = function(nums) {
   let p = 0;
  nums = nums.sort((a, b) => a - b); // return a-b 升序排列
  // [-4, -1, -1, 0, 1, 2]
  const arr = [];
  // 判断重复的这个地方没有看懂
  while(p < nums.length - 2) {
    console.log(p);
    let p1 = p + 1, p2 = nums.length - 1;
    if(nums[p] === nums[p - 1] && p > 0) {
      p++;
      continue;
    }
    const temp = 0 - nums[p];
    while(p1 < p2) {
      if(nums[p2] === nums[p2 + 1] && p2 < nums.length - 1) {
        p2--;
        continue;
      }
      if(nums[p1] + nums[p2] > temp) {
        p2--;
      } else if(nums[p1] + nums[p2] < temp) {
        p1++;
      } else {
        arr.push([nums[p], nums[p1], nums[p2]]);
        p1++;
        p2--;
      }
    }
    p++;
  }
  console.log(arr);
  return arr;
};