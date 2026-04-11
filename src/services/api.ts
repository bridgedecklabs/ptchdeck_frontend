const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function sendContactMessage(data: {
  name: string;
  email: string;
  message: string;
}) {
  const response = await fetch(`${API_BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  return response.json();
}

export interface AuthProfile {
  user: { id: string; name: string; email: string };
  firm: { id: string; name: string };
  role: string;
  permissions: Record<string, boolean>;
}

export async function registerUser(data: {
  firebase_uid: string;
  email: string;
  name: string;
  company_name: string;
}): Promise<AuthProfile> {
  const response = await fetch(`${API_BASE}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.detail || 'Registration failed');
  }

  return response.json();
}

export async function getMe(firebaseToken: string): Promise<AuthProfile> {
  const response = await fetch(`${API_BASE}/api/auth/me`, {
    headers: { Authorization: `Bearer ${firebaseToken}` },
  });

  if (response.status === 404) {
    const error: Error & { status?: number } = new Error('User not found');
    error.status = 404;
    throw error;
  }

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return response.json();
}
