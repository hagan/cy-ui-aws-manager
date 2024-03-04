#!/usr/bin/env node

/**
 * Start expressjs server
 */

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { main } from "./server/index.mjs";

async function withDirectory(directory, callback) {
  const originalDirectory = process.cwd();
  try {
    process.chdir(directory);
    await callback();
  } finally {
    process.chdir(originalDirectory);
  }
}

withDirectory(__dirname, () => {
  // Perform your operations in the new directory here
  console.log(`Starting expressJS server from directory: ${process.cwd()}`);
  main();
}).catch(console.error);
