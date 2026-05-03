#!/usr/bin/env node
// Splits src/frontend.ts into src/frontend/ module files.
// Run with: node scripts/split-frontend.js

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src', 'frontend.ts');
const OUT = path.join(__dirname, '..', 'src', 'frontend');
const BT = String.fromCharCode(96); // backtick — kept as a var to avoid literal BT in this file

const allLines = fs.readFileSync(SRC, 'utf8').split('\n');

// [filename, exportFnName, startLine, endLine]  (1-indexed, inclusive)
const SECTIONS = [
  ['core',          'getCoreScript',           24,   164],
  ['auth',          'getAuthScript',           165,  287],
  ['main',          'getMainScript',           288,  421],
  ['dashboard',     'getDashboardScript',      422,  595],
  ['chat',          'getChatScript',           596, 1106],
  ['threads',       'getThreadsScript',       1107, 1349],
  ['notifications', 'getNotificationsScript', 1350, 1516],
  ['memory',        'getMemoryScript',        1517, 1613],
  ['doclib',        'getDocLibScript',        1614, 1658],
  ['settings',      'getSettingsScript',      1659, 2788],
  ['google',        'getGoogleScript',        2789, 2947],
  ['skills',        'getSkillsScript',        2948, 3261],
  ['init',          'getInitScript',          3262, 3301],
  ['documents',     'getDocumentsScript',     3302, 3691],
];

fs.mkdirSync(OUT, { recursive: true });

// Write each module file
for (const [name, fn, start, end] of SECTIONS) {
  const body = allLines.slice(start - 1, end).join('\n');
  const out =
    '// ' + name + ' — Karna frontend section\n' +
    'export function ' + fn + '(): string {\n' +
    '  return ' + BT + body + BT + ';\n' +
    '}\n';
  fs.writeFileSync(path.join(OUT, name + '.ts'), out);
  console.log('  ' + name + '.ts  (' + (end - start + 1) + ' lines)');
}

// Build src/frontend/index.ts
// The HTML head is copied verbatim from lines 5-23 of original frontend.ts:
//   line  5:  return `<!DOCTYPE html>
//   lines 6-18: <html>...<head>...</head>
//   lines 19-23: <body>...<script>
// We exclude the `return \`` and reconstruct it in index.ts.
const htmlHead = allLines.slice(5, 22).join('\n'); // lines 6-22 (0-indexed 5-21)

const imports = SECTIONS
  .map(([name, fn]) => 'import { ' + fn + " } from './" + name + "';")
  .join('\n');

const fragments = SECTIONS
  .map(([, fn]) => '${' + fn + '()}')
  .join('\n');

const index =
  '// Karna frontend — HTML compositor\n' +
  '// Import JS fragments and assemble the SPA HTML returned to the browser.\n\n' +
  imports + '\n\n' +
  'export function getAppHTML(): string {\n' +
  '  return ' + BT + '<!DOCTYPE html>\n' +
  htmlHead + '\n' +
  '  <script>\n' +
  fragments + '\n' +
  '  </script>\n' +
  '</body>\n' +
  '</html>' + BT + ';\n' +
  '}\n';

fs.writeFileSync(path.join(OUT, 'index.ts'), index);
console.log('  index.ts');

console.log('\nAll done. Now update src/frontend.ts to re-export from ./frontend/index.');
