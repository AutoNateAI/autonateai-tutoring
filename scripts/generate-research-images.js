const {spawnSync} = require('child_process');
const path = require('path');

const configPath = path.join(__dirname, 'research-image-batch.json');
const generatorPath = path.join(__dirname, '..', '.gemini', 'skills', 'batch-image-generator', 'scripts', 'batch_generate.py');

const result = spawnSync('python3', [generatorPath, '--config', configPath], {
  stdio: 'inherit',
  cwd: path.join(__dirname, '..'),
  env: process.env,
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
