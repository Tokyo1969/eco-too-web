// Zasoby nowego designu z banerów marki (src/image). Użycie: node scripts/brand.mjs
// Banery mają wtopiony tekst, więc wycinamy z nich tylko czyste fragmenty zdjęć.
import sharp from 'sharp';
import path from 'node:path';
const src = 'src/image';
const out = 'public/img';
// slug -> [plik, obszar wycięcia]
const crops = {
  'salon-zachod': ['Przytulne ciepło w eleganckim salonie2.png', { left: 1290, top: 0, width: 743, height: 773 }],
  'salon-wieczor': ['Przytulne ciepło pod stopami-1.png', { left: 0, top: 560, width: 1122, height: 700 }],
  'sypialnia': ['Ciepło i elegancja w sypialni-2.png', { left: 0, top: 660, width: 1122, height: 640 }],
  'folia-rolka': ['ECO-TOO_ Ciepło ukryte pod podłogą-3.png', { left: 0, top: 610, width: 1122, height: 670 }],
};
for (const [slug, [file, area]] of Object.entries(crops)) {
  const buf = await sharp(path.join(src, file)).extract(area).toBuffer();
  for (const w of [480, 900, 1600]) {
    await sharp(buf).resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(`${out}/${slug}-${w}.webp`);
  }
  console.log(slug, area.width, area.height);
}
// logo na ciemne tło: czarne elementy -> kremowy (#f8ead3), czerwień bez zmian
const { data, info } = await sharp(path.join(src, 'logo-eco-too.png')).trim({ threshold: 20 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < data.length; i += 4) {
  const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
  if (Math.max(r, g, b) - Math.min(r, g, b) < 60) { data[i] = 248; data[i + 1] = 234; data[i + 2] = 211; }
}
const logo = sharp(data, { raw: info }).resize({ width: 800 });
await logo.clone().png({ compressionLevel: 9 }).toFile('public/logo-on-dark.png');
await logo.clone().webp({ quality: 90 }).toFile('public/logo-on-dark.webp');
console.log('logo', info.width, info.height);
