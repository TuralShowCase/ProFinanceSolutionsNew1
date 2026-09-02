import fs from 'fs';
import path from 'path';


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
 
  for (const chunk of src.split('<')) {
    if (!/opacity:\s*0\s*[,}]/.test(chunk)) continue;
    const m = chunk.match(/className="([^"]+)"/);
    if (!m) continue;
    for (const c of m[1].split(/\s+/)) if (c) classes.add(c);
  }
}

for (const file of walk('src')) {
  const src = fs.readFileSync(file, 'utf8');
  for (const m of src.matchAll(/gsap\.(?:fromTo|from|set)\(\s*"\.([a-z][\w-]*)"/g)) {
    classes.add(m[1]);
  }
}

console.log([...classes].sort().join(','));
