'use strict';

const fs = require('fs');
const path = require('path');

function loadSharp() {
  try {
    return require('sharp');
  } catch (_) {
    const runtimeRoot = path.join(
      process.env.LOCALAPPDATA || '',
      'OpenAI', 'Codex', 'runtimes', 'cua_node'
    );
    const builds = fs.readdirSync(runtimeRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort()
      .reverse();
    for (const build of builds) {
      const modulePath = path.join(runtimeRoot, build, 'bin', 'node_modules', 'sharp');
      if (fs.existsSync(modulePath)) return require(modulePath);
    }
    throw new Error('Sharp was not found in the project or bundled Codex runtime.');
  }
}

const sharp = loadSharp();
const outputDir = path.resolve(__dirname, '..');

const workflowSvg = String.raw`<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="700" viewBox="0 0 1600 700">
  <defs>
    <linearGradient id="workflowBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0d1415"/>
      <stop offset="0.52" stop-color="#080b0d"/>
      <stop offset="1" stop-color="#0b1112"/>
    </linearGradient>
    <linearGradient id="mintLine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#73f5c3" stop-opacity=".12"/>
      <stop offset=".52" stop-color="#73f5c3"/>
      <stop offset="1" stop-color="#73f5c3" stop-opacity=".12"/>
    </linearGradient>
    <radialGradient id="mintGlow">
      <stop offset="0" stop-color="#73f5c3" stop-opacity=".16"/>
      <stop offset="1" stop-color="#73f5c3" stop-opacity="0"/>
    </radialGradient>
    <pattern id="workflowGrid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#dffdf1" stroke-opacity=".035"/>
    </pattern>
    <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#000" flood-opacity=".32"/>
    </filter>
    <filter id="lineGlow" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <marker id="arrow" viewBox="0 0 12 12" refX="9" refY="6" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M1 1l9 5-9 5" fill="none" stroke="#73f5c3" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>
  <rect width="1600" height="700" fill="url(#workflowBg)"/>
  <rect width="1600" height="700" fill="url(#workflowGrid)"/>
  <ellipse cx="800" cy="390" rx="650" ry="330" fill="url(#mintGlow)" opacity=".5"/>
  <path d="M80 170H1520" stroke="url(#mintLine)" stroke-opacity=".24"/>

  <g font-family="Inter,Segoe UI,Arial,sans-serif">
    <text x="80" y="74" fill="#73f5c3" font-size="15" font-weight="700" letter-spacing="3">HOW IT WORKS</text>
    <text x="80" y="128" fill="#f4f7f5" font-size="42" font-weight="750" letter-spacing="-.8">Guidance in. Clearer communication out.</text>
    <text x="1518" y="112" fill="#94a29c" font-size="17" text-anchor="end">One model. A better response shape.</text>

    <!-- Paired inputs -->
    <g filter="url(#softShadow)">
      <rect x="80" y="215" width="330" height="132" rx="18" fill="#111719" stroke="#2a3533"/>
      <rect x="80" y="365" width="330" height="154" rx="18" fill="#111719" stroke="#73f5c3" stroke-opacity=".45"/>
    </g>
    <circle cx="112" cy="251" r="7" fill="#ffb454"/>
    <text x="132" y="258" fill="#f4f7f5" font-size="22" font-weight="700">User prompt</text>
    <text x="112" y="296" fill="#9aa8a2" font-size="16">The task, question, and context</text>
    <rect x="112" y="313" width="126" height="5" rx="2.5" fill="#ffb454" opacity=".55"/>
    <rect x="112" y="325" width="210" height="5" rx="2.5" fill="#59645f" opacity=".55"/>

    <path d="M113 404h20v24h-20z M119 400h20v24h-20z" fill="none" stroke="#73f5c3" stroke-width="2" stroke-linejoin="round"/>
    <text x="153" y="416" fill="#f4f7f5" font-size="22" font-weight="700">TokenGuardian</text>
    <text x="153" y="441" fill="#73f5c3" font-size="14" font-weight="700" letter-spacing="1.1">SKILL.MD INSTRUCTIONS</text>
    <text x="112" y="478" fill="#9aa8a2" font-size="16">Communication guidance applied</text>
    <text x="112" y="501" fill="#9aa8a2" font-size="16">alongside the prompt</text>

    <!-- Merge connector -->
    <path d="M410 281h30q22 0 22 22v67q0 22 22 22h18M410 442h30q22 0 22-22v-28" fill="none" stroke="#73f5c3" stroke-width="2" stroke-opacity=".72" marker-end="url(#arrow)"/>
    <circle cx="462" cy="392" r="5" fill="#73f5c3" filter="url(#lineGlow)"/>

    <!-- Response-shaping stage -->
    <g filter="url(#softShadow)">
      <rect x="500" y="230" width="282" height="288" rx="22" fill="#111719" stroke="#2f3c38"/>
    </g>
    <text x="532" y="271" fill="#94a29c" font-size="13" font-weight="700" letter-spacing="1.8">RESPONSE SHAPE</text>
    <text x="532" y="308" fill="#f4f7f5" font-size="25" font-weight="700">Read the task</text>
    <g>
      <rect x="532" y="337" width="218" height="43" rx="11" fill="#16211e" stroke="#73f5c3" stroke-opacity=".18"/>
      <text x="550" y="364" fill="#73f5c3" font-size="15" font-weight="650">01</text>
      <text x="590" y="364" fill="#dce5e1" font-size="17" font-weight="600">Intent</text>
      <rect x="532" y="393" width="218" height="43" rx="11" fill="#16211e" stroke="#73f5c3" stroke-opacity=".18"/>
      <text x="550" y="420" fill="#73f5c3" font-size="15" font-weight="650">02</text>
      <text x="590" y="420" fill="#dce5e1" font-size="17" font-weight="600">Depth</text>
      <rect x="532" y="449" width="218" height="43" rx="11" fill="#16211e" stroke="#73f5c3" stroke-opacity=".18"/>
      <text x="550" y="476" fill="#73f5c3" font-size="15" font-weight="650">03</text>
      <text x="590" y="476" fill="#dce5e1" font-size="17" font-weight="600">Format</text>
    </g>

    <!-- Claude -->
    <path d="M782 374H838" fill="none" stroke="#73f5c3" stroke-width="2" marker-end="url(#arrow)"/>
    <g filter="url(#softShadow)">
      <rect x="840" y="267" width="224" height="214" rx="22" fill="#15191a" stroke="#ffb454" stroke-opacity=".52"/>
    </g>
    <circle cx="952" cy="329" r="31" fill="#ffb454" fill-opacity=".1" stroke="#ffb454" stroke-opacity=".55"/>
    <path d="M940 329l9 9 17-19" fill="none" stroke="#ffb454" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="952" y="393" fill="#f4f7f5" font-size="27" font-weight="750" text-anchor="middle">Claude</text>
    <text x="952" y="426" fill="#a6b1ad" font-size="15" text-anchor="middle">The model generates</text>
    <text x="952" y="447" fill="#a6b1ad" font-size="15" text-anchor="middle">the answer</text>

    <!-- Clear response -->
    <path d="M1064 374H1120" fill="none" stroke="#73f5c3" stroke-width="2" marker-end="url(#arrow)"/>
    <g filter="url(#softShadow)">
      <rect x="1122" y="215" width="398" height="304" rx="22" fill="#101a17" stroke="#73f5c3" stroke-opacity=".6"/>
    </g>
    <rect x="1154" y="247" width="124" height="30" rx="15" fill="#73f5c3" fill-opacity=".12"/>
    <circle cx="1174" cy="262" r="4" fill="#73f5c3"/>
    <text x="1188" y="267" fill="#73f5c3" font-size="13" font-weight="700" letter-spacing="1">OUTPUT</text>
    <text x="1154" y="326" fill="#f4f7f5" font-size="30" font-weight="750">Clear response</text>
    <text x="1154" y="359" fill="#9daaa5" font-size="17">Correct, useful, and shaped</text>
    <text x="1154" y="383" fill="#9daaa5" font-size="17">to the moment.</text>
    <path d="M1156 423l10 10 19-22" fill="none" stroke="#73f5c3" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="1200" y="430" fill="#dce5e1" font-size="16">Less repetition</text>
    <path d="M1156 461l10 10 19-22" fill="none" stroke="#73f5c3" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="1200" y="468" fill="#dce5e1" font-size="16">Right-sized detail</text>

    <!-- Truthful architecture note -->
    <rect x="80" y="583" width="1440" height="70" rx="18" fill="#111719" stroke="#2c3734"/>
    <rect x="98" y="601" width="188" height="34" rx="17" fill="#ffb454" fill-opacity=".1" stroke="#ffb454" stroke-opacity=".32"/>
    <text x="192" y="623" fill="#ffb454" font-size="13" font-weight="750" letter-spacing="1.2" text-anchor="middle">INSTRUCTION LAYER</text>
    <text x="316" y="624" fill="#c8d1cd" font-size="17">TokenGuardian is a SKILL.md instruction layer — not another model, middleware service, or proxy.</text>
  </g>
</svg>`;

const benchmarkData = [
  { label: 'Coding', before: 412, after: 148 },
  { label: 'Writing', before: 874, after: 224 },
  { label: 'Documentation', before: 536, after: 280 },
  { label: 'Planning', before: 920, after: 512 },
  { label: 'Research', before: 682, after: 390 },
];

const benchmarkRows = benchmarkData.map((row, index) => {
  const y = 288 + index * 80;
  const beforeWidth = Math.round((row.before / 920) * 650);
  const afterWidth = Math.round((row.after / 920) * 650);
  const reduction = (((row.before - row.after) / row.before) * 100).toFixed(1);
  return String.raw`
    <g>
      <text x="692" y="${y}" fill="#dce5e1" font-size="17" font-weight="650">${row.label}</text>
      <text x="1458" y="${y}" fill="#73f5c3" font-size="16" font-weight="750" text-anchor="end">−${reduction}%</text>
      <rect x="692" y="${y + 17}" width="650" height="12" rx="6" fill="#1c2423"/>
      <rect x="692" y="${y + 17}" width="${beforeWidth}" height="12" rx="6" fill="#ffb454" fill-opacity=".52"/>
      <rect x="692" y="${y + 39}" width="650" height="12" rx="6" fill="#1c2423"/>
      <rect x="692" y="${y + 39}" width="${afterWidth}" height="12" rx="6" fill="#73f5c3"/>
      <text x="1362" y="${y + 28}" fill="#b5bebb" font-size="14">${row.before}</text>
      <text x="1362" y="${y + 50}" fill="#f4f7f5" font-size="14" font-weight="700">${row.after}</text>
    </g>`;
}).join('');

const benchmarkSvg = String.raw`<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <linearGradient id="benchmarkBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0d1415"/>
      <stop offset=".55" stop-color="#080b0d"/>
      <stop offset="1" stop-color="#0b1112"/>
    </linearGradient>
    <radialGradient id="benchmarkGlow">
      <stop offset="0" stop-color="#73f5c3" stop-opacity=".15"/>
      <stop offset="1" stop-color="#73f5c3" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="metricCard" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#15231e"/>
      <stop offset="1" stop-color="#0f1715"/>
    </linearGradient>
    <pattern id="benchmarkGrid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#dffdf1" stroke-opacity=".035"/>
    </pattern>
    <filter id="benchmarkShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="20" stdDeviation="28" flood-color="#000" flood-opacity=".36"/>
    </filter>
  </defs>
  <rect width="1600" height="900" fill="url(#benchmarkBg)"/>
  <rect width="1600" height="900" fill="url(#benchmarkGrid)"/>
  <ellipse cx="610" cy="330" rx="600" ry="420" fill="url(#benchmarkGlow)" opacity=".55"/>

  <g font-family="Inter,Segoe UI,Arial,sans-serif">
    <text x="80" y="72" fill="#73f5c3" font-size="15" font-weight="700" letter-spacing="3">REPOSITORY SAMPLE SUITE</text>
    <text x="80" y="128" fill="#f4f7f5" font-size="44" font-weight="760" letter-spacing="-.9">Fewer output tokens. Same sample tasks.</text>
    <text x="80" y="165" fill="#9aa8a2" font-size="18">Five hand-authored before/after examples included with TokenGuardian.</text>

    <!-- Aggregate result -->
    <g filter="url(#benchmarkShadow)">
      <rect x="80" y="216" width="516" height="450" rx="26" fill="url(#metricCard)" stroke="#73f5c3" stroke-opacity=".45"/>
    </g>
    <rect x="112" y="248" width="162" height="32" rx="16" fill="#73f5c3" fill-opacity=".12"/>
    <circle cx="132" cy="264" r="4" fill="#73f5c3"/>
    <text x="148" y="269" fill="#73f5c3" font-size="13" font-weight="750" letter-spacing="1.2">AGGREGATE</text>
    <text x="112" y="383" fill="#73f5c3" font-size="98" font-weight="800" letter-spacing="-4">−54.6%</text>
    <text x="116" y="423" fill="#c5cfcb" font-size="19" font-weight="600">output-token reduction</text>

    <line x1="112" y1="463" x2="564" y2="463" stroke="#34423e"/>
    <text x="112" y="503" fill="#94a29c" font-size="13" font-weight="700" letter-spacing="1.5">BEFORE</text>
    <text x="112" y="560" fill="#f4f7f5" font-size="48" font-weight="750">3,424</text>
    <text x="270" y="554" fill="#ffb454" font-size="27" font-weight="650">→</text>
    <text x="336" y="503" fill="#94a29c" font-size="13" font-weight="700" letter-spacing="1.5">WITH TOKENGUARDIAN</text>
    <text x="336" y="560" fill="#73f5c3" font-size="48" font-weight="750">1,554</text>
    <text x="112" y="615" fill="#83918b" font-size="15">1,870 fewer output tokens across the suite</text>

    <!-- Sample rows -->
    <g filter="url(#benchmarkShadow)">
      <rect x="628" y="216" width="892" height="450" rx="26" fill="#101617" stroke="#2d3936"/>
    </g>
    <text x="692" y="259" fill="#f4f7f5" font-size="22" font-weight="700">Tokens by sample</text>
    <g>
      <rect x="1185" y="244" width="12" height="12" rx="6" fill="#ffb454" fill-opacity=".55"/>
      <text x="1207" y="256" fill="#9aa8a2" font-size="14">Before</text>
      <rect x="1293" y="244" width="12" height="12" rx="6" fill="#73f5c3"/>
      <text x="1315" y="256" fill="#9aa8a2" font-size="14">TokenGuardian</text>
    </g>
    ${benchmarkRows}

    <!-- Methodology / disclaimer -->
    <rect x="80" y="706" width="1440" height="130" rx="22" fill="#111719" stroke="#303b38"/>
    <rect x="108" y="734" width="150" height="32" rx="16" fill="#ffb454" fill-opacity=".1" stroke="#ffb454" stroke-opacity=".3"/>
    <text x="183" y="755" fill="#ffb454" font-size="13" font-weight="750" letter-spacing="1.1" text-anchor="middle">METHODOLOGY</text>
    <text x="284" y="755" fill="#d5ddda" font-size="17" font-weight="650">Hand-authored repository examples · output tokens only · not an independent evaluation</text>
    <text x="108" y="801" fill="#91a09a" font-size="16">Illustrative results, not a universal claim. Results vary by prompt, model, context, and settings.</text>
    <text x="1492" y="801" fill="#65736d" font-size="14" text-anchor="end">Counts: before → TokenGuardian</text>
  </g>
</svg>`;

async function renderSvg(svg, filename) {
  const target = path.join(outputDir, filename);
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(target);
  const meta = await sharp(target).metadata();
  console.log(`${filename}: ${meta.width}x${meta.height}`);
}

async function main() {
  const selection = process.argv[2] || 'all';
  if (selection === 'all' || selection === 'workflow') {
    await renderSvg(workflowSvg, 'workflow.png');
  }
  if (selection === 'all' || selection === 'benchmark') {
    await renderSvg(benchmarkSvg, 'benchmark.png');
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
