import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { generateMarkdown, toMarkdown } from './markdown.mjs';

test('converts main content, preserving headings, links, lists and Polish text', () => {
  const result = toMarkdown(`<html><head><title>Hidden title</title></head><body>
    <header>Navigation</header><main><h1>Ogrzewanie</h1>
    <p>Treść <strong>ważna</strong> i <a href="/kontakt">kontakt</a>.</p>
    <ul><li>Pierwszy</li><li>Drugi</li></ul>
    <script>alert('hidden')</script><style>.hidden {}</style><button>Click</button>
    </main><footer>Cookies</footer></body></html>`);
  assert.match(result, /^# Ogrzewanie/);
  assert.match(result, /Treść \*\*ważna\*\* i \[kontakt\]\(\/kontakt\)/);
  assert.match(result, /[*+-] +Pierwszy/);
  assert.doesNotMatch(result, /Navigation|Cookies|hidden|Click|<\/?\w/);
});

test('fails explicitly when main content is missing or empty', () => {
  assert.throws(() => toMarkdown('<body>Missing main</body>'), /no main element/);
  assert.throws(() => toMarkdown('<main><script>hidden</script></main>'), /content is empty/);
});

test('preserves table relationships and makes linked cards valid inline Markdown', () => {
  const result = toMarkdown(`<main>
    <a href="/service"><h3>Service</h3><p>Description</p></a>
    <table><thead><tr><th>System</th><th>Cost</th></tr></thead>
    <tbody><tr><td>Heating</td><td>100</td></tr></tbody></table>
    <label>Area<input type="number"></label><label>Rooms<input type="number"></label>
    </main>`);
  assert.match(result, /\[Service Description\]\(\/service\)/);
  assert.match(result, /\| System \| Cost \|/);
  assert.match(result, /\| Heating \| 100 \|/);
  assert.match(result, /Area\n\nRooms/);
});

test('generates Markdown alongside root and nested HTML without changing assets', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'eco-too-markdown-'));
  try {
    await mkdir(join(directory, 'nested'));
    await writeFile(join(directory, 'index.html'), '<main><h1>Home</h1></main>');
    await writeFile(join(directory, 'nested', 'page.html'), '<main><h1>Nested</h1></main>');
    await writeFile(join(directory, 'robots.txt'), 'User-agent: *');
    await generateMarkdown(directory);
    assert.equal(await readFile(join(directory, 'index.md'), 'utf8'), '# Home\n');
    assert.equal(await readFile(join(directory, 'nested', 'page.md'), 'utf8'), '# Nested\n');
    assert.equal(await readFile(join(directory, 'robots.txt'), 'utf8'), 'User-agent: *');
  } finally {
    await rm(directory, { recursive: true });
  }
});
