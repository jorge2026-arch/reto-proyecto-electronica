import type { ApiResponse, ProductListData, Producto, Session } from './types'

// Este cliente se ejecuta en el navegador después de generar el sitio estático.
// En Vercel, PUBLIC_API_URL debe configurarse como variable de entorno pública.
const configuredApiUrl = import.meta.env.PUBLIC_API_URL?.trim()
const API_URL = (configuredApiUrl || (import.meta.env.DEV ? 'http://localhost:3000' : '')).replace(/\/$/, '')

export class ApiError extends Error {
  status: number
  code: string
  constructor(message: string, status: number, code = 'API_ERROR') {
    super(message)
    this.status = status
    this.code = code
  }
}

function token() {
  if (typeof window === 'undefined') return undefined
  const raw = localStorage.getItem('electro.auth')
  if (!raw) return undefined
  try { return (JSON.parse(raw) as Session).token } catch { return undefined }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (!API_URL) {
    throw new ApiError('El frontend no tiene configurada la URL pública del backend. Define PUBLIC_API_URL en Vercel.', 0, 'API_URL_NOT_CONFIGURED')
  }
  const headers = new Headers(options.headers)
  headers.set('Content-Type', 'application/json')
  const authToken = token()
  if (authToken) headers.set('Authorization', `Bearer ${authToken}`)
  const response = await fetch(`${API_URL}${path}`, { ...options, headers })
  const body = await response.json().catch(() => ({})) as ApiResponse<T>
  if (!response.ok || body.success === false) {
    if (response.status === 401 && typeof window !== 'undefined') localStorage.removeItem('electro.auth')
    throw new ApiError(body.error?.message ?? 'No se pudo completar la solicitud', response.status, body.error?.code)
  }
  return body.data as T
}

export const api = {
  login: (payload: { usuario: string; contrasena: string }) => request<{ token: string; administrador: Session['administrador'] }>('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  logout: () => request<{ message: string }>('/api/auth/logout', { method: 'POST' }),
  products: (params: { modelo?: string; categoria?: string; page?: number; limit?: number } = {}) => {
    const query = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => value !== undefined && value !== '' && query.set(key, String(value)))
    return request<ProductListData>(`/api/products?${query}`)
  },
  product: (id: number) => request<Producto>(`/api/products/${id}`),
  createProduct: (payload: Omit<Producto, 'identificador_producto'>) => request<Producto>('/api/products', { method: 'POST', body: JSON.stringify(payload) }),
  updateProduct: (id: number, payload: Partial<Omit<Producto, 'identificador_producto'>>) => request<Producto>(`/api/products/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  deleteProduct: (id: number) => request<null>(`/api/products/${id}`, { method: 'DELETE' }),
}
