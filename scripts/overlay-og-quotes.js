const fs = require('fs');
const os = require('os');
const path = require('path');
const {execFileSync} = require('child_process');

const configPath = path.join(__dirname, 'og-image-batch.json');
const repoRoot = path.join(__dirname, '..');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

function wrapText(text, maxChars = 28) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = '';

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines.join('\n');
}

function escapeAssText(text) {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/\n/g, '\\N');
}

for (const image of config.images) {
  if (!image.quote) {
    continue;
  }

  const absoluteOutput = path.join(repoRoot, image.output);
  const tempOutput = path.join(
    os.tmpdir(),
    `${path.basename(image.output, path.extname(image.output))}-quoted${path.extname(image.output)}`,
  );
  const subtitleFile = path.join(
    os.tmpdir(),
    `${path.basename(image.output, path.extname(image.output))}-quote.ass`,
  );

  const wrappedQuote = wrapText(image.quote);
  const assText = `[Script Info]
ScriptType: v4.00+
PlayResX: 1536
PlayResY: 1024
WrapStyle: 2
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Quote,DejaVu Sans,48,&H00FFFFFF,&H00000000,&HAA000000,&H78000000,0,0,0,0,100,100,0,0,3,1,2,2,120,120,92,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,0:00:00.00,0:00:05.00,Quote,,0,0,0,,${escapeAssText(wrappedQuote)}
`;

  fs.writeFileSync(subtitleFile, assText);

  execFileSync(
    'ffmpeg',
    [
      '-y',
      '-i',
      absoluteOutput,
      '-vf',
      `subtitles='${subtitleFile}'`,
      '-frames:v',
      '1',
      tempOutput,
    ],
    {
      stdio: 'inherit',
      cwd: repoRoot,
    },
  );

  fs.copyFileSync(tempOutput, absoluteOutput);
}
