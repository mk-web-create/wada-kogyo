// Optional packaging step for hosting. The source index.html also opens directly.
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
for (const file of ['index.html', 'styles.css', 'script.js']) {
  fs.copyFileSync(path.join(root, file), path.join(root, 'dist', file));
}
fs.cpSync(path.join(root, 'assets'), path.join(root, 'dist', 'assets'), { recursive: true });
console.log('Static site packaged into dist/');
