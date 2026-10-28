import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import worker from './index.ts';

test('auth.md documents public access without advertising unsupported registration', async () => {
  const document = await readFile(new URL('../public/auth.md', import.meta.url), 'utf8');
  const headers = await readFile(new URL('../public/_headers', import.meta.url), 'utf8');
  assert.match(document, /^# .*auth\.md$/m);
  assert.match(document, /Agent registration is not supported/);
  assert.match(document, /no credentials are issued/);
  assert.match(document, /Do not submit forms during passive discovery scans/);
  assert.match(headers, /^\/auth\.md\r?\n\s+Content-Type: text\/markdown; charset=utf-8$/m);
  for (const method of ['GET', 'HEAD']) {
    const env = {
      ASSETS: {
        fetch: async () => new Response(method === 'HEAD' ? null : document, {
          headers: { 'content-type': 'text/markdown; charset=utf-8' },
        }),
      },
    };
    const response = await worker.fetch(new Request('https://example.com/auth.md', {
      method, headers: { accept: 'text/markdown' },
    }), env);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), 'text/markdown; charset=utf-8');
    assert.equal(await response.text(), method === 'HEAD' ? '' : document);
  }
});

test('API catalog links every documented API to a specification and documentation', async () => {
  const catalog = JSON.parse(await readFile(new URL('../public/.well-known/api-catalog', import.meta.url), 'utf8'));
  const spec = JSON.parse(await readFile(new URL('../public/openapi.json', import.meta.url), 'utf8'));
  const headers = await readFile(new URL('../public/_headers', import.meta.url), 'utf8');
  assert.match(headers, /\/\.well-known\/api-catalog\r?\n\s+Content-Type: application\/linkset\+json/);
  assert.equal(spec.openapi, '3.1.0');
  assert.equal(catalog.linkset.length, Object.keys(spec.paths).length);
  for (const entry of catalog.linkset) {
    const anchor = new URL(entry.anchor);
    assert.equal(anchor.origin, spec.servers[0].url);
    assert.ok(spec.paths[anchor.pathname]);
    assert.equal(entry['service-desc'][0].href, `${anchor.origin}/openapi.json`);
    assert.equal(entry['service-desc'][0].type, 'application/vnd.oai.openapi+json');
    assert.equal(entry['service-doc'][0].href, spec.externalDocs.url);
    assert.equal(entry['service-doc'][0].type, 'text/html');
    const page = await readFile(new URL(`../src/pages${new URL(entry['service-doc'][0].href).pathname}.astro`, import.meta.url), 'utf8');
    assert.ok(page.includes(anchor.pathname));
  }
});

function assets(htmlHeaders = {}) {
  const requests = [];
  return {
    requests,
    env: {
      ASSETS: {
        async fetch(request) {
          requests.push(request);
          const path = new URL(request.url).pathname;
          if (path === '/old') return new Response(null, { status: 301, headers: { location: '/faq' } });
          if (path === '/missing') return new Response('<main>Not found</main>', { status: 404, headers: { 'content-type': 'text/html' } });
          if (path === '/robots.txt') return new Response('User-agent: *', { headers: { 'content-type': 'text/plain' } });
          if (path.endsWith('.md')) return new Response(request.method === 'HEAD' ? null : '# Treść\n');
          return new Response(request.method === 'HEAD' ? null : '<main><h1>Treść</h1></main>', {
            headers: { 'content-type': 'text/html; charset=utf-8', etag: '"html"', 'x-frame-options': 'SAMEORIGIN', ...htmlHeaders },
          });
        },
      },
    },
  };
}

test('homepage discovery links survive HTML and Markdown GET/HEAD responses', async () => {
  const headers = await readFile(new URL('../public/_headers', import.meta.url), 'utf8');
  const link = headers.match(/^\/\r?\n\s+Link: (.+)$/m)?.[1];
  assert.ok(link);
  const expected = [
    ['/.well-known/api-catalog', 'api-catalog', 'application/linkset+json'],
    ['/openapi.json', 'service-desc', 'application/vnd.oai.openapi+json'],
    ['/dokumentacja-api', 'service-doc', 'text/html'],
    ['/llms.txt', 'describedby', 'text/plain'],
  ];
  assert.equal(link.split(', ').length, expected.length);
  for (const [path, relation, type] of expected) {
    assert.ok(link.includes(`<${path}>; rel="${relation}"; type="${type}"`));
  }
  for (const method of ['GET', 'HEAD']) {
    for (const accept of ['text/html', 'text/markdown']) {
      const { env } = assets({ link });
      const response = await worker.fetch(new Request('https://example.com/', { method, headers: { accept } }), env);
      assert.equal(response.status, 200);
      assert.equal(response.headers.get('link'), link);
      if (method === 'HEAD') assert.equal(await response.text(), '');
    }
  }
});

