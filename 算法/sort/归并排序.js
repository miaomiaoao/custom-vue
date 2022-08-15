// 冒泡排序, i = 0, 循环后面的数据两两交换。 i = 1 循环后面的数据，两两交换
// 归并排序
// 快速排序
// 堆排序

// 归并排序
// [4, 3, 5, 9, 1, 2, 6]
/**
 * 
 * [4, 3, 5] [9, 1, 2, 6]
 * [4, 3] [5]  [9, 1] [2, 6]
 * [4] [3] [5] [9] [1] [2] [6]  
 * [3, 4] [5] [1, 9] [2, 6]
 * [3, 4, 5] [1, 2, 6, 9]
 */

function mergeSort(nums) {
  if (nums === null || nums.length < 2) {
    return nums
  }

  process(nums, 0, nums.length - 1)

  return nums
}

function process(arr, L, R) {
  if (L === R) return
  let mid = Math.floor((L + R) / 2)
  process(arr, L, mid)
  process(arr, mid + 1, R)
  merge(arr, L, mid, R)
}

function merge(arr, L, M, R) {
  let p1 = L,
    p2 = M + 1,
    i = 0,
    helps = []

  while (p1 <= M && p2 <= R) {
    helps[i++] = arr[p1] > arr[p2] ? arr[p2++] : arr[p1++]
  }

  while (p1 <= M) {
    helps[i++] = arr[p1++]
  }

  while (p2 <= R) {
    helps[i++] = arr[p2++]
  }

  for (let i = 0; i < helps.length; i++) {
    arr[L + i] = helps[i]
  }
}

console.log(mergeSort([4, 3, 5, 9, 1, 2, 6]))