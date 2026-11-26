import type { LinearRow, LinearUnit } from '../../../lib/math';
import { HW_STEP, hwGlyphs } from '../handwriting';
import type { EngineStepContext } from '../../../lib/lesson-tool';
export interface EquationRect {
  left: number;
  top: number;
  w: number;
  h: number;
  text: string;
  cls: string;
}
export interface EquationAnimation {
  type: 'move' | 'combine';
  toStep: number;
  srcRects: Record<string, EquationRect>;
}
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
export function isEquationAnimation(
  value: unknown,
): value is EquationAnimation {
  return (
    isRecord(value) &&
    (value.type === 'move' || value.type === 'combine') &&
    typeof value.toStep === 'number' &&
    isRecord(value.srcRects) &&
    Object.values(value.srcRects).every(
      (rect) =>
        isRecord(rect) &&
        ['left', 'top', 'w', 'h'].every(
          (key) => typeof rect[key] === 'number',
        ) &&
        typeof rect.text === 'string' &&
        typeof rect.cls === 'string',
    )
  );
}
/* ---------- Спільний рендер і польоти рядків рівняння ---------- */
// Рендер сцени: усі рядки 0..ctx.index; поточний «пишеться» або анімується (перенос/зведення).
export function eqStageInner(
  model: { rows: LinearRow[] },
  ctx: Pick<EngineStepContext, 'index' | 'anim'>,
) {
  const cur = ctx.index;
  const animating = !!(
    isEquationAnimation(ctx.anim) && ctx.anim.toStep === cur
  );
  return (
    '<div class="eqsolve" id="eqsolve">' +
    eqRowsHtml(model.rows, cur, cur, animating) +
    '</div>'
  );
}
// Рядки 0..upto; рядок cur — поточний («пишеться» або летить, якщо animating).
// Окремо від обгортки, щоб кілька блоків рядків жили на одному аркуші (умови ОДЗ).
export function eqRowsHtml(
  rows: LinearRow[],
  upto: number,
  cur: number,
  animating: boolean,
) {
  let html = '';
  for (let i = 0; i <= upto; i++) {
    const row = rows[i];
    const isCur = i === cur;
    const writing = isCur && row.type === 'write' && !animating;
    let cls =
      'eqrow' +
      (isCur ? (row.done ? ' done-row' : ' cur') : '') +
      (writing ? ' writing' : '');
    html += `<div class="${cls}" data-row="${i}">`;
    // порядок «написання» — природний, зліва направо; лічильник — по гліфах
    const startOrder: Record<number, number> = {};
    let total = 0;
    if (writing) {
      row.tokens.forEach((tk, ti) => {
        startOrder[ti] = total;
        total += String(tk.t).length;
      });
    }
    row.tokens.forEach((tk, ti) => {
      let style = '';
      if (!writing && animating && isCur) style = ' style="opacity:0"';
      const from = tk.from ? ` data-from="${tk.from.join('|')}"` : '';
      const inner = writing
        ? hwGlyphs(tk.t, { writing: true, order: startOrder[ti] })
        : hwGlyphs(tk.t, { writing: false });
      html += `<span class="tok ${tk.cls || ''}" data-id="${tk.id}"${from}${style}>${inner}</span>`;
    });
    if (row.note) {
      let style = '';
      if (writing)
        style = ` style="animation-delay:${(total * HW_STEP).toFixed(2)}s"`;
      else if (animating && isCur) style = ' style="opacity:0"';
      html += `<span class="note tok" data-note="1"${style}>${row.note}</span>`;
    }
    html += '</div>';
  }
  return html;
}

