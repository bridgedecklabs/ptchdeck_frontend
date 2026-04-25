import crypto, { webcrypto } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

if (!globalThis.crypto) {
  globalThis.crypto = webcrypto;
}
if (!crypto.getRandomValues) {
  crypto.getRandomValues = webcrypto.getRandomValues.bind(webcrypto);
}

const viteBinPath = path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js');
import(pathToFileURL(viteBinPath).href);
