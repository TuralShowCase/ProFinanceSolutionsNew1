import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { join, extname } from 'path';

const srcDir = new URL('../src', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');

// logo-icon.png must stay PNG (used as favicon + schema URL)
const KEEP_PNG = new Set(['logo-icon.png']);

function walk(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) results.push(...walk(full));
    else if (['.tsx', '.ts', '.css'].includes(extname(entry))) results.push(full);
  }
  return results;
}

const files = walk(srcDir);
let totalFiles = 0;

for (const file of files) {
  const original = readFileSync(file, 'utf8');
  let updated = original;

  // Replace /something.png with /something.avif — skip logo-icon.png
  updated = updated.replace(/\/([\w\-. ]+)\.png/g, (match, name) => {
    if (KEEP_PNG.has(name + '.png')) return match;
    return `/${name}.avif`;
  });

  if (updated !== original) {
    writeFileSync(file, updated, 'utf8');
    totalFiles++;
    console.log(`✓  Updated: ${file.replace(srcDir, 'src')}`);
  }
}

// Also update sitemap.ts
const sitemapPath = join(srcDir, 'app', 'sitemap.ts');
const sitemapOrig = readFileSync(sitemapPath, 'utf8');
const sitemapNew = sitemapOrig.replace(/\/([\w\-. ]+)\.png/g, (match, name) => {
  if (KEEP_PNG.has(name + '.png')) return match;
  return `/${name}.avif`;
});
if (sitemapNew !== sitemapOrig) {
  writeFileSync(sitemapPath, sitemapNew, 'utf8');
  totalFiles++;
  console.log(`✓  Updated: src/app/sitemap.ts`);
}

console.log(`\nDone — updated ${totalFiles} file(s). logo-icon.png references untouched.`);
