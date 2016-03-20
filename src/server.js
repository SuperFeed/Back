import Koa from 'koa'
import route from 'koa-route'
import cors from 'kcors'
import bodyParser from 'koa-bodyparser'
import knex from 'knex'
import { DB, PORT } from './config'

let db = knex(DB)

console.info('[superfeed] Attempting migration')
db.migrate.latest().then(_ => console.info('[superfeed] Migrations completed'))

let app = new Koa()

app.use(cors())
app.use(bodyParser())

app.use(route.get('/ping', ctx => {
  ctx.body = 'pong'
}))

app.use(route.get('/version', async ctx => {
  let q = db
    .select('number')
    .from('version')
    .where('name', 'current')

  let [{ number: version }] = await q

  ctx.body = { version }
}))

app.listen(PORT)
console.info(`[superfeed] App Listening on ${PORT}`)
