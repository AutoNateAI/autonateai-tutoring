const https = require('https');
const fs = require('fs');
const path = require('path');

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error('❌ Error: OPENAI_API_KEY not found.');
  process.exit(1);
}

const PAGES = [
  {
    name: 'homepage',
    outputFile: 'og-homepage.png',
    prompt: `A deep, captivating cinematic image. 
    A Computer Science student sitting in a dark room illuminated by the glow of 10 monitors. 
    The monitors show complex glowing 3D topological graphs and matrix code. 
    The student has a look of intense "Epiphany" on their face. 
    Meme-like quality: Hyper-dramatic lighting, high-stakes vibe. 
    Deep space navy and cyber cyan color palette. 
    Strictly NO words, NO text, NO letters.`
  },
  {
    name: 'thought-experiments',
    outputFile: 'og-thought-experiments.png',
    prompt: `A cinematic adventure-themed image. 
    A group of engineering students wearing high-tech tactical gear, standing in front of a giant digital portal. 
    Inside the portal is a landscape made entirely of floating code blocks and data structures. 
    The students are looking in with determination. 
    Meme-like quality: Action-movie poster vibes, dramatic "LFG" energy. 
    Accents of maize gold and high-signal red. 
    Strictly NO words, NO text, NO letters.`
  },
  {
    name: 'booking',
    outputFile: 'og-booking.png',
    prompt: `A captivating cinematic image of a mentor-student interaction. 
    A senior architect silhouette (Nate) pointing at a holographic distributed system diagram. 
    An engineering student next to him has their mind literally "expanding" with glowing neural connections. 
    Meme-like quality: Over-the-top "galaxy brain" aesthetic but professional and sharp. 
    Deep navy and forest teal palette. 
    Strictly NO words, NO text, NO letters.`
  },
  {
    name: 'silicon-deadlock',
    outputFile: 'og-silicon-deadlock.png',
    prompt: `A cinematic wide shot of a futuristic automated shipping port. 
    Gigantic stacks of glowing silicon chips are gridlocked. 
    A massive red circular dependency loop is hovering over the port like a storm cloud. 
    An engineering student is frantically typing at a glowing terminal in the foreground. 
    Meme-like quality: Disaster-movie tension, epic high-stakes scale. 
    Maize gold and cyber cyan highlights. 
    Strictly NO words, NO text, NO letters.`
  }
];

async function generateImage(page) {
  console.log(`🚀 Generating meme-like image for ${page.name}...`);
  const requestBody = JSON.stringify({
    model: 'dall-e-3',
    prompt: page.prompt,
    n: 1,
    size: '1024x1024',
    quality: 'standard'
  });

  const options = {
    hostname: 'api.openai.com',
    port: 443,
    path: '/v1/images/generations',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'Content-Length': Buffer.byteLength(requestBody)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.error) reject(new Error(response.error.message));
          else resolve(response.data[0].url);
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(requestBody);
    req.end();
  });
}

async function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const file = fs.createWriteStream(outputPath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function run() {
  const outputDir = path.join(__dirname, '..', 'static', 'img');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  // Only generate missing images or all if requested
  for (const page of PAGES) {
    const outputPath = path.join(outputDir, page.outputFile);
    if (!fs.existsSync(outputPath) || page.name === 'silicon-deadlock') {
      try {
        const url = await generateImage(page);
        await downloadImage(url, outputPath);
        console.log(`✅ Saved ${page.outputFile}`);
      } catch (err) {
        console.error(`❌ Failed ${page.name}: ${err.message}`);
      }
    }
  }
}

run();
