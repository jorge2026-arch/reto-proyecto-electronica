import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { loginSchema } from '../schemas/auth.js'
import * as authService from '../services/auth.service.js'

export const authRoutes = new Hono()

authRoutes.post('/login', zValidator('json', loginSchema), async (c) => {
  const credentials = c.req.valid('json')
  const result = await authService.login(credentials.usuario, credentials.contrasena)
  if (!result) return c.json({ success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Credenciales inválidas' } }, 401)
  return c.json({ success: true, data: result })
})

authRoutes.post('/logout', (c) => c.json({ success: true, data: { message: 'Sesión cerrada correctamente' } }))