// Зчитуємо позиції токенів поточного (старого) рядка перед перемальовуванням.
// solve — контейнер рядків (за замовчуванням #eqsolve).
export function captureEqRects(
  rowIndex: number,
  solve?: Element | null,
): Record<string, EquationRect> {
  solve = solve || document.getElementById('eqsolve');
  const map: Record<string, EquationRect> = {};
  if (!solve) return map;
  const c = solve.getBoundingClientRect();
  const row = solve.querySelector(`.eqrow[data-row="${rowIndex}"]`);
  if (!row) return map;
  row.querySelectorAll<HTMLElement>('.tok[data-id]').forEach((el) => {
    const r = el.getBoundingClientRect();
    const id = el.dataset.id;
    if (!id) return;
    if (!id) return;
    map[id] = {
      left: r.left - c.left,
      top: r.top - c.top,
      w: r.width,
      h: r.height,
      text: el.innerHTML,
      cls: el.className,
    };
  });
  return map;
}
// Готуємо анімацію ПЕРЕД зміною кроку (лише вперед на 1, лише для переносу/зведення).
// Повертаємо «посилку» для animate() або null, якщо цей перехід не анімується.
export function prepareEqAnim(
  model: { rows: LinearRow[] },
  from: number,
  to: number,
): EquationAnimation | null {
  if (to !== from + 1) return null;
  const type = model.rows[to] && model.rows[to].type;
  if (type !== 'move' && type !== 'combine') return null;
  return { type, toStep: to, srcRects: captureEqRects(from) };
}
// Виконуємо FLIP-анімацію: цифри летять зі старих позицій на нові / злітаються в результат
export function runEqAnim(
  model: { rows: LinearRow[] },
  ctx: { anim: unknown },
  solve?: HTMLElement | null,
) {
  const anim = ctx.anim;
  if (!isEquationAnimation(anim)) return;
  solve = solve || document.getElementById('eqsolve');
  if (!solve) return;
  solve.style.position = 'relative';
  const c = solve.getBoundingClientRect();
  const rel = (el: Element) => {
    const r = el.getBoundingClientRect();
    return {
      left: r.left - c.left,
      top: r.top - c.top,
      w: r.width,
      h: r.height,
    };
  };
  const newRow = solve.querySelector<HTMLElement>(
    `.eqrow[data-row="${anim.toStep}"]`,
  );
  if (!newRow) return;
  const toks = [...newRow.querySelectorAll<HTMLElement>('.tok[data-id]')];
  const note = newRow.querySelector<HTMLElement>('[data-note]');
  solve.querySelectorAll('.eqclone').forEach((c) => c.remove());
  const DUR = 1.0; // ~1 секунда на цифру
  let totalMs = 0;

  if (anim.type === 'move') {
    const units = model.rows[anim.toStep].moveUnits || [];
    const unitByVal: Record<string, LinearUnit> = {},
      signIds = new Set<string>();
    units.forEach((u) => {
      unitByVal[u.valId] = u;
      if (u.signId) signIds.add(u.signId);
    });
    // хелпери
    const fly = (
      el: HTMLElement,
      src: Pick<EquationRect, 'left' | 'top'>,
      tgt: Pick<EquationRect, 'left' | 'top'>,
      dur: number,
      start: number,
    ) => {
      const dx = src.left - tgt.left,
        dy = src.top - tgt.top;
      el.style.transition = 'none';
      el.style.transform = `translate(${dx}px,${dy}px)`;
      el.style.opacity = '0';
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          el.style.transition = `transform ${dur}s cubic-bezier(.45,.02,.25,1) ${start.toFixed(2)}s, opacity .12s ease ${start.toFixed(2)}s`;
          el.style.transform = 'translate(0,0)';
          el.style.opacity = '1';
        }),
      );
    };
    const fade = (el: HTMLElement, start: number, dur: number) => {
      el.style.opacity = '0';
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          el.style.transition = `opacity ${dur}s ease ${start.toFixed(2)}s`;
          el.style.opacity = '1';
        }),
      );
    };
    // СТРОГО ПОСЛІДОВНО, доданок за доданком (знак — частина свого доданка)
    let cursor = 0;
    toks.forEach((el) => {
      const id = el.dataset.id;
      if (!id) return;
      if (signIds.has(id)) return; // знаки анімуються разом зі своїм числом
      const src = anim.srcRects[id],
        tgt = rel(el);
      const unit = unitByVal[id];
      const dur = unit && unit.cross ? DUR : 0.4;
      const start = cursor;
      cursor += dur + 0.08;
      totalMs = Math.max(totalMs, (start + dur) * 1000 + 350);
      if (src) fly(el, src, tgt, dur, start);
      else fade(el, start, 0.2);
      // знак цього доданка
      if (unit && unit.signId) {
        const sEl = newRow.querySelector<HTMLElement>(
          `.tok[data-id="${unit.signId}"]`,
        );
        if (sEl) {
          const newSign = sEl.innerHTML;
          const ssrc = anim.srcRects[unit.signId];
          if (ssrc) {
            // знак був явно написаний — летить разом із числом, показуючи старий знак…
            sEl.innerHTML = ssrc.text;
            fly(sEl, ssrc, rel(sEl), dur, start);
            setTimeout(
              () => {
                sEl.innerHTML = newSign;
                sEl.style.animation = 'signFlip .38s ease-out';
              },
              (start + dur) * 1000,
            ); // …і перевертається на посадці
          } else {
            // знака раніше не було — з'являється у момент приземлення
            sEl.style.opacity = '0';
            setTimeout(
              () => {
                sEl.style.opacity = '1';
                sEl.style.animation = 'signFlip .38s ease-out';
              },
              (start + dur) * 1000,
            );
          }
        }
      }
    });
  } else if (anim.type === 'combine') {
    let order = 0;
    toks.forEach((el) => {
      const id = el.dataset.id,
        tgt = rel(el);
      if (!id) return;
      const from = el.dataset.from
        ? el.dataset.from.split('|').filter(Boolean)
        : [];
      if (from.length) {
        el.style.opacity = '0';
        const delay = order * DUR;
        order++;
        from.forEach((sid, si) => {
          const src = anim.srcRects[sid];
          if (!src) return;
          const clone = document.createElement('span');
          clone.className = 'eqclone ' + (src.cls || 'tok');
          clone.innerHTML = src.text;
          clone.style.left = src.left + 'px';
          clone.style.top = src.top + 'px';
          clone.style.transition = `transform ${DUR}s cubic-bezier(.45,.02,.25,1) ${(delay + si * 0.1).toFixed(2)}s, opacity .3s ease ${(delay + DUR - 0.25).toFixed(2)}s`;
          solve?.appendChild(clone);
          const dx = tgt.left + tgt.w / 2 - (src.left + src.w / 2),
            dy = tgt.top + tgt.h / 2 - (src.top + src.h / 2);
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              clone.style.transform = `translate(${dx}px,${dy}px)`;
              clone.style.opacity = '0';
            }),
          );
        });
        setTimeout(
          () => {
            el.style.opacity = '1';
            el.style.animation = 'tokPop .4s ease-out';
          },
          (delay + DUR) * 1000,
        );
        totalMs = Math.max(totalMs, (delay + DUR) * 1000 + 400);
      } else {
        const src = anim.srcRects[id];
        if (src) {
          const dx = src.left - tgt.left,
            dy = src.top - tgt.top;
          el.style.transition = 'none';
          el.style.transform = `translate(${dx}px,${dy}px)`;
          el.style.opacity = '1';
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              el.style.transition = 'transform .5s ease';
              el.style.transform = 'translate(0,0)';
            }),
          );
        } else {
          el.style.opacity = '1';
        }
      }
    });
  }
  if (note) {
    note.style.opacity = '0';
    note.style.transition = 'opacity .5s ease';
    setTimeout(() => (note.style.opacity = '1'), totalMs + 150);
  }
}

/* ---------- База для будь-якого «лінійного» інструмента ----------
   Рендер рядків і польоти доданків однакові — різниться лише спосіб
   дістати коефіцієнти. Тому view/prepare/animate беруться звідси,
   а інструмент додає лише свої build/read. */
export const linearToolBase = {
  view: eqStageInner,
  prepare: prepareEqAnim,
  animate: runEqAnim,
};
