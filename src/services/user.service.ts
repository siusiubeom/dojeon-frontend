import { getAuthToken } from './session.ts'
import type {
  PatchUserData,
  PatchUserRequest,
  PatchUserResponse,
  UserMeData,
  UserMeResponse,
} from '../types/user.types.ts'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export class UserApiError extends Error {
  readonly code?: string
  readonly errorCode?: string
  readonly status?: number

  constructor(message: string, code?: string, errorCode?: string, status?: number) {
    super(message)
    this.name = 'UserApiError'
    this.code = code
    this.errorCode = errorCode
    this.status = status
  }
}

function buildHeaders(extraHeaders: HeadersInit = {}): HeadersInit {
  const token = getAuthToken()
  return {
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extraHeaders,
  }
}

async function readPatchUserResponse(res: Response): Promise<PatchUserResponse | null> {
  const bodyText = await res.text()

  if (!bodyText.trim()) {
    if (!res.ok) {
      throw new UserApiError(
        `Failed to update profile (HTTP ${res.status})`,
        undefined,
        undefined,
        res.status,
      )
    }

    return null
  }

  try {
    return JSON.parse(bodyText) as PatchUserResponse
  } catch {
    throw new UserApiError(
      `Failed to update profile (HTTP ${res.status})`,
      undefined,
      undefined,
      res.status,
    )
  }
}

export async function fetchUserMe(signal?: AbortSignal): Promise<UserMeData | null> {
  let res: Response

  try {
    res = await fetch(`${API_BASE_URL}/user/me`, {
      method: 'GET',
      headers: buildHeaders(),
      signal,
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error
    throw new UserApiError('Failed to fetch profile')
  }

  let body: UserMeResponse
  try {
    body = (await res.json()) as UserMeResponse
  } catch {
    throw new UserApiError(`Failed to fetch profile (HTTP ${res.status})`, undefined, undefined, res.status)
  }

  if (!res.ok) {
    throw new UserApiError(
      body.message ?? `Failed to fetch profile (HTTP ${res.status})`,
      body.code,
      body.errorCode,
      res.status,
    )
  }

  if (!body.isSuccess) {
    throw new UserApiError(body.message ?? 'Request failed', body.code, body.errorCode, res.status)
  }

  return body.data
}

export async function patchUserMe(payload: PatchUserRequest): Promise<PatchUserData | null> {
  let res: Response

  try {
    res = await fetch(`${API_BASE_URL}/user/me`, {
      method: 'PATCH',
      headers: buildHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(payload),
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error
    throw new UserApiError('Failed to update profile')
  }

  const body = await readPatchUserResponse(res)

  if (!res.ok) {
    throw new UserApiError(
      body?.message ?? `Failed to update profile (HTTP ${res.status})`,
      body?.code,
      body?.errorCode,
      res.status,
    )
  }

  if (body && !body.isSuccess) {
    throw new UserApiError(body.message ?? 'Request failed', body.code, body.errorCode, res.status)
  }

  return body?.data ?? null
}
