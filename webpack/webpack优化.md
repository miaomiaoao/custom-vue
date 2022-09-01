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

## webpack实现按需引入和路由懒加载的原理

为什么要使用按需加载，因为vue这种单页面的应用，打包后的文件会非常大。需要再运行时加载去减少首屏加载的文件数量已经体积

首选我们需要了解一个概念，就是require是运行时才会去加载的， import是编译的时候调用的；

[具体文章](https://juejin.cn/post/6847902223629090824#heading-28)

- 主要的步骤就是，通过babel-plugin-component插件，将import elementUI from 'element-ui' 等引入语句转换为ast树
- 去处理ast树上的节点信息，通过转换，将import 转换为require 并去引入对应的css
- 再生成最终的代码
- 需要一个visitor函数，作为plugin的入口

## cdn
- html不缓存
- 资源文件(js css图片) 文件 + hash，缓存
- 为了并行加载，把静态资源分散到不同的域名上去
- 静态资源分散到不同的域名上去，域名解析需要花时间，所以`dns-prefetch` 域名预解析
内容分发，分发到全国各地的服务器，然后就近选择服务器加载

## tree-shaking
- 一个模块的可以用多个方法，只要其中某个方法被使用到了，则整个文件就会被打包到bundle中去，tree-shaking就是只把用到的方法打入bundle，没有用到的方法会uglify阶段擦除掉
- 原理是利用es6模块的特点，只能作为顶层语句出现，import的模块名只能是字符串常量
- 现在tree-shaking不需要去配置了 webpack默认支持
- tree-shaking的原理是基于ES module规范的Dead Code Elimination技术，它会在运行过程中静态分析模块之间的导入导出，确定ESM 模块中哪些导出的值未曾被其他模块使用过，并将其删除，以此来实现打包产物的优化
- tree-shaking 较早是右rollup实现的，自webpack开始接入
- 自己引入的第三方模块不支持tree-shaking的效果吗?


tree-shaking 就是指将未引用的代码删除，减小代码体积，提高性能

最早做tree-shaking的是rollup  webpack 是在 webpack2自后才引入的tree-shaking

webpack做tree-shaking需要满足，模块必须是es-module  因为esm是静态的，依赖关系在编译时就确定了  commonjs是运行时才加载的

为什么有些时候使用babel tree-shaking会失效呢
因为babel-loader 默认将模块转换为cjs 需要配置 modules:false 才不会把esm模块的转换为cjs


terser-webpack-plugin 是一个用于ES6+的javasccript解析器和压缩工具

为什么不使用uglify了 因为uglify不再进行维护且不支持ES6+语法，webpack已经默认内置了terser插件实现代码压缩

webpack4中可以通过配置TerserWebpackPlugin插件，webpack5已内置


tree-shaking的原理
1. 程序会从入口文件出发，去扫描所有的依赖模块，以及模块的子依赖，生成ast语法树
2. 分析代码，查看哪些代码是用到过的，哪些代码是没有用到过的做好标记
3. 摇落没有用到的代码，经过这样的过程，没有用到的代码就被去除了
4. 重新生成代码


tree-shaking 和 sideEffects
sideEffects(副作用) 定义是在导入时会执行特殊行为的代码，而不是仅仅暴露一个export或多个export


webpack4 新增了一个sideEffects特性，通过给package.json 中加入sideEffects: false 声明该包是否包含副作用，从而可以为tree-shaking提供更大的优化空间


副作用的代码看一下掘金的文档


## 代码分割
- webpack可以将你的代码库分割成chunks语块，当代码运行到需要它的时候再加载
  ### 入口点分割
  - entry points: 入口文件设置的时候可以配置
  - 这种方法的问题
    - 如果多个入口chunks之间包含重复的lodash，那么重复模块都会被引入到各个bundle中
    - 不够灵活，并且不能将核心应用程序逻辑急性动态代码拆分
  ```js
    entry: {
      page1: '',
      page2: ''
    }
  ```
  ### 动态导入和懒加载

  ### preload
  - 预先加载
  - preload通常用于本页面要用到的关键资源，包括js、字体、css
  - preload将会把资源的下载顺序权重提高，使得关键数据提前下载好，优化页面打开速度
  - 在资源添加预先加载的注释，你指明该模块需要立即被使用
  - 异步加载的核心是因为在网络中的优先级最低
  ```js
    <link ref="preload" as="script" href="utils.js">
  ```
  webpack模板注释，webpack可以解析
  ```js
    import(/* webpackPreload: true */ './title').then(res => {

    })
  ```
  ### prefetch
  prefetch跟preload不同，它的作用是告诉浏览器未来可能会使用得到的某个资源，浏览器空闲时去加载对应的资源，若能预测到用户的行为，比如懒加载，点击到其他页面等则相当于提前预加载了需要的资源
  比如懒加载就可以使用prefetch
  
  ```js
    <link ref="prefetch" href="utils.js" as="script">
  ```
  
  preload 和 prefetch的区别
  - preload告诉浏览器我肯定马上用到某个资源，浏览器会提升加载优先级为high
  - prefetch告诉浏览器我未来可能会用到某个资源，浏览器会以一个非常低的优先级lowest，在自己空闲的时候去加载这个资源
  - preload不要轻易用，会阻塞加载过程
 ## 提取公共代码
 - 大网站有多个页面，每个页面由于采用相同技术栈和样式代码，会包含很多公共代码，如果都包含进来会有问题
 - 相同的资源被重复的加载，浪费用户的流量和服务器的成本
 - 每个页面都需要加载的资源太大，导致网页首屏加载缓慢，影响用户体验
 - 如果能把公共代码抽离成单独文件进行加载，可以减少网络传输流量，减低服务器成本
 ### 如何提取
  - 基础类库，方便长期缓存
  - 页面之间的公共代码
  - 各个页面单独生成文件
 ### splitChunks
 之前有个插件叫common-plugin 但是废掉了，webpack4 和 webpack5 之后都用split-chunk-plugin
 ### module chunk bundle
 - module: webpack 中一切皆模块，就是js的模块化，webpack支持commonjs，es6等模块化规范，简单来说就是可以通过import语句引入的代码
 - chunk： 代码块, chunk是webpack根据功能拆分出来的，包含三种情况
   - 你的项目入口(entry)
   - 通过import()动态引入的代码
   - 通过splitChunks拆分的代码
 - bundle: 打包后输出的文件，一般与chunk是一对一的关系，bundle就是对chunk进行编译压缩打包等处理之后的产出
### 代码分割的规则
- 提取第三方模块 jquery lodash
- 提取多个页面共享的公共模块
```js
optimization: {
  splitChunks: {
    chunks: 'all', // 应用于哪些情况 initial/async/all  all = async + initial
    miniSize: 0, // 分割出去的代码块最小的尺寸多大，默认是30k， 0 就是不限制，只要符合分割的要求就会分割
    minChunks: 2, // 如果一个模块被多少个入口引入了多少次才会分割
    maxAsyncSize: 3, // 限制异步模块内部并行加载的最大请求数，说白了就是每个import()里面最大的请求数
    maxInitialSize: 5, // 最大同步模块请求树
    name: false, // 打包后的名称，默认规则是 分割名称~
    automaticNameDelimiter: '~', // 分割符
    cacheGroups: { // 缓存组,里面的配置会覆盖外面的配置
      // 设置缓存组用来抽取满足不同规则的chunk
      vendors: { // 第三方
        chunks: 'all',
        test: /node_modules/, // 如果这个模块request路径里面包含node_modules
        priority: -10, // 为什么是负数？因为webpack中有默认缓存组，优先级为0。如果你想你的优先级大于默认缓存组，可以用正数，比它低可以用负数
      },
      default: {
        chunks: 'all',
        minSize: 0,
        minChunk: 2,
        priority: -20
      }
      // 有一些模块，比如说jquery，可能会同属于vendors 和 default两个缓存组(即属于node_modules, 又在普通模块中引入)，那么可以给缓存组一个权重
    }
  }
}
```
## 使用缓存
- babel-loader开启缓存
- 使用cache-loader
  ### babel-loader
  babel-loader在转义的过程中消耗性能比较高，使用babel-loader将结果缓存起来，当重新打包构建的时候会尝试读取缓存，从而提高打包构建速度，降低消耗
  ```js
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [{
      loader: 'babel-loader',13 8
      9
      options: {
        cacheDirectory: true // 启用缓存
      }
    }]
  }
  ```
  ### cache-loader
  - 在一些性能开销交大的loader之前添加此loader，以将结果缓存到磁盘里
  - 存和读取这些缓存文件会有一些时间开销，所以请只对性能开销较大的loader使用此loader
  - webpack5相对于webpack4，首次启动时间可能会快80%


## 按需加载(懒加载)原理
动态代码拆分，webpack提供了两个类似的技术，对于动态导入，使用 import() 或者使用webpack特定的 require.ensure
webpack在编译后会将路由组件的代码分割成一个个js文件，初始化时不会加载这些js文件，当激活路由后，组件才会去加载对应的js文件

怎么实现的按路由分割代码，webpack怎么在编译之后按需加载的路由组件js文件

如果我们使用import 动态的去加载的话，bundle.js中被替换成了webpack_require.e

webpack_require.e 中做了什么呢
1. 通过JSONP异步加载代码块，取回来之后，需要把模块定义合并到modules对象上
2. 再通过require.js去加载对应的js模块 加载完成后传递结果

会创建一个script标签，利用script标签的src属性去加载js(JSONP)


## dll 动态链接库
- dll 和 dlReferencePlugin 提供了拆分包的方法，极大的提高了构建时的性能。DLL代表动态链接库
- .dll为后缀的文件称为动态链接库，在一个动态链接库中可以包含给其他模块调用的函数和数据

web项目接入动态链接库的思想
- 把网页依赖的基础模块抽离出来，打包到一个个单独的动态链接库中，一个动态链接库可以包含多个模块
- 当需要导入的模块存在某个动态链接库时，这个模块不能再次被打包，而是动态的去动态链接库中获取
- 页面所依赖的所有动态链接库都需要被加载

为什么web项目接入动态链接库后，构建的速度会提升
- 包含大量复用模块的动态链接库只需要编译一次，在之后的构建过程中，被包含动态链接库的模块不会再被重复编译而是直接使用动态链接库的代码
- 由于动态链接库包含的大多是常用的第三方模块， 例如vue vue-router vuex 只要不升级这些模块的版本，动态链接库就不需要重新编译了
webpack接入动态链接库，webpack内置了动态练就的支持，需要通过两个内置的插件接入：
- DllPlugin插件：用于打包 一个个单独的动态链接库文件
- DllReferencePlugin插件：用于在主要配置文件中去引入DllPlugin插件打包好的动态链接库文件

## happypack
- node.js是单线程的，也就是说webpack处理任务需要一件件处理，不能并发进行
- happypack能让webpack将任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程
## scope hoisting
scope hoisting可以让webpack打包出来的代码文件更小、运行的更快，它又叫做作用域提升，是在webpack3推出的新功能
- scope hoisting的实现原理，分析出模块之间的依赖关系，尽可能的把打散的模块合并到一个函数中去，但是前提是不能造成代码冗余。因此只有那些被引用了一次的模块才能合并
- 由于scope hoisting需要分析模块之间的依赖关系，因此源码必须采用esm，不然无法生效。
```js
// 源文件
export default 'Hello,Webpack';
// main.js
import str from './util.js';
console.log(str);


// 未开启scope hoisting
[
  (function (module, __webpack_exports__, __webpack_require__) {
    var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(1);
    console.log(__WEBPACK_IMPORTED_MODULE_0__util_js__["a"]);
  }),
  (function (module, __webpack_exports__, __webpack_require__) {
    __webpack_exports__["a"] = ('Hello,Webpack');
  })
]

// 开启scope hoisting
[
  (function (module, __webpack_exports__, __webpack_require__) {
    var util = ('Hello,Webpack');
    console.log(util);
  })
]
```

使用scope hoisting
要在 Webpack 中使用 Scope Hoisting 非常简单，因为这是 Webpack 内置的功能，只需要配置一个插件，相关代码如下：
```js
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');

module.exports = {
  plugins: [
    // 开启 Scope Hoisting
    new ModuleConcatenationPlugin(),
  ],
};
```

同时，考虑到 Scope Hoisting 依赖源码需采用 ES6 模块化语法，还需要配置 mainFields。 原因在 4-10 使用 TreeShaking 中提到过：因为大部分 Npm 中的第三方库采用了 CommonJS 语法，但部分库会同时提供 ES6 模块化的代码，为了充分发挥 Scope Hoisting 的作用，需要增加以下配置：
```js
module.exports = {
  resolve: {
    // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
    mainFields: ['jsnext:main', 'browser', 'main']
  },
};
```