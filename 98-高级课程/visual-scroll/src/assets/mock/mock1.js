const Mock = require('mockjs');
const Random = Mock.Random;

const express = require('express');
const app = express();
//允许跨域请求返回数据
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// 获取 mock 数据
function getDataList(num) {
  let mockData = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    [`list|${num}`]: [{
      // 模拟 ID，自增方式追加
      'id|+1': 1,
      title: "@ctitle(1,5)",
      // 模拟发布时间，时间格式
      date:"@date('yyyy-MM-dd')",
      [`data|1-5`]: [{
        // 模拟 ID，自增方式追加
        'id|+1': 1,
        // 模拟标题，中文字符串长度为 20 位到 30 位
        title: "@ctitle(15,25)",
        // 模拟图片 100X100
        image: Random.image('100x100', '#4A7BF7', Random.csentence(3, 5)),
        // 模拟访问人数，自然数从 0 到 99999
        reads: "@natural(0,99999)",
        // 模拟新闻来源，中文字符串长度为 3 到 10 位
        from: "@ctitle(3,7)",
      }]
    }]
  })
  return mockData
}
app.get('/data', (req, res) => {
  const { num } = req.query;
  console.log(req.query)
  res.send(getDataList(num))
})
// app.listen(7788);
// console.log('app is running');//设置端口并打印对应调用结果
const server = app.listen(4000, function () {
  console.log("本地mock服务启动，接口地址为：http://localhost:4000/data?num=请求列表数量");
})