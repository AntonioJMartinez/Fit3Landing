import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { productionConfig } from './production-config.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist', 'client');
const sitesWorkerPath = path.join(rootDir, 'dist', 'server', 'index.js');
const sourceHostingPath = path.join(rootDir, '.openai', 'hosting.json');
const builtHostingPath = path.join(rootDir, 'dist', '.openai', 'hosting.json');
const pages = [
  'index.html',
  'es/index.html',
  'fr/index.html',
  'it/index.html',
  'de/index.html',
  'pt/index.html',
  'zh/index.html',
];
const issues = [];

if (!fs.existsSync(sitesWorkerPath)) {
  issues.push('dist/server/index.js: missing Sites-compatible worker entrypoint');
}

if (fs.existsSync(sourceHostingPath) && !fs.existsSync(builtHostingPath)) {
  issues.push('dist/.openai/hosting.json: missing Sites hosting metadata');
}

function resolveLocalReference(reference) {
  const pathname = reference.split(/[?#]/, 1)[0];
  const target = path.join(distDir, pathname);

  if (fs.existsSync(target) && fs.statSync(target).isFile()) {
    return true;
  }

  return fs.existsSync(path.join(target, 'index.html'));
}

for (const page of pages) {
  const pagePath = path.join(distDir, page);

  if (!fs.existsSync(pagePath)) {
    issues.push(`${page}: missing generated page`);
    continue;
  }

  const html = fs.readFileSync(pagePath, 'utf8');
  const ids = new Set([...html.matchAll(/id="([^"]+)"/g)].map((match) => match[1]));

  if (
    html.includes('example.com') ||
    html.includes('support@example') ||
    html.includes('href="#"')
  ) {
    issues.push(`${page}: contains a placeholder or inert link`);
  }

  const configuredValues = [
    productionConfig.siteUrl,
    productionConfig.app.appStoreUrl,
  ];

  if (productionConfig.legal.linksEnabled) {
    configuredValues.push(
      productionConfig.supportEmail,
      productionConfig.legal.privacyUrl,
      productionConfig.legal.termsUrl
    );
  }

  for (const requiredValue of configuredValues) {
    if (!html.includes(requiredValue)) {
      issues.push(`${page}: missing configured value ${requiredValue}`);
    }
  }

  if (!productionConfig.legal.linksEnabled && html.includes('class="footer-link"')) {
    issues.push(`${page}: legal/support footer links should be hidden for this temporary build`);
  }

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const reference = match[1];

    if (reference.startsWith('#') && reference.length > 1 && !ids.has(reference.slice(1))) {
      issues.push(`${page}: missing fragment target ${reference}`);
    }

    if (
      reference.startsWith('/') &&
      !reference.startsWith('//') &&
      !resolveLocalReference(reference)
    ) {
      issues.push(`${page}: missing local resource ${reference}`);
    }
  }
}

for (const publicFile of ['robots.txt', 'sitemap.xml']) {
  const filePath = path.join(distDir, publicFile);

  if (!fs.existsSync(filePath)) {
    issues.push(`${publicFile}: missing from dist`);
    continue;
  }

  const contents = fs.readFileSync(filePath, 'utf8');

  if (!contents.includes(productionConfig.siteUrl) || contents.includes('example.com')) {
    issues.push(`${publicFile}: does not use the configured production origin`);
  }
}

if (issues.length > 0) {
  throw new Error(
    `Production artifact verification failed:\n${issues.map((issue) => `  - ${issue}`).join('\n')}`
  );
}

console.log(`Verified ${pages.length} localized pages and production metadata in dist/.`);
