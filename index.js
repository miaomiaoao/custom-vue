/**
 * 
 * 假如随机到的数字是3
 * [4, 2, 9, 1, 5, 3]
 * 
 * 小于等于区域[2, 1, 3] [4, 9, 5]
 * 随机取一个数字, 将其放到数组最后一位
 * 然后划分小于等于区域，和 大于区域
 * 
 */

function quickSort(nums) {
  if (nums === null || nums.length < 2) {
    return nums
  }

  merge(nums, 0, nums.length - 1)
}

function merge(nums, L, R) {
  if (L < R) {
    // 随机选定一个划分值，划分值的左侧一定要加L
    const pivot = Math.floor(Math.random() * (R - L + 1)) + L
    swap(nums, pivot, R)
    // 返回小于等于区域 和 大于区域的下标
    const { less, more } = partition(nums, L, R)
    merge(nums, L, less - 1)
    merge(nums, more + 1, R)
  }
}

// 划分 [4, 2, 9, 3, 5, 1]
function partition(nums, L, R) {
  let less = L - 1, more = R
  while(less < R) {
    if (nums[L] < nums[R]) {
      swap(nums, ++less, L++)
      // 如果nums[L] > nums[R] 交换nums[L] 和 nums[R]前面的位置
    } else if(nums[L] > nums[R]) {
      swap(nums, --more, L)
    } else {
      L++
    }
  }
  swap(nums, more, R)
  return { less: less+ 1, more}
}

function swap(nums, i, j) {
  [nums[i], nums[j]] = [nums[j], nums[i]]
}

//       2
//   1       3
// 1   4
// 二叉树的最大深度
function depthOfBinaryTree(head) {
  if (head === null) return 0

  const l = depthOfBinaryTree(head.left)
  const r = depthOfBinaryTree(head.right)

  return Math.max(l, r) + 1
}

// 翻转二叉树
function reverseBinaryTree(head) {
  if (head === null) return head
  [head.left, head.right] = [head.right, head.left]
  reverseBinaryTree(head.left)
  reverseBinaryTree(head.right)
  return head
}

// 无重复字符串的最长子串
// abcabcbb 3
// bbbbb 1

function lengthOfStr(str) {
  if (str.length === 0) return 0
  let left = 0, right = 0, map = {}, result = 0
  while(right <= str.length) {
    let char = str[right]
    if (map[char]) {
      left = map[char] + 1
    }
    map[char] = right
    result = Math.max(result, right - left + 1)
    right++
  }
}