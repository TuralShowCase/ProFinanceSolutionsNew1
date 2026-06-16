import sharp from 'sharp';
import { readdirSync, statSync, mkdirSync, copyFileSync } from 'fs';
import { join } from 'path';

const publicDir = new URL('../public', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const backupDir = join(publicDir, 'png-backup');

// Keep logo-icon as PNG (favicon — AVIF not supported as favicon)
const SKIP = new Set(['logo-icon.png']);

const pngs = readdirSync(publicDir).filter(f => f.endsWith('.png') && !SKIP.has(f));

// ── Step 1: back up all originals ─────────────────────────────────
mkdirSync(backupDir, { recursive: true });
for (const file of pngs) {
  copyFileSync(join(publicDir, file), join(backupDir, file));
}
console.log(`✓  Backed up ${pngs.length} PNG files  →  public/png-backup/\n`);

// ── Step 2: convert to AVIF ───────────────────────────────────────
let totalBefore = 0, totalAfter = 0;

for (const file of pngs) {
  const input  = join(publicDir, file);
  const output = join(publicDir, file.replace('.png', '.avif'));
  const before = statSync(input).size;

  await sharp(input)
    .avif({ quality: 82, effort: 6 })
    .toFile(output);

  const after  = statSync(output).size;
  totalBefore += before;
  totalAfter  += after;

  const saving = Math.round((1 - after / before) * 100);
  const bKB    = Math.round(before / 1024);
  const aKB    = Math.round(after  / 1024);
  console.log(`✓  ${file.padEnd(52)} ${String(bKB).padStart(5)} KB → ${String(aKB).padStart(4)} KB  (${saving}% smaller)`);
}

console.log('');
console.log(`TOTAL  ${Math.round(totalBefore/1024)} KB  →  ${Math.round(totalAfter/1024)} KB  (${Math.round((1-totalAfter/totalBefore)*100)}% saved overall)`);
console.log('\nOriginals safely backed up in public/png-backup/ — delete when you are happy with the results.');
