// Cloudflare Worker: POST /api/contact → formularz, reszta → pliki statyczne z dist/
import { handleContact, type Env as ContactEnv } from '../functions/api/contact';

interface Env extends ContactEnv { ASSETS: { fetch: (req: Request) => Promise<Response> } }

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/contact') {
      if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405, headers: { allow: 'POST' } });
      return handleContact(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};
