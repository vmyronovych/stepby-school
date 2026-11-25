import paths from './paths.cjs';
const { coursePath, projectPath, projectRelative, assetPath, publicPath } =
  paths;
// Vector illustration of the real assembly; the mini breadboard is Mcar's native artwork.
import { writeFile } from 'node:fs/promises';
import { breadboardSvg } from '../../../../../mcar/web/src/breadboard.js';
import { assertClearWires } from './wire-clearance.mjs';
const wires = [
  {
    id: 'positive',
    a: 'source:+',
    b: 'buzzer:+',
    color: '#c6443c',
    points: [
      [1040, 560],
      [1040, 450],
      [918.8, 450],
      [918.8, 272.4],
    ],
  },
  {
    id: 'track',
    a: 'buzzer:-',
    b: 'track',
    color: '#3279b8',
    points: [
      [947.6, 272.4],
      [1070, 272.4],
      [1070, 150],
      [740, 150],
      [740, 410],
      [690, 410],
    ],
  },
  {
    id: 'return',
    a: 'loop',
    b: 'source:-',
    color: '#334653',
    points: [
      [400, 480],
      [400, 520],
      [980, 520],
      [980, 560],
    ],
  },
];
assertClearWires(
  { wires },
  new Map(wires.map((w) => [w.id, w.points.map(([x, y]) => ({ x, y }))])),
);
const board = breadboardSvg().replace(
  '<svg ',
  '<svg x="800" y="180" width="324" height="242.4" ',
);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="780" viewBox="0 0 1200 780" role="img" aria-labelledby="title desc">
<title id="title">Готова гра «Нервовий дріт» із пищалкою</title>
<desc id="desc">На стійкій дерев’яній основі закріплена металева траса. Петля з ізольованою ручкою торкається траси. Плюс джерела 3,3 В з’єднаний із плюсом активної пищалки на mini breadboard; мінус пищалки — з трасою; петля — з мінусом джерела. Три проводи не перетинаються.</desc>
<defs><linearGradient id="wood" x2="0" y2="1"><stop stop-color="#fbefd7"/><stop offset="1" stop-color="#ead4ac"/></linearGradient><linearGradient id="metal"><stop stop-color="#586a76"/><stop offset=".45" stop-color="#dce6ed"/><stop offset="1" stop-color="#687c88"/></linearGradient><linearGradient id="grip" x2="1" y2="0"><stop stop-color="#155ca0"/><stop offset=".5" stop-color="#4ba2d5"/><stop offset="1" stop-color="#176492"/></linearGradient></defs>
<rect width="1200" height="780" rx="22" fill="#fff"/>
<g font-family="Arial,sans-serif" fill="#203443">
<text x="70" y="53" font-size="30" font-weight="700">Нервовий дріт · готовий виріб</text>
<rect x="100" y="105" width="1050" height="600" rx="24" fill="#c7aa7e"/>
<rect x="100" y="90" width="1050" height="600" rx="24" fill="url(#wood)" stroke="#d1b68e" stroke-width="2"/>
<path d="M125 660H1120M125 670H1120" stroke="#cdb18a" opacity=".4"/>
${board}
<!-- Two insulated mounts hold the continuous metal track. -->
<g fill="#535c65" stroke="#394751" stroke-width="2"><rect x="160" y="399" width="40" height="37" rx="9"/><rect x="670" y="399" width="40" height="37" rx="9"/></g>
<path d="M180 410V240Q180 200 220 200H480Q520 200 520 240V280Q520 320 560 320H650Q690 320 690 360V410" fill="none" stroke="#405968" stroke-width="12" stroke-linecap="round"/>
<path d="M180 410V240Q180 200 220 200H480Q520 200 520 240V280Q520 320 560 320H650Q690 320 690 360V410" fill="none" stroke="url(#metal)" stroke-width="8" stroke-linecap="round"/>
<!-- The loop touches the track at one intentional electrical contact. -->
<circle cx="400" cy="245" r="45" fill="none" stroke="#405968" stroke-width="9"/>
<circle cx="400" cy="245" r="45" fill="none" stroke="url(#metal)" stroke-width="5"/>
<path d="M400 290V365" stroke="#637d8b" stroke-width="8"/>
<rect x="382" y="350" width="36" height="130" rx="15" fill="url(#grip)" stroke="#185679" stroke-width="2"/>
<path d="M389 370H411M389 390H411M389 410H411M389 430H411M389 450H411" stroke="#175e89" stroke-width="3" opacity=".6"/>
${wires.map((w) => `<polyline data-connection="${w.id}" points="${w.points.map((p) => p.join(',')).join(' ')}" fill="none" stroke="${w.color}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>`).join('')}
<!-- Buzzer leads are seated in two distinct breadboard contact groups. -->
<path d="M918.8 214.8V238M947.6 214.8V238" fill="none" stroke="#75868d" stroke-width="4"/>
<circle cx="933.2" cy="245" r="23" fill="#222a31" stroke="#111820" stroke-width="2"/>
<ellipse cx="933.2" cy="241" rx="18" ry="17" fill="#303b44"/>
<circle cx="933.2" cy="240" r="5" fill="#080d13"/>
<text x="916" y="243" font-size="14" font-weight="700" fill="#fff">+</text>
<circle cx="918.8" cy="272.4" r="5" fill="#c6443c"/><circle cx="947.6" cy="272.4" r="5" fill="#3279b8"/>
<text x="902" y="289" font-size="17" fill="#ad302b">+</text><text x="958" y="289" font-size="17" fill="#285d8f">−</text>
<!-- The prepared regulated source is intentionally not depicted as a bare AA pack. -->
<rect x="895" y="560" width="210" height="100" rx="16" fill="#e9eff4" stroke="#8e9fab" stroke-width="2"/>
<rect x="915" y="580" width="90" height="39" rx="7" fill="#d1e5dc" stroke="#a7c1b7"/>
<text x="960" y="607" text-anchor="middle" font-size="25" font-weight="700">3,3 В</text>
<rect x="1032" y="590" width="39" height="22" rx="5" fill="#607583"/><rect x="1050" y="593" width="17" height="16" rx="3" fill="#b8d28e"/>
<circle cx="980" cy="560" r="7" fill="#334653"/><circle cx="1040" cy="560" r="7" fill="#c6443c"/>
<text x="980" y="547" text-anchor="middle" font-size="23">−</text><text x="1040" y="547" text-anchor="middle" font-size="23" fill="#b3312c">+</text>
<text x="1000" y="644" text-anchor="middle" font-size="17">Підготовлене живлення</text>
<g font-size="20" font-weight="600">
<text x="190" y="172">Металева траса</text>
<text x="450" y="265">Петля</text>
<text x="440" y="405">Ізольована ручка</text>
<text x="822" y="130">Mini breadboard</text>
<text x="790" y="485">Активна пищалка</text>
<text x="160" y="480">Кінці закриті</text>
<text x="160" y="645">Стійка основа</text>
</g>
<circle cx="400" cy="200" r="7" fill="#e9a431" stroke="#fff" stroke-width="2"/>
<text x="360" y="130" font-size="21" font-weight="700" fill="#77510c">Дотик → звук</text>
<path d="M400 145V183" stroke="#b17b23" stroke-width="2" stroke-dasharray="4 4"/>
<text x="70" y="748" font-size="22">Відведена петля — тиша. Контрольний дотик — звук.</text>
</g></svg>`;
await writeFile(assetPath('wire-game-assembly.svg'), svg);
console.log('Wire-game illustration: three separate connections PASS.');
