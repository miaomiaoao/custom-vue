基础配置

## 文件入口、出口
```js
const path = require('path')

module.exports = {
  entry: './src/a.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  }
}
```
## webpack-dev-server

内部其实启动了一个express服务器

webpack.config.js

```js
module.exports = {
  devServer: {
    static: path.resolve(__dirname, 'public'),
    port: 8080,
    open: true // 是否自动打开
  }
}
```

package.json

```js
  "scripts": {
    "build": "webpack",
    "dev": "webpack serve"
  }
```

## plugin 

插件可以注入到每个环节，每个步骤中去，贯穿整个声明周期
### html文件
添加html文件，使打包后在html文件中可以直接引入打包后的js。
引入插件html-webpack-plugin,配置plugin

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/a.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  // ---------- 新增配置 ----------
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    })
  ]
}
```
## loader
loader让webpack能够处理其他类型的文件，并将它们转换为有效模块，以供应用程序使用，以及被添加到依赖图中

## css
  ### 解析css文件
  loader的解析是从从右到左,从下到上的解析
  ```js

  // 新建common.css文件,在js文件中引入css文件
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  module.exports = {
    mode: 'development',
    entry: './src/a.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build')
    },
    module: {
      // 添加loader解析css文件
      rules: [
        {
          test: /\.css$/ ,
          use: [
            'style-loader',
            'css-loader'
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html'
      })
    ]
  }
  ```

  ### 解析less
   ```js
    const path = require('path')
    const HtmlWebpackPlugin = require('html-webpack-plugin')

    module.exports = {
      mode: 'development',
      entry: './src/a.js',
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
      },
      module: {
        rules: [
          {
            test: /\.css$/ ,
            use: [
              'style-loader',
              'css-loader'
            ]
          },
          // 添加less-loader
          {
            test: /\.less$/,
            use: [
              'style-loader',
              'css-loader',
              'less-loader'
            ]
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          filename: 'index.html'
        })
      ]
    }
   ```
### less 和 sass原理

- less是一种动态的样式语言，使css变成一种动态语言，如变量、继承、运算、函数。less既可以在客户端运行，又可以在服务端运行

- sass是动态语言,sass里面的语法属于缩排语法，对比之前的css相比，多出了很多工鞥呢

- 预处理器。less和sass都属于预处理器，它会定义一种新的语言，其总体思想是为css增加一些编程的特性，将css作为目标生成文件

总体优点

  - 提供CSS缺失的样式层复用机制
  - 减少冗余代码
  - 提高样式代码的可维护性
  - 结构清晰，便于扩展可以方便的屏蔽浏览器私有的语法差异
  - 轻松实现多重继承，完全兼容了CSS代码，提高了开发效率。

  ### css打包

  此时css虽然样式会生效，但是不会生成一个单独的css文件
  style-loader是将生成的css文件插入到head中,我们现在需要生成单独的css文件，通过使用link标签，将css引入 

  添加min-css-extract-plugin插件

  style-loader就是将CSS转换成JS脚本，JS脚本的作用就是向页面中插入一个style标签，标签的
  内容就是CSS

  ```js
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')

  module.exports = {
    mode: 'development',
    entry: './src/a.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build')
    },
    module: {
      rules: [
        {
          test: /\.css$/ ,
          use: [
            // 使用mini-css-extract-plugin中的loader
            MiniCssExtractPlugin.loader,
            // 'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            // 'style-loader',
            'css-loader',
            'less-loader'
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html'
      }),
      // 生成css文件
      new MiniCssExtractPlugin({
        filename: 'main.css'
      })
    ]
  }
  ```

  ### css3自动加浏览器前缀
  安装插件postcss-loader autoprefixer
  新建postcss.config.js文件,配置

  postcss-preset-env 包含了autoprefixer 和 browsers选项	

  ```js
    const autoprefixer = require('autoprefixer')

    module.exports = {
      plugins: [autoprefixer]
    }
  ```

  webpack中配置
  ```js
    module.exports = {
      module: {
        rules: [
          {
            test: /\.less$/,
            use: [
              MiniCssExtractPlugin.loader,
              // 'style-loader',
              'css-loader',
              'postcss-loader',
              'less-loader'
            ]
          }
        ]
      }
    }
  ```

postcss-preset-env用法

```js
let postcssPresetEnv = require('postcss-preset-env')
module.exports = {
    plugins: [postcssPresetEnv({
        browsers: 'last 5 version'
    })]
}
```

  ### px自动转成rem

  lib-flexible + rem 实现移动端自适应
  px2rem-loader 自动将px转换为rem
  px2rem
  页面渲染时计算根元素的font-size值

```js
{
    loader: 'px2rem-loader',
    options: {
        remUnit: 75, // 规定一个rem的单位
        remPrecesion: 8 // 计算rem的精度，保留几位小数
    }
}
```

在html中加入如下代码

```js
let docElement = document.documentElement
function setRemUnit() {
    // 根元素的font-size值 = 屏幕宽度 / 10 如果屏幕宽度是750的话 750 / 10 = 75
    docElement.fontSize = docElement.clientWidth / 10 + 'px'
}
setRemUnit()
```




## 图片
项目中使用图片的方式:

1. html中使用img src

2. css

3. file-loader 解决css等文件中引入图片路径问题, 发送一个单独文件并导出url

4. url-loader 当图片小于limit的时候，会把图片BASE64编码，大于limit值的时候还是使用file-loader进行拷贝

   导出一个资源的 data URI

5. 在webpack5中 filer-loader url-loader html-loader已经废弃了，但是原理还是相同的 webpack5中用的是xxx-resource 
```js
module.exports = {
  module: {
    rules: [
      {
        test:/\.html$/,
        use:'html-withimg-loader'
      },
      // 生成一个新的文件名，拷贝到dist目录中去
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            esModule: false // 如果为true，default是它的地址，如果esModule为false的话直接返回地址
            name: '[hash:10].[ext]' // ext 原来的扩展名 hash取前十位
          }
        }
      },
      {
        test:/\.(png|jpg|gif)$/,
        // 做一个限制 当我们的图片 小于多少k的时候 用base64 来转化
        // 否则用file-loader产生真实的图片
        // 在webpack5中，打包时会读取dist目录的结构，如果内容没变化(比如图片未更新) 会直接读取缓存
        // 这个是webpack5的新特性，webpack5性能提升的关键就是靠这个缓存
        // webpack5比webpack4性能提升70% - 80% 性能提升很大
        use:{
          loader: 'url-loader',
          options:{
            limit: 8 * 1024, // 以8k为分界值
            outputPath:'/img/',
            publicPath:'http://www.zhufengpeixun.cn'
          }
        }
      },
    ]
  }
}
```

## es6或者更高级的语法转换成es5

babel 其实是一个编辑JS的平台，可以实现代码的转换ES6/ES7 转换为ES5

babel能够完成的工作

- 语法转换
- 通过polyfill方式在目标换进各种添加确实的特性(通过第三方引入polyfill模块，例如core-js)
- 源码转换(比如jsx等)

### 前置知识点

ES6中的语法分为 语法，api，原型上的方法

- 箭头函数，let、const 这种称之为语法
- api, Promise
- Array.prototype.includes 原型方法
- @babel/preset-env能够完成语法的转换，单对于一些api或者原型方法就需要借助polyfill

### plugin 和 preset

- preset就是plugin组成的合集，preset可以看做是一些plugin合成的包
- 常见的preset  @babel/preset-env  @babel/preset-react @babel/preset-typescript
- @babel/preset-env 仅仅针对语法阶段的转义，比如转义箭头函数，const/let语法。针对一些Api或者ES6内置模块的polyfill(垫片/ 补丁)，preset-env是无法进行转义的

### @babel/core

- @babel/core包括@babel/parse, @babel/transform, @babel/code-frame, @babel/generator @babel/traverse 这些包提供了更基础的ast能力
- **babel-loder仅仅能识别匹配文件和接收对应的参数，但是babel在编译过程中，实际上用到的是@babel/core 。按照什么规则转换，用到的是@babel/preset-env**



### @babel/ preset-env

Babel默认只转换新的最新ES语法，比如箭头函数

安装了babel @babel/core @babel/preset-env babel-loader  

@babel/core虽然可以识别JS代码，但是不知道如何转换。但是插件知道ES6语法很多，把识别ES6代码的插件打包，就形成了preset(预设)
```js
module.exports = {
  module: {
    rules: [
      {
        test:/\.js$/, // normal 普通的loader
        use:{
          loader:'babel-loader',
          options:{ // 用babel-loader 需要把es6-es5
            presets:[
              '@babel/preset-env'
            ],
            plugins:[
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }],
              "@babel/plugin-transform-runtime"
            ]
          }
        },
        include:path.resolve(__dirname,'src'),
        exclude:/node_modules/ 
      },
    ]
  }

}
```

### polyfill

#### @babel/polyfill

通过[babelPolyfill](https://link.juejin.cn?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fen%2Fbabel-polyfill)通过往全局对象上添加属性以及直接修改内置对象的`Prototype`上添加方法实现`polyfill`。

比如说我们需要支持`String.prototype.include`，在引入`babelPolyfill`这个包之后，它会在全局`String`的原型对象上添加`include`方法从而支持我们的`Js Api`。

我们说到这种方式本质上是往全局对象/内置对象上挂载属性，所以这种方式难免会造成全局污染。

 

babel-preset-env是支持polyfill的，但是需要将useBuiltIns配置成usage | entry参数

false, 表示不会引入polyfill, entry是全量引入，usage 是按需引入

```js
{
    presets: [
        [
            '@babel/preset-env': {
            	'useBuiltIns': false // 'usage | entry | false'
            }
        ]
    ]
}
```

**entry**

当传入entry时，需要我们再项目文件中手动引入一次core-js, 它会根据我们配置的浏览器兼容性列表(browserList)然后全量引入不兼容的polyfill

> 在babel 7.4.0之前，我们需要在入口文件引入@babel/polyfill；在babel 7.4.0之后，需要在入口文件引入"core-js/stable" 和  "regenerator-runtime/runtime"; 

```js
// 项目入口文件中需要额外引入polyfill
// core-js 2.0中是使用"@babel/polyfill" core-js3.0版本中变化成为了上边两个包
// 需要注意的是，我们使用useBuiltIns: entry/usage时，需要额外指定core-js这个参数
import "@babel/polyfill"

