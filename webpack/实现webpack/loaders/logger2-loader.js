function loader(sourceCode) {
  console.log('logger-loader2')
  return sourceCode + '//2'
}

module.exports = loader