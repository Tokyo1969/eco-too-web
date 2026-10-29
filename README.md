# ECO-TOO – strona www (Astro + Cloudflare Workers)

Statyczna strona (Astro) serwowana przez Cloudflare Worker (`wrangler.jsonc`, pliki z `dist/`).
Formularz kontaktowy: `POST /api/contact` → `worker/index.ts` → `functions/api/contact.ts` (wysyłka przez Resend).

## Komendy
- `npm install` · `npm run dev` · `npm run build` (wynik w `dist/`)
- `npm run images -- <katalog_ze_zdjeciami>` – regeneracja WebP (mapowanie w `scripts/images.mjs`)
- `npm test` – testy generowania Markdown i negocjacji formatu (Node.js 22.6+).

## Markdown dla agentów
- `npm run build` generuje pliki `.md` z treści `<main>` każdej zbudowanej strony HTML. Nawigacja, stopka i skrypty nie trafiają do Markdown.
- Worker obsługuje wszystkie żądania (`assets.run_worker_first: true`). Dla stron żądania GET/HEAD z `Accept: text/markdown` otrzymują `Content-Type: text/markdown; charset=utf-8`; domyślnie pozostaje HTML. Wagi `q` są respektowane, a `q=0` wyłącza Markdown.
- Odpowiedzi stron mają `Vary: Accept`. Przekierowania, błędy, pliki statyczne i API zachowują dotychczasowe działanie. Markdown nie używa walidatorów ani zakresów bajtowych HTML; liczba tokenów nie jest szacowana.
- Test lokalny po buildzie: `npx wrangler dev`, następnie `curl.exe -i -H "Accept: text/markdown" http://localhost:8787/` oraz `curl.exe -i -H "Accept: text/html" http://localhost:8787/`.
- `astro dev` i `astro preview` nie uruchamiają Workera, więc negocjację formatu należy sprawdzać przez Wrangler. Nie jest wymagane włączenie usługi Markdown for Agents w panelu Cloudflare.

## Gdzie zmieniać treści
### Katalog API
- `/.well-known/api-catalog` — katalog RFC 9727 (`application/linkset+json`), źródło: `public/.well-known/api-catalog`. Zawiera jedyne obecnie dostępne API: formularz kontaktowy.
- `/openapi.json` — specyfikacja OpenAPI 3.1; `/dokumentacja-api` — dokumentacja użytkowa (również Markdown przez negocjację formatu).
- Typy MIME ustawia `public/_headers`. Dodając API, aktualizuj katalog, specyfikację i dokumentację. Nie publikujemy relacji `status`, ponieważ nie ma osobnego endpointu zdrowia.
- Lokalnie sprawdzaj przez Wrangler po buildzie: `curl.exe -i http://localhost:8787/.well-known/api-catalog`. Oczekiwane: HTTP 200, `Content-Type: application/linkset+json`.
- Strona główna (`/`) zwraca nagłówek `Link` z relacjami `api-catalog`, `service-desc`, `service-doc` i `describedby` (RFC 8288). Konfiguracja: `public/_headers`; działa dla GET/HEAD w HTML i Markdown. Relacje opisu i dokumentacji API mają `anchor="/api/contact"`, a `describedby` wskazuje `/llms.txt`.

### Treści strony
- `public/auth.md` — publiczny dokument dla agentów (`/auth.md`, `text/markdown`). Opisuje odczyt bez poświadczeń oraz brak rejestracji, wydawania kluczy i OAuth. Nie deklaruje nieistniejących przepływów; sam dokument nie gwarantuje zaliczenia testu `authMd` wymagającego rejestracji.
- `src/data/site.ts` – dane kontaktowe, menu, FAQ, realizacje, opisy zdjęć (alt), stawki kalkulatora
- `src/pages/*.astro` – treści podstron
- `src/components/Analytics.astro` – baner zgody na analitykę. Wybór jest zapisywany w localStorage; zmiana i wycofanie zgody są dostępne w stopce („Ustawienia cookies”).
- `src/components/TagManager.astro` – Google Tag Manager (`GTM-T79GMQ28`), inicjalizacja w `<head>`, pobranie kontenera wyłącznie po zgodzie. Consent Mode domyślnie odmawia zgód analitycznych i reklamowych; baner przyznaje jedynie `analytics_storage`. Celowo bez iframe `noscript`, który omijałby zgodę.
- **Konfiguracja GTM:** skonfiguruj i opublikuj w kontenerze tag Google dla GA4 `G-LN1KQSKH5F` z wyzwalaczem na wszystkich stronach. Bezpośredni tag GA4 został usunięty, aby nie dublować pomiaru. Kontener jest przeznaczony wyłącznie do analityki; nie dodawaj tagów reklamowych ani tagów ignorujących zgodę. Przy wycofaniu zgody strona usuwa cookies `_ga` i `_ga_*`.

## Wdrożenie (stan obecny)
- **Repo:** `Tokyo1969/eco-too-web`, gałąź `main`. Każdy push na `main` uruchamia build i wdrożenie.
- **Cloudflare Worker `eco-too-web`** (Workers Builds): build `npm run build`, deploy `npx wrangler deploy`.
  Lokalny test bez wdrażania: `npm run build && npx wrangler deploy --dry-run`.
- **Sekrety** (Worker → Settings → Variables and Secrets – *nie* zmienne buildu, typ **Secret**):
  `RESEND_API_KEY`, `RECAPTCHA_SECRET_KEY` (tajny klucz reCAPTCHA v3), opcjonalnie `MAIL_TO`, `MAIL_FROM`. Zwykłe zmienne „Text” są kasowane przy każdym deployu.
- **Domeny:** `eco-too.opole.pl` i `www.eco-too.opole.pl` jako Custom domains Workera.
  Redirect Rule: `www` → domena główna (301). SSL/TLS: Always Use HTTPS.
- **DNS:** strefa w Cloudflare (serwery nazw ustawione w lh.pl na Cloudflare) – rekordy w panelu lh.pl nie działają.
  - Poczta zostaje w lh.pl: MX `mail17.lh.pl`, SPF `include:_spf.lh.pl`, DMARC – nie ruszać.
  - Resend: CNAME `send` i TXT `resend._domainkey` – **DNS only** (szara chmurka). Z proxy Resend nie wyśle maila.
- **Diagnostyka formularza:** błędy Resend w Worker → Logs („Resend error”). Odpowiedzi API:
  `not_configured` = brak `RESEND_API_KEY`, `recaptcha_not_configured` = brak `RECAPTCHA_SECRET_KEY`,
  `recaptcha_failed` = token nie przeszedł weryfikacji, `send_failed` = Resend odrzucił (zwykle DNS/weryfikacja domeny).
- **Google Search Console:** zgłoszona `https://eco-too.opole.pl/sitemap-index.xml`.

## Do uzupełnienia przed publikacją
- `/polityka-prywatnosci` – weryfikacja prawna, umowy powierzenia (Cloudflare, Resend, Google, LH.pl) (strona ma `noindex`)
- Gwarancja, uprawnienia, lata doświadczenia, opinie klientów – tylko prawdziwe dane
- Zdjęcia z folderu „Przykładowe zdjęcia konkurencji” celowo NIE zostały użyte
