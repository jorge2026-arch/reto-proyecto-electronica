import { Pool } from 'pg'
import { env } from '../config/env.js'

export const pool = new Pool({
  connectionString: env.databaseUrl || undefined,
  max: 5,
  idleTimeoutMillis: 10_000,
  connectionTimeoutMillis: 10_000,
  ssl: env.nodeEnv === 'production' || env.databaseUrl.includes('supabase.co')
    ? { rejectUnauthorized: false }
    : undefined,
})

// Evita que una desconexión de un cliente ocioso termine todo el proceso.
pool.on('error', (error) => {
  console.error('Error en la conexión PostgreSQL:', error.message)
})
