# 基础配置

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

## html文件
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

  ### 压缩css

  webpack的内置插件只会压缩js，使用optimize-css-assets-webpack-plugin插件进行css压缩

  ### css3自动加浏览器前缀
  安装插件postcss-loader autoprefixer
  新建postcss.config.js文件,配置
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
  

## 图片
项目中使用图片的方式:
1. html中使用img src
2. css

```js
module.exports = {
  module: {
    rules: [
      {
        test:/\.html$/,
        use:'html-withimg-loader'
      },
      {
        test:/\.(png|jpg|gif)$/,
        // 做一个限制 当我们的图片 小于多少k的时候 用base64 来转化
        // 否则用file-loader产生真实的图片
        use:{
          loader: 'url-loader',
          options:{
            limit:1,
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
安装了babel @babel/core @babel/preset-env babel-loader
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


## external 
排除一些第三方模块，防止一些第三方库打包到bundle中