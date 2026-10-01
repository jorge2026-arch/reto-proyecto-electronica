import bcrypt from 'bcrypt'
import { sign } from 'hono/jwt'
import { env } from '../config/env.js'
import { findAdminByUsername } from '../repositories/admin.repository.js'

export async function login(usuario: string, contrasena: string) {
  const admin = await findAdminByUsername(usuario)
  if (!admin) return undefined

  const passwordMatches = await bcrypt.compare(contrasena, admin.contrasena)
  if (!passwordMatches) return undefined

  const now = Math.floor(Date.now() / 1000)
  const token = await sign(
    { sub: String(admin.identificador), usuario: admin.usuario, iat: now, exp: now + 3600 },
    env.jwtSecret,
  )
  return { token, administrador: { identificador: admin.identificador, usuario: admin.usuario } }
}
