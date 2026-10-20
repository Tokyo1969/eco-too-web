// Generuje zoptymalizowane WebP z oryginałów. Użycie: node scripts/images.mjs <katalog_zrodlowy>
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
const src = process.argv[2];
const out = 'public/img';
// slug -> plik źródłowy (po końcówce nazwy)
const map = {
  'ochodze-1': 'eco-too-ogrzewanie-podczerwien-opole-1.jpg',
  'ochodze-2': 'eco-too-ogrzewanie-podczerwien-opole-2.jpg',
  'ochodze-3': 'eco-too-ogrzewanie-podczerwien-opole-3.jpg',
  'ochodze-4': 'eco-too-ogrzewanie-podczerwien-opole-4.jpg',
  'ochodze-5': 'eco-too-ogrzewanie-podczerwien-opole-5.jpg',
  'ochodze-6': 'eco-too-ogrzewanie-podczerwien-opole-6.jpg',
  'ochodze-7': '20221115_105540.jpg',
  'ochodze-8': '20221115_162103.jpg',
  'ochodze-9': '20221116_142633.jpg',
  'ochodze-10': '20221118_122355.jpg',
  'drogoszow-1': 'Ogrzewanie-pod_ogowe-Eco-TOO-Opole_1.jpg',
  'drogoszow-2': 'Ogrzewanie-pod_ogowe-Eco-TOO-Opole_2.jpg',
  'drogoszow-3': 'Ogrzewanie-pod_ogowe-Eco-TOO-Opole_3.jpg',
  'drogoszow-4': 'Ogrzewanie-pod_ogowe-Eco-TOO-Opole_4.jpg',
  'drogoszow-5': 'Ogrzewanie-pod_ogowe-Eco-TOO-Opole_5.jpg',
  'drogoszow-6': 'Ogrzewanie-pod_ogowe-Eco-TOO-Opole_6.jpg',
  'dobrzen-1': 'eco-too-dobrzen-wlk-ogrzewanie_1.jpg',
  'dobrzen-2': 'eco-too-dobrzen-wlk-ogrzewanie_2.jpg',
  'dobrzen-3': 'eco-too-dobrzen-wlk-ogrzewanie_3.jpg',
  'dobrzen-4': '20221206_182634.jpg',
  'dobrzen-5': '20221206_182653.jpg',
  'folia-1m': 'Grafika_folia_1m.png',
  'folia-05m': 'Grafika_folia_0.5m.png',
  'zestaw': 'zestaw.jpg',
};
const files = fs.readdirSync(src);
for (const [slug, tail] of Object.entries(map)) {
  const f = files.find((x) => x.endsWith(tail));
  if (!f) { console.error('BRAK', slug, tail); continue; }
  const isPng = f.endsWith('.png');
  for (const w of [480, 900, 1600]) {
    const img = sharp(path.join(src, f)).rotate().resize({ width: w, withoutEnlargement: true });
    if (isPng) img.flatten({ background: '#ffffff' });
    await img.webp({ quality: 74 }).toFile(`${out}/${slug}-${w}.webp`);
  }
  const m = await sharp(path.join(src, f)).metadata();
  console.log(slug, m.width, m.height);
}
// logo: przytnij do zawartości
const logoSrc = files.find((x) => x.endsWith('logo-eco-too.png'));
const trimmed = await sharp(path.join(src, logoSrc)).trim({ threshold: 20 }).toBuffer();
await sharp(trimmed).resize({ width: 800 }).png({ compressionLevel: 9 }).toFile('public/logo.png');
await sharp(trimmed).resize({ width: 800 }).webp({ quality: 90 }).toFile('public/logo.webp');
// favicon / ikona: sam znak (lewa część)
const tm = await sharp(trimmed).metadata();
const mark = await sharp(trimmed).extract({ left: 0, top: 0, width: Math.round(tm.width * 0.22), height: tm.height }).toBuffer();
await sharp(mark).resize(256, 256, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } }).png().toFile('public/favicon.png');
console.log('logo', tm.width, tm.height);
