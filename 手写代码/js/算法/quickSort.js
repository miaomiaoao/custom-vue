var quickSort = function(nums) {
  if(nums === null || nums.length < 2) {
    return nums;
  }
  merge(nums, 0, nums.length - 1)
  console.log(nums);
}
function merge(nums, L, R) {
  if(L < R) {
    // 随机选定一个划分值 !!! 选划分值,左侧一定要加上L
    const partitionNum =  Math.floor(Math.random() * (R - L + 1)) + L
    swap(nums, partitionNum, R)
    const { less, more } = partition(nums, L, R) // 返回的数组,长度一定为2,表示左右边界
    merge(nums, L, less - 1) // less-1 小于区域的右边界
    merge(nums, more + 1, R) // more + 1 大于区域的第一个数的位置
  }
}

// 划分
function partition(nums, L, R) {
  let less = L - 1, more = R;
  while(L < more) {
    if(nums[L] < nums[R]) {
      swap(nums, ++less, L++)
    } else if(nums[L] > nums[R]) {
      swap(nums, --more, L)
    } else {
      L++
    }
  }
  swap(nums, more, R);
  // 返回的是小于等于区域和大于区域的下标
  return { less: less + 1, more}
}

// 交换函数
function swap(nums, i, j) {
  [nums[i], nums[j]] =  [nums[j], nums[i]]
}

quickSort([3, 5, 6, 4, 7, 3, 5, 8]);