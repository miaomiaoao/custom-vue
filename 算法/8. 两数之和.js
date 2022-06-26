/**
 * 1. map key为当前值，value为当前索引
 * 2. 当target减去当前的值在map中存在，那么找到了和为target的两个数字
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const maps = {}
    const len = nums.length    

    for(let i=0;i<len;i++) {
        if(maps[target-nums[i]]!==undefined) {
            return [maps[target - nums[i]], i]
        }
        maps[nums[i]]=i
    }
};

console.log(twoSum([3, 2, 4], 6))