const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export interface SessionData {
  user: { id: string; full_name: string; email: string }
  firm: { id: string; name: string }
  role: 'owner' | 'admin' | 'user'
  permissions: Record<string, boolean>
}

export interface NeedsCompanyResponse {
  needs_company: true
  firebase_uid: string
  email: string
  full_name: string
}

export type GoogleAuthResponse = SessionData | NeedsCompanyResponse

export class ApiNotFoundError extends Error {
  constructor() {
    super('Not found')
    this.name = 'ApiNotFoundError'
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (res.status === 404) throw new ApiNotFoundError()
  if (!res.ok) {
    let message = 'Something went wrong. Please try again.'
    try {
      const body = await res.json() as { detail?: unknown }
      if (body.detail) {
        message = typeof body.detail === 'string' ? body.detail : JSON.stringify(body.detail)
      }
    } catch {
      // ignore parse error
    }
    throw new Error(message)
  }
  return res.json() as Promise<T>
}

export async function apiEmailRegister(data: {
  firebase_uid: string
  email: string
  full_name: string
  company_name: string
}): Promise<SessionData> {
  const res = await fetch(`${BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse<SessionData>(res)
}

export async function apiGoogleAuth(data: {
  firebase_uid: string
  email: string
  full_name: string
}): Promise<GoogleAuthResponse> {
  const res = await fetch(`${BASE}/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse<GoogleAuthResponse>(res)
}

export async function apiCompleteProfile(data: {
  firebase_uid: string
  company_name: string
}): Promise<SessionData> {
  const res = await fetch(`${BASE}/auth/complete-profile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse<SessionData>(res)
}

export async function apiGetMe(token: string): Promise<SessionData> {
  const res = await fetch(`${BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return handleResponse<SessionData>(res)
}

export async function apiAcceptInvite(data: {
  token: string
  firebase_uid: string
  full_name: string
}): Promise<SessionData> {
  const res = await fetch(`${BASE}/auth/invite/accept`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse<SessionData>(res)
}

export async function apiGetInviteInfo(token: string): Promise<{ email: string; firm_name: string }> {
  const res = await fetch(`${BASE}/auth/invite/info?token=${encodeURIComponent(token)}`)
  return handleResponse<{ email: string; firm_name: string }>(res)
}
