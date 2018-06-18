'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const { localIp } = require('../build/local')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HOST: `'${localIp}'`,
  IMG_SERVER_PATH: `"img"`,  // 图片地址
  AVATAR_SERVER_PATH: `"avatar"` // 头像地址
})
