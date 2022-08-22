function loader(sourceCode) {
  console.log('logger1-loader')
  return sourceCode + '//1'
}

module.exports = loader