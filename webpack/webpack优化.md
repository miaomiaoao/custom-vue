## noParse
- module.noParse字段，可以用于配置哪些模块文件的内容不需要进行解析
- 不需要解析依赖(即无依赖)的第三方大型类库等，可以通过这个字段来配置，以提高整体的构建速度
  
```js
  module.exports = {
    module: {
      noParse: /jquery|lodash/,
      // 或者使用函数
      noParse(content) {
        return /jquery|lodash/.test(content)
      }
    }
  }
```

## DefinePlugin
在编译时可以配置全局变量
```js
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringlfy(false),
      VERSION: JSON.stringlfy('1.0.0'),
      EXPRESS: JSON.stringlfy('1+2+3'),
      COPYRIGHT: {
        AUTHOR: JSON.stringify('zhufeng')
      }
    })
  ]
}
```

## IgnorePlugin
忽略一些模块，让webpack不打包某些模块
```js
module.exports = {
  plugins: [
    // 第一个参数，引入模块的路径的正则表达式
    // 第二个参数，模块的名称或者是引入的目录名称
    new webpack.IgnorePlugin({
      contextRegExp: /^\.\/locale/,
      resourceRegExp: /moment$/
    })
  ]
}
```
IgnorePlugin 和 externals 的区别
- externals 外部依赖，外部引用，直接使用
- ignorePlugin 外部也不引入，内部也不打包，无法使用
- 相同点是内部都不打包

## speed-measure-webpack-plugin
打包费时分析
```js
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const smw = new SpeedMeasureWebpackPlugin()
module.exports = smw.wrap({}) // 将配置包裹进去，与传统插件用法不同
```

## webpack-bundle-analyzer
webpack插件，打包文件分析工具
```js
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer')
plugins: {
  new WebpackBundleAnalyzer()
}
```