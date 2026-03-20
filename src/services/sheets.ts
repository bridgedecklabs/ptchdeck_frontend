/**
 * Google Sheets submission service.
 * Two separate sheets — one for notify signups, one for contact messages.
 *
 * VITE_ env vars are visible in the browser bundle. Sheets webhook URLs
 * are not secrets — this is fine. Passwords / private keys always go
 * server-side in ptchdeck-api/.env, never here.
 *
 * To swap either sheet for a real backend endpoint later:
 * update the relevant function here — hooks and UI stay untouched.
 */

// Notify Me forms (Coming Soon, CTA banners, Footer)
const NOTIFY_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL as string | undefined;

// Get in Touch / Contact form — separate sheet
const CONTACT_URL = import.meta.env.VITE_GOOGLE_SHEETS_CONTACT_URL as string | undefined;

async function post(url: string | undefined, label: string, body: object): Promise<void> {
  if (!url) {
    console.info(`[sheets] ${label} URL not set, skipping`, body);
    return;
  }
  // no-cors is required for Google Apps Script — response is opaque but data IS saved
  await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body, timestamp: new Date().toISOString() }),
  });
}

/** Submit a notify/waitlist email (Coming Soon, CTA, Footer) */
export async function submitNotify(email: string, source: string): Promise<void> {
  await post(NOTIFY_URL, 'NOTIFY_URL', { email, source });
}

/** Submit a contact form message (Get in Touch page) */
export async function submitContact(data: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  await post(CONTACT_URL, 'CONTACT_URL', { ...data, source: 'contact' });
}
