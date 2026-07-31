import fs from 'fs';
import path from 'path';

/**
 * Both hand-written stylesheets, not just responsive.css.
 *
 * The header and the whole service page were migrated into globals.css (they
 * are mobile-first `min-width`, matching what was already there), so scanning
 * only responsive.css left those classes unchecked — exactly the blind spot
 * this script exists to close.
 *
 * Note globals.css also holds Tailwind's `@import`s; those bring no `.class`
 * text into this file, so nothing extra leaks into the set.
 */
const SHEETS = ['src/app/responsive.css', 'src/app/globals.css'];
const classes = new Set();
for (const sheet of SHEETS) {
  const css = fs.readFileSync(sheet, 'utf8');
  for (const m of css.matchAll(/\.([a-zA-Z][\w-]*)/g)) classes.add(m[1]);
}

function walk(dir, acc = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (!p.includes('ui')) walk(p, acc);
    } else if (/\.tsx?$/.test(f)) acc.push(p);
  }
  return acc;
}

const src = walk('src').map((f) => fs.readFileSync(f, 'utf8')).join('\n');

const unused = [...classes].filter((c) => {
  // Look for the class name inside a className string anywhere in the source.
  const re = new RegExp('className=[^>]*\\b' + c + '\\b');
  return !re.test(src);
});

console.log('taranan stylesheet:', SHEETS.join(', '));
console.log('sinif sayisi:', classes.size);
if (unused.length) {
  console.log('\nCSS var ama className YOK:');
  for (const c of unused) console.log('  .' + c);
} else {
  console.log('\nHepsi bir bilesende uygulanmis.');
}
