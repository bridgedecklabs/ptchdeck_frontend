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
