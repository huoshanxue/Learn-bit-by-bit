## 安装

```shell
npm install koa
```

## 基础使用

```js
// 1. 创建koa 对象
const Koa = require("koa");
const app = new Koa();
// 2. 编写响应函数（中间件）
// ctx： 上下文，web容器 ctx.rquest ctx.response
// next：下一个中间件，下一个中间件是否能够执行取决于 newx() 是否被调用；中间件执行顺序符合“洋葱模型”
app.use((ctx, next) => {
  console.log(ctx.rquest);
  ctx.response.body = "hello";
  next();
});
app.use((ctx, next) => {
  console.log("第二个中间件");
});
// 3. 绑定端口
app.listen(3000);
```
