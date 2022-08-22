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

#### preset-env

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

## less 和 sass原理

- less是一种动态的样式语言，使css变成一种动态语言，如变量、继承、运算、函数。less既可以在客户端运行，又可以在服务端运行

- sass是动态语言,sass里面的语法属于缩排语法，对比之前的css相比，多出了很多工鞥呢

- 预处理器。less和sass都属于预处理器，它会定义一种新的语言，其总体思想是为css增加一些编程的特性，将css作为目标生成文件

总体优点
  - 提供CSS缺失的样式层复用机制
  - 减少冗余代码
  - 提高样式代码的可维护性
  - 结构清晰，便于扩展可以方便的屏蔽浏览器私有的语法差异
  - 轻松实现多重继承，完全兼容了CSS代码，提高了开发效率。


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

- 首先排除内联，因为一方面我们隐藏了源代码，另一方面要减少体积

- 友好调试  sourcemap > cheap-source-map > cheap-module-source-map > hidden-source-map/nosources-sourcemap

- 要想速度快，优先选择cheap

- 这种选择 hidden-source-map





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
- hash **每次webpack构建时生成一个唯一的hash值**
- chunkhash  chunk，代码块，从入口出来，依赖的模块，依赖模块的依赖模块，组成了代码块， 根据chunk生成hash值，来源于同一个chunk，则hash值相同
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

