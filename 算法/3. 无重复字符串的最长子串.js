/**
 * 1. 定义left、right两个指针，map记录哪些元素存在过, map: {'a': 0, 'b': 1}(字符和位置),result记录每次移动后的最大长度
 * 2. right不断右移, 遇到重复left右移
 * 滑动指针
 */
/**
 * @param {string} s
 * @return {number}
 */

 function lengthOfLongestSubstring(str) {‘{？}
  let result = 0;
  let map = {};

  let left = 0; right = 0;
  while(right < str.length) {
    let char = str[right]
    if (map[char] >= 0 && map[char] >= left) {
      left = map[char] + 1
    }

    map[char] = right
    result = Math.max(result, right - left + 1)
    right++
  }

  return result
}