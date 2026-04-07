const https = require('https');
const fs = require('fs');
const path = require('path');

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error('OPENAI_API_KEY not found.');
  process.exit(1);
}

const IMAGES = [
  {
    outputFile: 'research-hub-hero.png',
    prompt:
      'A premium cinematic digital illustration for a research landing page, a brilliant young Black researcher standing in a futuristic bioinformatics studio surrounded by glowing epigenetic maps, chromatin ribbons, methylation graphs, laboratory light, node-link knowledge systems, deep navy teal and gold palette, elegant and intellectual, no text, no letters, no words',
  },
  {
    outputFile: 'article-epigenetic-memory.png',
    prompt:
      'A premium cinematic editorial illustration for an article about epigenetic memory and human reprogramming, a young Black super-intellect researcher in profile inside a luminous field of chromatin loops, methylation marks, DNA ribbons and regulatory nodes, smart calm elite energy, deep navy teal and gold palette, no text, no letters, no words',
  },
];

function generateImage(prompt) {
  const requestBody = JSON.stringify({
    model: 'dall-e-3',
    prompt,
    n: 1,
    size: '1024x1024',
    quality: 'standard',
  });

  const options = {
    hostname: 'api.openai.com',
    port: 443,
    path: '/v1/images/generations',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'Content-Length': Buffer.byteLength(requestBody),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.error) {
            reject(new Error(response.error.message));
            return;
          }
          resolve(response.data[0].url);
        } catch (error) {
          reject(error);
        }
      });
    });
    req.on('error', reject);
    req.write(requestBody);
    req.end();
  });
}

function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        const file = fs.createWriteStream(outputPath);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      })
      .on('error', reject);
  });
}

async function run() {
  const outputDir = path.join(__dirname, '..', 'static', 'img', 'research');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, {recursive: true});
  }

  for (const image of IMAGES) {
    const outputPath = path.join(outputDir, image.outputFile);
    const url = await generateImage(image.prompt);
    await downloadImage(url, outputPath);
    console.log(`Saved ${image.outputFile}`);
  }
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
