import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { authRoutes } from './routes/auth.routes.js'
import { productRoutes } from './routes/product.routes.js'
import { authMiddleware } from './middleware/auth.js'
import { allowedCorsOrigins } from './config/env.js'

const app = new Hono()

const corsOrigins = allowedCorsOrigins()

app.use('*', cors({
  origin: (origin) => corsOrigins.includes(origin) ? origin : undefined,
  allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400,
}))
app.get('/', (c) => c.json({ success: true, data: { service: 'tienda-electronica-backend' } }))
app.use('/api/auth/logout', authMiddleware)
app.route('/api/auth', authRoutes)
app.route('/api/products', productRoutes)

app.onError((error, c) => {
  console.error(error)
  return c.json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Error interno del servidor' } }, 500)
})

export default app
