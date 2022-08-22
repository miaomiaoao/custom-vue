let { SyncHook } = require('tapable')
let fs = require('fs')
let Complication = require('./Complication')
class Compiler {
  constructor(options) {
    this.options = options
    this.hooks = {
      run: new SyncHook(), // 开始启动编译
      emit: new SyncHook(), // 开始写入文件的时候触发
      done: new SyncHook(), // 在完成编译的时候触发 全部完成
    }
  }

  // 4. 执行compiler对下行的run方法开始编译
  run(callback) {
    this.hooks.run.call() // 触发run钩子
    // 5. 根据配置文件中的entry找到入口文件
    this.compile(callback)
    // 监听入口文件变化，文件变化，重新开始编译
    Object.values(this.options.entry).forEach(entry => {
      fs.watchFile(entry, () => this.compile(callback))
    })
    this.hooks.done.call() // 编译之后触发done钩子
    callback(null, {
      toJson() {
        return {
          files: [],
          assets: [],
          chunk: [],
          module: [],
          entries: []
        }
      }
    })
  }

  compile(callback) {
    let complication = new Complication(this.options)
    complication.build(callback)
  }
}

module.exports = Compiler