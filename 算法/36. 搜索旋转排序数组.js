/**
 * 假设按照升序排序的数组在预先未知的某个点上进行了旋转
 * 例如，数组[0, 1, 2, 4, 5, 6, 7]可能变成为[4, 5, 6, 7, 0, 1, 2]
 * 搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回-1
 * 
 * 你可以假设数组中不存在重复的元素，算法的时间复杂度O(logn)级别
 * 
 * 输入： nums = [4, 5, 6, 7, 0, 1, 2], target = 0
 * 输出：4
 * 输入: nums = [4, 5, 6, 7, 0, 1, 2], target = 3
 * 输出: -1
 * 
 * 二分法
 * 首先区数组的中点的索引值，将数组分为两部分，由于数组为旋转排序数组，所以，必定有一侧
 * 是有序的，有一侧是无序的
 * 
 * 分两种情况：
 * 1. 如果前半部分有序，并且目标值在前半部分之前，就将end设置为mid - 1， 然后继续二分查找。
 * 如果不在前半部分就在后半部分查找，将start设置为mid + 1
 * 
 * 2. 如果后半部分有序，并且目标值在后半部分之间，就将start设置为mid + 1，然后继续二分查找。
 * 如果不在后半部分就在前半部分查找，将end值设置为mid - 1
 * 
 * 按照上述步骤继续二分查找，如果目标值和start、end、mid其中一个对应的值相等，就停止查找，返回结果
 */

function search(nums, target) {
  if (!nums || nums.length === 0) return -1
  let start = 0
  let mid
  let end = nums.length - 1

  while(start <= end) {
    mid = Math.ceil((start + end) / 2)

    if (nums[mid] === target) return mid
    if (nums[start] === target) return start
    if (nums[end] === target) return end

    // 前半部分有序
    if (nums[start] < nums[mid]) {
      if (nums[start] < target && target < nums[mid]) {
        end = mid + 1
      } else {
        start = mid + 1
      }
    } else { // 后半部分有序
      if (nums[mid] < target && nums[end] > target) {
        start = mid + 1
      } else {
        end = mid + 1
      }
    }
  }

  return -1
}