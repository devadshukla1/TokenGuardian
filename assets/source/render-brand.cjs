#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');

function loadSharp() {
  try {
    return require('sharp');
  } catch {
    const bundled = path.join(path.dirname(process.execPath), 'node_modules', 'sharp');
    return require(bundled);
  }
}

const sharp = loadSharp();
const assetsDir = path.resolve(__dirname, '..');
const logoData = fs.readFileSync(path.join(assetsDir, 'logo.png')).toString('base64');
const logoUri = `data:image/png;base64,${logoData}`;

const sharedDefs = `
  <defs>
    <linearGradient id="mintLine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#73f5c3" stop-opacity="0"/>
      <stop offset="0.38" stop-color="#73f5c3"/>
      <stop offset="1" stop-color="#ffb454" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="mintGlow">
      <stop offset="0" stop-color="#73f5c3" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#73f5c3" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="amberGlow">
      <stop offset="0" stop-color="#ffb454" stop-opacity="0.12"/>
      <stop offset="1" stop-color="#ffb454" stop-opacity="0"/>
    </radialGradient>
    <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="10"/>
    </filter>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#f4f7f5" stroke-opacity="0.035"/>
    </pattern>
  </defs>`;

function bannerSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1600" height="520" viewBox="0 0 1600 520">
  ${sharedDefs}
  <defs>
    <clipPath id="bannerLogoClip"><rect width="300" height="300" rx="32"/></clipPath>
    <linearGradient id="bannerFrame" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#73f5c3" stop-opacity="0.38"/>
      <stop offset="0.5" stop-color="#f4f7f5" stop-opacity="0.1"/>
      <stop offset="1" stop-color="#ffb454" stop-opacity="0.24"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="520" fill="#080b0d"/>
  <rect width="1600" height="520" fill="url(#grid)"/>
  <ellipse cx="404" cy="136" rx="500" ry="350" fill="url(#mintGlow)"/>
  <ellipse cx="1480" cy="470" rx="520" ry="300" fill="url(#amberGlow)"/>
  <path d="M0 519H1600" stroke="url(#mintLine)" stroke-width="2"/>

  <g transform="translate(72 110)">
    <rect width="300" height="300" rx="32" fill="#080b0d" stroke="url(#bannerFrame)"/>
    <rect x="12" y="12" width="276" height="276" rx="24" fill="#f4f7f5" fill-opacity="0.018" stroke="#f4f7f5" stroke-opacity="0.06"/>
    <g clip-path="url(#bannerLogoClip)">
      <image x="-80" y="-65" width="460" height="460" xlink:href="${logoUri}"/>
    </g>
    <circle cx="260" cy="40" r="4" fill="#ffb454"/>
    <circle cx="260" cy="40" r="14" fill="#ffb454" opacity="0.14" filter="url(#softGlow)"/>
  </g>

  <path d="M428 118V402" stroke="#f4f7f5" stroke-opacity="0.1"/>
  <circle cx="428" cy="260" r="3" fill="#73f5c3"/>

  <g font-family="Segoe UI, Inter, Arial, sans-serif">
    <text x="500" y="185" fill="#f4f7f5" font-size="72" font-weight="700" letter-spacing="-2.4">TokenGuardian</text>
    <rect x="502" y="218" width="76" height="3" rx="1.5" fill="#73f5c3"/>
    <rect x="586" y="218" width="18" height="3" rx="1.5" fill="#ffb454"/>
    <text x="500" y="284" fill="#f4f7f5" fill-opacity="0.78" font-size="35" font-weight="400" letter-spacing="-0.6">Same intelligence. Less noise.</text>
    <g transform="translate(500 326)">
      <rect width="291" height="50" rx="25" fill="#f4f7f5" fill-opacity="0.045" stroke="#f4f7f5" stroke-opacity="0.12"/>
      <circle cx="25" cy="25" r="5" fill="#73f5c3"/>
      <text x="45" y="32" fill="#f4f7f5" fill-opacity="0.72" font-size="17" font-weight="600" letter-spacing="1.15">Claude Skill · Open Source</text>
    </g>
  </g>

  <g transform="translate(1292 118)" fill="none" stroke-linecap="round">
    <path d="M0 56H80C105 56 105 24 130 24H236" stroke="#f4f7f5" stroke-opacity="0.09"/>
    <path d="M0 88H94C119 88 119 56 144 56H236" stroke="#f4f7f5" stroke-opacity="0.14"/>
    <path d="M0 120H108C133 120 133 88 158 88H236" stroke="#73f5c3" stroke-opacity="0.34"/>
    <circle cx="236" cy="88" r="4" fill="#ffb454" stroke="none"/>
  </g>
