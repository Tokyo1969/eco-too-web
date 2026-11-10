// POST /api/contact – używane przez Workera (worker/index.ts) i jako Pages Function.
// Wysyła wiadomość przez Resend (https://resend.com) na biuro@eco-too.opole.pl.
// Zmienne środowiskowe (Worker → Settings → Variables and Secrets):
//   RESEND_API_KEY (secret)  – klucz API Resend
//   TURNSTILE_SECRET_KEY (secret) – tajny klucz widgetu Cloudflare Turnstile
//   MAIL_TO     (opcjonalnie) – domyślnie biuro@eco-too.opole.pl
//   MAIL_FROM   (opcjonalnie) – domyślnie "ECO-TOO WWW <formularz@eco-too.opole.pl>" (domena musi być zweryfikowana w Resend)
export interface Env { RESEND_API_KEY?: string; TURNSTILE_SECRET_KEY?: string; MAIL_TO?: string; MAIL_FROM?: string }

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8' } });
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));

export const onRequestPost = ({ request, env }: { request: Request; env: Env }) => handleContact(request, env);

export async function handleContact(request: Request, env: Env): Promise<Response> {
  let f: FormData;
  try { f = await request.formData(); } catch { return json({ ok: false, error: 'bad_request' }, 400); }
  const g = (k: string) => String(f.get(k) ?? '').trim().slice(0, 2000);

  if (g('website')) { console.log('contact: honeypot filled, not sent', g('type') || 'form'); return json({ ok: true }); } // honeypot – boty
  // type=callback – krótkie zgłoszenie z kalkulatora na stronie głównej (telefon + metraż), reszta – pełny formularz
  const callback = g('type') === 'callback';
  const name = g('name'), phone = g('phone'), email = g('email'), city = g('city'), object = g('object');
  if (callback) {
    if (!phone || !f.get('consent')) return json({ ok: false, error: 'missing_fields' }, 400);
    if (phone.replace(/\D/g, '').length < 9) return json({ ok: false, error: 'bad_phone' }, 400);
  } else {
    if (!name || !phone || !email || !city || !object || !f.get('consent')) return json({ ok: false, error: 'missing_fields' }, 400);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ ok: false, error: 'bad_email' }, 400);
  }
  if (!env.TURNSTILE_SECRET_KEY) return json({ ok: false, error: 'captcha_not_configured' }, 500);
  const captchaToken = String(f.get('captchaToken') ?? '').trim(); // bez przycinania – tokeny Turnstile mają do 2048 znaków
  if (!captchaToken) return json({ ok: false, error: 'captcha_required' }, 400);

  let verificationResponse: Response;
  try {
    const ip = request.headers.get('cf-connecting-ip');
    verificationResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: captchaToken, ...(ip ? { remoteip: ip } : {}) }),
    });
  } catch (error) {
    console.error('Turnstile verification request failed', error);
    return json({ ok: false, error: 'captcha_unavailable' }, 502);
  }
  if (!verificationResponse.ok) {
    console.error('Turnstile verification error', verificationResponse.status, await verificationResponse.text());
    return json({ ok: false, error: 'captcha_unavailable' }, 502);
  }

  const verification = await verificationResponse.json() as {
    success?: boolean;
    action?: string;
    hostname?: string;
    'error-codes'?: string[];
  };
  const expectedAction = callback ? 'callback' : 'contact';
  // Szczegółowa przyczyna – w Workers Logs i w kodzie błędu widocznym w komunikacie formularza
  const reason = verification.success !== true
    ? `invalid_${(verification['error-codes'] ?? ['unknown']).join('_')}`
    : verification.action !== expectedAction ? 'action'
    : '';
  if (reason) {
    console.log('contact: Turnstile rejected', reason, { action: verification.action, hostname: verification.hostname });
    return json({ ok: false, error: `captcha_failed_${reason.replace(/[^a-z0-9_]/gi, '_')}` }, 403);
  }
  if (!env.RESEND_API_KEY) return json({ ok: false, error: 'not_configured' }, 500);

  const rows: [string, string][] = callback ? [
    ['Rodzaj zgłoszenia', 'Prośba o oddzwonienie (kalkulator na stronie głównej) – oddzwonić tego samego dnia roboczego'],
    ['Telefon', phone], ['Imię', name], ['Powierzchnia (m²)', g('area')], ['Liczba pomieszczeń', g('rooms')],
    ['Wyliczony orientacyjny koszt', g('estimate')],
  ] : [
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
      ...(email ? { reply_to: email } : {}),
      subject: callback
        ? `Oddzwonić: ${phone}${g('area') ? `, ${g('area')} m²` : ''}${name ? ` (${name})` : ''}`
        : `Zapytanie z WWW: ${name}, ${city}`,
      html, text,
    }),
  });
  if (!res.ok) {
    console.error('Resend error', res.status, await res.text()); // widoczne w Workers → Logs
    return json({ ok: false, error: 'send_failed' }, 502);
  }
  const sent = await res.json().catch(() => ({})) as { id?: string };
  console.log('contact: sent via Resend', callback ? 'callback' : 'form', sent.id ?? '');
  return json({ ok: true });
}
