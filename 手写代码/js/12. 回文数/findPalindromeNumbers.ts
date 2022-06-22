function findPalindromeNumbers1(max: number): number[] {
  const res: number[] = []
  if (max <= 0) return res
  for (let i = 1; i < max; i++) {
    // 转换字符串，转换为数组，再反转，再比较
    const s = i.toString()
    if (s === s.split('').reverse().join('')) {
      res.push(i)
    }
  }

  return res
}

function findPalindromeNumbers2(max: number): number[] {
  const res: number[] = []
  if (max <= 0) return res
  for (let i = 1; i < max; i++) {
    const s = i.toString()
    const length = s.length

    // 字符串头尾比较
    let flag = true
    let startIndex = 0
    let endIndex = length - 1
    while(startIndex < endIndex) {
      if(s[startIndex] !== s[endIndex]) {
        flag = false
        break
      } else {
        startIndex++
        endIndex--
      }
    }

    if (flag) res.push(i)
  }

  return res
}


function findPalindromeNumbers3(max: number): number[] {
  const res: number[] = []
  if (max <= 0) return res
  for (let i = 1; i < max; i++) {
    let n = i;
    let rev = 0 // 存储反转数

    while (n > 0) {
      rev = rev * 10 + n % 10
      n = Math.floor(n / 10)
    }
    
    if (i === rev) res.push(i)
  }
  
  return res
}