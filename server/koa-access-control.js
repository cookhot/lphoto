module.exports = async (ctx, next) => {
  // TODO 权限控制
  ctx.response.set('Access-Control-Allow-Origin', '*')
  await next()
}
