import { getStoredAuthSession } from './auth'

export function getAuthToken(): string | null {
  return getStoredAuthSession()?.accessToken ?? null
}
