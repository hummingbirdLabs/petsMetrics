#!/usr/bin/env node
/**
 * Apply Hindi translations to messages/hi.json
 * Reads translations from scripts/hi-translations-data.json and applies them.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';

const __dirname = path.dirname(new URL(import.meta.url).filename);
const hiJsonPath = path.resolve(__dirname, '../messages/hi.json');
const dataPath = path.resolve(__dirname, 'hi-translations-data.json');

function readJson(p) {
  let c = fs.readFileSync(p, 'utf8');
  if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);
  return JSON.parse(c);
}

function deepSet(obj, dotpath, value) {
  const keys = dotpath.split('.');
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (typeof cur[keys[i]] !== 'object') cur[keys[i]] = {};
    cur = cur[keys[i]];
  }
  cur[keys[keys.length - 1]] = value;
}

const hi = readJson(hiJsonPath);
const translations = readJson(dataPath);

let applied = 0;
for (const [key, value] of Object.entries(translations)) {
  deepSet(hi, key, value);
  applied++;
}

fs.writeFileSync(hiJsonPath, JSON.stringify(hi, null, 2), 'utf8');
console.log(`✓ Applied ${applied} Hindi translations to messages/hi.json`);
