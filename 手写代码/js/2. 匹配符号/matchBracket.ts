/**
 * @description 匹配符号
 */

// 先入栈，

function isMatch(leftChar: string, rightChar: string): boolean {
  if (leftChar === '{' && rightChar === '}') return true
  if (leftChar === '[' && rightChar === ']') return true
  if (leftChar === '(' && rightChar === ')') return true
  return false
}

function matchBracket(string: string): boolean {
  const length = string.length
  if (length === 0) return true

  const stack = []

  const leftSymbol = '([{'
  const rightSymbol = ')}]'

  for(let i = 0; i < length; i++) {

    const s = string[i]

    if(leftSymbol.includes(s)) {
      stack.push(s)
    } else if(rightSymbol.includes(s)) {
      // 先判断再出栈
      const top = stack[stack.length - 1]
      if(top === undefined) return false
      if(isMatch(top, s)) {
        stack.pop()
      } else {
        return false
      }
    }
  }
  if(stack.length === 0) {
    return true
  } else {
    return false
  }
}


console.log(matchBracket('(a{b}c)'))