// replaceNullSmart.js
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const targetDir = './src'; // adjust to your project folder

// Default mapping by file type
const defaultMap = {
  scss: '#000',     // replace null in SCSS with black or theme color
  js: '""',         // replace null in JS with empty string
  jsx: '""',
  ts: '""',
  tsx: '""'
};

function walk(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath, callback);
    } else if (file.match(/\.(js|jsx|ts|tsx|scss)$/)) {
      callback(fullPath);
    }
  }
}

async function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const matches = [...content.matchAll(/\bnull\b/g)];

  if (matches.length === 0) return;

  const ext = path.extname(filePath).replace('.', '');
  const defaultReplacement = defaultMap[ext] || '""';

  console.log(`\n📄 File: ${filePath}`);
  let updated = content;

  for (const match of matches) {
    const index = match.index;
    const snippet = content.substring(Math.max(0, index - 30), index + 30);
    console.log(`\nFound "null" → ...${snippet}...`);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const replacement = await new Promise(resolve => {
      rl.question(`Replace with [default: ${defaultReplacement}] (type custom or 'leave'): `, answer => {
        rl.close();
        resolve(answer.trim());
      });
    });

    if (replacement.toLowerCase() === 'leave') continue;

    const finalValue = replacement === '' ? defaultReplacement : replacement;
    updated = updated.replace(/\bnull\b/, finalValue);
  }

  if (updated !== content) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`✅ Updated: ${filePath}`);
  }
}

(async () => {
  walk(targetDir, async (filePath) => {
    await processFile(filePath);
  });
})();
