import Koa from 'koa'
import route from 'koa-route'
import bodyParser from 'koa-bodyparser'
import knex from 'knex'
import { DB, PORT } from './config'

let db = knex(DB)

console.info('[superfeed] Attempting migration')
db.migrate.latest()

let app = new Koa()

app.use((ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  return next()
})

app.use((ctx, next) => {
  ctx.db = db
  return next()
})

app.use(bodyParser())

app.use(route.get('/ping', ctx => {
  ctx.body = 'pong'
}))

app.use(route.get('/version', async ctx => {
  let q = ctx.db
    .select('number')
    .from('version')
    .where('name', 'current')

  let [{ number: version }] = await q
  ctx.body = { version }
}))

app.listen(PORT)
