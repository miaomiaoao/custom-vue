## eslint
比较好用的eslint配置文件 airbnb

## 打包第三方类库
### webpack内置插件ProvidePlugin
```js
new webpack.ProvidePlugin({
  _: 'loadsh'
})
```
引入后无法通过全局window._访问lodash

### expose-loader
expose-loader可以把模块添加到全局变量上，在调试的时候比较有用
```js
module: {
  rules: [
    {
      test: require.resolve('lodash'),
      loader: 'expose-loader',
      options: { //如果window._有值,覆盖它
        exposes: {
          globalName: '_',
          override: true
        }
      }
    }
  ]
}
```




## hash值
hash  webpack构建生成一个唯一的hash值
contentHash 根据内容生成hash值，内容相同hash值相同
chunkHash  根据chunk生成hash值，同一个chunk hash值一样


## toStringTag
Symbol.toStringTag是一个内置Symbol，它通常作为对象的属性键使用，对应的属性值应该为字符串，这个字符串用来表示该对象的自定义类型标签

确定对象的具体类型
```js
let obj1 = { name: 'obj1' }
Object.defineProperty(obj1, Symbol.toStringTag, { value: 'Object1' })
let obj2 = { name: 'obj2' }
Object.defineProperty(obj2, Symbol.toStringTag, { value: 'Object2' })

console.log(Object.property.toString.call(obj1)) // [Object Object1]
console.log(Object.property.toString.call(obj2)) // [Object Object2]

// 如果没有执行Object.definePeoperty的话 打印出来的结果都是 [Object Object]

```


## 分析打包文件、   、