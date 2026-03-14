const https = require('https');
const fs = require('fs');
const path = require('path');

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error('❌ Error: OPENAI_API_KEY not found.');
  process.exit(1);
}

const CHARACTERS = {
  maya: "Maya, 28, Lead Systems Architect. Sharp features, amber-flecked eyes, black tech-vest over a white turtleneck. Disney/Pixar style.",
  leo: "Leo, 22, Rogue Data Hacker. Messy blonde hair, oversized headphones, neon-accented hoodie. Disney/Pixar style.",
  aris: "Dr. Aris, 38, Silicon Logistics Expert. Distinguished graying temples, silver-rimmed glasses, structured charcoal blazer. Disney/Pixar style."
};

const MISSION_NAME = "silicon-deadlock";
const MDX_PATH = path.join(__dirname, '..', 'thought-experiments', 'Algorithms', 'Medium', 'silicon-deadlock.mdx');

const IMAGES = [
  { id: 1, prompt: "Cinematic wide shot of a massive, dark automated shipping port in Grand Rapids with data centers on fire and hundreds of idle robotic trucks forming a massive gridlock. High-stakes emergency vibe." },
  { id: 2, prompt: "The team (Maya, Leo, Aris) meeting in a dark high-tech war room. Maya visualizing a complex 3D topological graph. Leo looks frantic." },
  { id: 3, prompt: "Topological epiphany. Leo pointing at a glowing red circular loop in a holographic data stream while Maya explains the fix." },
  { id: 4, prompt: "A 3D blueprint of Kahn's Algorithm showing data flowing into a zero-dependency queue. Highly graphical and technical." },
  { id: 5, prompt: "Leo hitting a massive glowing mechanical 'Enter' key. He has a look of intense focus. Blue light reflecting off his glasses." },
  { id: 6, prompt: "Dramatic humorous shot: Leo sweating as he tries to 'snip' a red self-referential wire in a digital landscape. Maya looks on with a facepalm." },
  { id: 7, prompt: "Maya re-routing signals using a glowing 3D interface. The robotic trucks in the background start to move in unison." },
  { id: 8, prompt: "A massive screen showing the GVSU Laker Shield turning from red to glowing green. The Davenport hacker network shattering." },
  { id: 9, prompt: "Cinematic closing shot: The team fist-bumping on the Blue Bridge at night, illuminated by soft blue and teal lights. Mission Accomplished." }
];

async function generateSequentialImages() {
  const outputDir = path.join(__dirname, '..', 'static', 'img', 'quests', MISSION_NAME);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  let previousImageUrl = null;

  for (const img of IMAGES.slice(0,3)) {
    try {
      console.log(`🚀 Generating cinematic image ${img.id} (16:9 Sequential)...`);
      
      const payload = {
        model: 'dall-e-3', 
        prompt: `A 16:9 full-frame cinematic 3D animated Disney/Pixar style image. ${img.prompt}. 
        CHARACTERS: ${CHARACTERS.maya}, ${CHARACTERS.leo}, ${CHARACTERS.aris}. 
        Dramatic lighting, sharp textures, high-stakes vibe. NO text. 
        ${previousImageUrl ? 'Maintain visual and character consistency with the previous scene.' : ''}`,
        n: 1,
        size: '1024x1024', // DALL-E 3 doesn't do 16:9 via API yet, we will crop/scale in CSS
        quality: 'standard'
      };

      const imageUrl = await callOpenAI(payload);
      const filename = `quest-img-${img.id}.png`;
      const assetPath = `/img/quests/${MISSION_NAME}/${filename}`;
      
      await downloadImage(imageUrl, path.join(outputDir, filename));
      console.log(`✅ Saved ${filename}`);

      // Auto-replace placeholders in MDX
      if (fs.existsSync(MDX_PATH)) {
        let mdxContent = fs.readFileSync(MDX_PATH, 'utf8');
        const placeholder = `[IMAGE ${img.id}:`;
        const regex = new RegExp(`\\[IMAGE ${img.id}:.*?\\]`, 'g');
        mdxContent = mdxContent.replace(regex, `![Mission Visual ${img.id}](${assetPath})`);
        fs.writeFileSync(MDX_PATH, mdxContent);
        console.log(`🔗 Integrated into MDX.`);
      }

      previousImageUrl = imageUrl;
    } catch (err) {
      console.error(`❌ Failed image ${img.id}: ${err.message}`);
    }
  }
}

async function callOpenAI(payload) {
  const requestBody = JSON.stringify(payload);
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

generateSequentialImages();
