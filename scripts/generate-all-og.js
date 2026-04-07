const {spawnSync} = require('child_process');
const path = require('path');

const configPath = path.join(__dirname, 'og-image-batch.json');
const generatorPath = path.join(__dirname, '..', '.gemini', 'skills', 'batch-image-generator', 'scripts', 'batch_generate.py');
const overlayPath = path.join(__dirname, 'overlay-og-quotes.js');

const result = spawnSync('python3', [generatorPath, '--config', configPath], {
  stdio: 'inherit',
  cwd: path.join(__dirname, '..'),
  env: process.env,
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

const overlayResult = spawnSync('node', [overlayPath], {
  stdio: 'inherit',
  cwd: path.join(__dirname, '..'),
  env: process.env,
});

if (overlayResult.status !== 0) {
  process.exit(overlayResult.status ?? 1);
}
