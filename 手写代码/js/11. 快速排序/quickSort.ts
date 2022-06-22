/**
 * splice
 * @param arr 
 * @returns 
 */
function quickSort1(arr: number[]) :number[] {
  const length = arr.length

  if (length === 0) return arr

  const midIndex = Math.floor(length / 2)
  const midValue = arr.splice(midIndex, 1)[0]

  const left: number[] = []
  const right: number[] = []

  // 注意：这里不直接用arr.length, 而是arr.length 因为splice改变了数组的长度
  for(let i = 0; i < arr.length; i++) {
    const n = arr[i]
    if(n < midValue) {
      // 小于midValue 则放在left
      left.push(n)
    } else {
      right.push(n)
    }
  }

  return quickSort1(left).concat([midValue], quickSort1(right))
}

/**
 * slice
 * @param arr 
 * @returns 
 */
function quickSort2(arr: number[]) :number[] {
  const length = arr.length

  if (length === 0) return arr

  const midIndex = Math.floor(length / 2)
  const midValue = arr.slice(midIndex, midIndex + 1)[0]

  const left: number[] = []
  const right: number[] = []

  for(let i = 0; i < length; i++) {
    if (i !== midIndex) { // 只比较midValue之外的东西
      const n = arr[i]
      if(n < midValue) {
        // 小于midValue 则放在left
        left.push(n)
      } else {
        right.push(n)
      }
    }
  }

  return quickSort2(left).concat([midValue], quickSort2(right))
}