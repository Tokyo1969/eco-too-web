# ECO-TOO – strona www (Astro + Cloudflare Pages)

Statyczna strona (Astro 5), formularz kontaktowy jako Cloudflare Pages Function (`functions/api/contact.ts`).

## Komendy
- `npm install` · `npm run dev` · `npm run build` (wynik w `dist/`)
- `npm run images -- <katalog_ze_zdjeciami>` – regeneracja WebP (mapowanie w `scripts/images.mjs`)

## Gdzie zmieniać treści
- `src/data/site.ts` – dane kontaktowe, menu, FAQ, realizacje, opisy zdjęć (alt), stawki kalkulatora
- `src/pages/*.astro` – treści podstron

## Wdrożenie
1. **GitHub:** utwórz repo (np. `eco-too-web`), `git remote add origin ...`, `git push -u origin main`.
2. **Cloudflare Pages:** Workers & Pages → Create → Pages → Connect to Git → wybierz repo.
   Build command: `npm run build` · Output directory: `dist` · zmienna `NODE_VERSION=22`.
3. **Formularz:** konto na resend.com, zweryfikuj domenę `eco-too.opole.pl` (rekordy DNS), utwórz klucz API.
   W Pages → Settings → Variables and Secrets dodaj: `RESEND_API_KEY` (Secret), opcjonalnie `MAIL_TO`, `MAIL_FROM`.
4. **Domena (lh.pl):** w Pages → Custom domains dodaj `eco-too.opole.pl` i `www`.
   Najprościej: zostaw domenę w lh.pl i ustaw rekord CNAME na `<projekt>.pages.dev`
   (dla domeny głównej bez CNAME-flattening: zmień serwery nazw na Cloudflare i przenieś strefę DNS tam).
5. **Poczta (lh.pl):** rekordy MX/SPF/DKIM zgodne z panelem lh.pl. Jeśli DNS przejdzie do Cloudflare,
   przepisz je 1:1 (poczta „DNS only”) i dodaj rekordy Resend.
6. Po uruchomieniu: wyślij testowy formularz, zgłoś `https://eco-too.opole.pl/sitemap-index.xml` w Google Search Console.

## Do uzupełnienia przed publikacją
- `/polityka-prywatnosci` – pełna nazwa firmy, NIP, weryfikacja prawna (strona ma `noindex`)
- Gwarancja, uprawnienia, lata doświadczenia, opinie klientów – tylko prawdziwe dane
- Zdjęcia z folderu „Przykładowe zdjęcia konkurencji” celowo NIE zostały użyte
