import type { HomeResumeData, HomeResumeResponse } from '../types/home.types.ts'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export class HomeApiError extends Error {
    readonly code?: string
    readonly status?: number

    constructor(message: string, code?: string, status?: number) {
        super(message)
        this.name = 'HomeApiError'
        this.code = code
        this.status = status
    }
}

function getAuthToken(): string | null {
    if (typeof window === 'undefined') return null
    return window.localStorage.getItem('accessToken')
}

export async function fetchHomeResume(signal?: AbortSignal): Promise<HomeResumeData | null> {
    const token = getAuthToken()
    let res: Response

    try {
        res = await fetch(`${API_BASE_URL}/home/resume`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            signal,
        })
    } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') throw error
        throw new HomeApiError('Failed to fetch home resume')
    }

    let body: HomeResumeResponse | null = null
    try {
        body = (await res.json()) as HomeResumeResponse
    } catch {
        throw new HomeApiError(
            `Failed to parse home resume response (HTTP ${res.status})`,
            undefined,
            res.status,
        )
    }

    if (!res.ok) {
        throw new HomeApiError(
            body?.message ?? `Failed to fetch home resume (HTTP ${res.status})`,
            body?.code,
            res.status,
        )
    }

    if (!body.isSuccess) {
        throw new HomeApiError(body.message ?? 'Request failed', body.code, res.status)
    }

    return body.data
}
