export type Categoria =
  | 'celular'
  | 'laptop'
  | 'monitor'
  | 'teclado'
  | 'mouse'
  | 'audifonos'

export interface Administrador {
  identificador: number
  usuario: string
  contrasena: string
}

export interface Producto {
  identificador_producto: number
  modelo_producto: string
  precio: number
  stock: number
  categoria: Categoria
  imagen_url?: string | null
}
