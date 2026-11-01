import type { Pen } from '../../../engines/core/handwriting';
import { HW_DUR, HW_STEP, hwGlyphs } from '../../../engines/core/handwriting';
import type { EngineStepContext } from '../../../engines/core/registry';
import { defineTool } from '../../../engines/core/registry';
import { fmtNum, gcd, prefersReducedMotion } from '../../../engines/core/util';
type FractionUnit =
  | { type: 'frac'; n: number | string; d: number | string }
  | { type: 'op' | 'num'; t: string }
  | { type: 'mixed'; whole: number; n: number; d: number };
interface FractionSegment {
  units: FractionUnit[];
  note?: string;
  done?: boolean;
}
interface DenominatorState {
  b: number;
  d: number;
  multsB: number[];
  multsD: number[];
  bShown: number;
  dShown: number;
  newSide: string;
  matchVal: number | null;
  showMult: boolean;
  ka?: number;
  kc?: number;
  L?: number;
}
interface FractionStep {
  chainUpto: number;
  newSeg?: boolean;
  denom?: DenominatorState;
  flip?: 'morph' | 'add';
  text: string;
}
interface FractionFlip {
  kind: 'morph' | 'add';
  newIdx: number;
}
function isFractionFlip(value: unknown): value is FractionFlip {
  return (
    typeof value === 'object' &&
    value !== null &&
    'kind' in value &&
    (value.kind === 'morph' || value.kind === 'add') &&
    'newIdx' in value &&
    typeof value.newIdx === 'number'
  );
}
type FractionModel = ReturnType<typeof buildFracModel>;
/* =========================================================
   ДІЇ З ДРОБАМИ
   ========================================================= */
/* ---------- 4) ДІЇ З ДРОБАМИ ----------
   Розв'язання йде в ОДНОМУ рядку: кожен крок дописує «= <новий вигляд>».
   Коли рядок заповнюється — сегмент автоматично переноситься на новий (flex-wrap). */
