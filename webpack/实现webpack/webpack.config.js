const path = require('path')
const RunPlugin = require('./plugins/run-plugin')
module.exports = {
  mode: 'production',
  devtool: false,
  context: process.cwd(), // 上下文目录, ./src . 默认代表根目录 默认值其实就是当前命令
  // 执行时所在的目录
  entry: {
    entry1: './src/entry1.js',
    entry2: './src/entry2.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  resolveLoaders: {
    alias: {
      modules: [path.resolve('./loaders'), 'node_modules']
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          path.resolve(__dirname, 'loaders', 'logger1-loader.js'),
          path.resolve(__dirname, 'loaders', 'logger2-loader.js')
        ]
      },
      {
        test: /\.(png|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              filename: '[hash].[ext]',
              limit: 8 * 1024,
              // 字节大小
              fallback: resolve('./loaders/file-loader.js')
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new RunPlugin()
  ]
}