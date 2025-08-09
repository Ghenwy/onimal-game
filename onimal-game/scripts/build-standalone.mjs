import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const indexPath = path.join(distDir, 'index.html');

let html = readFileSync(indexPath, 'utf-8');

html = html.replace(/<link rel="stylesheet" href="(.*?)"\/>/, (_, href) => {
  const cssPath = path.join(distDir, href);
  const css = readFileSync(cssPath, 'utf-8');
  return `<style>\n${css}\n<\/style>`;
});

html = html.replace(/<script type="module" crossorigin src="(.*?)"><\/script>/, (_, src) => {
  const jsPath = path.join(distDir, src);
  const js = readFileSync(jsPath, 'utf-8');
  return `<script type="module">\n${js}\n<\/script>`;
});

const outPath = path.join(projectRoot, '..', 'onimal-standalone.html');
writeFileSync(outPath, html);
console.log(`Standalone build written to ${outPath}`);

