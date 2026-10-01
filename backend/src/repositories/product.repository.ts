import { pool } from '../db/pool.js'
import type { Categoria, Producto } from '../types/models.js'

interface ProductInput {
  modelo_producto?: string
  precio?: number
  stock?: number
  categoria?: Categoria
  imagen_url?: string
}

type ProductRow = Omit<Producto, 'precio'> & { precio: string | number }

function normalizeProduct(row: ProductRow): Producto {
  return { ...row, precio: Number(row.precio) }
}

export async function createProduct(input: Omit<ProductInput, 'modelo_producto' | 'precio' | 'categoria'> & { modelo_producto: string; precio: number; categoria: Categoria; stock: number }) {
  const result = await pool.query<ProductRow>(
    `INSERT INTO producto (modelo_producto, precio, stock, categoria, imagen_url)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING identificador_producto, modelo_producto, precio, stock, categoria, imagen_url`,
    [input.modelo_producto, input.precio, input.stock, input.categoria, input.imagen_url ?? null],
  )
  return result.rows[0] ? normalizeProduct(result.rows[0]) : undefined
}

export async function findProducts(filters: { modelo?: string; categoria?: Categoria; offset: number; limit: number }) {
  const values: unknown[] = []
  const conditions: string[] = []

  if (filters.modelo) {
    values.push(`%${filters.modelo}%`)
    conditions.push(`modelo_producto ILIKE $${values.length}`)
  }
  if (filters.categoria) {
    values.push(filters.categoria)
    conditions.push(`categoria = $${values.length}`)
  }

  values.push(filters.limit, filters.offset)
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
  const result = await pool.query<ProductRow>(
    `SELECT identificador_producto, modelo_producto, precio, stock, categoria, imagen_url
     FROM producto ${where} ORDER BY identificador_producto
     LIMIT $${values.length - 1} OFFSET $${values.length}`,
    values,
  )
  const countResult = await pool.query<{ total: string }>(
    `SELECT COUNT(*)::text AS total FROM producto ${where}`,
    values.slice(0, values.length - 2),
  )
  return { items: result.rows.map(normalizeProduct), total: Number(countResult.rows[0]?.total ?? 0) }
}

export async function findProductById(id: number) {
  const result = await pool.query<ProductRow>(
    `SELECT identificador_producto, modelo_producto, precio, stock, categoria, imagen_url
     FROM producto WHERE identificador_producto = $1`,
    [id],
  )
  return result.rows[0] ? normalizeProduct(result.rows[0]) : undefined
}

export async function updateProduct(id: number, input: ProductInput) {
  const fields = Object.entries(input).filter(([, value]) => value !== undefined)
  if (!fields.length) return undefined
  const values = fields.map(([, value]) => value)
  const assignments = fields.map(([key], index) => `${key} = $${index + 1}`)
  values.push(id)
  const result = await pool.query<ProductRow>(
    `UPDATE producto SET ${assignments.join(', ')}
     WHERE identificador_producto = $${values.length}
     RETURNING identificador_producto, modelo_producto, precio, stock, categoria, imagen_url`,
    values,
  )
  return result.rows[0] ? normalizeProduct(result.rows[0]) : undefined
}

export async function deleteProduct(id: number) {
  const result = await pool.query('DELETE FROM producto WHERE identificador_producto = $1', [id])
  return result.rowCount === 1
}
