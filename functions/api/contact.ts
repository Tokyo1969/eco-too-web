// Cloudflare Pages Function: POST /api/contact
// Wysyła wiadomość przez Resend (https://resend.com) na biuro@eco-too.opole.pl.
// Zmienne środowiskowe (Pages → Settings → Variables and Secrets):
//   RESEND_API_KEY (secret)  – klucz API Resend
//   MAIL_TO     (opcjonalnie) – domyślnie biuro@eco-too.opole.pl
//   MAIL_FROM   (opcjonalnie) – domyślnie "ECO-TOO WWW <formularz@eco-too.opole.pl>" (domena musi być zweryfikowana w Resend)
interface Env { RESEND_API_KEY?: string; MAIL_TO?: string; MAIL_FROM?: string }

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8' } });
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let f: FormData;
  try { f = await request.formData(); } catch { return json({ ok: false, error: 'bad_request' }, 400); }
  const g = (k: string) => String(f.get(k) ?? '').trim().slice(0, 2000);

  if (g('website')) return json({ ok: true }); // honeypot – boty
  const name = g('name'), phone = g('phone'), email = g('email'), city = g('city'), object = g('object');
  if (!name || !phone || !email || !city || !object || !f.get('consent')) return json({ ok: false, error: 'missing_fields' }, 400);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ ok: false, error: 'bad_email' }, 400);
  if (!env.RESEND_API_KEY) return json({ ok: false, error: 'not_configured' }, 500);

  const rows: [string, string][] = [
    ['Imię i nazwisko', name], ['Telefon', phone], ['E-mail', email], ['Miejscowość', city], ['Rodzaj obiektu', object],
    ['Powierzchnia (m²)', g('area')], ['Etap inwestycji', g('stage')], ['Wykończenie podłogi', g('floor')], ['Wiadomość', g('message')],
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
  if (!res.ok) return json({ ok: false, error: 'send_failed' }, 502);
  return json({ ok: true });
};
