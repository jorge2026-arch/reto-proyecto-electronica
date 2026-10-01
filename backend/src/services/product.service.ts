import * as repository from '../repositories/product.repository.js'
import type { Categoria } from '../types/models.js'

export const createProduct = repository.createProduct
export const updateProduct = repository.updateProduct
export const deleteProduct = repository.deleteProduct
export const findProductById = repository.findProductById

export async function listProducts(filters: { modelo?: string; categoria?: Categoria; page: number; limit: number }) {
  const result = await repository.findProducts({
    modelo: filters.modelo,
    categoria: filters.categoria,
    limit: filters.limit,
    offset: (filters.page - 1) * filters.limit,
  })
  return {
    items: result.items,
    pagination: {
      page: filters.page,
      limit: filters.limit,
      total: result.total,
      totalPages: Math.ceil(result.total / filters.limit),
    },
  }
}
