// 计算响应时间
module.exports = async (ctx, next) => {
  const start = Date.now()

  await next()

  const end = Date.now()

  const duration = end - start
  // ctx.set 设置相应头
  ctx.set('X-Response-Time', duration + 'ms')
}