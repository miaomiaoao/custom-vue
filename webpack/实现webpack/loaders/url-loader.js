const { getOptions, interpolateName } = require('loader-utils')
const mime = require('mime')
function loader(content) {
  let options = getOptions(this) || {}
  let { limit } = options

  if (limit) {
    limit = parseInt(limit, 10)
  }

  const mimeType = mime.getType(this.resourcePath)

  if (!limit || content.length < limit) {
    let base64 = `data:${mimeType};base64, ${content.toString('base64')}`;
    return `module.exports = ${JSON.stringify(base64)}`
  } else {
    return require('./file-loader').call(this, source)
  }
}
loader.raw = true
module.exports = loader