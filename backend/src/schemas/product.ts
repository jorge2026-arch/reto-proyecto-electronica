import { z } from 'zod'

export const categoriaSchema = z.enum([
  'celular',
  'laptop',
  'monitor',
  'teclado',
  'mouse',
  'audifonos',
])

export const productCreateSchema = z.object({
  modelo_producto: z.string().trim().min(1),
  precio: z.number().positive().max(99999999.99).refine((value) => Number(value.toFixed(2)) === value, 'El precio solo puede tener dos decimales'),
  stock: z.number().int().nonnegative().max(2147483647).default(0),
  categoria: categoriaSchema,
  imagen_url: z.preprocess((value) => value === '' ? undefined : value, z.string().url().max(2048).optional()),
})

export const productUpdateSchema = productCreateSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  'Debe enviarse al menos un campo para actualizar',
)

export const productQuerySchema = z.object({
  modelo: z.string().optional(),
  categoria: categoriaSchema.optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
})