</svg>`;
}

const cards = [
  { title: 'Coding', before: 'Long preamble before the patch', after: 'Patch first, rationale on demand' },
  { title: 'Writing', before: 'Draft, caveats, then the point', after: 'Answer first, clean supporting detail' },
  { title: 'Documentation', before: 'Every edge case in the main flow', after: 'Core path, depth kept optional' },
  { title: 'Planning', before: 'Overbuilt process before action', after: 'Small plan, immediate next move' },
  { title: 'Debugging', before: 'Symptoms retold, cause buried', after: 'Likely cause, proof, smallest fix' },
  { title: 'Research', before: 'Source dump without synthesis', after: 'Synthesis first, sources in context' },
];

function cardSvg(card, x, y) {
  return `
  <g transform="translate(${x} ${y})" font-family="Segoe UI, Inter, Arial, sans-serif">
    <rect width="453" height="272" rx="24" fill="#f4f7f5" fill-opacity="0.028" stroke="#f4f7f5" stroke-opacity="0.11"/>
    <path d="M24 1H132" stroke="#73f5c3" stroke-width="2" stroke-linecap="round"/>
    <circle cx="413" cy="39" r="16" fill="#73f5c3" fill-opacity="0.08" stroke="#73f5c3" stroke-opacity="0.18"/>
    <path d="M406 39H420M415 34L420 39L415 44" fill="none" stroke="#73f5c3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="28" y="51" fill="#f4f7f5" font-size="25" font-weight="650" letter-spacing="-0.4">${card.title}</text>

    <text x="28" y="94" fill="#ffb454" fill-opacity="0.78" font-size="12" font-weight="700" letter-spacing="1.6">BEFORE</text>
    <text x="28" y="124" fill="#f4f7f5" fill-opacity="0.52" font-size="17" font-weight="400">${card.before}</text>
    <path d="M28 150H425" stroke="#f4f7f5" stroke-opacity="0.075"/>

    <g transform="translate(28 178)">
      <rect width="88" height="25" rx="12.5" fill="#73f5c3" fill-opacity="0.09"/>
      <circle cx="14" cy="12.5" r="3.5" fill="#73f5c3"/>
      <text x="26" y="17" fill="#73f5c3" font-size="11" font-weight="700" letter-spacing="1">WITH TG</text>
    </g>
    <text x="28" y="232" fill="#f4f7f5" font-size="18" font-weight="560">${card.after}</text>
  </g>`;
}

function comparisonSvg() {
  const positions = [
    [84, 244], [574, 244], [1064, 244],
    [84, 546], [574, 546], [1064, 546],
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1600" height="900" viewBox="0 0 1600 900">
  ${sharedDefs}
  <defs>
    <clipPath id="comparisonLogoClip"><rect width="72" height="72" rx="16"/></clipPath>
  </defs>
  <rect width="1600" height="900" fill="#080b0d"/>
  <rect width="1600" height="900" fill="url(#grid)"/>
  <ellipse cx="180" cy="20" rx="540" ry="330" fill="url(#mintGlow)"/>
  <ellipse cx="1510" cy="880" rx="500" ry="340" fill="url(#amberGlow)"/>

  <g transform="translate(84 82)">
    <rect width="72" height="72" rx="16" fill="#f4f7f5" fill-opacity="0.025" stroke="#f4f7f5" stroke-opacity="0.11"/>
    <g clip-path="url(#comparisonLogoClip)">
      <image x="-25" y="-20" width="122" height="122" xlink:href="${logoUri}"/>
    </g>
  </g>
  <g font-family="Segoe UI, Inter, Arial, sans-serif">
    <text x="182" y="108" fill="#73f5c3" font-size="13" font-weight="700" letter-spacing="2.2">TOKENGUARDIAN DELIVERY PATTERNS</text>
    <text x="182" y="151" fill="#f4f7f5" font-size="34" font-weight="650" letter-spacing="-0.8">Less ceremony. More signal.</text>
    <text x="1516" y="115" fill="#f4f7f5" fill-opacity="0.34" font-size="14" text-anchor="end" letter-spacing="1.3">BEFORE → WITH TG</text>
  </g>
  <path d="M84 196H1517" stroke="#f4f7f5" stroke-opacity="0.1"/>
  <path d="M84 196H327" stroke="url(#mintLine)" stroke-width="2"/>

  ${cards.map((card, index) => cardSvg(card, positions[index][0], positions[index][1])).join('')}

  <g transform="translate(84 852)" font-family="Segoe UI, Inter, Arial, sans-serif">
    <circle cx="5" cy="-3" r="4" fill="#ffb454"/>
    <text x="19" y="2" fill="#f4f7f5" fill-opacity="0.38" font-size="13" letter-spacing="0.6">Keep the intelligence. Deliver only what moves the work forward.</text>
  </g>
</svg>`;
}

async function render(name, svg, width, height) {
  const output = path.join(assetsDir, name);
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(output);
  const metadata = await sharp(output).metadata();
  if (metadata.width !== width || metadata.height !== height) {
    throw new Error(`${name}: expected ${width}x${height}, got ${metadata.width}x${metadata.height}`);
  }
  console.log(`${name}: ${metadata.width}x${metadata.height}`);
}

async function main() {
  await render('banner.png', bannerSvg(), 1600, 520);
  await render('comparison.png', comparisonSvg(), 1600, 900);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
