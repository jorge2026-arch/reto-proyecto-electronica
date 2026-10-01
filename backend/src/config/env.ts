import 'dotenv/config'

export const env = {
  databaseUrl: process.env.DATABASE_URL ?? '',
  jwtSecret: process.env.JWT_SECRET ?? '',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '1h',
  nodeEnv: process.env.NODE_ENV ?? 'development',
  corsOrigins: process.env.CORS_ORIGINS ?? '',
}

if (!env.jwtSecret && env.nodeEnv !== 'test') {
  console.warn('JWT_SECRET no está configurado; configúralo antes de ejecutar el backend.')
}

export function assertProductionConfig() {
  if (env.nodeEnv === 'production' && (!env.databaseUrl || !env.jwtSecret)) {
    throw new Error('DATABASE_URL y JWT_SECRET son obligatorias en producción')
  }
}

export function allowedCorsOrigins() {
  return env.corsOrigins.split(',').map((origin) => origin.trim()).filter(Boolean)
}