export function buildFracModel(
  a: number,
  b: number,
  op: unknown,
  c: number,
  d: number,
) {
  a = Math.trunc(a);
  b = Math.trunc(b);
  c = Math.trunc(c);
  d = Math.trunc(d);
  if (!b || !d) throw 'bad';
  const plus = op !== '-';
  const sign = plus ? '+' : '−';
  const F = (n: number | string, dd: number | string): FractionUnit => ({
    type: 'frac',
    n,
    d: dd,
  });
  const O = (): FractionUnit => ({ type: 'op', t: sign });
  const N = (n: number): FractionUnit => ({ type: 'num', t: fmtNum(n) });
  const segs: FractionSegment[] = []; // сегменти ланцюжка (горизонтально)
  const steps: FractionStep[] = []; // кроки: {chainUpto, newSeg, denom, text}
  segs.push({ units: [F(a, b), O(), F(c, d)] });
  steps.push({
    chainUpto: 1,
    newSeg: true,
    text: `Записуємо вираз. Потрібно ${plus ? 'додати' : 'відняти'} два дроби.`,
  });

  let L, na, nc;
  if (b !== d) {
    // ІТЕРАТИВНИЙ пошук НСК: по черзі відкриваємо наступне кратне кожного знаменника
    // й після кожного перевіряємо збіг. Перший збіг — це НСК.
    const multsB: number[] = [],
      multsD: number[] = [];
    const denSnap = (
      newSide: string,
      matchVal: number | null,
      showMult?: boolean,
      ka?: number,
      kc?: number,
      Lv?: number,
    ): DenominatorState => ({
      b,
      d,
      multsB: multsB.slice(),
      multsD: multsD.slice(),
      bShown: multsB.length,
      dShown: multsD.length,
      newSide,
      matchVal: matchVal || null,
      showMult: !!showMult,
      ka,
      kc,
      L: Lv,
    });
    let k = 1,
      match = null;
    while (!match && k <= 200) {
      const vb = k * b;
      multsB.push(vb);
      const mb = multsD.includes(vb);
      steps.push({
        chainUpto: 1,
        denom: denSnap('b', mb ? vb : null),
        text: mb
          ? `Наступне кратне ${b}: ${k}×${b} = ${vb}. А ${vb} вже є серед кратних ${d}! Отже, ${vb} — найменше спільне кратне: НСК(${b}, ${d}) = ${vb}.`
          : `Наступне кратне ${b}: ${k}×${b} = ${vb}.`,
      });
      if (mb) {
        match = vb;
        break;
      }
      const vd = k * d;
      multsD.push(vd);
      const md = multsB.includes(vd);
      steps.push({
        chainUpto: 1,
        denom: denSnap('d', md ? vd : null),
        text: md
          ? `Наступне кратне ${d}: ${k}×${d} = ${vd}. А ${vd} вже є серед кратних ${b}! Отже, ${vd} — найменше спільне кратне: НСК(${b}, ${d}) = ${vd}.`
          : `Наступне кратне ${d}: ${k}×${d} = ${vd}. Спільного числа ще немає — беремо наступні кратні.`,
      });
      if (md) {
        match = vd;
        break;
      }
      k++;
    }
    L = match || (b / gcd(b, d)) * d;
    const ka = L / b,
      kc = L / d;
    na = a * ka;
    nc = c * kc;
    // 1) множення показуємо прямо в дробах: 7·3/10·3 + 2·2/15·2 (множник — маркер «·» → окремий стиль)
    const mul = (base: number, k: number) => `${base}·${k}`;
    segs.push({
      units: [F(mul(a, ka), mul(b, ka)), O(), F(mul(c, kc), mul(d, kc))],
      note: 'домножуємо чисельник і знаменник',
    });
    steps.push({
      chainUpto: segs.length,
      newSeg: true,
      denom: denSnap('', L, true, ka, kc, L),
      text: `Скільки разів кожен знаменник уміщається в ${L}? ${b}×${ka}=${L} і ${d}×${kc}=${L}. Множимо і чисельник, і знаменник кожного дробу на цей множник — значення дробу не зміниться.`,
    });
    // 2) обчислений результат: 21/30 + 4/30 (7·3 вилітає й перетворюється на 21)
    segs.push({
      units: [F(na, L), O(), F(nc, L)],
      note: `спільний знаменник ${L}`,
    });
    steps.push({
      chainUpto: segs.length,
      newSeg: true,
      flip: 'morph',
      text: `Перемножуємо: ${a}·${ka}=${na} над ${b}·${ka}=${L}, і ${c}·${kc}=${nc} над ${d}·${kc}=${L}. Дроби зведені до спільного знаменника ${L}.`,
    });
  } else {
    L = b;
    na = a;
    nc = c;
  }

  const num = plus ? na + nc : na - nc;
  segs.push({
    units: [F(num, L)],
    note: plus ? 'додаємо чисельники' : 'віднімаємо чисельники',
    done: true,
  });
  steps.push({
    chainUpto: segs.length,
    newSeg: true,
    flip: 'add',
    text: `${plus ? 'Додаємо' : 'Віднімаємо'} чисельники, знаменник лишається спільним: ${na} ${sign} ${nc} = ${num}. Отримали ${num}/${L}.`,
  });

  // скорочення
  const g = gcd(Math.abs(num), L);
  let fn = num,
    fd = L;
  if (g > 1 && num !== 0) {
    fn = num / g;
    fd = L / g;
    segs[segs.length - 1].done = false;
    segs.push({ units: [F(fn, fd)], note: `скорочуємо на ${g}`, done: true });
    steps.push({
      chainUpto: segs.length,
      newSeg: true,
      flip: 'morph',
      text: `Чисельник і знаменник діляться на ${g}: скорочуємо дріб — ${num}:${g}=${fn}, ${L}:${g}=${fd}.`,
    });
  }
  // ціле або мішане число
  if (fd === 1) {
    segs[segs.length - 1].done = false;
    segs.push({ units: [N(fn)], done: true });
    steps.push({
      chainUpto: segs.length,
      newSeg: true,
      text: `Знаменник дорівнює 1 — це ціле число ${fn}.`,
    });
  } else if (Math.abs(fn) >= fd) {
    const whole = Math.trunc(fn / fd),
      rest = Math.abs(fn % fd);
    if (rest !== 0) {
      segs[segs.length - 1].done = false;
      segs.push({
        units: [{ type: 'mixed', whole, n: rest, d: fd }],
        note: 'мішане число',
        done: true,
      });
      steps.push({
        chainUpto: segs.length,
        newSeg: true,
        text: `Дріб неправильний: виділяємо цілу частину — ${whole} цілих і ${rest}/${fd}.`,
      });
    }
  }
  return { segments: segs, steps };
}

