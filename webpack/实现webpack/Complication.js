const path = require('path')
const fs = require('fs')
const types = require('babel-types')
// 源代码生成语法树
const parser = require('@babel/parser')
// 遍历语法树
const traverse = require('@babel/traverse').default
// 根据语法树生成新的代码
const generator = require('@babel/generator').default

const baseDir = toUnitPath(process.cwd())
// 默认是\ 转换为/
function toUnitPath(path) {
  return path.replace(/\\g/, '/')
}

class Complication {
  constructor(options) {
    this.options = options
    this.entries = [] // 存放所有的入口
    this.modules = []
    this.chunks = []
    this.assets = []
    this.files = []
  }
  build(callback) {
    // 5. 根据配置中的entry找到入口文件
    let entry = {}
    if (typeof this.options.entry === 'string') {
      entry.main = this.options.entry
    } else {
      entry = this.options.entry
    }
    // entry = { entry1: './src/entry1.js', entry2: './src/entry2.js' }
    for (let entryName in entry) {
      // 获取entry1的绝对路径
      let entryFilePath = path.join(this.options.context, entry[entryName])
      // 6. 从入口文件触发，调用所有配置的Loader对模块进行编译
      let entryModule = this.buildModule(entryName, entryFilePath)
      this.modules.push(entryModule)

     
      // 8. 根据入口和模块之间的依赖关系，组成一个个包含多个模块的chunk
      let chunk = { name: entryName, entryModule, modules: this.modules.filter(item => item.name === entryName)}

      this.entries.push(chunk)
      this.chunks.push(chunk)
    }

     // 9. 再把每个chunk转换成一个单独的文件加入到输出列表
    this.chunks.forEach(chunk => {
      let filename = this.options.output.filename.replace('[name]', chunk.name)
      // this.assets 就是输出列表，key是输出的文件名  值是输出内容
      this.assets[filename] = getSource(chunk)
    })

    // 10. 在确定好输出内容后，根据配置确定输出的文件路径，把文件内容写入到文件系统
    this.files = Object.keys(this.assets)
    for(let file in this.assets) {
      let filePath = path.join(this.options.output.path, filename)
      fs.writeFileSync(filePath, this.assets[filename], 'utf8')
    }

    callback(null, {
      toJson:() => {
        return {
          entries: this.entries,
          chunks: this.chunks,
          modules: this.modules,
          files: this.files,
          assets: this.assets
        }
      }
    })
    
  }
  // name: 名称，modulePath: 模块的绝对路径
  buildModule(name, modulePath) {
    // 读取文件模块内容
    let sourceCode = fs.readFileSync(modulePath, 'utf8')

    let rules = this.options.module.rules

    let loaders = [] // 寻找匹配的loader信息
    // 如果正则和模块的规则是否匹配
    for (let i = 0; i < rules.length;i++) {
      if (rules[i].test.test(modulePath)) {
        // 这里最后会是所有匹配的loader
        loaders = [...loaders, ...rules[i].use]
      }
    }

    for (let i = loaders.length -1; i >= 0; i--) {
      let loader = loaders[i]
      sourceCode = require(loader)(sourceCode)
    }
    // 等价于上面的代码，从右往左做处理
    // sourceCode = sourceCode.reduceRight((sourceCode, loader) => {
    //   return require(loader)(sourceCode)
    // }, sourceCode)
    // 7. 再找出该模块依赖的模块
    // 当前模块的模块id
    let moduleId = './' + path.posix.relative(baseDir, modulePath)
    let module = {id: moduleId, dependencies: [], name }
    let ast = parser.parse(sourceCode, {sourceType: 'module'})
    traverse(ast, {
      CallExpression: (({node}) => {
        if (node.callee.name == 'require') {
          let moduleName = node.arguments[0].value // title1
          let dirname = path.posix.dirname(modulePath) // 获取当前模块的所在目录
          
          let depModulePath = path.posix.join(dirname, moduleName)
          let extensions = this.options.resolve.extensions
          // 这里已经包含了扩展名了
          depModulePath = tryExtensions(depModulePath, extensions) 
          // 拿到依赖的模块id， 模块id就是相对于项目根目录的相对路径
          let depModuleId = './' + path.posix.relative(baseDir, depModulePath);
          
          // 从 require('./title1') 变为 require('./src/title1.js')
          node.arguments = [types.stringLiteral(depModuleId)]
          // 模块去重，已经引用过的，不再引用
          let alreadyImportedModulesId = Array.from(this.modules.map(item => item.id))
          if (!alreadyImportedModulesId) {
            // 依赖的模块绝对路径放在当前的模块的依赖数组里面
            module.dependencies.push(depModulePath)
          }
        }
      })
    })
    let { code } = generator(ast)
    module._source = code // 将模块的源代码指向语法树转换后的新生成的源代码

    // 7. 再找出该模块的依赖模块，再递归本步骤知道所有入口依赖的文件都经过了本步骤的处理
    module.dependencies.forEach(dependency => {
      let dependencyModule = this.buildModule(name, dependency)
      this.modules.push(dependencyModule)

    })

    return module
  }

}


function getSource(chunk) {
  return 'chunk'
}

function tryExtensions(modulePath, extensions) {
  extensions.unshift('')
  for (let i = 0; i < extensions.length; i++) {
    let filePath = path.posix.join(modulePath, extensions[i])
    if (fs.existsSync(filePath)) {
      return filePath
    }
  }
  throw new Error('Module not found')
}
module.exports = Complication