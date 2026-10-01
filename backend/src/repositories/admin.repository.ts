import { pool } from '../db/pool.js'
import type { Administrador } from '../types/models.js'

export async function findAdminByUsername(usuario: string) {
  const result = await pool.query<Administrador>(
    'SELECT identificador, usuario, contrasena FROM administrador WHERE usuario = $1 LIMIT 1',
    [usuario],
  )
  return result.rows[0]
}
