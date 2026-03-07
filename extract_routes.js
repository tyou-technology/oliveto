const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/**/*.ts').filter(f => !f.includes('.test.ts'));
const usedRoutes = new Set();

const regexes = [
  /api\.(get|post|patch|put|delete)(?:<[^>]+>)?\(\s*['"`]([^'"`]+)['"`]/g,
  /fetch\(\s*(?:`\$\{env\.NEXT_PUBLIC_API_URL\}|\s*['"`])([^'"`$?]+)[?$]/g,
  /fetch\(\s*`\$\{env\.NEXT_PUBLIC_API_URL\}([^`$?]+)/g
];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = regexes[0].exec(content)) !== null) {
    usedRoutes.add(`${match[1].toUpperCase()} ${match[2]}`);
  }
  while ((match = regexes[1].exec(content)) !== null) {
    usedRoutes.add(`GET ${match[1]}`);
  }
  while ((match = regexes[2].exec(content)) !== null) {
     usedRoutes.add(`GET ${match[1]}`);
  }
});

console.log("Found in codebase:");
Array.from(usedRoutes).sort().forEach(r => console.log(r));
