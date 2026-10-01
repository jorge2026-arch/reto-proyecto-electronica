export type Categoria = 'celular' | 'laptop' | 'monitor' | 'teclado' | 'mouse' | 'audifonos'

export interface Administrador {
  identificador: number
  usuario: string
}

export interface Session {
  token: string
  administrador: Administrador
}

export interface Producto {
  identificador_producto: number
  modelo_producto: string
  precio: number
  stock: number
  categoria: Categoria
  imagen_url?: string | null
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: { code: string; message: string }
}

export interface ProductListData {
  items: Producto[]
  pagination: { page: number; limit: number; total: number; totalPages: number }
}
