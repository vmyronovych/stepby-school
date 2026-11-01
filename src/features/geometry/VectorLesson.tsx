import { useRef } from 'react';
import { Button, LegacyHtml } from '../../components/ui';
import type { PracticeEngine, VectorEngine } from './types';
import { useVectorExploration } from './hooks/useVectorExploration';
import { VectorBoard } from './components/VectorBoard';
import { VectorResults } from './components/VectorResults';
import { VectorSymbol } from './components/VectorSymbol';
import { VectorPractice } from './VectorPractice';

export function VectorLesson({
  engine,
  practice,
}: {
  engine: VectorEngine;
  practice: PracticeEngine;
}) {
  const state = useVectorExploration(engine);
  const practiceRef = useRef<HTMLElement>(null);
  const lesson = engine.lessons[state.lesson];
  return (
    <div className="vec-lesson">
      <a
        className="vec-practice-jump"
        href="#vector-practice"
        onClick={(event) => {
          event.preventDefault();
          practiceRef.current?.scrollIntoView({ behavior: 'auto' });
          practiceRef.current
            ?.querySelector<HTMLButtonElement>('[data-problem="0"]')
            ?.focus({ preventScroll: true });
        }}
      >
        Перейти до задач ↓
      </a>
      <nav className="vec-tabs" aria-label="Пояснення про вектори">
        {engine.lessons.map((item, index) => (
          <button
            type="button"
            data-lesson={index}
            aria-pressed={state.lesson === index}
            key={item.title}
            onClick={() => state.changeLesson(index)}
          >
            <span>{index + 1}</span>
            {item.title}
          </button>
        ))}
      </nav>
      <div className="vec-layout">
        <section className="vec-workspace" aria-label="Рисунок векторів">
          <div className="vec-board-head">
            <span>
              <i className="vec-dot" />
              <VectorSymbol name="AB" />
            </span>
            <span>
              <i className="vec-dot teal" />
              <VectorSymbol name="CD" />
            </span>
            <span className="vec-scale">Клітинка = 1 одиниця</span>
          </div>
          <VectorBoard
            points={state.points}
            selected={state.selected}
            lines={state.lines}
            result={state.result}
            formatLength={engine.length}
            {...state.boardEvents}
          />
          <div className="vec-measures">
            <span>
              |<VectorSymbol name="AB" />| ={' '}
              <b data-length="ab">{engine.length(state.result.n)}</b>
            </span>
            <span>
              |<VectorSymbol name="CD" />| ={' '}
              <b data-length="cd">{engine.length(state.result.m)}</b>
            </span>
          </div>
          <div className="vec-controls">
            <label>
              Рухати точку{' '}
              <select
                name="vec-point"
                value={state.selected}
                onChange={(event) =>
                  state.setSelected(Number(event.target.value))
                }
              >
                {['A', 'B', 'C', 'D'].map((name, index) => (
                  <option key={name} value={index}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            <div
              className="vec-nudge"
              role="group"
              aria-label="Пересунути обрану точку"
            >
              {(
                [
                  { move: [-1, 0], label: 'Ліворуч', symbol: '←' },
                  { move: [0, -1], label: 'Вгору', symbol: '↑' },
                  { move: [0, 1], label: 'Вниз', symbol: '↓' },
                  { move: [1, 0], label: 'Праворуч', symbol: '→' },
                ] as const
              ).map(({ move, label, symbol }) => (
                <button
                  type="button"
                  key={label}
                  data-move={move.join(',')}
                  aria-label={label}
                  onClick={() => state.move(state.selected, move[0], move[1])}
                >
                  {symbol}
                </button>
              ))}
            </div>
            <label className="vec-check">
              <input
                type="checkbox"
                name="vec-lines"
                checked={state.lines}
                onChange={(event) => state.setLines(event.target.checked)}
              />{' '}
              Прямі векторів
            </label>
          </div>
          <p className="vec-help">
            Перетягуй точки на сітці. Або обери точку й натискай кнопки зі
            стрілками.
          </p>
        </section>
        <aside className="vec-explanation" aria-label="Пояснення">
          <div className="vec-explain-head">
            <span className="pill">§ 6 · Досліджуємо</span>
            <span className="vec-step">
              {state.lesson + 1} / {engine.lessons.length}
            </span>
          </div>
          <LegacyHtml className="vec-rule" html={lesson.rule} />
          <LegacyHtml className="vec-note" html={lesson.note} />
          <div className="vec-task-box">
            <b>Спробуй на рисунку</b>
            <p className="vec-task">{lesson.task}</p>
          </div>
          <VectorResults result={state.result} />
          <div className="vec-pager">
            <Button
              variant="ghost"
              small
              data-action="previous"
              disabled={state.lesson === 0}
              onClick={() => state.changeLesson(state.lesson - 1)}
            >
              ← Назад
            </Button>
            <Button
              small
              data-action="next"
              disabled={state.lesson === engine.lessons.length - 1}
              onClick={() => state.changeLesson(state.lesson + 1)}
            >
              Далі →
            </Button>
          </div>
        </aside>
      </div>
      <div className="vec-experiments">
        <label>
          Готовий приклад{' '}
          <select
            name="vec-preset"
            value={state.preset}
            onChange={(event) => state.loadPreset(event.target.value)}
          >
            {Object.entries(engine.presets).map(([key, preset]) => (
              <option key={key} value={key}>
                {preset.name}
              </option>
            ))}
          </select>
        </label>
        <div className="vec-actions">
          <Button
            variant="ghost"
            small
            data-action="reverse"
            onClick={state.reverse}
          >
            Поміняти A і B
          </Button>
          <Button
            variant="ghost"
            small
            data-action="translate"
            disabled={!state.canTranslate}
            onClick={state.translate}
          >
            Перенести CD
          </Button>
          <Button
            variant="gray"
            small
            data-action="reset"
            onClick={() => state.changeLesson(state.lesson)}
          >
            Скинути
          </Button>
        </div>
      </div>
      <section
        ref={practiceRef}
        className="vec-practice"
        id="vector-practice"
        aria-labelledby="vector-practice-title"
      >
        <VectorPractice engine={practice} />
      </section>
    </div>
  );
}
