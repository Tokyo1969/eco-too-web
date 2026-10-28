// Cloudflare Worker: POST /api/contact → formularz, reszta → pliki statyczne z dist/
import { handleContact, type Env as ContactEnv } from '../functions/api/contact.ts';

interface Env extends ContactEnv { ASSETS: { fetch: (req: Request) => Promise<Response> } }

function prefersMarkdown(accept: string): boolean {
  const ranges = accept.toLowerCase().split(',').map((range) => {
    const [type, ...parameters] = range.trim().split(';');
    const quality = parameters.map((p) => p.trim()).find((p) => p.startsWith('q='));
    const q = quality ? Number(quality.slice(2)) : 1;
    return { type: type.trim(), q: Number.isFinite(q) && q >= 0 && q <= 1 ? q : 0 };
  });
  const quality = (type: string) => Math.max(-1, ...ranges.filter((r) => r.type === type).map((r) => r.q));
  const markdown = quality('text/markdown');
  const html = [quality('text/html'), quality('text/*'), quality('*/*')].find((q) => q >= 0) ?? 0;
  return markdown > 0 && markdown >= html;
}

function varyAccept(response: Response): Response {
  const headers = new Headers(response.headers);
  const vary = headers.get('vary')?.split(',').map((value) => value.trim()) ?? [];
  if (!vary.some((value) => value === '*' || value.toLowerCase() === 'accept')) {
    headers.set('vary', [...vary, 'Accept'].join(', '));
  }
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/contact') {
      if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405, headers: { allow: 'POST' } });
      return handleContact(request, env);
    }
    const isPage = !pathname.split('/').pop()?.includes('.') || pathname.endsWith('.html');
    const markdown = (request.method === 'GET' || request.method === 'HEAD')
      && isPage && prefersMarkdown(request.headers.get('accept') ?? '');
    let assetRequest = request;
    if (markdown) {
      const headers = new Headers(request.headers);
      headers.set('accept', 'text/html');
      // Validators and byte ranges for HTML cannot describe the Markdown representation.
      for (const header of ['if-none-match', 'if-modified-since', 'if-match', 'if-unmodified-since', 'range', 'if-range']) {
        headers.delete(header);
      }
      assetRequest = new Request(request, { headers });
    }

    const response = await env.ASSETS.fetch(assetRequest);
    if (!response.headers.get('content-type')?.toLowerCase().startsWith('text/html')) {
      return response.status === 304 ? varyAccept(response) : response;
    }
    if (!markdown || response.status !== 200) return varyAccept(response);

    const url = new URL(request.url);
    url.pathname = pathname === '/' ? '/index.md' : `${pathname.replace(/\.html$/, '').replace(/\/$/, '')}.md`;
    const markdownResponse = await env.ASSETS.fetch(new Request(url, assetRequest));
    if (markdownResponse.status !== 200) {
      console.error('Markdown asset unavailable', url.pathname, markdownResponse.status);
      return new Response('Markdown representation unavailable', { status: 500, headers: { 'cache-control': 'no-store', vary: 'Accept' } });
    }

    const headers = new Headers(response.headers);
    headers.set('content-type', 'text/markdown; charset=utf-8');
    for (const header of ['content-length', 'content-encoding', 'content-range', 'transfer-encoding', 'etag', 'last-modified']) {
      headers.delete(header);
    }
    return varyAccept(new Response(request.method === 'HEAD' ? null : markdownResponse.body, { headers }));
  },
};
