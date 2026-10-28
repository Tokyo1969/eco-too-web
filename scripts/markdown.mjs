import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import domino from '@mixmark-io/domino';
import TurndownService from 'turndown';
import { tables } from 'turndown-plugin-gfm';

export function toMarkdown(html) {
  const document = domino.createDocument(html);
  const main = document.querySelector('main');
  if (!main) throw new Error('Cannot generate Markdown: page has no main element');

  const converter = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
  converter.use(tables);
  converter.remove(['script', 'style', 'noscript', 'svg', 'button', 'input', 'select', 'textarea']);
  converter.addRule('linkedCards', {
    filter: (node) => node.nodeName === 'A' && Boolean(node.querySelector('h1, h2, h3, h4, h5, h6, p, div')),
    replacement: (content, node) => {
      const label = content.replace(/^#{1,6}\s+/gm, '').replace(/\s*\n\s*/g, ' ').trim();
      const href = node.getAttribute('href');
      return `\n\n${href ? `[${label}](${href.replace(/[()]/g, '\\$&')})` : label}\n\n`;
    },
  });
  converter.addRule('labels', {
    filter: 'label',
    replacement: (content) => `\n\n${content.trim()}\n\n`,
  });
  const markdown = converter.turndown(main);
  if (!markdown.trim()) throw new Error('Cannot generate Markdown: page content is empty');
  return `${markdown}\n`;
}

export async function generateMarkdown(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await generateMarkdown(path);
    } else if (entry.name.endsWith('.html')) {
      const html = await readFile(path, 'utf8');
      await writeFile(path.replace(/\.html$/, '.md'), toMarkdown(html));
    }
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await generateMarkdown(fileURLToPath(new URL('../dist/', import.meta.url)));
}
