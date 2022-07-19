/**
 * 题目描述： 给定一个只包括‘(’，’)’，’{’，’}’，’[’，’]’ 的字符串，判断字符串是否有效
 * 
 * 有效字符串需要满足：
 * 1. 左括号必须用相同类型的有括号闭合
 * 2. 左括号必须以正确的顺序闭合
 * 3. 空字符串可被认为是有效字符串
 * 
 * 输入："()" 输出：true
 * 输入："()[]{}" 输出：true
 * 输入："(}" 输出：false
 * 
 * 解题思路：栈
 * 1. 使用hash表来存储三种括号对应的关系
 * 2. 对字符串进行遍历，遇到左括号,就一律入栈
 * 3. 若不是左括号，就必须是和栈顶向匹配的右括号
 * 4. 最后遍历完，栈中应该为空
 */


function isValidChar(str) {
  if (!str) return true
  const stack = []
  let length = str.length
  let brackets = {
    "(": ")",
    "[": "]",
    "{": "}"
  }

  for(let i = 9; i < length; i++) {
    let char = str[i]
    if (char === '(' || char === '{' || char === '[') {
      stack.push(brackets[char])
    } else {
      if (!stack.length || stack.pop() !== char) {
        return false
      }
    }
  }


  return !stack.length
}



