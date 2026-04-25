const fs = require('fs');
const w = fs.readFileSync('dist/_worker.js', 'utf8');

const idx = w.indexOf('<!DOCTYPE html>');
console.log('DOCTYPE at:', idx);

if (idx > 0) {
  let start = idx;
  while (start > 0) {
    const c = w[start];
    if (c === '`' || c === '"' || c === "'") break;
    start--;
  }
  console.log('String char before DOCTYPE:', JSON.stringify(w[start]));

  let end = idx;
  let inString = false;
  let stringChar = null;

  for (let i = start; i < w.length; i++) {
    const c = w[i];
    const prev = w[i - 1] || '';
    if (prev === '\\') continue;
    if (!inString && (c === '`' || c === '"' || c === "'")) {
      inString = true;
      stringChar = c;
      continue;
    }
    if (inString && c === stringChar) {
      end = i;
      break;
    }
  }

  const html = w.substring(start + 1, end);
  fs.writeFileSync('extracted.html', html);
  console.log('Extracted HTML length:', html.length);
  console.log('First 200 chars:', html.substring(0, 200));
  console.log('Last 200 chars:', html.substring(html.length - 200));

  const scriptStart = html.indexOf('<script>');
  const scriptEnd = html.lastIndexOf('</script>');
  if (scriptStart > 0 && scriptEnd > scriptStart) {
    const script = html.substring(scriptStart + 8, scriptEnd);
    console.log('\nScript length:', script.length);
    let backtickCount = 0;
    for (let i = 0; i < script.length; i++) {
      if (script[i] === '`' && (script[i - 1] || '') !== '\\') backtickCount++;
    }
    console.log('Backtick pairs in script:', backtickCount / 2);
    const escaped = (script.match(/\\`/g) || []).length;
    console.log('Escaped backticks:', escaped);
    let lastOpen = -1;
    for (let i = 0; i < script.length; i++) {
      if (script[i] === '`' && (script[i - 1] || '') !== '\\') {
        if (lastOpen === -1) lastOpen = i;
        else lastOpen = -1;
      }
    }
    if (lastOpen !== -1) {
      console.log('UNMATCHED backtick at script position:', lastOpen);
      console.log('Context:', script.substring(Math.max(0, lastOpen - 50), lastOpen + 50));
    } else {
      console.log('All backticks appear matched in script');
    }
  }
}
