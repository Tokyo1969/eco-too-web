// POST /api/contact – używane przez Workera (worker/index.ts) i jako Pages Function.
// Wysyła wiadomość przez Resend (https://resend.com) na biuro@eco-too.opole.pl.
// Zmienne środowiskowe (Worker → Settings → Variables and Secrets):
//   RESEND_API_KEY (secret)  – klucz API Resend
//   RECAPTCHA_SECRET_KEY (secret) – tajny klucz reCAPTCHA v3
//   MAIL_TO     (opcjonalnie) – domyślnie biuro@eco-too.opole.pl
//   MAIL_FROM   (opcjonalnie) – domyślnie "ECO-TOO WWW <formularz@eco-too.opole.pl>" (domena musi być zweryfikowana w Resend)
export interface Env { RESEND_API_KEY?: string; RECAPTCHA_SECRET_KEY?: string; MAIL_TO?: string; MAIL_FROM?: string }

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8' } });
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));

export const onRequestPost = ({ request, env }: { request: Request; env: Env }) => handleContact(request, env);

export async function handleContact(request: Request, env: Env): Promise<Response> {
  let f: FormData;
  try { f = await request.formData(); } catch { return json({ ok: false, error: 'bad_request' }, 400); }
  const g = (k: string) => String(f.get(k) ?? '').trim().slice(0, 2000);

  if (g('website')) return json({ ok: true }); // honeypot – boty
  const name = g('name'), phone = g('phone'), email = g('email'), city = g('city'), object = g('object');
  if (!name || !phone || !email || !city || !object || !f.get('consent')) return json({ ok: false, error: 'missing_fields' }, 400);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ ok: false, error: 'bad_email' }, 400);
  if (!env.RECAPTCHA_SECRET_KEY) return json({ ok: false, error: 'recaptcha_not_configured' }, 500);
  const recaptchaToken = g('recaptchaToken');
  if (!recaptchaToken) return json({ ok: false, error: 'recaptcha_required' }, 400);

  let verificationResponse: Response;
  try {
    verificationResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: env.RECAPTCHA_SECRET_KEY, response: recaptchaToken }),
    });
  } catch (error) {
    console.error('reCAPTCHA verification request failed', error);
    return json({ ok: false, error: 'recaptcha_unavailable' }, 502);
  }
  if (!verificationResponse.ok) {
    console.error('reCAPTCHA verification error', verificationResponse.status, await verificationResponse.text());
    return json({ ok: false, error: 'recaptcha_unavailable' }, 502);
  }

  const verification = await verificationResponse.json() as {
    success?: boolean;
    score?: number;
    action?: string;
  };
  if (verification.success !== true || verification.action !== 'contact' || (verification.score ?? 0) < 0.5) {
    return json({ ok: false, error: 'recaptcha_failed' }, 403);
  }
  if (!env.RESEND_API_KEY) return json({ ok: false, error: 'not_configured' }, 500);

  const rows: [string, string][] = [
    ['Imię i nazwisko', name], ['Telefon', phone], ['E-mail', email], ['Miejscowość', city], ['Rodzaj obiektu', object],
    ['Powierzchnia (m²)', g('area')], ['Etap inwestycji', g('stage')], ['Wykończenie podłogi', g('floor')],
    ['Zainteresowanie montażem podłogi', g('floorInstallation') ? 'Tak' : 'Nie'],
    ['Zgoda na przekazanie danych wykonawcy podłóg', g('floorDataTransfer') ? 'Tak' : 'Nie – nie przekazywać danych'],
    ['Wiadomość', g('message')],
  ];
  const html = `<h2>Nowe zapytanie ze strony eco-too.opole.pl</h2><table cellpadding="6" style="border-collapse:collapse">${rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${esc(v).replace(/\n/g, '<br>')}</td></tr>`)
    .join('')}</table>`;
  const text = rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: env.MAIL_FROM || 'ECO-TOO WWW <formularz@eco-too.opole.pl>',
      to: [env.MAIL_TO || 'biuro@eco-too.opole.pl'],
      reply_to: email,
      subject: `Zapytanie z WWW: ${name}, ${city}`,
      html, text,
    }),
  });
  if (!res.ok) {
    console.error('Resend error', res.status, await res.text()); // widoczne w Workers → Logs
    return json({ ok: false, error: 'send_failed' }, 502);
  }
  return json({ ok: true });
}
