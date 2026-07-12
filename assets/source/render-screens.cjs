const fs = require('node:fs');
const path = require('node:path');

const sharpModule = process.env.SHARP_MODULE ||
  'C:/Users/devad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/.pnpm/sharp@0.34.5/node_modules/sharp';
const sharp = require(sharpModule);

const ASSETS = path.resolve(__dirname, '..');
const OUT = path.join(ASSETS, 'screenshots');
const logoUri = `data:image/png;base64,${fs.readFileSync(path.join(ASSETS, 'logo.png')).toString('base64')}`;

const C = {
  bg: '#080b0d',
  panel: '#0d1214',
  panel2: '#111719',
  line: '#263033',
  mint: '#73f5c3',
  amber: '#ffb454',
  white: '#f4f2eb',
  muted: '#9ca8a6',
  dim: '#65716f',
};

const esc = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

function text(x, y, value, size = 24, options = {}) {
  const {
    fill = C.white,
    weight = 400,
    anchor = 'start',
    family = 'ui',
    spacing = 0,
    opacity = 1,
  } = options;
  const font = family === 'mono'
    ? "'Cascadia Code','SFMono-Regular',Consolas,monospace"
    : "Inter,'Segoe UI',Arial,sans-serif";
  return `<text x="${x}" y="${y}" fill="${fill}" font-family="${font}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" letter-spacing="${spacing}" opacity="${opacity}">${esc(value)}</text>`;
}

function lines(x, y, values, size = 24, lineHeight = 36, options = {}) {
  return values.map((value, index) => text(x, y + index * lineHeight, value, size, options)).join('');
}

function rect(x, y, width, height, radius = 18, fill = C.panel, stroke = C.line, strokeWidth = 1) {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;
}

function pill(x, y, width, label, accent = C.mint) {
  return `${rect(x, y, width, 34, 17, `${accent}16`, `${accent}55`)}${text(x + width / 2, y + 23, label, 13, { fill: accent, weight: 700, anchor: 'middle', spacing: 1.2 })}`;
}

function toggle(x, y, on = true) {
  const fill = on ? C.mint : '#293235';
  const knobX = on ? x + 29 : x + 5;
  return `<rect x="${x}" y="${y}" width="54" height="30" rx="15" fill="${fill}"/><circle cx="${knobX + 10}" cy="${y + 15}" r="10" fill="${on ? C.bg : C.muted}"/>`;
}

function logo(x, y, width, height) {
  return `<svg x="${x}" y="${y}" width="${width}" height="${height}" viewBox="230 170 800 900" preserveAspectRatio="xMidYMid meet"><image href="${logoUri}" x="0" y="0" width="1254" height="1254"/></svg>`;
}

