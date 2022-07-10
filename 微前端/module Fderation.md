### 动机
- Module Fedration的动机是可以与多个团队一起开发一个或者多个应用程序
- 应用程序可以分为较小的应用程序，可能是前端组件，例如Header 或者 Sidebar，也有可能是逻辑组件或业务组件
- 每个部分由独立团队开发
- 应用程序或其一部共享其他部分或者 库


### 模块联邦
- 使用别人的被称为主机，被别人使用的称为容器
  

### 配置代码
再具体的，可以去看webpack官方有关模块联邦的例子
```js
let DropDown = await import('./Dropdown')
```
```js
webpack.config.js
const ModuleFedrationPlugin = require('')

plugins: [
  new ModuleFedrationPlugin({
    name: 'teamb',
    filename: 'remoteEntry.js', // 生成的文件名
    // 可以用var，可以用umd
    library: { type: 'var', name: 'varTeamb' }, //teama加载teamb的时候
    // 加载的结果，其实就是得到了一个全局变量 window.varTeamb
    exposes: {
      './Dropdown': './src/Dropdown.js',
      './Button': './src/Button.js'
    },
    shared: ['vue'] // 如果对方共享的模块可以用，就用对方共享的，如果不能用就用自己的
  }),
  experiments: {
    topLevelAwait: true // 支持顶级await import  动态引入组件
  }
]
```