// babel
{
    "presets": [
        ["@babel/preset-env", {
            "useBuiltIns": "entry"
        }]
    ]
}
```

**usage**

上边我们说到配置为`entry`时，`perset-env`会全量引入polyfill，造成包体积变大，此时就引入出了我们的`useBuiltIns:usage`配置。

当我们配置`useBuiltIns:usage`时，会根据配置的浏览器兼容，以及代码中 **使用到的`Api` 进行引入`polyfill`按需添加**

当使用`usage`时，我们不需要额外在项目入口中引入`polyfill`了，它会根据我们项目中使用到的进行按需引入。

```js
// babel.config.json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": "3"
      }
    ]
  ]
}
```

- 在usage的情况下，如果我们存在很多个模块，那么会多出很多冗余代码(import语法)

####  @babel/runtime 和 @babel/plugin-transform-runtime

上边我们讲到`@babel/polyfill`是存在污染全局变量的副作用，在实现`polyfill`时`Babel`还提供了另外一种方式去让我们实现这功能，那就是`@babel/runtime`。

简单来讲，`@babel/runtime`更像是一种**按需加载的解决方案**，比如哪里需要使用到`Promise`，`@babel/runtime`就会在他的文件顶部添加`import promise from 'babel-runtime/core-js/promise'`。

同时上边我们讲到对于`preset-env`的`useBuintIns`配置项，我们的`polyfill`是`preset-env`帮我们智能引入。

而`babel-runtime`则会将引入方式由智能完全交由我们自己，我们需要什么自己引入什么。

它的用法很简单，只要我们去安装`npm install --save @babel/runtime`后，在需要使用对应的`polyfill`的地方去单独引入就可以了。比如：

```js
// a.js 中需要使用Promise 我们需要手动引入对应的运行时polyfill
import Promise from 'babel-runtime/core-js/promise'

