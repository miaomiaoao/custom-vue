// 有效的括号
// 输入："()" 输出：true
// 输入："()[]{}" 输出：true

// 输入："(}" 输出：false
function isValidChar(str) {
  if (!str) return true
  const stack = []
  const charMap = {
    '(': ')',
    '[': ']',
    '{': '}'
  }

  for (let i = 0; i < str.length; i++) {
    let char = str[i]
    if (char === '(' || char === '[' || char === '{') {
      stack.push(charMap[char])
    } else {
      if (stack.length === 0 || stack.pop() !== char) {
        return false
      }
    }
  }

  if (stack.length === 0) {
    return true
  } else {
    return false
  }
}

// k个一组翻转链表


// 两个栈实现一个队列
 var dearr = [1, 2, 3, 4, 5];

 function deArr(arr) {
   for (var i = 0; i < arr.length; i++) {
     Object.defineProperty(arr, i, {
       set: function() {
         arr[i] = `new${i}`
         console.log(arr[i])
       },
       get: function() {
        return arr[i]
       }
     })
   }
   return arr
 }
deArr(dearr)
dearr[1] = 1
console.log(dearr[1])
