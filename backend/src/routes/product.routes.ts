import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { productCreateSchema, productQuerySchema, productUpdateSchema } from '../schemas/product.js'
import * as productService from '../services/product.service.js'
import { authMiddleware } from '../middleware/auth.js'

export const productRoutes = new Hono()

productRoutes.get('/', zValidator('query', productQuerySchema), async (c) => {
  const query = c.req.valid('query')
  const products = await productService.listProducts(query)
  return c.json({ success: true, data: products })
})

productRoutes.get('/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (!Number.isInteger(id) || id <= 0) {
    return c.json({ success: false, error: { code: 'INVALID_ID', message: 'Identificador inválido' } }, 400)
  }
  const product = await productService.findProductById(id)
  if (!product) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Producto no encontrado' } }, 404)
  return c.json({ success: true, data: product })
})

productRoutes.post('/', authMiddleware, zValidator('json', productCreateSchema), async (c) => {
  const product = await productService.createProduct(c.req.valid('json'))
  return c.json({ success: true, data: product }, 201)
})

productRoutes.patch('/:id', authMiddleware, zValidator('json', productUpdateSchema), async (c) => {
  const id = Number(c.req.param('id'))
  if (!Number.isInteger(id) || id <= 0) return c.json({ success: false, error: { code: 'INVALID_ID', message: 'Identificador inválido' } }, 400)
  const product = await productService.updateProduct(id, c.req.valid('json'))
  if (!product) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Producto no encontrado' } }, 404)
  return c.json({ success: true, data: product })
})

productRoutes.delete('/:id', authMiddleware, async (c) => {
  const id = Number(c.req.param('id'))
  if (!Number.isInteger(id) || id <= 0) return c.json({ success: false, error: { code: 'INVALID_ID', message: 'Identificador inválido' } }, 400)
  const deleted = await productService.deleteProduct(id)
  if (!deleted) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Producto no encontrado' } }, 404)
  return c.body(null, 204)
})
