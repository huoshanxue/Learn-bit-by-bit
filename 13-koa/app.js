const Koa = require('koa');
const app = new Koa();
const koa_response_duration = require('./middleware/koa_response_duration')
const koa_response_head = require('./middleware/koa_response_head')
const koa_response_data = require('./middleware/koa_response_data')

app.use(koa_response_duration)
app.use(koa_response_head)
app.use(koa_response_data)

app.listen(8899)