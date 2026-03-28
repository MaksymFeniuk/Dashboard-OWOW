import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dashboardDir = path.join(__dirname, '../app/dashboard');
const componentsDir = path.join(__dirname, '../components');

const replacements = [
  { from: /text-white/g, to: 'text-foreground' },
  { from: /text-gray-400/g, to: 'text-muted-foreground' },
  { from: /text-gray-500/g, to: 'text-muted-foreground' },
  { from: /text-gray-600/g, to: 'text-muted-foreground/80' },
  { from: /border-white\/\[0\.04\]/g, to: 'border-border/40' },
  { from: /border-white\/\[0\.06\]/g, to: 'border-border/60' },
  { from: /border-white\/\[0\.08\]/g, to: 'border-border/80' },
  { from: /border-white\/\[0\.03\]/g, to: 'border-border/30' },
  { from: /bg-white\/\[0\.02\]/g, to: 'bg-accent/30' },
  { from: /bg-white\/\[0\.03\]/g, to: 'bg-accent/40' },
  { from: /bg-white\/\[0\.04\]/g, to: 'bg-accent/50' },
  { from: /bg-white\/\[0\.06\]/g, to: 'bg-accent/80' },
  { from: /bg-white\/\[0\.08\]/g, to: 'bg-accent/90' },
  { from: /bg-white\/5/g, to: 'bg-accent/50' },
  { from: /bg-white\/10/g, to: 'bg-accent' },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      for (const req of replacements) {
        if (req.from.test(content)) {
          content = content.replace(req.from, req.to);
          modified = true;
        }
      }
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(dashboardDir);
processDirectory(componentsDir);
console.log("Color replacement done.");
