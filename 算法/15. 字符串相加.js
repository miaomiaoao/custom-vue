/**
 * 给定两个字符串形式为非负数 num1和num2， 计算他们的和
 * 提示：
 * 1. num1和num2的长度都小于5100
 * 2. num1和num2都只包含数字0-9
 * 3. num1和num2都不包含任何前导零
 * 4. 不能使用任何内建BigInterger库，也不能直接将输入的字符串转换为整数形式
 */


/**
 * 解题思路：
 * 模拟竖式加法，遍历两个字符串，从个位开始两个数相加。定义一个temp来保存两个数的和。
 * 将temp与10取余，得到的值加载结果res中，如果有进位，就将temp赋值为1，方便前面的位相加。
 * 最后判断相加完之后，temp是否等于1，如果是就进一位，在结果前面加一个1。
 */

/**
 * 时间复杂度 O(max(len1, len2))
 * 空间复杂度 O(1)
 */

function addString(num1, num2) {
  debugger;
  let len1 = num1.length
  let len2 = num2.length
  temp = 0
  res = ''

  while(len1 || len2) {
    if (len1) {
      temp += +num1[--len1]
    }
    if (len2) {
      temp += +num2[--len2]
    }

    res = temp % 10 + res
    temp > 9 ? temp = 1 : temp = 0
  }
  if (temp) {
    res = 1 + res
  }

  return res
}


addString('22', '339');