const promsies = new Promise()
```

总而言之，`babel/runtime`你可以理解称为就是一个运行时“哪里需要引哪里”的工具库。

> 针对`babel/runtime`绝大多数情况下我们都会配合`@babel/plugin-transfrom-runtime`进行使用达到智能化`runtime`的`polyfill`引入。

##### `babel-runtime`存在的问题

- `babel-runtime`在我们手动引入一些`polyfill`的时候，它会给我们的代码中注入一些类似`_extend()， classCallCheck()`之类的工具函数，这些工具函数的代码会包含在编译后的每个文件中，比如：

```js
class Circle {}
// babel-runtime 编译Class需要借助_classCallCheck这个工具函数
function _classCallCheck(instance, Constructor) { //... } 
var Circle = function Circle() { _classCallCheck(this, Circle); };
复制代码
```

如果我们项目中存在多个文件使用了`class`，那么无疑在每个文件中注入这样一段冗余重复的工具函数将是一种灾难。
- 多个文件重复引入相同的helpers(帮助函数,比如多个文件都引入了promise) ->  提取时运行，产生冗余代码

所以针对上述提到的两个问题:

- `babel-runtime`无法做到智能化分析，需要我们手动引入。

- `babel-runtime`编译过程中会重复生成冗余代码，会在代码中注入一些类似_extend(), classCallCheck()之类的工具函数，这些工具函数的代码会包含在编译后的每一个文件夹比如,

  ```js
  class Circle()
  function _classCallcheck(instance, Constructor){}
  var Circle = function Circle() { __classCallback(this, Circle) }
  ```

  如果我们在项目里面使用了多个class，那么每个文件都要注入_classCallback

#### @babel/plugin-trasform-runtime

`@babel/plugin-transform-runtime`插件的作用恰恰就是为了解决上述我们提到的`run-time`存在的问题而提出的插件。

- `babel-runtime`无法做到智能化分析，需要我们手动引入。

`@babel/plugin-transform-runtime`插件会智能化的分析我们的项目中所使用到需要转译的`js`代码，从而实现模块化从`babel-runtime`中引入所需的`polyfill`实现。

- `babel-runtime`编译过程中会重复生成冗余代码。

`@babel/plugin-transform-runtime`插件提供了一个`helpers`参数。

- babel编译es6到es5的过程中，@babel/plugin-transform-runtime这个插件会自动polyfill es5不支持的特性，这个polyfill包就是在@babel/runtime这个包里(core-js, regenerator)等

这个`helpers`参数开启后可以将上边提到编译阶段重复的工具函数，比如`classCallCheck, extends`等代码转化称为`require`语句。此时，这些工具函数就不会重复的出现在使用中的模块中了。比如这样：

```js
// @babel/plugin-transform-runtime会将工具函数转化为require语句进行引入
// 而非runtime那样直接将工具模块代码注入到模块中
var _classCallCheck = require("@babel/runtime/helpers/classCallCheck"); 
var Circle = function Circle() { _classCallCheck(this, Circle); };
复制代码
```

##### 配置`@babel/plugin-transform-runtime`

这里为列一份目前它的默认配置:

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": false,
        "helpers": true,
        "regenerator": true,
        "version": "7.0.0-beta.0"
      }
    ]
  ]
}
复制代码
```

## 对比总结

我们知道，`@babel/polyfill`、`@babel/preset-env` 和 `@babel/runtime`、`@babel/plugin-transform-runtime` 都是用来引入`polyfill`的。那到底该怎么选择呢？

`@babel/polyfill`不用多说了，肯定不是首选，因为它全局引入，并且还会污染环境。

`@babel/preset-env`方案其实就是按需引入`@babel/polyfill`，所以它不会全局引入，但是它直接引入的`polyfill`会污染全局环境。

`@babel/runtime`和`@babel/plugin-transform-runtime`插件

优势就是

1. 抽离重复注入的 `helper` 代码，减少构建后包的体积。
2. 每次引入 `polyfill` 都会定义别名，所以不会污染全局。

缺点就是

1. 由于每次引入 `polyfill` 都会定义别名，所以会导致多个文件出现重复代码。

好了说了这么多，那到底该怎么选择

写类库的时候用runtime，系统项目还是用polyfill。写库使用 runtime 最安全，如果我们使用了 includes，但是我们的依赖库 B 也定义了这个函数，这时我们全局引入 polyfill 就会出问题：覆盖掉了依赖库 B 的 includes。如果用 runtime 就安全了，会默认创建一个沙盒,这种情况 Promise 尤其明显，很多库会依赖于 bluebird 或者其他的 Promise 实现,一般写库的时候不应该提供任何的 polyfill 方案，而是在使用手册中说明用到了哪些新特性，让使用者自己去 polyfill。

话说的已经很明白了，该用哪种形式是看项目类型了，不过通常对于一般业务项目来说，还是`plugin-transform-runtime`处理工具函数，`babel-polyfill`处理兼容。也就是说使用`@babel/preset-env`配置`usage`来按需引入`polyfill`，并配置`plugin-transform-runtime`来抽取公共方法减少代码整体体积。

### babel转换的原理

- 解析 parse: 首先将代码解析生成抽象语法树(ast), 即词法分析和语法分析的过程
- 转换transform: 对于ast树进行一些列的变换操作，babel接受得到AST并通过@babel/traverse对其进行遍历，在此过程中进行添加、更新以及移除的操作。或者说通过presets将ast转换为新的ast
- 生成Generate: 将变换后的AST再转换为JS代码，使用到的模块式babel-generator

### babel能转换一些新版本js没有的方法吗

不能，需要借助polyfill

### 现在最常用的babel转换方案 

preset-env + @babel/core

### babel转换class 是使用的什么方法

寄生组合继承


## libraryTarget在哪个环境运行 commonjs umd amd

webpack打包出来的chunk-vendors 一般都放一些第三方库


## 打包第三方库
### 直接引入

```js
import _ from 'lodash'
console.log(_.join(['a', 'b', 'c'], '@'))
```

### 插件引入

- webpack配置ProvidePlugin后，在使用时不再需要import和require进行引入，直接使用即可
- _函数会自动添加到当前模块的上下文，无需显示声明

```js
// 提供者插件 自动向每个模块注入_变量
new webpack.ProvidePlugin({
    _: 'lodash'
})
```

没有全局的$函数 如果在index.html 通过打印window._ 是获取不到lodash的

### expose-loader

- expose-loader

```js
{
    test: /lodash/,
    loader: 'expose-loader',
    options:{
        exposes: { // 会向全局对象上也就是window上挂变量 window._, 如果已经存在_ 重写它
            globalName: '_',
            override: true
        }
    }
}

// 还可以这样写
import $ from 'expose-loader?exposes=$,jquery!jquery'
```

path.resolve('lodash') // 只想找路径，不想执行，只加载它的话

require('lodash') // 是会执行的

### externals

通过cdn引入。相当于全局注入了这个变量，使用时又不想打包到源代码中

```js
<script src="xxxxx"></script>
// 外部依赖  模块名：全局变量名
// 如果你的jquery模块，可以找到window.jQuery,就不会打包
{
    externals: {
        jquery: 'jQuery'
    }
}
```

external 排除一些第三方模块，防止一些第三方库打包到bundle中

### html-webpack-externals-plugin(这个插件已经废弃了)

使用这个插件就不需要配置externals了，script脚本也不需要引入了

这个插件可以简化，引入脚本和配置externals的操作

```js
{
    new HtmlWebpackExternalsPlugin({
        externals: [
            {
                module: 'jquery', // 模块名
                entry: 'dist/jquery.min.js',
                global: 'jQuery'
            }
        ]
    })
}
```



## sourcemap

| 关键字     | 含义                                                         |
| ---------- | ------------------------------------------------------------ |
| eval       | 使用eval包裹代码块                                           |
| source-map | 产生.map文件                                                 |
| cheap      | 只包含行，不包含列信息(关于列信息的解释下面会有详细介绍)也不包含loader的sourcemap |
| module     | 包含loader的sourcemap（比如jsx to js， babel的sourcemap） 否则无法定义源文件 |
| inline     | 将.map作为Data URL嵌入，不生成单独的.map文件                 |

eval 为了方便缓存

new Function() 和 eval()的区别

new Function() 定义一个函数 eval()执行一段代码

webpack.config.js

```js
// 组合规则
// [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
module.exports = {
    devtool: 'source-map', // 单独在外部生成完整的sourcemap文件，并且在目标文件里建立关联，能提示错误代码的准确原始位置。最完整的，也是最慢的
    devtool: 'inline-source-map', // 以base64格式内联在打包后的文件中，内联构建速度快，也能提示错误代码的准确原始位置
    devtool: 'hidden-source-map', // 会在外部生成sourcemap，但是目标文件里没有建立关联(main.js没有到.map文件的映射信息)，不能提示错误代码的准确原始位置
    devtool: 'eval-source-map', // 会为每一个模块生成一个单独的sourcemap文件进行内联，并用eval执行
    devtool: 'nosources-source-map', // 也会在外部生成sourcemap文件，能找到原始代码位置，但源代码内容为空 
    devtool: 'cheap-module-eval-source-map',
    devtool: 'cheap-eval-source-map',
    devtool: 'eval',
    devtool: 'cheap-source-map', // 外部生成sourcemap文件，不包含列和loader的map
    devtool: 'cheap-module-source-map' // 外部生成sourcemap文件，不包含列的信息但包含loader的map
}
```



es6代码生成source-map的过程

- 首先es6代码会使用babel-loader转换为es5版本的代码(此过程会生成一个babel-souce-map)
- es5版本的代码经过webpack打包，生成main.js （此过程会生成一个webpack sourcemap）
- 上面说的包含loader的sourmap就是第一个生成的sourcemap

### sourcemap最佳事件

####    开发环境

- 开发环境对sourcemap的要求：速度快，调试更友好

- 速度快，推荐eval-cheap-source-map

- 调试更友好 cheap-module-source-map

- 这种选择 eval-source-map

  

  

#### 生产环境

- 首先排除inline和eval，因为一方面我们隐藏了源代码，另一方面要减少体积
- 友好调试  sourcemap > cheap-source-map > cheap-module-source-map > hidden-source-map/nosources-sourcemap
- hidden-source-map 或者 nosources-source-map
- nosources-source-map 只会显示具体行数以及查看源代码的错误栈，安全性比sourcemap搞



devtool: false 不生成sourcemap文件，也不会建立关联



## watch

当代码发生修改后可以自动重新编译

配置了devServer之后，不需要配置watch：true了 内置了

```js
module.exports = {
    // 默认false, 也就是不开启
    watch: true,
    watchOptions: {
        // 默认为空，不监听的文件或者文件夹，支持正则匹配
        ignored: /node_modules/,
        // 监听到变化后会等300ms再去执行，默认300ms, 类似防抖，300ms内又修改的话，
        aggregateTime: 300,
        
        // 轮询, 判断文件是否发生变化是通过不停的询问文件系统文件是否有变化实现的，默认每秒间1000次
        poll: 1000
    }
}
```

- webpack 定时获取文件的更新时间，并跟上次保存的事件进行比对，不一致就表示了变化，poll就用来配置每秒问多少次
- 当检测文件不再发生变化，会先缓存起来，等待一段时间后之后再通知监听者，这个等待时间通过aggregateTimeout配置
- webpack只会监听entry依赖的文件
- 我们需要尽可能减少需要监听的文件数量和检查频率，当然频率的降低会导致灵敏度下降



## 其他插件

### 添加图标或者商标

```js
new webpack.BannerPlugin('xxx')
```

### 拷贝静态文件

copy-webpack-plugin

```js
{
    new CopyWebpackPlugin({
        patterns: [
            from: path.resolve(__dirname, 'src/public'),
        	to: path.resolve(__diranme, 'dist/public')
        ]
    })
}
```

### 打包前清空目录

clean-webpack-plugin

```js
{
    new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['**/*'] // 把输出目录下的所有文件删除掉，指的是将dist目录全部清空之后，再重新生成
    })
}
```



## proxy

代理地址

```js
proxy: {
    '/api': '',
     // 或者写成
     '/api': {
         target: '',
         pathRewrite: {
             '^/api': ''
         }
     },
     before(app) {
         
     }
}
```

## webpack-dev-middleware

webpack-dev-middleware 就是在express中提供webpack-dev-server静态服务能力的一个中间件

- webpack-dev-server的好处是相对简单，直接安装依赖后执行命令即可。是自己启动了一个基于express的http服务器，并且能实现打包功能
- 而使用webpack-dev-middleware的好处是可以在既有的Express代码基础上快速添加webpack-dev-server的功能，同时利用express来根据需要添加更多的功能，如mock服务，代理api请求等
- webpack-dev-middleware 按照配置文件的要求打包项目，会提供打包后文件的访问服务

```js
let express = require('express')
let app = express()

const webpack = require('webpack')
const WebpackDevMiddleware = require('webpack-dev-middleware')
const webpackOptions = require('./webpack.config')

// compiler就是一个webpack实例，代表整个编译的任务 compiler.run()
const compiler = webpack(webpackOptions)
app.use(webpackDevMiddleware(compile, {}))

app.listen(3000)
```

## 三个hash值

- hash称为文件指纹，指文件打包后输出的文件名和后缀

- hash一般结合cdn缓存使用，通过webpack构建后，生成对应文件名自动带上对应的MD5值。如果文件内容改变的话，那么对应文件哈希值也会改变，对应html引用的URL地址也会改变，触发CDN服务器从源服务器上拉取对应数据，进而更新本地缓存



占位符

- ext 资源后缀名
- name 资源文件名
- path 文件的相对路径
- folder 文件所在的文件夹
- hash **每次webpack构建时生成一个唯一的hash值**，只要项目文件有修改，整个项目构建的hash值就会改变
- chunkhash  chunk，代码块，从入口出来，依赖的模块，依赖模块的依赖模块，组成了代码块， 根据chunk生成hash值，来源于同一个chunk，则hash值相同。不同的entry会生出不同的chunkhash
- contentHash 根据内容生成hash值，文件内容相同hash值相同
- hash chunkhash contenthash 从左到右  生成的效率越来越低，生成的成本越来越高
- 如果文件变化的概率特别小的话，选择contentHash



如果是单入口文件，hash值和chunkhash值相同。整个项目只有一chunk，一个chunk只有一个hash

### hash

```js
output: {
    path: resolve.path(__dirname, 'dist'), // 输出目录
    filename: '[hash:8].js' // 文件名
}
```



### chunkHash

如果是多入口的话，filename就不能够取hash了。打包会报错。两个入口各依赖一个模块，要使用chunkHash

```js
entry: {
    entry1: './src/entry.js',
    entry2: './src/entry2.js',
},
output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[chunkhash:8].js'
}
```



### contentHash 

根据内容生成hash，文件内容相同，hash值相同

​       

有两个入口

```js
entry： {
    main: './src/index.js',
    vendor: ['lodash']
}
```



## 压缩

  ### 压缩css

  webpack的内置插件只会压缩js，使用optimize-css-assets-webpack-plugin插件进行css压缩

### 压缩JS

如果mode 设置为production 这些压缩默认都启用了，不用自己配置

terser-webpack-plugin

```js
optimization: {
    minimize: true,
        minimizer: [
            new TerserPlugin()
        ]
}
```

### 压缩html

html-webpack-plugin里面有配置

### 压缩图片

image-webpack-loader对图片进行压缩和优化。这个方法很鸡肋。一般不用。一般都是压缩好了。

```js
{
    test: /\.(png|jpg)/,
    use: [
        'url-loader',
        {
        	loader: 'image-webpack-loader',
            options: {
                mozjpeg: {
                    progressive: true,
                    quality: 65
                },
                optipng: {
                    enabled: false
                },
                pngquant: {
                    quality: '65-90',
                    speed: 4
                }
            }
        }
    ]
}
```

## webpack的构建流程

- 初始化参数：从配置文件和shell语句中读取和合并参数，得出最终的参数
- 开始编译：上一步得到的参数初始化Compiler对象，加载所有配置的插件，执行compiler对象的run方法开始执行编译
- 确定入口：找到所有配置中的entry，找出所有的入口文件
- 编译模块：从入口文件出发，调用所有配置的loader对文件进行翻译，再找出模块依赖的模块，再递归步骤直到所有入口文件依赖的文件都经过了本步骤的处理
- 完成模块编译：经过上一步loader的编译，得到了每个模块之间被编译后的最终内容以及他们之间的依赖关系
- 输出资源：根据入口文件和模块之间的依赖关系，组件一个个包含多个模块的chunk，再把每个chunk转换成一个单独的文件，加入到输出列表，这步是可以修改输出内容的最后机会
- 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把内容写入到文件系统

## bundle， chunk， module的区别

- bundle是webpack 打包出来的文件
- chunk: 代码块，由多个模块组合而成，每个entry 会生成一个chunk
- module: 模块 webpack的世界里面，一切都是模块

## loader 和 plugin的区别

### 不同的作用

- webpack只能识别.js 和 .json文件，loader负责将其他格式的文件转换为.js 或者 .json文件
- plugin plugin主要是扩展了webpack的能力，让webpack更加的灵活。在webpack运行的生命周期中，会广播很多事件，plugin可以监听这些事件，在合适的时机通过webpack提供的api改变输出结果

### 不同的使用方法

- loader的用法 module.rules中配置，也就是说他作为模块的解析规则而存在。类型为数组，每一项都是一个Object, 里面描述了对于什么类型的文件(test)， 使用什么loader 和 参数(options)
- plugin在 plugins中单独配置，类型为数组，值为每个plugin的实例，参数都是通过构造函数传入的

## 常见的loader 和 plugin

### loader

scss-loader， less-loader， style-loader， css-loader

file-loader， url-loader， eslint-loader， expose-loader

vue-loader 

loader执行顺序，从右到左，从下到上，因为webpack选择了compose这样的函数式编程方式，

### plugin

definePlugin： 定义环境变量

html-webpack-plugin：简化html文件创建

copy-webpack-plugin: 复制文件到打包目录

clean-webpack-plugin: 清空打包目录

mini-css-extract-plugin: css提取到一个单独的文件

webpack-bundle-analyzer: 可视化webpack输出的文件体积

webpack-paraller-uglify-plugin: 多核压缩，提升压缩速度

## 怎么编写一个loader 或者 plugin

### loader

loader像一个翻译官，把督导的源文件内容转义为新的内容，每个loader通过链式操作，将源文件一步步翻译成想要的样子

编写loader遵循单一原则，每个loader只能做一种转义工作，每个loader拿到的是源文件的内容(source), 可以通过返回值的方式将处理后的内容输出，也可以通过调用this.callback()方法，将内容输出给webpack

还可以通过this.async()异步生成一个callback()函数，再用这个callback将处理后的内容输出。此外webpack还为开发者准备了loader-utilis ，loader-utils可以获取loader中的options配置

### plugin

监听生命周期......



loader 是一个函数， plugin 是一个类，提供了一个apply对象

## grunt,gulp, webpack, rollup, parcel 的区别
### grunt
- 自动化，运用配置的思想来写脚本，一切皆可配置
- 缺点，配置项太多，并且不同插件可能会有自己扩展字段
- 学习成本太高，运用的时候需要明白各种插件的配置规则和配合方式
### gulp
- 基于node的steam流打包
- 定位是基于任务流的自动化构建工具
- gulp是通过task对整个开发过程进行构建
优点
- 流式的写法简单直观
- API简单，代码少
- 易于学习和使用
- 适合多页面应用开发
缺点
- 异常处理比较麻烦
- 不适合单页或者自定义模块开发
- 打包比较弱，项目比较复杂就不太支持了
### webpack
- webpack是模块化的打包工具，通过loader转换，任何形式的资源都可以视作模块
- 还可以实现模块的按需加载，等到实际需要的时候再异步加载
- 它定位是模块打包器，而Gulp/Grunt属于构建工具
优点
- 可以模块化打包任何资源
- 适合任何模块系统
- 适合单页面应用
缺点
- 学习成本好，配置复杂
- 通过babel编译后的js代码打包体积过大
### rollup
- rollup是下一代ES6模块化工具，最大的亮点是利用ES6模块设计，利用tree-shaking生成更简单，更简洁的代码
- 一般而言，对于应用使用webpack，对于类库使用rollup(比较方便)
- 需要代码拆分(code splitting) 或者很多静态资源需要处理，再或者构建的项目需要引入很多commonjs模块的依赖时，使用webpack
- 代码库是基于es6模块的，而且希望代码能够被其他人直接使用，使用rollup
优点
- 标准化的格式es6来写代码，通过减少死代码尽可能来缩小包的体积
缺点
- 对代码拆分，静态资源，commonjs模块支持不好
### parcel
- parcel是快速、零配置的web应用程序打包器
- 目前parcel只能用来构建运行在浏览器中的网页，这也是它的出发点和专注点
```js
// 零配置，怎么执行的
script: {
  start: 'parcel src/index.html -p 8089'
}
```
优点：
- parcel内置了常见场景的构建方案及其依赖，无需再安装各种依赖
- parcel能以html为入口，自动检测和打包依赖资源
- parcel默认支持模块热替换，真正的开箱即用
缺点：
- 不支持sourcemap
- 不支持tree-shaking
- 配置不灵活