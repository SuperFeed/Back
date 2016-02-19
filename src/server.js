import Koa from 'koa'
import route from 'koa-route'
import bodyParser from 'koa-bodyparser'

const PORT = process.env.NODE_ENV === 'production'
  ? process.env.PORT || 80
  : 3001

let app = new Koa()

app.use((ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  return next()
})

app.use(bodyParser())

app.use(route.get('/ping', ctx => {
  ctx.body = 'pong'
}))

app.use(route.get('/version', ctx => {
  ctx.body = '1'
}))

app.use(route.post('/pong', async ctx => {
  ctx.body = await Promise.resolve('ping')
}))

app.listen(PORT)
