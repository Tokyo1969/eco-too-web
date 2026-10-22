# ECO-TOO – strona www (Astro + Cloudflare Workers)

Statyczna strona (Astro) serwowana przez Cloudflare Worker (`wrangler.jsonc`, pliki z `dist/`).
Formularz kontaktowy: `POST /api/contact` → `worker/index.ts` → `functions/api/contact.ts` (wysyłka przez Resend).

## Komendy
- `npm install` · `npm run dev` · `npm run build` (wynik w `dist/`)
- `npm run images -- <katalog_ze_zdjeciami>` – regeneracja WebP (mapowanie w `scripts/images.mjs`)

## Gdzie zmieniać treści
- `src/data/site.ts` – dane kontaktowe, menu, FAQ, realizacje, opisy zdjęć (alt), stawki kalkulatora
- `src/pages/*.astro` – treści podstron

## Wdrożenie (stan obecny)
- **Repo:** `Tokyo1969/eco-too-web`, gałąź `main`. Każdy push na `main` uruchamia build i wdrożenie.
- **Cloudflare Worker `eco-too-web`** (Workers Builds): build `npm run build`, deploy `npx wrangler deploy`.
  Lokalny test bez wdrażania: `npm run build && npx wrangler deploy --dry-run`.
- **Sekrety** (Worker → Settings → Variables and Secrets – *nie* zmienne buildu, typ **Secret**):
  `RESEND_API_KEY`, opcjonalnie `MAIL_TO`, `MAIL_FROM`. Zwykłe zmienne „Text” są kasowane przy każdym deployu.
- **Domeny:** `eco-too.opole.pl` i `www.eco-too.opole.pl` jako Custom domains Workera.
  Redirect Rule: `www` → domena główna (301). SSL/TLS: Always Use HTTPS.
- **DNS:** strefa w Cloudflare (serwery nazw ustawione w lh.pl na Cloudflare) – rekordy w panelu lh.pl nie działają.
  - Poczta zostaje w lh.pl: MX `mail17.lh.pl`, SPF `include:_spf.lh.pl`, DMARC – nie ruszać.
  - Resend: CNAME `send` i TXT `resend._domainkey` – **DNS only** (szara chmurka). Z proxy Resend nie wyśle maila.
- **Diagnostyka formularza:** błędy Resend w Worker → Logs („Resend error”). Odpowiedzi API:
  `not_configured` = brak `RESEND_API_KEY`, `send_failed` = Resend odrzucił (zwykle DNS/weryfikacja domeny).
- **Google Search Console:** zgłoszona `https://eco-too.opole.pl/sitemap-index.xml`.

## Do uzupełnienia przed publikacją
- `/polityka-prywatnosci` – pełna nazwa firmy, NIP, weryfikacja prawna (strona ma `noindex`)
- Gwarancja, uprawnienia, lata doświadczenia, opinie klientów – tylko prawdziwe dane
- Zdjęcia z folderu „Przykładowe zdjęcia konkurencji” celowo NIE zostały użyte