// число рукописними гліфами; якщо є маркер «·» (множник) — частину «·k» виділяємо стилем .fmul
function hwNum(value: number | string, ctx: Pen) {
  const s = String(value);
  const dot = s.indexOf('·');
  if (dot < 0) return hwGlyphs(s, ctx);
  return (
    hwGlyphs(s.slice(0, dot), ctx) +
    `<span class="fmul">${hwGlyphs('·' + s.slice(dot + 1), ctx)}</span>`
  );
}
// риска дробу отримує «такт» у послідовності письма (малюється між чисельником і знаменником)
function fbar(ctx: Pen) {
  let d = '';
  if (ctx.writing) {
    d = ` style="animation-delay:${(ctx.order * HW_STEP).toFixed(2)}s"`;
    ctx.order++;
  }
  return `<span class="fbar"${d}></span>`;
}
function renderFUnit(u: FractionUnit, ctx: Pen) {
  if (u.type === 'frac')
    return `<span class="funit"><span class="frac"><span class="fn">${hwNum(u.n, ctx)}</span>${fbar(ctx)}<span class="fd">${hwNum(u.d, ctx)}</span></span></span>`;
  if (u.type === 'op')
    return `<span class="funit fop">${hwGlyphs(String(u.t), ctx)}</span>`;
  if (u.type === 'mixed')
    return `<span class="funit"><span class="fmix">${hwGlyphs(String(u.whole), ctx)}</span><span class="frac"><span class="fn">${hwNum(u.n, ctx)}</span>${fbar(ctx)}<span class="fd">${hwNum(u.d, ctx)}</span></span></span>`;
  return `<span class="funit">${hwGlyphs(String(u.t), ctx)}</span>`;
}
// Робоча область пошуку НСК: кожен чип підписаний номером кратного (×1, ×2 …).
// Номер, на якому стоїть НСК, — це і є множник для того дробу.
function renderDenom(dn: DenominatorState) {
  const row = (label: string, arr: number[], side: string) => {
    let s = `<div class="denrow"><span class="denlbl">${label}</span>`;
    for (let i = 0; i < arr.length; i++) {
      const v = arr[i];
      const hl = dn.matchVal && v === dn.matchVal;
      const isNew = i === arr.length - 1 && dn.newSide === side;
      const isMul = dn.showMult && hl; // на кроці множників підсвічуємо номер
      s += `<span class="denchip${hl ? ' hl' : ''}${isNew ? ' chipnew' : ''}${isMul ? ' mul' : ''}"><span class="chipk">×${i + 1}</span><span class="chipv">${v}</span></span>`;
    }
    return s + '</div>';
  };
  let h = `<div class="denbox"><div class="denttl">🔍 Шукаємо спільний знаменник — НСК(${dn.b}, ${dn.d})</div>`;
  h += row(`Кратні ${dn.b}:`, dn.multsB, 'b');
  h += row(`Кратні ${dn.d}:`, dn.multsD, 'd');
  if (dn.matchVal && !dn.showMult)
    h += `<div class="denres">Спільне кратне знайдено → НСК(${dn.b}, ${dn.d}) = <b>${dn.matchVal}</b></div>`;
  if (dn.showMult)
    h += `<div class="denres">Дивимось, котре це кратне: ${dn.L} — це <b class="mk">×${dn.ka}</b> кратне ${dn.b} і <b class="mk">×${dn.kc}</b> кратне ${dn.d}. Це і є множники для дробів!</div>`;
  return h + '</div>';
}
// Рендер сцени дробів: горизонтальний ланцюжок + робоча область НСК (за потреби)
function fracStageInner(
  model: FractionModel,
  ctx: EngineStepContext<FractionStep>,
) {
  const m = model,
    st = ctx.step;
  let html = '<div class="fracwork"><div class="fracsolve">';
  for (let i = 0; i < st.chainUpto; i++) {
    const seg = m.segments[i],
      isCur = i === st.chainUpto - 1 && st.newSeg;
    // .morphing ховає числа до прильоту, тож ставимо його ЛИШЕ коли політ справді
    // готується (ctx.anim). Інакше — стрибок через крок або «спокійний режим» —
    // показуємо фінальний вигляд одразу, без руху.
    const isFlip = isCur && st.flip && !!ctx.anim;
    const isWrite = isCur && !st.flip; // звичайний послідовний запис
    const flymul = isCur && st.denom && st.denom.showMult; // множники прилетять із блоку НСК
    const pen: Pen = isWrite ? { writing: true, order: 0 } : { writing: false }; // рукописне письмо, глиф за гліфом
    html += `<span class="fseg${seg.done ? ' fdone' : ''}${isWrite ? ' writing' : ''}${isFlip ? ' morphing' : ''}${flymul ? ' flymul' : ''}"><span class="fseg-math">`;
    if (i > 0) html += `<span class="funit feq">${hwGlyphs('=', pen)}</span>`;
    seg.units.forEach((u) => {
      html += renderFUnit(u, pen);
    }); // чисельник → риска → знаменник → знак → …
    html += '</span>';
    if (seg.note) {
      const d = isWrite
        ? ` style="animation-delay:${((pen.order || 0) * HW_STEP).toFixed(2)}s"`
        : '';
      html += `<span class="fnote"${d}>${seg.note}</span>`;
    }
    html += '</span>';
  }
  html += '</div>';
  if (st.denom) html += renderDenom(st.denom);
  return html + '</div>';
}
// Анімація: множники (×3, ×2) вилітають із чипів НСК і летять у дроби (в чисельник і знаменник)
function runFracMulAnim(
  model: FractionModel,
  ctx: EngineStepContext<FractionStep>,
) {
  const st = ctx.step;
  if (!(st && st.denom && st.denom.showMult)) return;
  const work = document.querySelector<HTMLElement>('.fracwork');
  if (!work) return;
  const seg = work.querySelector<HTMLElement>('.fseg.flymul');
  if (!seg) return;
  const fmuls = [...seg.querySelectorAll<HTMLElement>('.fmul')];
  if (!fmuls.length) return;
  const reveal = () =>
    fmuls.forEach((t) => {
      t.style.opacity = '1';
    });
  if (prefersReducedMotion()) {
    reveal();
    return;
  }
  const sources = [
    ...work.querySelectorAll<HTMLElement>('.denchip.mul .chipk'),
  ];
  if (sources.length < 2) {
    reveal();
    return;
  }
  work.style.position = 'relative';
  const wr = work.getBoundingClientRect();
  const rel = (el: Element) => {
    const r = el.getBoundingClientRect();
    return {
      left: r.left - wr.left,
      top: r.top - wr.top,
      w: r.width,
      h: r.height,
    };
  };
  work.querySelectorAll<HTMLElement>('.fmulclone').forEach((c) => c.remove());
  // fmuls у порядку: [чисельник1, знаменник1, чисельник2, знаменник2]
  // СТРОГО ПОСЛІДОВНО — кожен наступний стартує лише коли попередній приземлився,
  // і лише після того, як базовий дріб уже дописано (рахуємо намальовані гліфи)
  const baseGlyphs =
    seg.querySelectorAll<HTMLElement>('.fseg-math .hwg').length -
    seg.querySelectorAll<HTMLElement>('.fmul .hwg').length;
  const bars = seg.querySelectorAll<HTMLElement>('.fbar').length;
  const half = Math.ceil(fmuls.length / 2),
    DUR = 0.55,
    GAP = 0.16,
    START = (baseGlyphs + bars) * HW_STEP + HW_DUR + 0.2;
  fmuls.forEach((tgt, idx) => {
    const src = idx < half ? sources[0] : sources[1]; // 1-й дріб ← множник знаменника b, 2-й ← d
    const sR = rel(src),
      tR = rel(tgt);
    const clone = document.createElement('span');
    clone.className = 'fmulclone';
    clone.innerHTML = tgt.innerHTML;
    clone.style.left = sR.left + 'px';
    clone.style.top = sR.top + 'px';
    clone.style.opacity = '0';
    work.appendChild(clone);
    const dx = tR.left + tR.w / 2 - (sR.left + sR.w / 2),
      dy = tR.top + tR.h / 2 - (sR.top + sR.h / 2);
    const delay = START + idx * (DUR + GAP);
    clone.style.transition = `transform ${DUR}s cubic-bezier(.4,.05,.2,1) ${delay.toFixed(2)}s, opacity .12s ease ${delay.toFixed(2)}s`;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        clone.style.opacity = '1';
        clone.style.transform = `translate(${dx}px,${dy}px)`;
      }),
    );
    setTimeout(
      () => {
        tgt.style.opacity = '1';
        tgt.style.animation = 'fmulPop .32s ease-out';
        clone.remove();
      },
      (delay + DUR) * 1000,
    );
  });
}

