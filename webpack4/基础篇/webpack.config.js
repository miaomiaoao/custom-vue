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
  output: {
    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'build'),
    // publicPath:'http://www.zhufengpeixun.cn'
  },
  plugins: [
    new HtmlWebpackPlugin({ // htmlWebpackPlugin 打包后，会自动把打包文件添加到html文件中
      template: './src/index.html',
      filename: 'index.html',
    }),
    // mini-css-extract-plugin 将css文件单独打包到一个文件中,设置文件名
    new MiniCssExtractPlugin({
      filename:'css/main.css'
    }),
   
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
            outputPath:'/img/',
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