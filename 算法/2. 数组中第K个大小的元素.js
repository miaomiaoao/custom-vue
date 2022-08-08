// 本质上就是对数组进行排序
function mergeSort(nums, k) {
  if (nums === null || nums.length < 2) {
    return nums
  }

  process(nums, 0, nums.length - 1)

  return nums[k - 1]
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

console.log(mergeSort([4, 3, 5, 9, 1, 2, 6], 2))