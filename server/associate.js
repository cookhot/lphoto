const JSONP = require('node-jsonp')
const baseUrl = 'http://nssug.baidu.com/su'

const _default = {
  _:	Date.now(),
  ie:	'utf-8',
  prod:	'image',
  wd:	'y'
}

module.exports = (str) => {
  return new Promise((resolve) => {
    const param = Object.assign({}, _default, { wd: str })
    JSONP(baseUrl, param, 'cb', function (json) {
      resolve(json)
    })
  })
}
