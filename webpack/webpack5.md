## 资源模块

- 资源模块(asset module) 是一种模块类型，它允许使用资源文件(字体，图标等) 而无需额外配置loader
- 在webpack5 之前通常会使用
  - raw-loader将文件导入为字符串
  - url-loader 将一个文件输出到目标目录
  - file-loader 将一个文件转换为base64格式 并注入到代码中

- 资源模块，通过添加4种新的模块类型，来替换所有这些loader
  - asset/resource 发送一个单独的文件并导出url， 类似于file-loader
  - asset/inline 导出 data URI , 类似于 url-loader
  - asset/source 导出资源的源代码，之前通过raw-loader来实现
  - asset 在导出一个data URI和发送一个单独文件之间自动选择，之前通过使用url-loader，并限制资源体积

```js
module.exports = {
    module: {
        rules: [{
            test: /\.png$/,
            type： 'asset/resource'
        }, {
            test: /\.png$/,
            type： 'asset/inline'
        }, {
            test: /\.png$/,
            type： 'asset/source'
        }]
    }
}
```