// Готуємо FLIP перед зміною кроку (лише вперед, лише для кроків-обчислень).
// Джерело лишається на екрані (попередній сегмент), тож позиції читаємо вже після рендера.
function prepareFracAnim(model: FractionModel, from: number, to: number) {
  if (to !== from + 1) return null;
  const st = model.steps[to];
  if (!st || !st.flip) return null;
  return { kind: st.flip, newIdx: st.chainUpto - 1 };
}
// Виконуємо FLIP: число ВИЛІТАЄ зі старого місця (оригінал ховаємо, щоб не було здвоєння)
// і перетворюється на результат у новому.
function runFracFlip(
  model: FractionModel,
  ctx: EngineStepContext<FractionStep>,
) {
  const flip = ctx.anim;
  if (!isFractionFlip(flip)) return;
  const work = document.querySelector<HTMLElement>('.fracwork');
  if (!work) return;
  work.style.position = 'relative';
  const cont = work.getBoundingClientRect();
  const rel = (el: Element) => {
    const r = el.getBoundingClientRect();
    return {
      left: r.left - cont.left,
      top: r.top - cont.top,
      w: r.width,
      h: r.height,
    };
  };
  const segEls = work.querySelectorAll<HTMLElement>('.fracsolve .fseg');
  const newSeg = segEls[flip.newIdx],
    srcSeg = segEls[flip.newIdx - 1];
  if (!newSeg || !srcSeg) return;
  const newFracs = [...newSeg.querySelectorAll<HTMLElement>('.frac')];
  const srcFracs = [...srcSeg.querySelectorAll<HTMLElement>('.frac')];
  work.querySelectorAll<HTMLElement>('.fracmorph').forEach((c) => c.remove());
  const DUR = 0.62,
    GAP = 0.18;
  // один елемент-джерело летить у ціль і перетворюється на неї.
  // keep=true — оригінал НЕ ховаємо (лишається на місці як запис кроку)
  const flyOne = (
    srcEl: HTMLElement | null,
    tgtEl: HTMLElement | null,
    delay: number,
    keep?: boolean,
  ) => {
    if (!srcEl || !tgtEl) return;
    const sR = rel(srcEl),
      tR = rel(tgtEl);
    tgtEl.style.opacity = '0';
    if (!keep) srcEl.style.visibility = 'hidden';
    const c = document.createElement('span');
    c.className = 'fracmorph';
    c.innerHTML = srcEl.innerHTML;
    c.style.left = sR.left + 'px';
    c.style.top = sR.top + 'px';
    work.appendChild(c);
    const dx = tR.left + tR.w / 2 - (sR.left + sR.w / 2),
      dy = tR.top + tR.h / 2 - (sR.top + sR.h / 2);
    c.style.transition = `transform ${DUR}s cubic-bezier(.4,.05,.2,1) ${delay.toFixed(2)}s`;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        c.style.transform = `translate(${dx}px,${dy}px)`;
      }),
    );
    setTimeout(
      () => {
        tgtEl.style.opacity = '1';
        tgtEl.style.animation = 'fmulPop .32s ease-out';
        if (!keep) srcEl.style.visibility = 'visible';
        c.remove();
      },
      (delay + DUR) * 1000,
    );
  };
  if (flip.kind === 'morph') {
    // 1-до-1, ПОСЛІДОВНО: чисельник1 → знаменник1 → чисельник2 → …
    let t = 0.15;
    newFracs.forEach((fr, i) => {
      const s = srcFracs[i];
      if (!s) return;
      flyOne(
        s.querySelector<HTMLElement>('.fn'),
        fr.querySelector<HTMLElement>('.fn'),
        t,
      );
      t += DUR + GAP;
      flyOne(
        s.querySelector<HTMLElement>('.fd'),
        fr.querySelector<HTMLElement>('.fd'),
        t,
      );
      t += DUR + GAP;
    });
  } else if (flip.kind === 'add') {
    const fr = newFracs[0];
    if (!fr) return;
    const newFn = fr.querySelector<HTMLElement>('.fn'),
      newFd = fr.querySelector<HTMLElement>('.fd');
    if (!newFn || !newFd) return;
    const fn0 = srcFracs[0].querySelector<HTMLElement>('.fn'),
      fn1 = srcFracs[1] ? srcFracs[1].querySelector<HTMLElement>('.fn') : null;
    if (!fn0) return;
    const opEl = srcSeg.querySelector<HTMLElement>('.fseg-math .fop');
    const opHtml = opEl ? opEl.innerHTML : hwGlyphs('+', { writing: false });
    // ЄДИНИЙ напис "21 + 4" — злітає з чисельників (оригінали лишаються) і зводиться в новий чисельник
    const label = document.createElement('span');
    label.className = 'fracmorph fmlabel';
    label.innerHTML = fn1
      ? `${fn0.innerHTML}<span class="fmop">${opHtml}</span>${fn1.innerHTML}`
      : fn0.innerHTML;
    work.appendChild(label);
    const lw = label.getBoundingClientRect().width,
      lh = label.getBoundingClientRect().height;
    const r0 = rel(fn0),
      r1 = fn1 ? rel(fn1) : r0;
    const startCX = (r0.left + r0.w / 2 + (r1.left + r1.w / 2)) / 2,
      startTop = r0.top - 4;
    label.style.left = startCX - lw / 2 + 'px';
    label.style.top = startTop + 'px';
    label.style.opacity = '0';
    const tR = rel(newFn);
    newFn.style.opacity = '0';
    const dx = tR.left + tR.w / 2 - startCX,
      dy = tR.top + tR.h / 2 - (startTop + lh / 2);
    const delay = 0.25,
      D2 = 0.8;
    label.style.transition = `transform ${D2}s cubic-bezier(.4,.05,.2,1) ${delay}s, opacity .18s ease ${delay}s`;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        label.style.opacity = '1';
        label.style.transform = `translate(${dx}px,${dy}px)`;
      }),
    );
    // на посадці напис стискається й зникає, а на його місці з'являється сума
    setTimeout(
      () => {
        label.style.transition = 'transform .22s ease, opacity .22s ease';
        label.style.transform = `translate(${dx}px,${dy}px) scale(.4)`;
        label.style.opacity = '0';
      },
      (delay + D2 - 0.02) * 1000,
    );
    setTimeout(
      () => {
        newFn.style.opacity = '1';
        newFn.style.animation = 'fmulPop .42s ease-out';
        label.remove();
      },
      (delay + D2 + 0.18) * 1000,
    );
    // спільний знаменник переноситься вниз (оригінал лишається)
    flyOne(
      srcFracs[0].querySelector<HTMLElement>('.fd'),
      newFd,
      delay + D2 + 0.26,
      true,
    );
  }
}

export const fracTool = defineTool('frac', {
  name: 'Дії з дробами',
  icon: '½',
  color: 'var(--amber)',
  bg: 'var(--amber-l)',
  build: (cfg) =>
    buildFracModel(
      Number(cfg.a),
      Number(cfg.b),
      cfg.op,
      Number(cfg.c),
      Number(cfg.d),
    ),
  view: fracStageInner,
  prepare: prepareFracAnim,
  // два різні польоти на одному кроці: множники влітають із чипів НСК,
  // а числа морфляться в результат. Обидва — послідовно, кожен своїм розкладом.
  animate(model, ctx) {
    runFracMulAnim(model, ctx);
    runFracFlip(model, ctx);
  },
  read: (v) => ({
    a: +v('i_a'),
    b: +v('i_b'),
    op: v('i_op'),
    c: +v('i_c'),
    d: +v('i_d'),
  }),
});
