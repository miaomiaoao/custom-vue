/**
 * 给定一个字符串s，找到s中最长的回文子串，你可以设定s的最大长度是1000
 * 
 * 输入：babad
 * 输出：bab 或者 aba
 * 输入：cbbd
 * 输出：bb
 * 
 * 解题思路：
 * 1. 选取对称中心(奇数长度的字符串为中心两个字符的中间，偶数长度的字符串中心为中间的字符)
 * 2. 通过对比选择出两种组合较大的回文子串长度
 * 3. 对比之前的长度，判断是否更新起始的位置
 * 4. 遍历完成后，根据起始位置，截取最长回文子串
 */

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  if (s == null || s.length < 1) {
    return ''
  }
  let start = 0
  let end = 0
  // 定义中心扩展的方法
  const fn = (s, left, right) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--
      right++
    }
    return right - left - 1
  }
  // 遍历字符串
  for (let i = 0; i < s.length; i++) {
    const len1 = fn(s, i, i)
    const len2 = fn(s, i, i + 1)
    const len = Math.max(len1, len2)
    // 判断起始位置是否更新
    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2)
      end = i + Math.floor(len / 2)
    }
  }
  return s.substring(start, end + 1)
};