function base(body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${C.bg}"/><stop offset="1" stop-color="#0a1011"/></linearGradient>
    <linearGradient id="mintWash" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${C.mint}" stop-opacity=".18"/><stop offset="1" stop-color="${C.mint}" stop-opacity="0"/></linearGradient>
    <radialGradient id="glow"><stop stop-color="${C.mint}" stop-opacity=".12"/><stop offset="1" stop-color="${C.mint}" stop-opacity="0"/></radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#8da09b" stroke-opacity=".045"/></pattern>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#000" flood-opacity=".38"/></filter>
  </defs>
  <rect width="1600" height="1000" fill="url(#bg)"/>
  <rect width="1600" height="1000" fill="url(#grid)"/>
  <ellipse cx="1320" cy="90" rx="520" ry="380" fill="url(#glow)"/>
  ${body}
  </svg>`;
}

function windowChrome(title, tag) {
  return `${rect(64, 82, 1472, 852, 26, C.panel, '#2b3538', 1.2)}
    <path d="M64 150H1536" stroke="${C.line}"/>
    <circle cx="98" cy="116" r="6" fill="${C.amber}"/><circle cx="120" cy="116" r="6" fill="${C.dim}"/><circle cx="142" cy="116" r="6" fill="${C.mint}"/>
    ${text(176, 123, title, 17, { fill: C.muted, weight: 600 })}
    ${pill(1320, 99, 174, tag, C.amber)}`;
}

function heroScreen() {
  let b = windowChrome('Conversation concept', 'ILLUSTRATIVE');
  b += `<rect x="64" y="150" width="296" height="784" fill="#0a0f11"/><path d="M360 150V934" stroke="${C.line}"/>`;
  b += logo(88, 176, 54, 60);
  b += text(154, 209, 'TokenGuardian', 20, { weight: 700 });
  b += pill(92, 244, 150, 'PROFILE ACTIVE', C.mint);
  b += text(92, 316, 'RESPONSE PROFILE', 12, { fill: C.dim, weight: 700, spacing: 1.4 });
  b += rect(84, 338, 252, 76, 14, '#11191a', '#31403e');
  b += text(106, 369, 'Balanced', 17, { weight: 650 });
  b += text(106, 394, 'Direct, code-first', 14, { fill: C.muted });
  b += text(92, 462, 'BEHAVIOR', 12, { fill: C.dim, weight: 700, spacing: 1.4 });
  [['No preamble', true], ['Focused changes', true], ['Optional detail', false]].forEach(([label, on], i) => {
    b += text(102, 503 + i * 52, label, 15, { fill: on ? C.white : C.muted });
    b += `<circle cx="316" cy="${498 + i * 52}" r="5" fill="${on ? C.mint : C.dim}"/>`;
  });
  b += text(92, 876, 'Concept only', 13, { fill: C.dim });
  b += text(400, 202, 'Code-first answers, without the wrapper.', 31, { weight: 720 });
  b += text(400, 236, 'A generic conversation mockup showing the response profile in action.', 16, { fill: C.muted });
  b += rect(604, 282, 820, 100, 20, '#151c1e', '#2a3537');
  b += text(632, 317, 'YOU', 12, { fill: C.amber, weight: 700, spacing: 1.4 });
  b += text(632, 352, 'Fix the off-by-one error. Show only the change.', 20, { weight: 520 });
  b += logo(388, 419, 52, 58);
  b += text(450, 447, 'TokenGuardian response', 14, { fill: C.mint, weight: 700, spacing: .4 });
  b += rect(400, 468, 1024, 320, 20, '#0a0e10', '#2a3537');
  b += `<rect x="400" y="468" width="5" height="320" rx="2.5" fill="${C.mint}"/>`;
  b += text(436, 512, 'binary_search.py', 14, { fill: C.muted, family: 'mono' });
  b += `<path d="M436 532H1388" stroke="${C.line}"/>`;
  b += text(458, 576, '- high = len(arr)', 22, { fill: C.amber, family: 'mono' });
  b += text(458, 616, '+ high = len(arr) - 1', 22, { fill: C.mint, family: 'mono' });
  b += text(458, 676, '-     return arr[len(arr)]', 22, { fill: C.amber, family: 'mono' });
  b += text(458, 716, '+     return arr[len(arr) - 1]', 22, { fill: C.mint, family: 'mono' });
  b += text(436, 760, 'Use the final valid index: length minus one.', 16, { fill: C.muted });
  b += pill(400, 822, 112, 'DIFF ONLY', C.mint);
  b += pill(526, 822, 142, 'ONE SENTENCE', C.mint);
  b += text(800, 970, 'Illustrative interface — not an actual Claude or TokenGuardian app screenshot.', 14, { fill: C.dim, anchor: 'middle' });
  return base(b);
}

function settingsScreen() {
  let b = windowChrome('TG_CONFIG reference', 'ILLUSTRATIVE');
  b += `<rect x="64" y="150" width="300" height="784" fill="#0a0f11"/><path d="M364 150V934" stroke="${C.line}"/>`;
  b += logo(88, 176, 52, 58);
  b += text(150, 208, 'TokenGuardian', 20, { weight: 700 });
  b += text(92, 282, 'CONFIGURATION', 12, { fill: C.dim, weight: 700, spacing: 1.4 });
  [['Response controls', true], ['Formatting', false], ['Context', false], ['About', false]].forEach(([label, active], i) => {
    const y = 310 + i * 58;
    if (active) b += rect(82, y, 258, 44, 12, '#14201e', '#2d4741');
    b += text(104, y + 29, label, 16, { fill: active ? C.mint : C.muted, weight: active ? 650 : 450 });
  });
  b += text(92, 876, 'Prompt-based settings', 13, { fill: C.dim });
  b += text(408, 202, 'Response controls', 32, { weight: 720 });
  b += text(408, 238, 'A visual reference for the documented [TG_CONFIG] options.', 16, { fill: C.muted });
  b += rect(400, 274, 674, 602, 20, C.panel2, '#2a3537');
  b += text(432, 316, 'Verbosity', 16, { weight: 650 });
  b += text(432, 342, 'Choose how much explanation to include.', 14, { fill: C.muted });
  const segX = 432, segY = 365, segW = 190;
  ['Minimal', 'Balanced', 'Detailed'].forEach((label, i) => {
    const active = i === 1;
    b += rect(segX + i * (segW + 8), segY, segW, 46, 12, active ? '#18352d' : '#0b1012', active ? C.mint : C.line);
    b += text(segX + i * (segW + 8) + segW / 2, segY + 29, label, 15, { fill: active ? C.mint : C.muted, weight: active ? 700 : 500, anchor: 'middle' });
  });
  b += `<path d="M432 444H1042" stroke="${C.line}"/>`;
  const settings = [
    ['Prefer lists', 'Use dense, scannable structure', 'toggle', true],
    ['Avoid examples', 'Suppress unrequested examples', 'toggle', false],
    ['Output budget', 'Optional integer threshold', 'value', 'Not set'],
    ['Explanation level', 'Depth of supporting context', 'value', 'Conceptual'],
  ];
  settings.forEach(([label, desc, kind, value], i) => {
    const y = 493 + i * 80;
    b += text(432, y, label, 16, { weight: 620 });
    b += text(432, y + 24, desc, 13, { fill: C.muted });
    if (kind === 'toggle') {
      b += toggle(978, y - 24, value);
    } else {
      b += rect(856, y - 30, 186, 44, 11, '#0b1012', '#344043');
      b += text(949, y - 1, value, 14, { fill: C.white, weight: 600, anchor: 'middle' });
    }
  });
  b += rect(1110, 274, 390, 602, 20, '#090d0f', '#2a3537');
  b += text(1142, 316, 'TG_CONFIG', 14, { fill: C.mint, weight: 700, family: 'mono', spacing: .8 });
  b += text(1142, 347, 'Paste before a prompt', 13, { fill: C.muted });
  b += `<path d="M1142 370H1468" stroke="${C.line}"/>`;
  b += lines(1142, 416, [
    '[TG_CONFIG]',
    'verbosity: balanced',
    'prefer_lists: true',
    'avoid_examples: false',
    'output_budget: 0',
    'explanation_level: conceptual',
    '[/TG_CONFIG]',
  ], 16, 39, { family: 'mono', fill: C.white });
  b += rect(1138, 755, 334, 82, 14, '#101816', '#2d4741');
  b += text(1160, 788, 'Documented behavior', 14, { fill: C.mint, weight: 700 });
  b += text(1160, 816, 'This mockup is not a settings app.', 13, { fill: C.muted });
  b += text(800, 970, 'Illustrative configuration reference — actual configuration is supplied as prompt text.', 14, { fill: C.dim, anchor: 'middle' });
  return base(b);
}

function responseComparisonScreen() {
  let b = '';
  b += pill(72, 56, 174, 'ILLUSTRATIVE', C.amber);
  b += text(72, 130, 'Same correction. Less ceremony.', 40, { weight: 760 });
  b += text(72, 166, 'A representative baseline beside TokenGuardian\'s focused response pattern.', 17, { fill: C.muted });
  b += rect(72, 200, 1456, 92, 18, '#111719', '#2a3537');
  b += text(104, 232, 'PROMPT', 12, { fill: C.amber, weight: 700, spacing: 1.4 });
  b += text(104, 267, 'Fix the off-by-one error in return arr[len(arr)]', 21, { weight: 560 });
  const leftX = 72, rightX = 816, cardY = 326, cardW = 712, cardH = 574;
  b += rect(leftX, cardY, cardW, cardH, 22, C.panel, '#3d3530');
  b += rect(rightX, cardY, cardW, cardH, 22, C.panel, '#2d4741');
  b += `<rect x="${leftX}" y="${cardY}" width="${cardW}" height="5" rx="2.5" fill="${C.amber}"/><rect x="${rightX}" y="${cardY}" width="${cardW}" height="5" rx="2.5" fill="${C.mint}"/>`;
  b += text(104, 375, 'ILLUSTRATIVE BASELINE', 13, { fill: C.amber, weight: 750, spacing: 1.2 });
  b += text(848, 375, 'TOKENGUARDIAN', 13, { fill: C.mint, weight: 750, spacing: 1.2 });
  b += `<path d="M104 400H752M848 400H1496" stroke="${C.line}"/>`;
  b += lines(104, 447, [
    'Certainly! This is a classic off-by-one error.',
    'Array indexes start at zero, which means the final',
    'valid position is one less than the array length.',
    '',
    'The expression arr[len(arr)] attempts to access a',
    'position just beyond the end of the array. You can',
    'fix the issue by subtracting one from the length.',
    '',
    'Here is the corrected line:',
  ], 18, 33, { fill: C.muted });
  b += rect(104, 760, 648, 74, 12, '#090d0f', '#302d29');
  b += text(132, 805, 'return arr[len(arr) - 1]', 19, { family: 'mono', fill: C.white });
  b += text(104, 868, 'Correct, but wrapped in repeated explanation.', 14, { fill: C.amber });
  b += rect(848, 432, 648, 174, 14, '#090d0f', '#2d4741');
  b += text(876, 474, '- return arr[len(arr)]', 20, { family: 'mono', fill: C.amber });
  b += text(876, 516, '+ return arr[len(arr) - 1]', 20, { family: 'mono', fill: C.mint });
  b += `<path d="M876 544H1468" stroke="${C.line}"/>`;
  b += text(876, 576, 'Use the final valid index: length minus one.', 16, { fill: C.white });
  b += pill(848, 640, 112, 'DIFF FIRST', C.mint);
  b += pill(974, 640, 150, 'ONE SENTENCE', C.mint);
  b += text(848, 712, 'Focused response profile', 17, { weight: 650 });
  b += lines(848, 744, [
    '• Shows the exact change',
    '• Preserves the reason in one sentence',
    '• Omits greeting and repeated restatement',
  ], 16, 34, { fill: C.muted });
  b += text(848, 868, 'Same correction, higher information density.', 14, { fill: C.mint });
  b += text(800, 960, 'Illustrative comparison — not a measured benchmark or live product capture.', 14, { fill: C.dim, anchor: 'middle' });
  return base(b);
}

async function render(filename, svg) {
  const target = path.join(OUT, filename);
  await sharp(Buffer.from(svg), { density: 144 })
    .resize(1600, 1000, { fit: 'fill' })
    .png({ compressionLevel: 9, adaptiveFiltering: false })
    .toFile(target);
  const meta = await sharp(target).metadata();
  if (meta.width !== 1600 || meta.height !== 1000) {
    throw new Error(`${filename}: expected 1600x1000, got ${meta.width}x${meta.height}`);
  }
  console.log(`${filename}\t${meta.width}x${meta.height}`);
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  await render('hero.png', heroScreen());
  await render('settings.png', settingsScreen());
  await render('response-comparison.png', responseComparisonScreen());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
