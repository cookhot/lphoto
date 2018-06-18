'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const { getLocalIp } = require('../build/local')

const local_ip = getLocalIp()['en0:1']

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  LOCAL_IP: `'${local_ip}'`,
  IMG_SERVER_PATH: `"img"`,  // 图片地址
  AVATAR_SERVER_PATH: `"avatar"` // 头像地址
})
