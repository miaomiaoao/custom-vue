class Complication {
  build() {
    console.log('编译一次')
  }
}

class Compiler {
  run() {
    this.compile() // 开始编译
    // 每次index.js改变，都会触发一次新的编译
    fs.watchFile('./index.js', () => {
      this.compile()
    })
  }
  compile() {
    let complication = new Complication()
    complication.build()
  }
}

let compiler = new Compiler()
compiler.run()