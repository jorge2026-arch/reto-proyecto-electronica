import { z } from 'zod'

export const loginSchema = z.object({
  usuario: z.string().trim().min(1, 'Escribe tu usuario').max(15, 'Máximo 15 caracteres'),
  contrasena: z.string().min(1, 'Escribe tu contraseña').max(60, 'Máximo 60 caracteres'),
})

export const productSchema = z.object({
  modelo_producto: z.string().trim().min(1, 'El modelo es obligatorio'),
  precio: z.coerce.number().positive('El precio debe ser mayor que cero').max(99999999.99, 'El precio supera el máximo permitido').refine((value) => Number(value.toFixed(2)) === value, 'El precio solo puede tener dos decimales'),
  stock: z.coerce.number().int('El stock debe ser entero').nonnegative('El stock no puede ser negativo').max(2147483647, 'El stock supera el máximo permitido'),
  categoria: z.enum(['celular', 'laptop', 'monitor', 'teclado', 'mouse', 'audifonos'], { message: 'Selecciona una categoría válida' }),
  imagen_url: z.preprocess((value) => value === '' ? undefined : value, z.string().url('Escribe una URL válida').max(2048).optional()),
})
