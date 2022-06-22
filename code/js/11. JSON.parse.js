Function实现
function myParse(data) {
  return new Function(`return${data}`)
}
const arr = JSON.stringify([1, 2, 4])
console.log(myParse(arr))


const test = {
  name: 'xuying'
}
const newTest = JSON.stringify(test)
console.log(myParse(test))

eval实现
1. 普通实现
function myParse(opt) {
  return eval(`${opt}`)
}

const arr = JSON.stringify([1, 2, 4]) // [1, 2, 4]

const test = {
  name: 'xuying'
}
const newTest = JSON.stringify(test)
console.log(myParse(test)) // { name： 'xuying'}
用eval，如果被解析的不是json对象而是一段带有攻击的js代码，那么就会导致xss漏洞
2. 过滤xss攻击
function myJsonParse(data) {
    const r1 = /^[\],:{}\s]*$/;
    const r2 = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    const r3 = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    const r4 = /(?:^|:|,)(?:\s*\[)+/g;
    // 是否是合法的JSON
    const isLegal = r1.test(
        data
            .replace(r2, '@')
            .replace(r3, ']')
            .replace(r4, ''),
    );
    if (isLegal) {
        return eval(`(${data})`);
    }
    throw new TypeError('请传入合法的JSON');
}