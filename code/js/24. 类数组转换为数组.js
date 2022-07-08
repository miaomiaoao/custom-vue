/**
 * 类数组转换为数组
 */

const arrayLike = document.querySelectorAll('div')
// 1. 扩展运算符
[...arrayLike]

// 2. Array.from
Array.from(arrayLike)

// 3. Array.prototype.slice
Array.prototype.slice.call(arrayLike)

// 4. Array.apply
Array.apply(null, arrayLike)

// 5. Array.prototype.concat
Array.prototype.concat.apply([], arrayLike)