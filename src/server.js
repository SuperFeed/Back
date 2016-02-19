import koa from 'koa'
import route from 'koa-route'
import bodyParser from 'koa-bodyparser'

const PORT = process.env.NODE_ENV === 'production' ? 80 : 3001

let app = koa()
app.use(bodyParser())

app.use(route.get('/ping', function *() {
  this.body = 'ping'
}))

app.listen(PORT)
