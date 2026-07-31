import fs from 'fs';
import path from 'path';

/**
 * Every class that ships at opacity 0 and depends on GSAP to become visible.
 *
 * Derived from the source rather than hand-listed — hand-listing is exactly how
 * `.svc-cell` got missed, which let a blank Services section through the guard.
 */
function walk(dir, acc = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (!p.includes('ui')) walk(p, acc);
    } else if (f.endsWith('.tsx')) acc.push(p);
  }
  return acc;
}

const classes = new Set();

for (const file of walk('src')) {
  const src = fs.readFileSync(file, 'utf8');
  // Split into JSX-ish element chunks and keep those declaring opacity: 0.
  for (const chunk of src.split('<')) {
    if (!/opacity:\s*0\s*[,}]/.test(chunk)) continue;
    const m = chunk.match(/className="([^"]+)"/);
    if (!m) continue;
    for (const c of m[1].split(/\s+/)) if (c) classes.add(c);
  }
}

// Classes targeted by a GSAP tween but whose opacity: 0 lives elsewhere.
for (const file of walk('src')) {
  const src = fs.readFileSync(file, 'utf8');
  for (const m of src.matchAll(/gsap\.(?:fromTo|from|set)\(\s*"\.([a-z][\w-]*)"/g)) {
    classes.add(m[1]);
  }
}

console.log([...classes].sort().join(','));
