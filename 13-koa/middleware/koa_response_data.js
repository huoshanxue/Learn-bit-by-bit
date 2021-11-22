// 处理业务逻辑，读取文件
const path = require('path')
const { getFileJsonData } = require('../utils/file_utils')
module.exports = async (ctx, next) => {
  const url = ctx.request.url // /api/seller  ../data/seller.json
  let filePath = url.replace('/api', '')
  filePath = '../data' + filePath + '.json'
  filePath = path.join(__dirname, filePath)
  try {
    let data = await getFileJsonData(filePath)
    ctx.response.body = data
  } catch(error) {
    const errMsg = {
      message: '读取错误',
      status: 404
    }
    ctx.response.body = JSON.stringify(errMsg)
  }
  await next()
}