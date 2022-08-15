let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCss = require('optimize-css-assets-webpack-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let webpack = require('webpack');
module.exports = {
  optimization:{ // 优化项
    minimizer:[
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true 
      }),
      new OptimizeCss()
    ]
  },
  mode: 'development', 
  entry: './src/index.js',
  // 多入口
  // entry: {
  //   home: '',
  //   other: ''
  // },
  // [name]代表 home | other
  // output: {
  //   filename: '[name].js'
  // },
  output: {
    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'build'),
    // publicPath:'http://www.zhufengpeixun.cn'
  },
  devtool: 'source-map', // 增加映射文件  可以帮我们调试源代码
  // devtool: 'eval-source-map', // 不会产生单独的文件，但是可以显示行和列
  // devtool: 'cheap-module-souce-map' // 不会产生列 但是是一个单独的映射文件 产生后你可以保留起来，用来调试
  // devtool: 'cheap-module-eval-source-map', 不会产生文件，集成在打包后的文件中 不会产生列
  plugins: [
    // 如果是多页面的情况下, 需要new两次htmlwebpackplugin插件
    new HtmlWebpackPlugin({ // htmlWebpackPlugin 打包后，会自动把打包文件添加到html文件中
      template: './src/index.html',
      filename: 'index.html',
    }),
    // 如果是多页面的情况下，需要new两次htmlwebpack plugin插件
    // new HtmlWebpackPlugin({
    //   template: './index.html',
    //   filename: 'home.html',
    //   chunks: ['home'], // 代码块
    // }),

    // new HtmlWebpackPlugin({
    //   template: './index.html',
    //   filename: 'other.html',
    //   chunks: ['other'] // 代码块
    // })
    // mini-css-extract-plugin 将css文件单独打包到一个文件中,设置文件名
    new MiniCssExtractPlugin({
      filename:'css/main.css'
    }),
    // 在每个模块中都注入$
    new webpack.ProvidePlugin({
      '$': 'jquery'
    }),
    // 运行本质是在编译的时候一个纯的字符串替换，浏览器并不会定义任何一个变量
    // 通过DefinePlugin 插件定义的变量，可以在模块内任何位置获取到变量，不能在node中获取变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV2': JSON.stringify('development')
    })
   
  ],
  externals: {
    jquery: "$"
  },
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
            outputPath:'/img/', // 打包之后去哪个路径下
            publicPath:'http://www.zhufengpeixun.cn'
          }
        }
      },
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
      {
        test: /\.css$/, 
        use: [
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', 
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  }
}