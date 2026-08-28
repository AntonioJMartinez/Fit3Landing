import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const clientDir = path.join(root, 'dist', 'client');
const workerPath = path.join(root, 'worker', 'index.js');
const hostingPath = path.join(root, '.openai', 'hosting.json');
const serverDir = path.join(root, 'dist', 'server');
const metadataDir = path.join(root, 'dist', '.openai');

for (const file of [path.join(clientDir, 'index.html'), workerPath]) {
  if (!existsSync(file)) {
    throw new Error(`Missing Sites build input: ${file}`);
  }
}

mkdirSync(serverDir, { recursive: true });
copyFileSync(workerPath, path.join(serverDir, 'index.js'));

if (existsSync(hostingPath)) {
  mkdirSync(metadataDir, { recursive: true });
  copyFileSync(hostingPath, path.join(metadataDir, 'hosting.json'));
  console.log('Prepared Sites build: dist/server/index.js and dist/.openai/hosting.json');
} else {
  console.log('Prepared Sites worker: dist/server/index.js (hosting metadata will be added after site provisioning)');
}
