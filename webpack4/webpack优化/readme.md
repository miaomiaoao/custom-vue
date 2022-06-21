## sourcemap
> sourcemap解决开发代码和实际运行代码不一致时帮助我们debug到原始开发代码的技术

sourcemap是加上是五个关键字的任意组合
- eval 使用eval包裹模块代码
- source-map 产生.map文件
- cheap 不包含列信息
- module 包含loader的sourcemap
- inline 将.map作为 DataURI嵌入，不单独生成.map文件 

配置
- eval 把代码包裹在eval()函数中

## noParse
不去解析jquery中的依赖库
## IgnorePlugin
内部插件 
忽略掉内部引用的插件，打包的时候会忽略引用的插件 

如果moment只引入了语言包，则打包的时候忽略

## dllPlugin
```js
  library:'ab',
  libraryTarget: 'umd' // 打包的后的文件在哪个模块下使用
  // libraryTarget: 'commonjs' // 在node.js模块中使用
  // 如果用了commonjs 打包后会在目标文件 的头部添加module.exports = ''

```
## happypack
多线程打包  第三方模块
## webpack自带优化
tree-shaking 把没用到的代码自动删除 
require语法不支持tree-shaking

scope hosting 作用域提升
## 抽离公共代码
splitChunks 分割代码块 

vender里面都是提取一些第三方库
## 懒加载
import 
## 热更新
HMR  hotModuleReplacePlugin
## tapable介绍