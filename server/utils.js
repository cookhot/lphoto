const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const Buffer = require('buffer').Buffer
const dev_config = require('../config/dev.env')
const axios = require('axios')
const baseUrl = 'https://m.baidu.com/sf/vsearch/image/search/wisejsonala'

const reg = /;\sname="([^"]*?)"(?:;\sfilename="([^"]*?)")?(?:\r\ncontent-type:\s([^\s]*))?/i

const IMG_PATH = 'static/' + JSON.parse(dev_config.IMG_SERVER_PATH)

const AVATAR_PATH = 'static/' + JSON.parse(dev_config.AVATAR_SERVER_PATH)

// 读取数据
const readFormData = (ctx) => {
  return new Promise((resolve) => {
    if (ctx.request.method.toLowerCase() === 'post') {
      const length = ctx.request.length
      let cLength = 0
      const data = Buffer.allocUnsafe(length)
      ctx.req.on('data', (chunk) => {
        data.fill(chunk, cLength)
        cLength += chunk.length
      })

      ctx.req.on('end', () => {
        resolve(data)
      })

    } else {
      resolve(null)
    }
  })
}

/**
 * 提取数据
 * @param buf
 */
const extract = module.exports.extract = (buf) => {
  // 获取名称
  const header = buf.slice(0, buf.indexOf('\r\n\r\n')).toString()
  const body = buf.slice(buf.indexOf('\r\n\r\n') + 4, buf.length - 2)

  let matchs = header.match(reg) || []
  let [, name, filename, type] = matchs

  return {name, type, filename, body}
}

module.exports.resolverFormData = async (ctx) => {
  // --boundary 表示分割
  const boundary = '--' + ctx.request.get('content-type').split('=')[1]

  // 获取流数据
  const data = await readFormData(ctx)

  let start = 0, end, buf, params = []

  do {
    start += boundary.length
    end = data.indexOf(boundary, start)
    if (end < 0) {
      break
    }
    buf = data.slice(start, end)
    // 提取数据
    params.push(extract(buf))
    start = end
  } while (end)

  return params
}

// 保存提交的图片
module.exports.saveImg = (file, buffer, src = IMG_PATH) => {
  return new Promise((resolve) => {
    fs.writeFile(path.resolve(__dirname, src, file), buffer, (err) => {
      if (err) throw err;
      resolve(file)
    })
  })
}

// 保存提交的头像
module.exports.saveAvatar = (buffer, type, src = AVATAR_PATH) => {
  const hash = crypto.createHash('md5')
  return new Promise((resolve) => {
    hash.update(buffer)
    const file = `${hash.digest('hex')}.${type}`
    fs.writeFile(path.resolve(__dirname, src, file), buffer, (err) => {
      if (err) throw err
      resolve(file)
    })
  })
}

module.exports.getImgList = (name, offset) => {
  return axios.get(baseUrl, {
    params: {
      tn: 'wisejsonala',
      ie: 'utf8',
      cur: 'result',
      'fromsf': 1,
      'word': name,
      'pn': offset,
      'rn': 30,
      'gsm': '5a'
    },
    headers: {
      host: 'm.baidu.com'
    }
  })
}



