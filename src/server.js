import Koa from 'koa'
import { bodyParser, route, useState, cors } from 'libk'
import knex from 'knex'
import { DB, PORT } from './config'

let db = knex(DB)

console.info('[superfeed] Attempting migration')
db.migrate.latest().then(_ => console.info('[superfeed] Migrations completed'))

let app = new Koa()

app.use(cors)
app.use(bodyParser)
app.use(useState({ db }))

app.use(route.GET('/ping')(ctx => {
  ctx.body = 'pong'
}))

app.use(route.GET('/version')(async ctx => {
  let q = ctx.state.db
    .select('number')
    .from('version')
    .where('name', 'current')

  let [{ number: version }] = await q

  ctx.body = { version }
}))

app.listen(PORT)
console.info(`[superfeed] App Listening on ${PORT}`)
