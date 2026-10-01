import type { Session } from './types'

const KEY = 'electro.auth'

export function getSession(): Session | null {
  if (typeof window === 'undefined') return null
  try { return JSON.parse(localStorage.getItem(KEY) ?? 'null') as Session | null } catch { return null }
}

export function saveSession(session: Session) {
  localStorage.setItem(KEY, JSON.stringify(session))
}

export function clearSession() { localStorage.removeItem(KEY) }

export function requireSession() {
  const session = getSession()
  if (!session && typeof window !== 'undefined') window.location.href = '/login'
  return session
}
