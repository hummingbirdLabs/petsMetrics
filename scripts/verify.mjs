import { readFileSync } from 'fs';

function r(p) {
  let c = readFileSync(p, 'utf8');
  if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);
  return JSON.parse(c);
}

const en = r('./messages/en.json');
const de = r('./messages/de.json');

function g(o, p = '') {
  let R = {};
  for (const [k, v] of Object.entries(o)) {
    const f = p ? p + '.' + k : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) Object.assign(R, g(v, f));
    else R[f] = v;
  }
  return R;
}

const eV = g(en);
const dV = g(de);
let u = {};
for (const [k, v] of Object.entries(eV)) {
  if (dV[k] === v) u[k] = v;
}
const keys = Object.keys(u);
console.log('Remaining identical keys:', keys.length);
if (keys.length > 0) {
  console.log('Keys:', JSON.stringify(keys, null, 2));
}
