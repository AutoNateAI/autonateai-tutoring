const https = require('https');
const fs = require('fs');
const path = require('path');

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error('❌ Error: OPENAI_API_KEY not found.');
  process.exit(1);
}

const CHARACTERS = {
  maya: "Maya, 28, Lead Systems Architect. Sharp features, amber-flecked eyes, black tech-vest over a white turtleneck.",
  leo: "Leo, 22, Rogue Data Hacker. Messy blonde hair, oversized headphones around neck, neon-accented hoodie.",
  aris: "Dr. Aris, 38, Silicon Logistics Expert. Distinguished graying temples, silver-rimmed glasses, structured charcoal blazer."
};

const MISSION_NAME = "silicon-deadlock";
const MDX_PATH = path.join(__dirname, '..', 'thought-experiments', 'Algorithms', 'Medium', 'silicon-deadlock.mdx');

const COMICS = [
  { id: 1, prompt: "The crew assembles in a dark, high-tech lab. Maya is looking at a 3D data map, Leo is typing, Aris is pointing at Grand Rapids map." },
  { id: 2, prompt: "Topological epiphany. Leo spots a circular loop in a holographic graph node." },
  { id: 3, prompt: "Kahn's Algorithm blueprint. Maya explaining the 'In-Degree' logic to the team." },
  { id: 4, prompt: "Leo hits 'Enter' on his mechanical keyboard. Data starts flowing through the supply chain." },
  { id: 5, prompt: "Leo sweating as he spots a 'Phantom Loop' self-referential error on his monitor." },
  { id: 6, prompt: "Maya re-routing signals using a glowing 3D interface to bypass the Davenport sabotage." },
  { id: 7, prompt: "Dr. Aris observing physical supply trucks moving smoothly on a logistics screen." },
  { id: 8, prompt: "The Davenport hacker network crashing as the Laker Shield goes online." },
  { id: 9, prompt: "Cinematic closing shot: The team fist-bumping in front of the illuminated Blue Bridge." }
];

async function generateSequentialComics() {
  const outputDir = path.join(__dirname, '..', 'static', 'img', 'quests', MISSION_NAME);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  let previousImageUrl = null;

  for (const comic of COMICS.slice(0,3)) {
    try {
      console.log(`🚀 Generating comic ${comic.id} (Sequential)...`);
      
      const payload = {
        model: 'dall-e-3', // Note: DALL-E 3 doesn't support 'edit' via API like gpt-image-1.5 yet, 
                           // but we simulate state by including details of previous image in the prompt.
        prompt: `A 4-cell comic strip (16:9 aspect ratio). ${comic.prompt}. 
        CHARACTERS: ${CHARACTERS.maya}, ${CHARACTERS.leo}, ${CHARACTERS.aris}. 
        Style: High-end cinematic animated style. NO text. 
        ${previousImageUrl ? 'Maintain visual consistency with the previous scene.' : ''}`,
        n: 1,
        size: '1024x1024',
        quality: 'standard'
      };

      const imageUrl = await callOpenAI(payload);
      const filename = `comic-${comic.id}.png`;
      const assetPath = `/img/quests/${MISSION_NAME}/${filename}`;
      
      await downloadImage(imageUrl, path.join(outputDir, filename));
      console.log(`✅ Saved ${filename}`);

      // Auto-integrate into MDX
      if (fs.existsSync(MDX_PATH)) {
        let mdxContent = fs.readFileSync(MDX_PATH, 'utf8');
        const placeholder = `[IMAGE ${comic.id}:`;
        // Replace the placeholder block
        const regex = new RegExp(`\\[IMAGE ${comic.id}:.*?\\]`, 'g');
        mdxContent = mdxContent.replace(regex, `![Mission Visual ${comic.id}](${assetPath})`);
        fs.writeFileSync(MDX_PATH, mdxContent);
        console.log(`🔗 Integrated into MDX.`);
      }

      previousImageUrl = imageUrl;
    } catch (err) {
      console.error(`❌ Failed comic ${comic.id}: ${err.message}`);
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

generateSequentialComics();
