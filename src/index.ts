import { Context, Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import artist from './routes/artist.route'
import { testConnection } from './services/db'

const app = new Hono()

// ? Middlewares
app.use('*', cors())
app.use('*', logger())

// ! Routes
app.get('/', (c: Context) => {
    return c.json({ status: 'ok' })
})

app.route('/artist', artist)

app.onError((err, c: Context) => {
    console.error(`${err}`);
    return c.json({ error: 'Internal Server Error' }, 500)
})


// ! Probar la conexión antes de iniciar el servidor
await testConnection()

const port = 3000

console.log(`Server running on port ${port}`)

// ! Iniciar el servidor
Bun.serve({
    port: port,
    fetch: app.fetch
})
