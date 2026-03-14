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
    prompt: `A cinematic social media preview image for AutoNateAI. 
    Theme: "Engineer Your Epiphany". 
    Visuals: A high-tech laboratory where abstract blueprint ideas are being forged into glowing 3D mechanical components. 
    A central glowing "A" logo. 
    Deep space navy background (#0d1526). 
    Accents: Cyber Cyan and Maize Gold. 
    Text: "AutoNateAI: Theoretical Breakthroughs → Industrial Excellence".
    Style: Professional, sharp, visionary. Like a high-end dev tool landing page.`
  },
  {
    name: 'thought-experiments',
    outputFile: 'og-thought-experiments.png',
    prompt: `A cinematic social media preview image for the AutoNateAI Thought Experiment Engine. 
    Theme: "Take a Quest with Your Mind & Computer". 
    Visuals: A dark hacker terminal displaying complex graph networks and algorithm code. 
    A digital "portal" effect where code transforms into a high-stakes adventure landscape. 
    Witty Text overlay: "Stop Grindng. Start Questing. 180+ CS Missions Await."
    Accents: High-signal red and Cyber Cyan. 
    Style: Edutainment, intense, "genius-level" challenge vibes.`
  },
  {
    name: 'booking',
    outputFile: 'og-booking.png',
    prompt: `A cinematic social media preview image for AutoNateAI 1:1 Strategy Sessions. 
    Theme: "Meet Your Sr. Architect". 
    Visuals: A professional yet cool workspace with multiple monitors showing distributed system diagrams and AI agent loops. 
    A silhouette of an expert engineer providing guidance. 
    Witty Text overlay: "Under Heavy Fire? Radio for Backup. 1:1 Tactical Deep-Dives."
    Accents: Maize Gold and Forest Teal. 
    Style: Trusted, elite, industrial-grade mentorship.`
  }
];

async function generateImage(page) {
  console.log(`🚀 Generating image for ${page.name}...`);
  const requestBody = JSON.stringify({
    model: 'dall-e-3',
    prompt: page.prompt,
    n: 1,
    size: '1024x1024', // DALL-E 3 standard
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

  for (const page of PAGES) {
    try {
      const url = await generateImage(page);
      const outputPath = path.join(outputDir, page.outputFile);
      await downloadImage(url, outputPath);
      console.log(`✅ Saved ${page.outputFile}`);
    } catch (err) {
      console.error(`❌ Failed ${page.name}: ${err.message}`);
    }
  }
}

run();
