/**
 * @description 二分查找
 */

// 循环方法
export function binarySearch1(arr: number[], target: number): number {
  const length = arr.length
  if (length === 0) return -1

  let startIndex = 0 // 开始位置
  let endIndex = length - 1 // 结束位置

  while(startIndex <= endIndex) {
    const midIndex = Math.floor((startIndex + endIndex) / 2)
    const midValue = arr[midIndex]
    if (target < midValue) {
      // 目标值小,则继续在左侧查找
      endIndex = midIndex - 1
    } else if(target > midValue) {
      // 目标值大于,则继续右侧朝招
      startIndex = midIndex + 1
    } else {
      // 相等
      return midIndex
    }
  }

  return -1;
}


export function binarySearch2(arr: number[], target: number, startIndex?: number, endIndex?: number): number {
  const length = arr.length
  if (length === 0) return -1

  // 开始结束的范围
  if(startIndex == null) startIndex = 0
  if(endIndex == null) endIndex = length - 1
  
  // 如果start 和 end 相遇，结束
  if(startIndex > endIndex) return -1

  // 中间位置
  const midIndex = Math.floor((startIndex + endIndex) / 2)
  const midValue = arr[midIndex]

  if (target < midValue) {
    // 目标值小,则继续在左侧查找
    endIndex = midIndex - 1
  } else if(target > midValue) {
    // 目标值大于,则继续右侧朝招
    startIndex = midIndex + 1
  } else {
    // 相等
    return midIndex
  }

  return binarySearch2(arr, target, startIndex, endIndex)
}