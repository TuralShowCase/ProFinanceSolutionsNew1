import fs from 'fs';


const css = fs.readFileSync('src/app/responsive.css', 'utf8');

const zones = { base: '', tablet: '', mobile: '' };
let depth = 0;
let current = 'base';
let buf = '';

for (let i = 0; i < css.length; i++) {
  const ch = css[i];
  if (css.startsWith('@media (max-width: 1023px)', i)) { current = 'tablet'; }
  if (css.startsWith('@media (max-width: 767px)', i)) { current = 'mobile'; }
  if (ch === '{') depth++;
  if (ch === '}') {
    depth--;
    if (depth === 0 && current !== 'base') { zones[current] += buf + '}'; buf = ''; current = 'base'; continue; }
  }
  if (current === 'base' && depth <= 1) zones.base += ch; else buf += ch;
}

function propsByClass(text) {
  const map = {};
  for (const m of text.matchAll(/\.([a-zA-Z][\w-]*)[^{}]*\{([^}]*)\}/g)) {
    const cls = m[1];
    const props = m[2].split(';').map((d) => d.split(':')[0].trim()).filter(Boolean);
    map[cls] = new Set([...(map[cls] || []), ...props]);
  }
  return map;
}

const B = propsByClass(zones.base);
const T = propsByClass(zones.tablet);
const M = propsByClass(zones.mobile);

const all = new Set([...Object.keys(B), ...Object.keys(T), ...Object.keys(M)]);
const suspect = [];

for (const cls of [...all].sort()) {
  const t = T[cls], m = M[cls];
  if (!t) continue;
 
 
  const missing = [...t].filter((p) => !m || !m.has(p));
  if (missing.length) suspect.push(`  .${cls}  ->  mobilde tekrar edilmemis: ${missing.join(', ')}`);
}

console.log('Tablet kurali olup mobil kurali olmayan ozellikler');
console.log('(mobil, tablet degerini miras alir - bilerek yapildiysa sorun yok)\n');
console.log(suspect.length ? suspect.join('\n') : '  (yok)');
