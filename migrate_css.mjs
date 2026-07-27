import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('Starting Tailwind v4 and CSS migration for branch...');

// 1. Update package.json
const pkgPath = path.resolve('package.json');
let pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
delete pkg.dependencies.sass;
pkg.devDependencies = pkg.devDependencies || {};
pkg.devDependencies['tailwindcss'] = '^4.3.1';
pkg.devDependencies['@tailwindcss/postcss'] = '^4.3.1';
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

// 2. Install dependencies
console.log('Installing dependencies...');
execSync('npm install', { stdio: 'inherit' });

// 3. Remove postcss.config.js
const postcssPaths = ['postcss.config.js', 'postcss.config.mjs'];
for (const p of postcssPaths) {
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
    console.log(`Deleted ${p}`);
  }
}
fs.writeFileSync(path.resolve('postcss.config.mjs'), 'export default { plugins: { "@tailwindcss/postcss": {} } };\n');
console.log('Created postcss.config.mjs');

// 4. Update styles
const stylesDir = path.resolve('styles');
if (fs.existsSync(stylesDir)) {
  const scssFiles = fs.readdirSync(stylesDir).filter(f => f.endsWith('.scss'));
  for (const file of scssFiles) {
    const oldPath = path.join(stylesDir, file);
    const newPath = path.join(stylesDir, file.replace('.scss', '.css'));
    
    let content = fs.readFileSync(oldPath, 'utf8');
    // Remove mixins and fix basic scss syntax
    content = content.replace(/@import\s+['"].*mixins.*['"];/g, '');
    content = content.replace(/@tailwind\s+(base|components|utilities);/g, '');
    content = content.replace(/@include\s+[a-zA-Z0-9_-]+\s*\([^)]*\)\s*\{/g, '@media (min-width: 0px) { /* converted mixin */');
    content = content.replace(/\/\/.*$/gm, '/* $& */'); // Convert // comments
    
    fs.writeFileSync(newPath, content);
    fs.unlinkSync(oldPath);
    console.log(`Renamed and migrated ${file} to .css`);
  }
  
  // Fix tailwind.css
  const twPath = path.join(stylesDir, 'tailwind.css');
  if (fs.existsSync(twPath)) {
    fs.writeFileSync(twPath, '@import "tailwindcss";\n');
  }
}

// 5. Update layout files
const appDir = path.resolve('app');
if (fs.existsSync(appDir)) {
  const layouts = ['layout.js', 'layout.tsx', 'layout.jsx'];
  for (const layout of layouts) {
    const layoutPath = path.join(appDir, layout);
    if (fs.existsSync(layoutPath)) {
      let content = fs.readFileSync(layoutPath, 'utf8');
      content = content.replace(/\.scss/g, '.css');
      fs.writeFileSync(layoutPath, content);
      console.log(`Updated imports in ${layout}`);
    }
  }
}

console.log('Migration complete.');