for (const accept of ['', '*/*', 'text/html', 'text/*', 'text/markdown;q=0', 'text/markdown;q=0.5, text/html;q=1', 'text/markdownish', 'text/markdown;q=bad']) {
  test(`HTML remains default for Accept: ${accept}`, async () => {
    const { env, requests } = assets();
    const response = await worker.fetch(new Request('https://example.com/', { headers: { accept } }), env);
    assert.match(response.headers.get('content-type'), /^text\/html/);
    assert.equal(response.headers.get('vary'), 'Accept');
    assert.equal(requests.length, 1);
    assert.match(await response.text(), /<main>/);
  });
}

for (const accept of ['text/markdown', 'text/html, text/markdown', 'TEXT/MARKDOWN; charset=utf-8', 'text/markdown;q=0.8, text/html;q=0.5', 'text/markdown, */*;q=0.5']) {
  test(`negotiates Markdown for Accept: ${accept}`, async () => {
    const { env, requests } = assets({ vary: 'Accept-Encoding', 'content-length': '123', 'last-modified': 'Wed, 28 Oct 2026 12:00:00 GMT' });
    const response = await worker.fetch(new Request('https://example.com/faq?test=1', { headers: { accept } }), env);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), 'text/markdown; charset=utf-8');
    assert.equal(response.headers.get('vary'), 'Accept-Encoding, Accept');
    assert.equal(response.headers.get('x-frame-options'), 'SAMEORIGIN');
    for (const header of ['content-length', 'etag', 'last-modified']) assert.equal(response.headers.get(header), null);
    assert.equal(await response.text(), '# Treść\n');
    assert.equal(new URL(requests[1].url).pathname, '/faq.md');
  });
}

test('maps root, trailing slash and HTML paths and supports HEAD', async () => {
  for (const [path, expected] of [['/', '/index.md'], ['/faq/', '/faq.md'], ['/faq.html', '/faq.md']]) {
    const { env, requests } = assets();
    const response = await worker.fetch(new Request(`https://example.com${path}`, {
      method: 'HEAD', headers: { accept: 'text/markdown' },
    }), env);
    assert.equal(response.headers.get('content-type'), 'text/markdown; charset=utf-8');
    assert.equal(await response.text(), '');
    assert.equal(new URL(requests[1].url).pathname, expected);
    assert.equal(requests[1].method, 'HEAD');
  }
});

test('does not send HTML validators or ranges for negotiated Markdown', async () => {
  const { env, requests } = assets();
  const headers = { accept: 'text/markdown', 'if-none-match': '"html"', 'if-modified-since': 'Wed, 28 Oct 2026 12:00:00 GMT', range: 'bytes=0-10', 'if-range': '"html"' };
  const response = await worker.fetch(new Request('https://example.com/', { headers }), env);
  assert.equal(response.status, 200);
  for (const request of requests) {
    for (const header of ['if-none-match', 'if-modified-since', 'range', 'if-range']) assert.equal(request.headers.get(header), null);
  }
});

test('preserves redirects, missing pages, non-HTML assets and API behavior', async () => {
  for (const [path, status, content] of [['/old', 301, ''], ['/missing', 404, '<main>Not found</main>'], ['/robots.txt', 200, 'User-agent: *'], ['/api/contact', 405, 'Method Not Allowed']]) {
    const { env, requests } = assets();
    const response = await worker.fetch(new Request(`https://example.com${path}`, { headers: { accept: 'text/markdown' } }), env);
    assert.equal(response.status, status);
    assert.equal(await response.text(), content);
    assert.equal(requests.length, path === '/api/contact' ? 0 : 1);
    if (status === 301) assert.equal(response.headers.get('location'), '/faq');
    if (status === 405) assert.equal(response.headers.get('allow'), 'POST');
  }
  const { env } = assets();
  const response = await worker.fetch(new Request('https://example.com/api/contact', { method: 'POST', headers: { accept: 'text/markdown' }, body: new FormData() }), env);
  assert.equal(response.status, 400);
  assert.equal((await response.json()).error, 'missing_fields');
});

test('keeps browser conditional responses cache-safe without duplicating Vary', async () => {
  const env = { ASSETS: { fetch: async () => new Response(null, { status: 304, headers: { vary: 'accept, Accept-Encoding', etag: '"html"' } }) } };
  const response = await worker.fetch(new Request('https://example.com/', { headers: { 'if-none-match': '"html"' } }), env);
  assert.equal(response.status, 304);
  assert.equal(response.headers.get('vary'), 'accept, Accept-Encoding');
  assert.equal(response.headers.get('etag'), '"html"');
});

test('fails explicitly when a generated Markdown asset is unavailable', async (t) => {
  const error = t.mock.method(console, 'error', () => {});
  const { env } = assets();
  const fetch = env.ASSETS.fetch;
  env.ASSETS.fetch = (request) => new URL(request.url).pathname.endsWith('.md')
    ? Promise.resolve(new Response('Missing', { status: 404 }))
    : fetch(request);
  const response = await worker.fetch(new Request('https://example.com/', { headers: { accept: 'text/markdown' } }), env);
  assert.equal(response.status, 500);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal(error.mock.callCount(), 1);
});
