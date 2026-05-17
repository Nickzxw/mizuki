import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = '/Users/a1-6/Documents/MyProject/test/blog-rebuild/src/content/posts';
const TARGET_DIR = path.resolve(__dirname, '..', 'src', 'content', 'posts');

fs.mkdirSync(TARGET_DIR, { recursive: true });

function convertFrontmatter(raw) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
  const match = raw.match(frontmatterRegex);
  if (!match) return raw;
  const fmBlock = match[1];
  const lines = fmBlock.split('\n');
  const fm = {};
  let currentKey = null;

  for (const line of lines) {
    if (line.startsWith('- ')) {
      const item = line.replace(/^- /, '').replace(/^["']|["']$/g, '').trim();
      if (currentKey) {
        if (!Array.isArray(fm[currentKey])) fm[currentKey] = [];
        fm[currentKey].push(item);
      }
    } else if (line.includes(':')) {
      const colonIdx = line.indexOf(':');
      const key = line.slice(0, colonIdx).trim();
      let value = line.slice(colonIdx + 1).trim();
      if (value === '' || value === '[') {
        fm[key] = [];
        currentKey = key;
      } else {
        value = value.replace(/^["']|["']$/g, '').trim();
        fm[key] = value;
        currentKey = key;
      }
    }
  }

  const newFm = {};
  if (fm.title) newFm.title = fm.title;
  if (fm.date) {
    const dateOnly = fm.date.split(' ')[0];
    const parts = dateOnly.split('-');
    if (parts.length === 3) {
      newFm.published = `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
    } else {
      newFm.published = dateOnly;
    }
  }
  if (fm.description) newFm.description = fm.description;
  if (fm.cover) newFm.image = fm.cover;
  if (Array.isArray(fm.categories) && fm.categories.length > 0) newFm.category = fm.categories[0];
  if (Array.isArray(fm.tags) && fm.tags.length > 0) newFm.tags = fm.tags;
  newFm.draft = false;
  newFm.pinned = false;
  newFm.lang = 'zh';

  let newContent = '---\n';
  for (const [key, value] of Object.entries(newFm)) {
    if (Array.isArray(value)) {
      newContent += `${key}:\n`;
      for (const item of value) newContent += `  - ${item}\n`;
    } else if (typeof value === 'boolean') {
      newContent += `${key}: ${value}\n`;
    } else {
      newContent += `${key}: ${value}\n`;
    }
  }
  newContent += '---\n';
  return newContent + raw.slice(match[0].length);
}

const files = fs.readdirSync(SOURCE_DIR).filter(f => f.endsWith('.md'));
console.log(`Found ${files.length} posts to migrate`);
for (const file of files) {
  const content = fs.readFileSync(path.join(SOURCE_DIR, file), 'utf-8');
  fs.writeFileSync(path.join(TARGET_DIR, file), convertFrontmatter(content), 'utf-8');
  console.log(`  ✓ ${file}`);
}
console.log('\nMigration complete!');
