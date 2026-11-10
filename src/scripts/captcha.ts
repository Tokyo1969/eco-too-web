// Cloudflare Turnstile dla formularzy (ContactForm, HeroCalc).
// Skrypt ładowany dopiero przy pierwszej interakcji z formularzem; widget jest niewidoczny,
// chyba że Cloudflare poprosi o potwierdzenie (appearance: interaction-only).
type Turnstile = {
  render(el: HTMLElement, opts: Record<string, unknown>): string;
  execute(id: string): void;
  reset(id: string): void;
};
declare global { interface Window { turnstile?: Turnstile } }

let script: Promise<void> | undefined;
function load(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  script ??= new Promise<void>((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => { script = undefined; reject(new Error('captcha_load')); };
    document.head.appendChild(s);
  });
  return script;
}

export function createCaptcha(container: HTMLElement, siteKey: string, action: string) {
  let id: string | undefined;
  let used = false;
  let pending: { resolve: (t: string) => void; reject: (e: Error) => void } | undefined;

  const ensure = async () => {
    await load();
    const t = window.turnstile;
    if (!t) throw new Error('captcha_load');
    id ??= t.render(container, {
      sitekey: siteKey,
      action,
      execution: 'execute',
      appearance: 'interaction-only',
      language: 'pl',
      callback: (token: string) => { pending?.resolve(token); pending = undefined; },
      'error-callback': (code: string) => { pending?.reject(new Error(`captcha_${code || 'error'}`)); pending = undefined; return true; },
    });
    return t;
  };

  return {
    preload: () => { void ensure().catch(() => {}); },
    async token(): Promise<string> {
      const t = await ensure();
      return new Promise<string>((resolve, reject) => {
        pending = { resolve, reject };
        if (used) t.reset(id!);
        used = true;
        t.execute(id!);
        setTimeout(() => { if (pending) { pending.reject(new Error('captcha_timeout')); pending = undefined; } }, 60000);
      });
    },
  };
}
