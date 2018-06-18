const { resolverFormData } = require('./utils')

// 处理multipart/form-data 数据
module.exports = async (ctx, next)=> {
  if (ctx.request.type === 'multipart/form-data') {
    const multipart = await resolverFormData(ctx)
    ctx.multipart = multipart
  }
  await next()
}



