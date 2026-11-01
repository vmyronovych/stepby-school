import type { Drag } from './interaction';
import { CIRC, circFlow, partMessage } from './parts';
import { CB_W, CB_H, CB_GRID } from './constants';
import {
  cbRot,
  cbTerm,
  cbBox,
  cbPoly,
  cbAt,
  cbSimplify,
  cbRoute,
} from './geometry';
import {
  cbNewBoard,
  cbAddPart,
  cbAddWire,
  cbLinks,
  cbInCircuit,
  cbExtract,
  cbInsert,
  cbSnap,
  cbRestore,
  CB_CLIP,
  cbCopy,
  cbPaste,
} from './board';
import {
  BB,
  BB_JUMP,
  bbX,
  bbValid,
  bbStrip,
  bbKey,
  bbPt,
  bbLegs,
  bbOcc,
  cbSchemFromBoard,
  cbBoardFromSchem,
  bbRoute,
  bbBoardSvg,
  cbBreadboard,
  bbCircuitSvg,
} from './breadboard';
import { solveCircuit } from './solver';
import { cbSound, disposeAudio } from './audio';
import { circuitState } from './state';
import { esc, prefersReducedMotion } from '../../../engines/core/util';
import { required, numberProperty, stateNumber } from './types';
import type {
  CircuitPart,
  CircuitBoard,
  Wire,
  Endpoint,
  Point,
  Hole,
  Jumper,
  Placement,
  Conductor,
  BreadboardLayout,
  Position,
  LayoutTransform,
  Polyline,
} from './types';
import type {
  CircuitController,
  CircuitControls,
  CircuitSession,
} from '../types';
export function initRoboSim(
  root: HTMLElement,
  onControls: (state: CircuitControls) => void,
): CircuitSession {
  const gen = ++circuitState.simGen;
  let disposed = false;
  if (!circuitState.circuit) circuitState.circuit = cbNewBoard(true);
  let B = circuitState.circuit;
  const still = prefersReducedMotion();
  const SVGNS = 'http://www.w3.org/2000/svg';

  const $ = (id: string) =>
    required(root.querySelector<HTMLElement | SVGElement>('#' + id));
  const svg = required(root.querySelector<SVGSVGElement>('#cbSvg')),
    stage = required(root.querySelector<HTMLElement>('#cbStage')),
    gW = required(root.querySelector<SVGGElement>('#cbWires')),
    gP = required(root.querySelector<SVGGElement>('#cbParts')),
    gD = required(root.querySelector<SVGGElement>('#cbDots')),
    gL = required(root.querySelector<SVGGElement>('#cbLabels')),
    gT = required(root.querySelector<SVGGElement>('#cbTerms'));
  const rubber = $('cbRubber'),
    popEl = required(root.querySelector<HTMLElement>('#cbPop')),
    speedEl = required(root.querySelector<HTMLInputElement>('#cbSpeed')),
    marq = $('cbMarq');

  const detachSvgListeners: (() => void)[] = [];
  function bindSvg<K extends keyof SVGElementEventMap>(
    type: K,
    handler: (event: SVGElementEventMap[K]) => void,
  ) {
    const activeHandler = (event: SVGElementEventMap[K]) => {
      if (!disposed && gen === circuitState.simGen) handler(event);
    };
    svg.addEventListener(type, activeHandler);
    detachSvgListeners.push(() => svg.removeEventListener(type, activeHandler));
  }
  let conductors: Conductor[] = []; // [{obj, poly, gap}] — дроти й деталі, якими біжать електрони
  let lastControls = '',
    frameId = 0;
  let lastLabels: string | null = '',
    lastMsg = '',
    lastPop = '';
  let drag: Drag | null = null,
    pending: Endpoint | null = null,
    hoverTerm: string | null = null;
  let clock = 0,
    note: { t: string; until: number } | null = null,
    chainDirty = true;
  let lastDown: { id: string | null; t: number; toggled?: boolean } = {
    id: null,
    t: -1,
  };
  let floating: CircuitPart | null = null; // вільна деталь у руці: дроти її не оминають, щоб її можна було кинути на дріт
  let dropWire: string | null = null; // дріт, на який деталь стане, якщо зараз її відпустити
  let lastPt: Point | null = null; // де вказівник на полі — туди вставляємо скопійоване
  const isSel = (id: string) => B.sel.includes(id);
  let layout: BreadboardLayout | null = null; // розкладка кола на макетці (cbBreadboard), лише у вигляді «Макетка»
  const bbMode = () => circuitState.cbView === 'bb';
  // де й як стоїть деталь у поточному вигляді: на схемі — як її поставили, на макетці — за розкладкою
  const tf = (p: CircuitPart): LayoutTransform =>
    (bbMode() && layout && layout.place.get(p.id)) || {
      x: p.x,
      y: p.y,
      rot: p.rot,
      mx: 1,
      k: 1,
    };
  /* ---------- малювання поля ---------- */
  function renderStatic() {
    const byId = new Map(B.parts.map((p) => [p.id, p]));
    const obst = floating ? B.parts.filter((p) => p !== floating) : B.parts;
    conductors = [];
    if (bbMode()) {
      if (!bbCarrying() && !bbWiring()) cbBoardFromSchem(B); // поки деталь чи дріт у руці, розкладку не лагодимо
      layout = cbBreadboard(B);
      bbCurrents();
      svg.setAttribute('viewBox', String(`0 0 ${BB.W} ${layout.h}`));
      for (const w of layout.wires)
        conductors.push({
          obj: w,
          poly: cbPoly(w.pts),
          ends: [w.a.p + ':' + w.a.t, w.b.p + ':' + w.b.t],
        });
      gW.innerHTML = bbBoardSvg() + bbCircuitSvg(layout, isSel, B);
    } else
      gW.innerHTML = B.wires
        .map((w) => {
          const pts = cbRoute(
            cbTerm(required(byId.get(w.a.p)), w.a.t),
            cbTerm(required(byId.get(w.b.p)), w.b.t),
            obst,
          );
          conductors.push({
            obj: w,
            poly: cbPoly(pts),
            ends: [w.a.p + ':' + w.a.t, w.b.p + ':' + w.b.t],
          });
          const d = pts.map((q) => q.join(',')).join(' ');
          return `<g data-wire="${w.id}" class="cb-wire${isSel(w.id) ? ' sel' : ''}${dropWire === w.id ? ' drop' : ''}">
        <polyline points="${d}" class="hitw"/><polyline points="${d}" class="halo"/><polyline points="${d}" class="core"/></g>`;
        })
        .join('');
    gP.innerHTML = B.parts
      .map((p) => {
        const d = CIRC.parts[p.type],
          T = tf(p);
        const local = (q: Point): Point => {
          const [x, y] = cbRot(T.rot, q[0] * T.mx * T.k, q[1] * T.k);
          return [T.x + x, T.y + y];
        };
        if (d.path)
          conductors.push({
            obj: p,
            gap: d.gap ? () => required(d.gap)(p) : undefined,
            k: T.k,
            poly: cbPoly(d.path.map(local)),
            ends: [p.id + ':0', p.id + ':1'],
          });
        // доріжки всередині батарейки: видно, як електрон виходить із кімнати й заходить у неї
        (d.ramps || []).forEach((r, i) =>
          conductors.push({
            obj: {
              get rt() {
                return p.rt;
              },
              get ph() {
                return p.ramp[i];
              },
              set ph(v) {
                p.ramp[i] = v;
              },
            },
            poly: cbPoly(r.map(local)),
            ends: i ? [p.id + ':0', null] : [null, p.id + ':1'],
            ramp: i ? 'in' : 'out',
            part: p,
          }),
        );
        const cls =
          'cb-part' +
          (d.toggle || d.hold ? ' press' : '') +
          (isSel(p.id) ? ' sel' : '') +
          (bbCarrying() &&
          drag &&
          (drag.kind === 'bbpart' || drag.kind === 'palette') &&
          drag.p === p &&
          !drag.ok
            ? ' bad'
            : '');
        const sc =
          T.k !== 1 || T.mx !== 1 ? ` scale(${T.mx * T.k},${T.k})` : '';
        return `<g data-part="${p.id}" class="${cls}" transform="translate(${T.x},${T.y}) rotate(${T.rot * 90})${sc}">${d.draw(p)}</g>`;
      })
      .join('');
    for (const g of gP.querySelectorAll<SVGGElement>('.cb-part.sel')) {
      // рамка вибраної деталі
      const bb = g.getBBox(),
        r = document.createElementNS(SVGNS, 'rect'),
        m = bbMode() ? 18 : 10;
      r.setAttribute('x', String(bb.x - m));
      r.setAttribute('y', String(bb.y - m));
      r.setAttribute('width', String(bb.width + 2 * m));
      r.setAttribute('height', String(bb.height + 2 * m));
      r.setAttribute('rx', String(14));
      r.setAttribute('class', String('selbox'));
      g.insertBefore(r, g.firstChild);
    }
    gT.innerHTML = bbMode()
      ? bbMarks()
      : B.parts
          .map((p) =>
            [0, 1]
              .map((t) => {
                const q = cbTerm(p, t);
                return `<circle data-term="${p.id}:${t}" cx="${q.x}" cy="${q.y}" r="9" class="cb-term"/>`;
              })
              .join(''),
          )
          .join('') + selWireEnds();
    lastLabels = null;
    lastPop = '';
    chainDirty = true;
    renderLabels();
    renderPalette();
    renderPop();
    renderHist();
  }
  // кінці вибраного дроту — ручки: їх можна перетягнути на інший контакт
  function selWireEnds() {
    const w = B.sel.length === 1 && B.wires.find((x) => x.id === B.sel[0]);
    if (!w) return '';
    return [w.a, w.b]
      .map((e) => {
        const q = cbTerm(required(B.parts.find((p) => p.id === e.p)), e.t);
        return `<circle cx="${q.x}" cy="${q.y}" r="12" class="cb-wend"/>`;
      })
      .join('');
  }
  function renderHist() {
    publishControls();
  }

  // Ланцюг: електрони мають стояти рівно по всьому колу, а не мати власну
  // фазу в кожному дроті, інакше на стиках крапки зникають і з'являються.
  // Ідемо від батарейки за течією і зсуваємо фази на пройдену відстань.
  function chain() {
    chainDirty = false;
    const at = new Map<string, Conductor[]>(); // контакт -> провідники, що в ньому сходяться
    for (const c of conductors) {
      c.off = undefined;
      c.entry = c.obj.rt.I > 0 ? 1 : 0; // електрони йдуть проти «звичного» струму
      for (const k of c.ends)
        if (k) {
          if (!at.has(k)) at.set(k, []);
          required(at.get(k)).push(c);
        }
    }
    const live = (c: Conductor) => Math.abs(c.obj.rt.I) > 1e-9;
    const start =
      conductors.find((c) => c.ramp === 'out' && live(c)) ||
      conductors.find(live);
    if (!start) return;
    const seen = new Set([start]);
    let queue = [start];
    start.off = 0;
    while (queue.length) {
      const c = required(queue.shift()),
        exit = c.ends[1 - required(c.entry)];
      for (const n of (exit ? at.get(exit) : undefined) || []) {
        if (seen.has(n) || !live(n) || n.ends[required(n.entry)] !== exit)
          continue;
        n.off = required(c.off) + c.poly.len;
        seen.add(n);
        queue.push(n);
      }
    }
    const ref = start.obj.ph;
    for (const c of conductors)
      if (c.off !== undefined && c !== start) c.obj.ph = ref - c.off;
  }

  function renderLabels() {
    let html = '';
    if (!bbMode())
      for (const p of B.parts) {
        const odd = p.rot % 2 === 1;
        let k = 0;
        for (const L of CIRC.parts[p.type].labels(p)) {
          const pol = L.cls.startsWith('pol');
          if (!L.t) {
            if (!pol) k++;
            continue;
          }
          let x,
            y,
            anchor = 'middle';
          if (odd && !pol) {
            // вертикальна деталь: підписи збоку, стовпчиком
            const side = cbRot(p.rot, 0, 1)[0];
            x = p.x + side * 44;
            y = p.y - 6 + k * 24;
            anchor = side > 0 ? 'start' : 'end';
          } else {
            const [dx, dy] = cbRot(p.rot, L.x, L.y);
            x = p.x + dx;
            y = p.y + dy + (pol ? 7 : 0);
          }
          if (!pol) k++;
          html += `<text x="${x}" y="${y}" text-anchor="${anchor}" class="cb-lab ${L.cls}">${esc(L.t)}</text>`;
        }
      }
    if (html !== lastLabels) {
      gL.innerHTML = html;
      lastLabels = html;
    }
  }

  function popDescriptor() {
    const p = B.parts.find((x) => x.id === B.pop);
    const wire =
      !p && (bbMode() ? B.bb.jumps : B.wires).find((x) => x.id === B.pop);
    if (!p && !wire) return null;
    if (!p)
      return {
        title: bbMode() ? 'Перемичка' : 'Дріт',
        params: [],
        actions: [{ id: 'del', t: '🗑 Прибрати' }],
      };
    const def = CIRC.parts[p.type];
    const params = (def.params || [])
      .filter((item) => !item.when || item.when(p))
      .map((item) => ({
        key: item.key,
        label: item.label,
        options: item.options,
        selectedIndex: item.options.findIndex(
          (option) => option[0] === p.props[item.key],
        ),
      }));
    const actions = (def.actions ? def.actions(p) : []).slice();
    if (def.rotatable) actions.push({ id: 'rot', t: '↻ Повернути' });
    if (!bbMode() && cbInCircuit(B, p.id))
      actions.push({ id: 'out', t: '✂ Вийняти з кола' });
    if (!bbMode() || p.type !== 'battery')
      actions.push({ id: 'del', t: '🗑 Прибрати' });
    return { title: def.title ? def.title(p) : def.name, params, actions };
  }
  function publishControls() {
    const value: CircuitControls = {
      view: circuitState.cbView || 'schem',
      canUndo: !!B.undo.length,
      canRedo: !!B.redo.length,
      disabledParts: Object.keys(CIRC.parts).filter(
        (type) =>
          CIRC.parts[type].single && B.parts.some((p) => p.type === type),
      ),
      properties: popDescriptor(),
      message: status(),
    };
    const encoded = JSON.stringify(value);
    if (encoded !== lastControls) {
      lastControls = encoded;
      onControls(value);
    }
  }
  function renderPalette() {
    publishControls();
  }
  function renderPop() {
    publishControls();
  }
  function positionPop() {
    const part = B.parts.find((p) => p.id === B.pop);
    const selector = part
      ? `[data-part="${part.id}"]`
      : bbMode()
        ? `[data-jump="${B.pop}"]`
        : `[data-wire="${B.pop}"]`;
    placePop((part ? gP : gW).querySelector(selector));
  }
  function placePop(el: Element | null) {
    // поруч із деталлю, не виходячи за поле
    if (!el) return;
    const sr = stage.getBoundingClientRect(),
      r = el.getBoundingClientRect();
    const pw = popEl.offsetWidth,
      ph = popEl.offsetHeight;
    let x = r.right - sr.left + 14;
    if (x + pw > sr.width - 6) x = r.left - sr.left - pw - 14;
    if (x < 6) x = Math.max(6, Math.min(sr.width - pw - 6, r.left - sr.left));
    const y = Math.max(
      6,
      Math.min(sr.height - ph - 6, r.top - sr.top + r.height / 2 - ph / 2),
    );
    popEl.style.left = x + 'px';
    popEl.style.top = y + 'px';
  }
  function openPop(id: string) {
    B.pop = id;
    B.sel = [id];
    renderStatic();
  }
  function closePop() {
    if (B.pop) {
      B.pop = null;
      renderPop();
    }
  }

  function setParameter(key: string, index: number) {
    const p = B.parts.find((item) => item.id === B.pop);
    if (!p) return;
    const prm = CIRC.parts[p.type].params?.find((item) => item.key === key);
    if (!prm || !prm.options[index]) return;
    const value = prm.options[index][0];
    if (p.props[key] === value) return;
    mark();
    p.props[key] = value;
    CIRC.parts[p.type].onParam?.(p, key);
    changed();
  }

  /* ---------- стан кола ---------- */
  function battery() {
    return B.parts.find((p) => p.type === 'battery');
  }

  function resolve() {
    for (const p of B.parts) p.rt = { I: 0, vrev: 0, vfw: 0 };
    for (const w of B.wires) w.rt = { I: 0 };
    if (!B.parts.length) return;
    const r = solveCircuit(B),
      V = (id: string, t: number) => r.V[r.node.get(id + ':' + t) ?? -1] || 0;
    for (const p of B.parts) {
      p.rt.I = r.I[p.id] || 0;
      if (p.props.flipped !== undefined && looped(p)) {
        // клапан: пряма й зворотна напруга на ньому
        const a = p.props.flipped ? 1 : 0;
        p.rt.vfw = V(p.id, a) - V(p.id, 1 - a);
        p.rt.vrev = -p.rt.vfw;
      }
    }
    for (const w of B.wires) w.rt.I = r.I[w.id] || 0;
    bbCurrents();
    chainDirty = true;
  }
  // На макетці ті самі деталі з'єднані смужками, шинами й перемичками: рахуємо
  // струм у кожному з цих провідників, щоб електрони бігли саме ними.
  function bbCurrents() {
    if (!bbMode() || !layout || !B.parts.length) return;
    const r = solveCircuit({ parts: B.parts, wires: layout.wires });
    for (const w of layout.wires) w.rt.I = r.I[w.id] || 0;
    chainDirty = true;
  }

  // Чи є навколо деталі замкнений шлях: від одного її контакту до другого
  // дротами й іншими деталями, крім розривів. Без нього напруга на клапані —
  // лише наслідок крихітного витоку в розв'язувачі, а не справжня.
  function looped(p: CircuitPart) {
    const up = new Map<string, string>(),
      root = (k: string): string => {
        while (up.has(k)) k = required(up.get(k));
        return k;
      };
    const join = (a: string, b: string) => {
      a = root(a);
      b = root(b);
      if (a !== b) up.set(a, b);
    };
    for (const w of B.wires) join(w.a.p + ':' + w.a.t, w.b.p + ':' + w.b.t);
    for (const q of B.parts)
      if (q !== p && CIRC.parts[q.type].elec(q).kind !== 'open')
        join(q.id + ':0', q.id + ':1');
    return root(p.id + ':0') === root(p.id + ':1');
  }

  // світлодіод, який цілий і стоїть як слід, але струм іде повз нього
  function bypassed() {
    return B.parts.filter(
      (p) =>
        p.type === 'led' &&
        !p.s.dead &&
        Math.abs(p.rt.I) <= 1e-5 &&
        Math.abs(p.rt.vfw) < 0.3,
    );
  }

  function status() {
    if (dropWire)
      return 'Відпусти, і дріт розріжеться: деталь стане в коло між його кінцями.';
    if (note && clock < note.until) return note.t;
    if (B.sticky) return B.sticky;
    if (!B.parts.length)
      return 'Поле порожнє. Перетягни живлення з панелі ліворуч, а тоді додай деталі.';
    const bat = battery();
    if (!bat)
      return 'На полі немає живлення, тож штовхати електрони нікому. Перетягни його з панелі.';
    const pb = bat.props.src === 'mb'; // павербанк з модулем чи пальчикові батарейки
    if (bat.s.charging)
      return pb
        ? "Павербанк заряджається: зарядка жене електрони у зворотний бік, з кімнати «+» назад у кімнату «−». Поки він заряджається, до кола його не під'єднано."
        : "Батарейка в зарядному: воно жене електрони у зворотний бік, з кімнати «+» назад у кімнату «−». Поки вона заряджається, до кола її не під'єднано.";
    if (bat.s.dead) return partMessage(CIRC.parts.battery, bat);
    if (stateNumber(bat.s, 'm') <= 0)
      return pb
        ? 'Усі електрони з кімнати «−» перейшли в кімнату «+». Павербанк розрядився: електрони в дротах є, але штовхати їх більше нікому. Двічі клацни на павербанк і постав його заряджатися.'
        : 'Усі електрони з кімнати «−» перейшли в кімнату «+». Батарейка розрядилась: електрони в дротах є, але штовхати їх більше нікому. Двічі клацни на батарейку й постав її в зарядне.';
    if (pb && bat.s.off)
      return bbMode()
        ? 'Модуль живлення вимкнений, тож на шинах макетки немає напруги. Натисни на модулі білу кнопку: засвітиться зелений вогник.'
        : 'Модуль живлення вимкнений, тож електрони стоять. Двічі клацни на павербанк і увімкни модуль.';
    for (const p of B.parts) {
      // деталь у небезпеці — найважливіше
      const w = CIRC.parts[p.type].warn?.(p);
      if (w)
        return (
          w +
          (p.type === 'battery' && bypassed().length
            ? ' І подивись: світлодіод не світить, бо весь потік іде дротом в обхід нього.'
            : '')
        );
    }
    const leds = B.parts.filter((p) => p.type === 'led' && !p.s.dead),
      buzz = B.parts.filter((p) => p.type === 'buzzer');
    if (Math.abs(bat.rt.I) < 1e-6) {
      if (leds.concat(buzz).some((p) => p.rt.vrev > 0.3))
        return 'Коло замкнене, а електрони стоять. Світлодіод і пищалка пропускають струм тільки в один бік, а зараз деталь стоїть навпаки: для струму це те саме, що розрив. Двічі клацни на неї й переверни ніжки.';
      if (leds.some((p) => p.rt.vfw > 0.3))
        return pb
          ? 'Коло замкнене, а електрони стоять: 3,3 вольта замало, щоб проштовхнути їх крізь світлодіоди, що стоять підряд. Двічі клацни на павербанк і постав модуль на 5 В.'
          : 'Коло замкнене, а електрони стоять: батарейка заслабка, щоб проштовхнути їх крізь світлодіод. Двічі клацни на батарейку й додай ще пальчикову. Будь-якому світлодіоду треба щонайменше дві.';
      if (B.parts.some((p) => p.type === 'button' && !p.s.pressed))
        return 'Електрони стоять: кнопка розриває коло, поки її не тримають. Натисни й тримай кнопку.';
      if (B.parts.some((p) => p.type === 'switch' && !p.s.on))
        return 'Електрони стоять: вимикач розриває коло. Натисни на вимикач.';
      if (B.parts.some((p) => p.s.dead))
        return 'Електрони стоять: зіпсована деталь розриває коло. Двічі клацни на неї й заміни на нову.';
      return (
        'Електрони стоять: коло десь розірване. Шлях від «−» ' +
        (pb ? 'живлення' : 'батарейки') +
        ' до «+» має бути суцільним, без жодної щілини.'
      );
    }
    const lit = leds.filter((l) => Math.abs(l.rt.I) > 1e-5),
      beep = buzz.filter((z) => required(CIRC.parts.buzzer.sounding)(z));
    let t =
      'Коло замкнене: електрони рушили всі одночасно, по всьому колу, від кімнати «−» до кімнати «+».';
    const fs = lit.map((l) => circFlow(l.rt.I));
    if (lit.length > 1 && Math.max(...fs) - Math.min(...fs) > 0.2)
      t +=
        ' Світлодіоди світять по-різному: у гілці з більшим резистором електрони біжуть повільніше, і світло там тьмяніше.';
    else if (lit.length) {
      const f = Math.max(...fs);
      t +=
        f > 0.75
          ? ' Світлодіод світить яскраво.'
          : f > 0.4
            ? ' Резистор більший, тож сповільнились усі електрони в гілці, навіть далекі від нього: світло тьмяніше.'
            : ' Опір великий: електрони ледь повзуть, світло ледь помітне, зате батарейка житиме довго.';
    }
    if (bypassed().length)
      t +=
        ' А світлодіод не світить: поруч із ним є дріт, і електрони біжать цим легшим шляхом в обхід нього.';
    if (beep.length)
      t += ' Пищалка пищить. Їй резистор не потрібен: вона сама себе стримує.';
    return t;
  }

  function say() {
    const t = status();
    if (t !== lastMsg) {
      lastMsg = t;
      publishControls();
    }
  }

  // будь-яка зміна схеми: перерахувати струми й перемалювати
  function changed() {
    note = null;
    B.sticky = null;
    resolve();
    renderStatic();
    say();
  }

  /* ---------- історія: скасувати / повернути ---------- */
  // mark() — перед кожною правкою схеми. Серія однакових дрібних правок
  // (стрілками) іде одним кроком скасування.
  let lastMark: { tag: string | null | undefined; t: number } = {
    tag: null,
    t: 0,
  };
  function mark(tag?: string) {
    const now = performance.now();
    if (tag && lastMark.tag === tag && now - lastMark.t < 800) {
      lastMark.t = now;
      return;
    }
    lastMark = { tag, t: now };
    B.undo.push(cbSnap(B));
    if (B.undo.length > 100) B.undo.shift();
    B.redo = [];
  }
  function undo() {
    if (!B.undo.length) return;
    B.redo.push(cbSnap(B));
    cbRestore(B, required(B.undo.pop()));
    lastMark = { tag: null, t: 0 };
    closePop();
    changed();
  }
  function redo() {
    if (!B.redo.length) return;
    B.undo.push(cbSnap(B));
    cbRestore(B, required(B.redo.pop()));
    lastMark = { tag: null, t: 0 };
    closePop();
    changed();
  }

  /* ---------- дії ---------- */
  function removeIds(ids: string[]) {
    // прибрати деталі разом з їхніми дротами, а також вибрані дроти
    B.parts = B.parts.filter((p) => !ids.includes(p.id));
    B.wires = B.wires.filter(
      (w) =>
        !ids.includes(w.id) && !ids.includes(w.a.p) && !ids.includes(w.b.p),
    );
    B.bb.jumps = B.bb.jumps.filter((j) => !ids.includes(j.id));
    for (const id of ids) delete B.bb.place[id];
    B.sel = B.sel.filter((id) => !ids.includes(id));
    if (B.pop && ids.includes(B.pop)) B.pop = null;
  }
  // Прибрати з поля: деталь виходить з кола так само, як при вирізанні, —
  // її сусіди з'єднуються напряму. Вибраний дріт просто зникає.
  function discard(ids: string[]) {
    for (const id of ids)
      if (B.parts.some((p) => p.id === id)) cbExtract(B, id);
    removeIds(ids);
  }
  function removeSel() {
    if (!B.sel.length) return;
    if (bbMode()) return bbDiscard(B.sel.slice());
    mark();
    discard(B.sel.slice());
    changed();
  }
  // відсунути вийняту деталь убік, щоб видно було, що дріт знову суцільний
  function moveAside(p: CircuitPart) {
    for (const [dx, dy] of [
      [0, -120],
      [0, 120],
      [-160, 0],
      [160, 0],
      [0, -200],
      [0, 200],
    ]) {
      const x = p.x + dx,
        y = p.y + dy;
      if (x < 60 || x > CB_W - 60 || y < 60 || y > CB_H - 60) continue;
      if (
        B.parts.every(
          (q) => q === p || Math.abs(q.x - x) > 130 || Math.abs(q.y - y) > 100,
        )
      ) {
        p.x = x;
        p.y = y;
        return;
      }
    }
  }
  function extract(p: CircuitPart) {
    mark();
    cbExtract(B, p.id);
    moveAside(p);
    B.pop = null;
    note = {
      t: "Деталь вийнято, а дріт знову суцільний: її сусіди тепер з'єднані напряму. Кинь її на інший дріт, щоб вставити деінде.",
      until: clock + 5,
    };
    resolve();
    renderStatic();
    say();
  }
  function rotateSel() {
    const ps = B.parts.filter(
      (p) => isSel(p.id) && CIRC.parts[p.type].rotatable,
    );
    if (!ps.length) return;
    if (bbMode()) return bbFlip(ps);
    mark();
    for (const p of ps) p.rot = (p.rot + 1) % 4;
    changed();
  }
  function nudge(dx: number, dy: number) {
    const ps = B.parts.filter((p) => isSel(p.id));
    if (!ps.length) return;
    dx = Math.max(dx, ...ps.map((p) => 60 - p.x));
    dx = Math.min(dx, ...ps.map((p) => CB_W - 60 - p.x));
    dy = Math.max(dy, ...ps.map((p) => 60 - p.y));
    dy = Math.min(dy, ...ps.map((p) => CB_H - 60 - p.y));
    if (!dx && !dy) return;
    mark('nudge');
    for (const p of ps) {
      p.x += dx;
      p.y += dy;
    }
    closePop();
    renderStatic();
  }
  function copySel() {
    return cbCopy(B, B.sel);
  }
  function cutSel() {
    // вирізати: у буфер і прибрати
    if (!copySel()) return;
    if (bbMode()) return bbDiscard(B.sel.slice());
    mark();
    discard(B.sel.slice());
    changed();
  }
  function paste() {
    if (!CB_CLIP) return;
    mark();
    const ids = cbPaste(B, lastPt);
    if (!ids.length) {
      B.undo.pop();
      return;
    }
    B.sel = ids;
    closePop();
    changed();
  }
  function act(a: string) {
    if (a === 'close') return closePop();
    const id = B.pop || (B.sel.length === 1 ? B.sel[0] : null);
    if (a === 'del' && id) {
      if (bbMode()) return bbDiscard([id]);
      mark();
      discard([id]);
      return changed();
    }
    const p = B.parts.find((x) => x.id === id);
    if (!p) return;
    const d = CIRC.parts[p.type];
    if (a === 'out') return extract(p);
    if (a === 'rot' && bbMode()) return bbFlip([p]);
    mark();
    if (a === 'rot') {
      if (d.rotatable) p.rot = (p.rot + 1) % 4;
    } else if (d.act) d.act(p, a);
    changed();
  }

  /* ---------- макетка: правка ---------- */
  // Правка на макетці міняє лише B.bb, а схема підлаштовується до неї (bbCommit).
  const BB_ROWS_Y = Object.keys(BB.ROW).sort((a, b) => BB.ROW[a] - BB.ROW[b]);
  const bbCarrying = () =>
    !!(
      drag &&
      drag.moved &&
      (drag.kind === 'bbpart' || (drag.kind === 'palette' && drag.bb && drag.p))
    );
  const bbWiring = () =>
    !!(
      drag &&
      drag.moved &&
      (drag.kind === 'bbjmove' || drag.kind === 'bbjend')
    ); // дріт у руці
  const bbRowOf = (y: number) =>
    BB_ROWS_Y.reduce((m, k) =>
      Math.abs(BB.ROW[k] - y) < Math.abs(BB.ROW[m] - y) ? k : m,
    );
  function bbHoleAt(x: number, y: number): Hole | null {
    const c = Math.round((x - BB.X0) / BB.P) + 1,
      r = BB_ROWS_Y.find((k) => Math.abs(BB.ROW[k] - y) <= 8);
    const h = r && Math.abs(bbX(c) - x) <= 8 ? { c, r } : null;
    return h && bbValid(h) ? h : null;
  }
  const bbFree = (h: Hole, skip?: string) =>
    bbValid(h) && !bbOcc(B, skip).has(bbKey(h));
  const bbFits = (pl: Placement, skip?: string) =>
    bbLegs(pl).every((h) => bbFree(h, skip));
  function bbCommit() {
    cbSchemFromBoard(B);
    changed();
  }
  // деталь у руці: ліва ніжка — в отвір, найближчий до вказівника
  function bbAim(x: number, y: number) {
    if (!drag || (drag.kind !== 'bbpart' && drag.kind !== 'palette') || !drag.p)
      return;
    const pl0 = B.bb.place[drag.p.id] ||
      (drag.kind === 'bbpart' ? drag.pl0 : null) || { flip: false };
    const pl = {
      c: clamp(Math.round((x - BB.X0) / BB.P) + 1, 1, BB.COLS - 4),
      r: bbRowOf(y),
      flip: pl0.flip,
    };
    B.bb.place[drag.p.id] = pl;
    drag.ok = bbFits(pl, drag.p.id);
    renderStatic();
    say();
  }
  // кільця там, куди стануть ніжки деталі в руці, і під вказівником
  function bbMarks() {
    let h =
      '<circle id="bbHover" r="7" class="bb-ring hover" cx="-99" cy="-99"/>';
    const current = drag;
    const at: Hole[] =
      bbCarrying() &&
      current &&
      (current.kind === 'bbpart' || current.kind === 'palette') &&
      current.p
        ? bbLegs(B.bb.place[current.p.id])
        : bbWiring() &&
            current &&
            (current.kind === 'bbjend' || current.kind === 'bbjmove')
          ? [current.j.a, current.j.b]
          : [];
    const ok = current && 'ok' in current && current.ok;
    for (const q of at) {
      if (!(q.r in BB.ROW)) continue;
      const [x, y] = bbPt(q);
      h += `<circle cx="${x}" cy="${y}" r="7" class="bb-ring ${ok ? 'ok' : 'bad'}"/>`;
    }
    return h;
  }
  function bbHover(h: Hole | null) {
    const c = $('bbHover');
    if (!c) return;
    const [x, y] = h ? bbPt(h) : [-99, -99];
    c.setAttribute('cx', String(x));
    c.setAttribute('cy', String(y));
  }
  // Прибрати з макетки. Деталь, що стояла в колі, лишає на своєму місці перемичку:
  // як і на схемі, прибрана деталь не рве коло.
  function bbDiscard(ids: string[]) {
    mark();
    for (const id of ids) {
      const pl = B.bb.place[id];
      if (!pl) continue;
      const occ = [...bbOcc(B, id).values()],
        hs = bbLegs(pl);
      if (hs.every((h) => occ.some((o) => bbStrip(o.h) === bbStrip(h))))
        B.bb.jumps.push({
          id: 'j' + B.next++,
          a: hs[0],
          b: hs[1],
          color: BB_JUMP[B.bb.jumps.length % BB_JUMP.length],
        });
    }
    removeIds(ids);
    bbCommit();
  }
  function bbFlip(ps: CircuitPart[]) {
    // розвернути деталь: ніжки міняються отворами
    ps = ps.filter((p) => B.bb.place[p.id]);
    if (!ps.length) return;
    mark();
    for (const p of ps) B.bb.place[p.id].flip = !B.bb.place[p.id].flip;
    bbCommit();
  }
  function bbNudge(dc: number, dr: number) {
    const ps = B.parts.filter((p) => isSel(p.id) && B.bb.place[p.id]);
    const moved = ps.map((p): [CircuitPart, Placement] | null => {
      const pl = B.bb.place[p.id],
        r = BB_ROWS_Y[BB_ROWS_Y.indexOf(pl.r) + dr];
      const np = { c: pl.c + dc, r, flip: pl.flip };
      return r && np.c >= 1 && np.c + 4 <= BB.COLS && bbFits(np, p.id)
        ? [p, np]
        : null;
    });
    if (!ps.length || moved.some((m) => !m)) return;
    mark('nudge');
    for (const move of moved) {
      if (move) {
        const [p, np] = move;
        B.bb.place[p.id] = np;
      }
    }
    closePop();
    bbCommit();
  }
  function bbDown(e: PointerEvent, x: number, y: number, pEl: Element | null) {
    if (eventElement(e).closest('[data-mbtn]')) {
      // біла кнопка модуля живлення
      const bat = battery();
      required(CIRC.parts.battery.tap)(required(bat));
      changed();
      return;
    }
    const hole = bbHoleAt(x, y),
      jEl = eventElement(e).closest('[data-jump]');
    const jAt =
      hole &&
      B.bb.jumps.find(
        (j) => bbKey(j.a) === bbKey(hole) || bbKey(j.b) === bbKey(hole),
      );
    const jHit =
      jAt ||
      (jEl && B.bb.jumps.find((j) => j.id === jEl.getAttribute('data-jump')));
    if (jHit) {
      // дріт: за кінець — переставити кінець, за середину — увесь
      closePop();
      if (secondClick(jHit.id)) {
        openPop(jHit.id);
        return;
      }
      if (!isSel(jHit.id)) {
        B.sel = [jHit.id];
        renderStatic();
      }
      const end = jAt
        ? bbKey(jAt.a) === bbKey(required(hole))
          ? 'a'
          : 'b'
        : null;
      drag = {
        kind: end ? 'bbjend' : 'bbjmove',
        j: jHit,
        end,
        a0: Object.assign({}, jHit.a),
        b0: Object.assign({}, jHit.b),
        pts0: jHit.pts,
        x0: x,
        y0: y,
        moved: false,
        ok: true,
      };
      startTrack();
      return;
    }
    if (pEl) {
      const p = required(
          B.parts.find((q) => q.id === pEl.getAttribute('data-part')),
        ),
        d = CIRC.parts[p.type];
      const prev = secondClick(p.id);
      if (prev) {
        if (d.toggle && prev.toggled) p.s.on = !p.s.on;
        resolve();
        openPop(p.id);
        say();
        return;
      }
      if (B.pop !== p.id) closePop();
      if (d.hold) {
        p.s.pressed = true;
        changed();
      }
      if (!isSel(p.id)) {
        B.sel = [p.id];
        renderStatic();
      }
      const T = required(required(layout).place.get(p.id));
      drag = {
        kind: 'bbpart',
        p,
        pl0: B.bb.place[p.id] ? Object.assign({}, B.bb.place[p.id]) : null,
        fixed: p.type === 'battery',
        dx: x - (T.x - 2 * BB.P),
        dy: y - T.y,
        x0: x,
        y0: y,
        moved: false,
        ok: true,
      };
      startTrack();
      return;
    }
    closePop();
    if (hole && bbFree(hole)) {
      // з вільного отвору тягнемо перемичку
      drag = { kind: 'bbjump', from: hole, x0: x, y0: y, moved: false };
      startTrack();
      return;
    }
    if (B.sel.length) {
      B.sel = [];
      renderStatic();
    }
  }
  function bbRubber(from: Hole, x: number, y: number) {
    const [fx, fy] = bbPt(from);
    rubber.setAttribute('d', String(`M${fx},${fy} L${x},${y}`));
  }

  /* ---------- вказівник ---------- */
  function svgPt(e: MouseEvent): Point {
    const m = required(svg.getScreenCTM()).inverse(),
      pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const r = pt.matrixTransform(m);
    return [r.x, r.y];
  }
  const snap = (v: number) => Math.round(v / CB_GRID) * CB_GRID;
  const clamp = (v: number, lo: number, hi: number) =>
    Math.max(lo, Math.min(hi, v));
  const far = (d: { x0: number; y0: number }, x: number, y: number) =>
    Math.abs(x - d.x0) + Math.abs(y - d.y0) > 8;
  const insideSvg = (e: MouseEvent) => {
    const r = svg.getBoundingClientRect();
    return (
      e.clientX > r.left &&
      e.clientX < r.right &&
      e.clientY > r.top &&
      e.clientY < r.bottom
    );
  };
  function termAt(x: number, y: number, except?: Endpoint): Endpoint | null {
    let best: Endpoint | null = null,
      bd = 22 * 22;
    for (const p of B.parts)
      for (const t of [0, 1]) {
        if (except && except.p === p.id && except.t === t) continue;
        const q = cbTerm(p, t),
          d = (q.x - x) ** 2 + (q.y - y) ** 2;
        if (d < bd) {
          bd = d;
          best = { p: p.id, t };
        }
      }
    return best;
  }
  function showRubber(from: Endpoint, x: number, y: number) {
    const q = cbTerm(required(B.parts.find((p) => p.id === from.p)), from.t);
    rubber.setAttribute('d', String(`M${q.x},${q.y} L${x},${y}`));
  }
  function markHover(t: Endpoint | null) {
    const key = t ? t.p + ':' + t.t : null;
    if (key === hoverTerm) return;
    hoverTerm = key;
    for (const c of gT.children)
      c.classList.toggle('hot', c.getAttribute('data-term') === key);
  }
  function freeSpot(): Point {
    for (let r = 0; r < 12; r++)
      for (let a = 0; a < 8; a++) {
        const x = snap(CB_W * 0.55 + Math.cos((a * Math.PI) / 4) * r * 70),
          y = snap(CB_H / 2 + Math.sin((a * Math.PI) / 4) * r * 60);
        if (x < 80 || x > CB_W - 80 || y < 80 || y > CB_H - 80) continue;
        if (
          B.parts.every(
            (p) => Math.abs(p.x - x) > 150 || Math.abs(p.y - y) > 110,
          )
        )
          return [x, y];
      }
    return [snap(CB_W / 2), snap(CB_H / 2)];
  }
  // подвійний клік ловимо самі: після першого натискання поле перемальовується,
  // і браузерний dblclick губиться. Повертає попереднє натискання, якщо це другий клік.
  function secondClick(id: string) {
    const now = performance.now(),
      prev = lastDown;
    const dbl = prev.id === id && now - prev.t < 380;
    lastDown = dbl ? { id: null, t: -1 } : { id, t: now, toggled: false };
    return dbl ? prev : null;
  }

  // дріт під точкою: найближчий відрізок ламаної, не далі за maxD
  function wireAt(x: number, y: number, maxD: number) {
    let best: { w: Wire; a: Point; b: Point } | null = null,
      bd = maxD;
    for (const c of conductors) {
      const wire = B.wires.find((wire) => wire === c.obj);
      if (!wire) continue;
      const pts = c.poly.pts;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1],
          b = pts[i];
        const qx = clamp(x, Math.min(a[0], b[0]), Math.max(a[0], b[0])),
          qy = clamp(y, Math.min(a[1], b[1]), Math.max(a[1], b[1]));
        const d = Math.hypot(x - qx, y - qy);
        if (d < bd) {
          bd = d;
          best = { w: wire, a, b };
        }
      }
    }
    return best;
  }
  // Вільна деталь над дротом: дріт підсвічується, деталь стає вздовж нього
  // й на його лінію — так, як стоятиме, коли її відпустять.
  function aim(p: CircuitPart, rot0 = 0) {
    p.rot = rot0;
    const hit = wireAt(p.x, p.y, 28);
    dropWire = hit ? hit.w.id : null;
    if (!hit || !CIRC.parts[p.type].rotatable) return;
    const vert = hit.a[0] === hit.b[0];
    if ((p.rot % 2 === 1) !== vert) p.rot = vert ? 1 : 0;
    if (vert) p.x = hit.a[0];
    else p.y = hit.a[1];
  }
  function drop(p: CircuitPart) {
    // відпустили вільну деталь: над дротом — стає в коло
    const w = dropWire && B.wires.find((x) => x.id === dropWire);
    floating = null;
    dropWire = null;
    if (w) {
      cbInsert(B, p, w);
      note = { t: 'Деталь розрізала дріт і стала в коло.', until: clock + 3 };
    }
  }

  bindSvg('pointerdown', (e) => {
    if (e.button > 0) return;
    const [x, y] = svgPt(e);
    const pEl = eventElement(e).closest('[data-part]'),
      wEl = eventElement(e).closest('[data-wire]');
    if (bbMode()) return bbDown(e, x, y, pEl);
    const near = termAt(x, y);

    if (pending) {
      // другий клік режиму «клік — клік»
      if (near && !(near.p === pending.p && near.t === pending.t)) {
        mark();
        if (!cbAddWire(B, pending, near)) B.undo.pop();
      }
      pending = null;
      rubber.setAttribute('d', String(''));
      markHover(null);
      changed();
      return;
    }
    const wSel =
      near && B.sel.length === 1 && B.wires.find((w) => w.id === B.sel[0]);
    const end =
      wSel &&
      (['a', 'b'] as const).find(
        (k) => wSel[k].p === near.p && wSel[k].t === near.t,
      );
    if (end) {
      // кінець вибраного дроту — перечіпляємо
      closePop();
      drag = {
        kind: 'rewire',
        w: wSel,
        end,
        fixed: wSel[end === 'a' ? 'b' : 'a'],
        from: near,
        x0: x,
        y0: y,
        moved: false,
      };
      startTrack();
      return;
    }
    if (near) {
      // від контакту тягнемо дріт
      closePop();
      drag = { kind: 'wire', from: near, x0: x, y0: y, moved: false };
      showRubber(near, x, y);
      startTrack();
      return;
    }
    if (pEl) {
      const p = required(
          B.parts.find((q) => q.id === pEl.getAttribute('data-part')),
        ),
        d = CIRC.parts[p.type];
      if (e.shiftKey) {
        // Shift — додати до вибраного чи прибрати з нього
        closePop();
        B.sel = isSel(p.id)
          ? B.sel.filter((id) => id !== p.id)
          : B.sel.concat(p.id);
        renderStatic();
        return;
      }
      const prev = secondClick(p.id);
      if (prev) {
        if (d.toggle && prev.toggled) p.s.on = !p.s.on; // подвійний клік вимикач не перемикає
        resolve();
        openPop(p.id);
        say();
        return;
      }
      if (B.pop !== p.id) closePop();
      if (d.hold) {
        p.s.pressed = true;
        changed();
      }
      if (!isSel(p.id)) {
        B.sel = [p.id];
        renderStatic();
      }
      const group = B.parts.filter((q) => isSel(q.id));
      drag = {
        kind: 'move',
        p,
        group,
        start: group.map((q) => [q.x, q.y]),
        dx: x - p.x,
        dy: y - p.y,
        x0: x,
        y0: y,
        moved: false,
        alt: e.altKey,
      };
      startTrack();
      return;
    }
    if (wEl) {
      const id = required(wEl.getAttribute('data-wire'));
      closePop();
      if (e.shiftKey) {
        B.sel = isSel(id) ? B.sel.filter((s) => s !== id) : B.sel.concat(id);
        renderStatic();
        return;
      }
      if (secondClick(id)) {
        openPop(id);
        return;
      }
      B.sel = [id];
      renderStatic();
      return;
    }
    closePop(); // порожнє місце: рамка виділення
    drag = {
      kind: 'marq',
      x0: x,
      y0: y,
      keep: e.shiftKey ? B.sel.slice() : [],
      moved: false,
    };
    if (!e.shiftKey && B.sel.length) {
      B.sel = [];
      renderStatic();
    }
    startTrack();
  });

  bindSvg('contextmenu', (e) => {
    // права кнопка — те саме вікно, що й подвійний клік
    const el = eventElement(e).closest('[data-part],[data-wire],[data-jump]');
    if (!el) return;
    e.preventDefault();
    resolve();
    openPop(
      required(
        el.getAttribute('data-part') ||
          el.getAttribute('data-wire') ||
          el.getAttribute('data-jump'),
      ),
    );
    say();
  });

  bindSvg('pointermove', (e) => {
    const [x, y] = svgPt(e);
    lastPt = [x, y];
    if (drag) return;
    if (pending) {
      showRubber(pending, x, y);
      markHover(termAt(x, y, pending));
      return;
    }
    if (bbMode()) {
      const h = bbHoleAt(x, y);
      bbHover(h && bbFree(h) ? h : null);
    } else markHover(termAt(x, y));
  });
  bindSvg('pointerleave', () => {
    if (!drag) lastPt = null;
  });

  // перетягування з панелі деталей
  function palettePointerDown(e: PointerEvent, type: string) {
    if (e.button > 0 || !CIRC.parts[type]) return;
    if (CIRC.parts[type].single && B.parts.some((p) => p.type === type)) return;
    e.preventDefault();
    closePop();
    drag = {
      kind: 'palette',
      type,
      p: null,
      cx: e.clientX,
      cy: e.clientY,
      moved: false,
    };
    startTrack();
  }

  function startTrack() {
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  }
  function stopTrack() {
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onUp);
  }

  function onMove(e: PointerEvent) {
    if (!drag || gen !== circuitState.simGen) return;
    const [x, y] = svgPt(e);
    if (drag.kind === 'wire' || drag.kind === 'rewire') {
      if (far(drag, x, y)) drag.moved = true;
      if (drag.kind === 'rewire' && !drag.moved) return;
      const from = drag.kind === 'wire' ? drag.from : drag.fixed;
      showRubber(from, x, y);
      markHover(termAt(x, y, from));
    } else if (drag.kind === 'bbpart') {
      if (drag.fixed) return; // батарейка стоїть поза платою
      if (!drag.moved && far(drag, x, y)) {
        drag.moved = true;
        closePop();
        lastDown = { id: null, t: -1 };
        if (drag.p.s.pressed) {
          drag.p.s.pressed = false;
          resolve();
        }
        mark();
      }
      if (drag.moved) bbAim(x - drag.dx, y - drag.dy);
    } else if (drag.kind === 'bbjump') {
      if (far(drag, x, y)) drag.moved = true;
      if (!drag.moved) return;
      bbRubber(drag.from, x, y);
      const h = bbHoleAt(x, y);
      bbHover(h && bbFree(h) ? h : null);
    } else if (drag.kind === 'bbjend' || drag.kind === 'bbjmove') {
      if (!drag.moved && far(drag, x, y)) {
        drag.moved = true;
        lastDown = { id: null, t: -1 };
        mark();
      }
      if (!drag.moved) return;
      const j = drag.j,
        col = (v: number) => Math.round((v - BB.X0) / BB.P) + 1;
      if (drag.kind === 'bbjend') {
        // кінець іде за вказівником, з отвору в отвір
        j[required(drag.end)] = { c: col(x), r: bbRowOf(y) };
      } else {
        // увесь дріт: обидва кінці на той самий зсув
        const dc = col(x) - col(drag.x0),
          dr =
            BB_ROWS_Y.indexOf(bbRowOf(y)) - BB_ROWS_Y.indexOf(bbRowOf(drag.y0));
        const shift = (h: Hole) => ({
          c: h.c + dc,
          r: BB_ROWS_Y[BB_ROWS_Y.indexOf(h.r) + dr],
        });
        const na = shift(drag.a0),
          nb = shift(drag.b0);
        if (!na.r || !nb.r) return; // за верхній чи нижній край — далі не йде
        j.a = na;
        j.b = nb;
      }
      j.pts = undefined;
      drag.ok =
        bbKey(j.a) !== bbKey(j.b) && bbFree(j.a, j.id) && bbFree(j.b, j.id);
      if (drag.ok && drag.pts0) j.pts = bbRoute(B, j.a, j.b); // дріт, що клала розкладка, лишається «скобою»
      bbHover(null);
      renderStatic();
      say();
    } else if (drag.kind === 'move') {
      if (!drag.moved && far(drag, x, y)) {
        drag.moved = true;
        closePop();
        lastDown = { id: null, t: -1 }; // перетягування — не половина подвійного кліку
        if (drag.p.s.pressed) {
          drag.p.s.pressed = false;
          changed();
        } // кнопку потягли — це не натискання
        mark();
        if (drag.alt && drag.group.length === 1 && cbInCircuit(B, drag.p.id)) {
          // Alt — витягти з кола
          cbExtract(B, drag.p.id);
          resolve();
        }
        // вільну деталь (без жодного дроту) можна кинути на дріт
        if (drag.group.length === 1 && !cbLinks(B, drag.p.id).length) {
          floating = drag.p;
          drag.rot0 = drag.p.rot;
        }
      }
      if (!drag.moved) return;
      const i = drag.group.indexOf(drag.p);
      let ddx = snap(x - drag.dx) - drag.start[i][0],
        ddy = snap(y - drag.dy) - drag.start[i][1];
      for (const [sx, sy] of drag.start) {
        // увесь гурт лишається на полі
        ddx = clamp(ddx, 60 - sx, CB_W - 60 - sx);
        ddy = clamp(ddy, 60 - sy, CB_H - 60 - sy);
      }
      const starts = drag.start;
      drag.group.forEach((q, k) => {
        q.x = starts[k][0] + ddx;
        q.y = starts[k][1] + ddy;
      });
      if (floating) aim(drag.p, drag.rot0);
      renderStatic();
      say();
    } else if (drag.kind === 'palette') {
      if (Math.abs(e.clientX - drag.cx) + Math.abs(e.clientY - drag.cy) > 8)
        drag.moved = true;
      if (!drag.moved) return;
      if (bbMode()) {
        // на макетці деталь одразу йде ніжками в отвори
        if (insideSvg(e) && !drag.p) {
          mark();
          const [fx, fy] = freeSpot();
          drag.p = cbAddPart(B, drag.type, fx, fy);
          B.sel = [drag.p.id];
          drag.bb = drag.type !== 'battery';
        }
        if (drag.p && drag.bb) bbAim(x - 2 * BB.P, y);
        return;
      }
      if (insideSvg(e) && !drag.p) {
        mark();
        drag.p = cbAddPart(B, drag.type, snap(x), snap(y));
        B.sel = [drag.p.id];
        floating = drag.p;
        drag.rot0 = 0;
      }
      if (drag.p) {
        drag.p.x = clamp(snap(x), 60, CB_W - 60);
        drag.p.y = clamp(snap(y), 60, CB_H - 60);
        aim(drag.p, drag.rot0);
        renderStatic();
        say();
      }
    } else if (drag.kind === 'marq') {
      if (far(drag, x, y)) drag.moved = true;
      if (!drag.moved) return;
      const r = {
        x0: Math.min(x, drag.x0),
        y0: Math.min(y, drag.y0),
        x1: Math.max(x, drag.x0),
        y1: Math.max(y, drag.y0),
      };
      marq.setAttribute('x', String(r.x0));
      marq.setAttribute('y', String(r.y0));
      marq.setAttribute('width', String(r.x1 - r.x0));
      marq.setAttribute('height', String(r.y1 - r.y0));
      marq.removeAttribute('hidden');
      // деталь вибрана, якщо рамка захопила її середину; дріт — якщо обидві його деталі
      const ps = B.parts
        .filter((p) => p.x >= r.x0 && p.x <= r.x1 && p.y >= r.y0 && p.y <= r.y1)
        .map((p) => p.id);
      const all = new Set(drag.keep.concat(ps));
      const ws = B.wires
        .filter((w) => all.has(w.a.p) && all.has(w.b.p))
        .map((w) => w.id);
      const sel = [...new Set([...all, ...ws])];
      if (sel.join() !== B.sel.join()) {
        B.sel = sel;
        renderStatic();
      }
    }
  }
  function onUp(e: PointerEvent) {
    stopTrack();
    const d = drag;
    drag = null;
    if (!d || gen !== circuitState.simGen) return;
    const [x, y] = svgPt(e);
    if (d.kind === 'wire') {
      const to = termAt(x, y, d.from);
      rubber.setAttribute('d', String(''));
      if (to && d.moved) {
        mark();
        if (!cbAddWire(B, d.from, to)) B.undo.pop();
        changed();
      } else if (!d.moved) {
        pending = d.from;
        showRubber(d.from, x, y);
      } // клік по контакту: далі клік по другому
      markHover(null);
    } else if (d.kind === 'rewire') {
      rubber.setAttribute('d', String(''));
      markHover(null);
      if (!d.moved) {
        pending = d.from;
        showRubber(d.from, x, y);
        return;
      }
      const to = termAt(x, y, d.fixed);
      if (!to || (to.p === d.from.p && to.t === d.from.t))
        return renderStatic(); // не на контакт — дріт лишається, як був
      mark();
      const same = (u: Endpoint, v: Endpoint) => u.p === v.p && u.t === v.t;
      d.w[d.end] = to;
      if (
        B.wires.some(
          (w) =>
            w !== d.w &&
            ((same(w.a, d.w.a) && same(w.b, d.w.b)) ||
              (same(w.a, d.w.b) && same(w.b, d.w.a))),
        )
      )
        removeIds([d.w.id]); // такий дріт уже є — зайвий прибираємо
      changed();
    } else if (d.kind === 'bbpart') {
      const def = CIRC.parts[d.p.type];
      if (def.hold) d.p.s.pressed = false;
      if (!d.moved) {
        if (def.toggle) {
          d.p.s.on = !d.p.s.on;
          if (lastDown.id === d.p.id) lastDown.toggled = true;
        }
        return changed();
      }
      if (d.ok) return bbCommit();
      if (d.pl0) B.bb.place[d.p.id] = d.pl0;
      else delete B.bb.place[d.p.id]; // сюди не стане — повертаємо
      B.undo.pop();
      changed();
      note = {
        t: 'Сюди деталь не стане: отвір уже зайнятий або ніжка виходить за край плати.',
        until: clock + 3,
      };
    } else if (d.kind === 'bbjump') {
      rubber.setAttribute('d', String(''));
      bbHover(null);
      const to = d.moved && bbHoleAt(x, y);
      if (!to || bbKey(to) === bbKey(d.from) || !bbFree(to))
        return renderStatic();
      mark();
      B.bb.jumps.push({
        id: 'j' + B.next++,
        a: d.from,
        b: to,
        color: BB_JUMP[B.bb.jumps.length % BB_JUMP.length],
      });
      bbCommit();
    } else if (d.kind === 'bbjend' || d.kind === 'bbjmove') {
      if (!d.moved) return;
      if (d.ok) return bbCommit();
      Object.assign(d.j, { a: d.a0, b: d.b0, pts: d.pts0 }); // на зайняте чи за край — дріт повертається
      B.undo.pop();
      changed();
      note = {
        t: 'Сюди дріт не стане: отвір уже зайнятий або кінець виходить за край плати.',
        until: clock + 3,
      };
    } else if (d.kind === 'move') {
      const def = CIRC.parts[d.p.type];
      if (def.hold) d.p.s.pressed = false;
      if (!d.moved && def.toggle) {
        d.p.s.on = !d.p.s.on;
        if (lastDown.id === d.p.id) lastDown.toggled = true;
      }
      if (floating) drop(d.p);
      changed();
      if (d.moved && !note && d.alt)
        note = {
          t: "Деталь вийнято з кола, а її сусіди з'єднались напряму.",
          until: clock + 3,
        };
    } else if (d.kind === 'palette') {
      if (!d.moved) {
        // простий клік — ставимо на вільне місце
        mark();
        const [fx, fy] = freeSpot();
        B.sel = [cbAddPart(B, d.type, fx, fy).id];
      } else if (d.p && !insideSvg(e)) {
        // винесли за поле — передумали
        floating = null;
        dropWire = null;
        removeIds([d.p.id]);
        B.undo.pop();
      } else if (d.p && d.bb) {
        // на макетці: у вільні отвори — схема підлаштується
        if (d.ok) return bbCommit();
        delete B.bb.place[d.p.id]; // на зайняте — знайдемо місце самі
      } else if (d.p && !bbMode()) drop(d.p);
      changed();
    } else if (d.kind === 'marq') {
      marq.setAttribute('hidden', String(''));
    }
  }

  function onKey(e: KeyboardEvent) {
    if (gen !== circuitState.simGen || !root.isConnected) {
      document.removeEventListener('keydown', onKey);
      return;
    }
    if (
      e.target instanceof Element &&
      e.target.closest('input,textarea,[contenteditable]')
    )
      return;
    if (drag) return;
    const mod = e.ctrlKey || e.metaKey,
      c = e.code; // e.code: однаково на українській і англійській розкладці
    if (mod) {
      const fn = {
        KeyZ: e.shiftKey ? redo : undo,
        KeyY: redo,
        KeyC: copySel,
        KeyX: cutSel,
        KeyV: paste,
        KeyD: () => {
          if (copySel()) {
            if (CB_CLIP) CB_CLIP.n = 0;
            lastPt = null;
            paste();
          }
        },
        KeyA: () => {
          B.sel = B.parts
            .map((p) => p.id)
            .concat(
              bbMode() ? B.bb.jumps.map((j) => j.id) : B.wires.map((w) => w.id),
            );
          closePop();
          renderStatic();
        },
      }[c];
      if (fn) {
        e.preventDefault();
        fn();
      }
      return;
    }
    if (e.key === 'Escape') {
      if (pending) {
        pending = null;
        rubber.setAttribute('d', String(''));
        markHover(null);
        return;
      }
      if (B.pop) return closePop();
      if (B.sel.length) {
        B.sel = [];
        renderStatic();
      }
      return;
    }
    if (!B.sel.length) return;
    const step = e.shiftKey ? CB_GRID * 3 : CB_GRID;
    const arrows = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    }[e.key];
    if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      removeSel();
    } else if (c === 'KeyR') {
      e.preventDefault();
      rotateSel();
    } else if (arrows) {
      e.preventDefault();
      if (bbMode())
        bbNudge(Math.sign(arrows[0]), Math.sign(arrows[1])); // на макетці — на один отвір
      else nudge(arrows[0], arrows[1]);
    }
  }
  document.addEventListener('keydown', onKey);

  // Вигляд: схема чи макетка. Коло одне й те саме, тож перемикання нічого в ньому не міняє.
  function setView(v: 'schem' | 'bb') {
    circuitState.cbView = v;
    const bb = v === 'bb';
    $('cbGrid').style.display = bb ? 'none' : '';
    if (!bb) {
      layout = null;
      svg.setAttribute('viewBox', String(`0 0 ${CB_W} ${CB_H}`));
    }
    pending = null;
    rubber.setAttribute('d', String(''));
    B.pop = null;
    resolve();
    renderStatic();
    say();
  }
  function clear() {
    const bat = battery(),
      hist = B.undo.concat(cbSnap(B));
    B = circuitState.circuit = cbNewBoard(false);
    B.undo = hist.slice(-100);
    if (bat) {
      const nb = cbAddPart(B, 'battery', 180, 340);
      nb.props = bat.props;
      nb.s = bat.s;
    } // та сама батарейка
    changed();
  }

  /* ---------- кадр: електрони, тепло, розряд ---------- */
  const pool: {
    c: SVGCircleElement;
    t: SVGRectElement;
    vis: boolean;
    r: number;
  }[] = [];
  function put(i: number, x: number, y: number, r = 7) {
    r = r || 7;
    let d = pool[i];
    if (!d) {
      const c = document.createElementNS(SVGNS, 'circle');
      c.setAttribute('class', String('el'));
      const t = document.createElementNS(SVGNS, 'rect'); // знак «−» усередині електрона
      t.setAttribute('rx', String(1));
      t.setAttribute('class', String('elm'));
      gD.appendChild(c);
      gD.appendChild(t);
      d = pool[i] = { c, t, vis: true, r: 0 };
    }
    if (d.r !== r) {
      d.r = r;
      d.c.setAttribute('r', String(r));
      d.t.setAttribute('width', String(r));
      d.t.setAttribute('height', String(Math.max(1.6, r * 0.34)));
    }
    d.c.setAttribute('cx', String(x));
    d.c.setAttribute('cy', String(y));
    d.t.setAttribute('x', String(x - r / 2));
    d.t.setAttribute('y', String(y - r * 0.17));
    if (!d.vis) {
      d.c.style.display = d.t.style.display = '';
      d.vis = true;
    }
  }

  let last = 0;
  function frame(ts: number) {
    if (disposed || gen !== circuitState.simGen) return;
    if (!root.isConnected) {
      cbSound([]);
      return;
    } // сторінку перемальовано чи покинуто
    const dt = last ? Math.min(0.064, (ts - last) / 1000) : 0;
    last = ts;
    clock += dt;
    const bb = bbMode(),
      sc = bb ? BB.K : 1; // на макетці все дрібніше: і крок, і швидкість, і електрони
    const base = Number(speedEl.value) * 34 * sc; // одиниць за секунду — темп, за яким око встигає
    const SP = CIRC.SPACING * sc,
      er = 7 * sc;

    // тепло, розряд, зарядка — кожна деталь сама знає свої
    let need = false;
    for (const p of B.parts) {
      const r = CIRC.parts[p.type].tick?.(p, dt);
      if (r) {
        need = need || r.resolve;
        if (r.say) B.sticky = r.say;
      }
    }

    // електрони: один ланцюжок по всьому колу, рух ∝ струму в гілці
    if (chainDirty) chain();
    let n = 0;
    for (const c of conductors) {
      const len = c.poly.len,
        dist = circFlow(c.obj.rt.I) * base * dt;
      if (!still) c.obj.ph += dist; // фаза — пройдений шлях від входу в провідник
      if (
        c.ramp === 'out' &&
        c.part &&
        required(CIRC.parts[c.part.type].drain)(c.part, dist / sc)
      )
        need = true; // купка тане рівно за потоком
      const g = c.gap && c.gap(),
        gap = g && [g[0] * (c.k ?? 1), g[1] * (c.k ?? 1)];
      const ph = ((c.obj.ph % SP) + SP) % SP;
      for (let d = ph; d < len - 0.5; d += SP) {
        // кінцева точка дістанеться сусідові
        const s = c.entry === 0 ? d : len - d;
        if (gap && s > gap[0] && s < gap[1]) continue;
        const [x, y] = cbAt(c.poly, s);
        put(n++, x, y, er);
      }
    }
    // кімнати батарейки: запас, який тане
    for (const p of B.parts) {
      const d = CIRC.parts[p.type];
      if (!d.rooms) continue;
      const T = tf(p);
      for (let i = 0; i < required(d.cap)(p); i++) {
        const room = i < stateNumber(p.s, 'm') ? 'minus' : 'plus',
          q = required(d.slot)(
            room,
            room === 'minus' ? i : i - stateNumber(p.s, 'm'),
          );
        put(n++, T.x + q.x * T.k, T.y + q.y * T.k, required(d.slotR) * T.k);
      }
    }
    if (need) {
      resolve();
      renderStatic();
    } // щось згоріло чи сіло: деталь виглядає інакше
    for (let i = n; i < pool.length; i++)
      if (pool[i].vis) {
        pool[i].c.style.display = pool[i].t.style.display = 'none';
        pool[i].vis = false;
      }

    // вигляд деталей
    const env = { t: clock, still };
    for (const g of gP.children) {
      const p = B.parts.find((q) => q.id === g.getAttribute('data-part')),
        d = p && CIRC.parts[p.type];
      if (p && d?.paint && g instanceof SVGGElement) d.paint(p, g, env);
    }
    cbSound(
      B.parts
        .filter(
          (p) => p.type === 'buzzer' && required(CIRC.parts.buzzer.sounding)(p),
        )
        .map((p) => ({
          id: p.id,
          vol: numberProperty(p, 'vol'),
          tone: numberProperty(p, 'tone'),
        })),
    );
    renderLabels();
    say();
    frameId = requestAnimationFrame(frame);
  }

  setView(circuitState.cbView || 'schem');
  frameId = requestAnimationFrame(frame);
  return {
    setView,
    undo,
    redo,
    clear,
    action: act,
    setParameter,
    palettePointerDown,
    positionPop,
    dispose() {
      if (disposed) return;
      disposed = true;
      const ownsState = gen === circuitState.simGen;
      if (ownsState) circuitState.simGen++;
      cancelAnimationFrame(frameId);
      detachSvgListeners.forEach((detach) => detach());
      stopTrack();
      document.removeEventListener('keydown', onKey);
      if (ownsState) {
        B.parts.forEach((p) => {
          if (CIRC.parts[p.type].hold) p.s.pressed = false;
        });
        disposeAudio();
      }
    },
  };
}

export const CircuitEngine: CircuitController = {
  palette() {
    return Object.keys(CIRC.parts)
      .filter((type) => CIRC.parts[type].pal)
      .sort((a, b) => CIRC.parts[a].pal - CIRC.parts[b].pal)
      .map((type) => ({
        type,
        name: CIRC.parts[type].name,
        viewBox: type === 'battery' ? '-92 -92 200 184' : '-70 -90 140 130',
        svg: CIRC.parts[type].draw(
          Object.assign(
            {
              id: 'palette',
              type,
              x: 0,
              y: 0,
              rot: 0,
              rt: { I: 0, vrev: 0, vfw: 0 },
              ph: 0,
              ramp: [0, 0],
            },
            CIRC.parts[type].init(),
          ),
        ),
      }));
  },
  mount: initRoboSim,
};

// CircuitProjector owns the React control surface and mounts this drawing engine.

function eventElement(event: Event): Element {
  const target = event.target;
  if (!(target instanceof Element))
    throw new Error('Circuit event requires element');
  return target;
}
