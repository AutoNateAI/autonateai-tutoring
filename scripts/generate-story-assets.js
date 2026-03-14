const https = require('https');
const fs = require('fs');
const path = require('path');

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error('❌ Error: OPENAI_API_KEY not found.');
  process.exit(1);
}

/**
 * Story Asset Generator for AutoNateAI Quests
 * Supports Character Anchors and Consistency via GPT Image 1.5
 */

async function generateCharacterAnchor(character) {
  console.log(`👤 Generating Anchor for ${character.name}...`);
  return callOpenAI({
    model: 'gpt-image-1.5',
    prompt: `CHARACTER ANCHOR: ${character.description}. 
    Animated style, age ${character.age}. 
    High-contrast cinematic lighting. 
    NO text.`,
    size: '1024x1024',
    quality: 'high'
  });
}

async function generateScene(scene, anchors) {
  console.log(`🎬 Generating Scene: ${scene.description}...`);
  // Passing anchors as reference URLs for consistency
  return callOpenAI({
    model: 'gpt-image-1.5',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: `${scene.description}. 
          Maintain perfect consistency with the provided characters. 
          Preserve facial geometry, clothing, and hair textures. 
          Animated style. NO text.` },
          ...anchors.map(url => ({ type: 'image_url', image_url: { url } }))
        ]
      }
    ],
    tool_choice: {"type": "function", "function": {"name": "generate_image"}},
    tools: [{
      "type": "function",
      "function": {
        "name": "generate_image",
        "parameters": {
          "action": "edit",
          "prompt": scene.description
        }
      }
    }]
  });
}

async function callOpenAI(payload) {
  const requestBody = JSON.stringify(payload);
  const options = {
    hostname: 'api.openai.com',
    port: 443,
    path: '/v1/chat/completions', // Or specific endpoint for gpt-image
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
          else resolve(response.data[0].url || 'BASE64_OR_URL_HERE');
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(requestBody);
    req.end();
  });
}

// Exporting for use in Quest Architect
module.exports = { generateCharacterAnchor, generateScene };
