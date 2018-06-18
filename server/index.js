const Koa = require('koa2')
const router = require('koa-router')()
const fs = require('fs')
const path = require('path')

const socket = require('./socket')

const { saveImg, saveAvatar, getImgList } = require('./utils')

const multipart = require('./koa-multipart')
const accessControl = require('./koa-access-control')
const { addComment, getAllComment } = require('./sqlite/server')

const associate = require('./associate')

const app = new Koa()

app.use(accessControl)

app.use(multipart)

// TODO 使用缓存处理静态资源
app.use(require('koa-static')(path.resolve(__dirname,'static')))

router.get('/associate', async (ctx, next) => {
  const key = ctx.request.query ? ctx.request.query.key : ''
  const data = await associate(key)
  ctx.response.body = data
})

router.get('/img', async (ctx, next) => {
  const query = ctx.request.query

  const key = query.key
  if (!key) {
    ctx.response.status = 400
    ctx.response.body = '参数错误'
    return false
  }

  const page = query.page || 1
  const offset = (page - 1) * 20
  const response = await getImgList(key, offset)
  ctx.response.body = response.data
})

router.get('/getComment', async (ctx, next) => {
  const data = await getAllComment()
  ctx.response.body = data
})

const getComment = (params) => {
  return new Promise(async (resolve) => {
    let comment = null
    if (params && params.length) {
      comment = {}
      for (let param of params) {
        if (!param.type) {
          comment[ param.name ] = param.body.toString()
        } else if( param.type.indexOf('image') >= 0) {
          let files = comment['files'] ? comment['files'] : comment['files'] = []
          const file = `${Date.now()}.${param.type.slice(6)}`
          // TODO 处理异常
          await saveImg(file, param.body)
          files.push(file)
        }
      }
    }
    resolve(comment)
  })
}

/**
 * 评论数据
 */
router.post('/comment', async (ctx, next) => {
  let params = ctx.multipart
  const comment = await getComment(params)
  // TODO 反馈信息
  await addComment(comment)
  ctx.response.body = '保存成功'
})

/**
 * 提取头像
 */
router.post('/avatar', async(ctx, next) => {
  let param = ctx.multipart.length ? ctx.multipart[0] : null
  if (param) {

    console.log(param)
    const avatar = await saveAvatar(param.body, param.type.slice(6))
    ctx.response.body = avatar
  } else {
    ctx.response.status = 400
    ctx.response.body = '参数错误'
  }
})

app.use(router.routes())

app.listen(3000)
