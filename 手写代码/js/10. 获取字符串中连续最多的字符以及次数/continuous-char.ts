interface IRes {
  char: string,
  length: number
}

function findCoutinuousChar1(string: string): IRes {
  const res: Res = {
    char: '',
    length: 0
  }

  const length = string.length
  if (length === 0) return res

  let tempLength = 0 // 临时记录当前连续字符的长度

  for(let i = 0; i < length; i++) {
    tempLength = 0 // 重置

    for(let j = i; j < length; j++) {
      if (string[i] === string[j]) {
        tempLength++
      } 
      if (string[i] !== string[j] || j === length - 1) {
        // 不相等，或者已经到了最后一个元素。要去判断最大值
        if (tempLength > res.length) {
          res.char = string[i]
          res.length = tempLength
        }

        if (i < length - 1) {
          i = j - 1 // 跳步
        }

        break
      }
    }

  }
  return res
}