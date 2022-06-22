/**
 * @description 数组旋转k步
 */
 
 function rotateArray1(arr: number[], k:number): number[] {
  const length = arr.length
  if(length === 0 || !k) return arr

  const step = Math.abs(k % length) // k有可能是负数,有可能比length大,所有使用绝对值加取余
  
  for(let i = 0; i < step; i++) {
    let n = arr.pop()
    if(n !== null && n !== undefined) {
      arr.unshift(n)
    }
  }
  return arr
}

function rotateArray2(arr: number[], k: number): number[] {
  const length = arr.length
  if (length === 0 || !k) return arr
  const step = Math.abs(k % length)

  const part2 = arr.slice(-step)
  const part1 = arr.slice(0, length - step)
  return part2.concat(part1)
}