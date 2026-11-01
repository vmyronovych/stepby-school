import { useState } from 'react';
import type { Topic } from '../../types';
import { Button, LegacyHtml } from '../../components/ui';
import type { ScalingEngine } from './types';
import { RangeControl } from './components/RangeControl';
import { VectorSymbol } from './components/VectorSymbol';
import { LessonTasks } from './components/LessonTasks';

const format = (value: number) =>
  String(Object.is(value, -0) ? 0 : Number(value.toFixed(3))).replace('.', ',');
export function ScalingLesson({
  engine,
  topic,
  hrefForTask,
}: {
  engine: ScalingEngine;
  topic: Topic;
  hrefForTask: (id: string) => string;
}) {
  const [x, setX] = useState(3);
  const [y, setY] = useState(2);
  const [k, setK] = useState(2);
  const [stage, setStage] = useState(0);
  const model = engine.model(x, y, k);
  const current = engine.stages[stage];
  function changeStage(index: number) {
    setStage(index);
    setK(engine.stages[index].k);
  }
  function reset() {
    setX(3);
    setY(2);
    setK(2);
    setStage(0);
  }
  return (
    <div className="vec-lesson vs-lesson">
      <div className="vec-tabs" role="group" aria-label="Кроки дослідження">
        {engine.stages.map((item, index) => (
          <button
            type="button"
            data-stage={index}
            aria-pressed={stage === index}
            key={item.title}
            onClick={() => changeStage(index)}
          >
            <span>{index + 1}</span>
            {item.title}
          </button>
        ))}
      </div>
      <div className="vec-layout">
        <section className="vec-workspace" aria-label="Інтерактивна побудова">
          <div className="vec-board-head">
            <span>
              <i className="vec-dot" />
              <VectorSymbol name="a" />
            </span>
            <span>
              <i className="vec-dot teal" />
              <VectorSymbol name="b" /> = k<VectorSymbol name="a" />
            </span>
            <span className="vec-scale">Спільний початок O</span>
          </div>
          <LegacyHtml html={engine.diagram(x, y, k)} />
          <div className="vs-sliders">
            <RangeControl
              id="vs-k"
              name="k"
              label="Множник k"
              min={-3}
              max={3}
              step={0.25}
              value={k}
              output={format(k)}
              onChange={setK}
            />
            <RangeControl
              id="vs-x"
              name="x"
              label="Координата x"
              min={-4}
              max={4}
              step={1}
              value={x}
              output={format(x)}
              onChange={setX}
            />
            <RangeControl
              id="vs-y"
              name="y"
              label="Координата y"
              min={-4}
              max={4}
              step={1}
              value={y}
              output={format(y)}
              onChange={setY}
            />
          </div>
          <p className="vec-help">
            Змінюй повзунки мишею, дотиком або клавішами зі стрілками. Масштаб
            сітки підлаштовується автоматично.
          </p>
        </section>
        <aside className="vec-explanation" aria-label="Пояснення та результат">
          <div className="vec-explain-head">
            <span className="pill">Досліджуємо</span>
            <span className="vec-step">
              Крок {stage + 1} із {engine.stages.length}
            </span>
          </div>
          <LegacyHtml className="vec-rule" html={current.text} />
          <div className="vec-task-box">
            <b>Спробуй на рисунку</b>
            <p className="vec-task">{current.task}</p>
          </div>
          <div className="vs-formula">
            <VectorSymbol name="b" /> = {format(k)} · ({format(x)}; {format(y)})
            <br />
            <strong>
              = ({format(model.result[0])}; {format(model.result[1])})
            </strong>
          </div>
          <div className="vec-results" aria-live="polite" aria-atomic="true">
            <div>
              <span>
                |<VectorSymbol name="a" />|
              </span>
              <strong>{format(model.length)}</strong>
            </div>
            <div>
              <span>
                |<VectorSymbol name="b" />| = |k| · |<VectorSymbol name="a" />|
              </span>
              <strong>{format(model.scaledLength)}</strong>
            </div>
            <div>
              <span>Напрям</span>
              <strong>{model.direction}</strong>
            </div>
          </div>
          <p className="vec-note vs-grid-note">
            Модулі на панелі округлено до тисячних. Координати обчислено точно.
          </p>
          <div className="vec-pager">
            <Button
              variant="ghost"
              small
              data-action="prev"
              disabled={stage === 0}
              onClick={() => changeStage(stage - 1)}
            >
              ← Назад
            </Button>
            <Button
              small
              data-action="next"
              disabled={stage === engine.stages.length - 1}
              onClick={() => changeStage(stage + 1)}
            >
              Далі →
            </Button>
          </div>
        </aside>
      </div>
      <div className="vec-experiments">
        <span>Готовий дослід</span>
        <div className="vec-actions">
          <Button
            variant="ghost"
            small
            data-action="double"
            onClick={() => setK(2)}
          >
            Подвоїти
          </Button>
          <Button
            variant="ghost"
            small
            data-action="half"
            onClick={() => setK(0.5)}
          >
            Зменшити вдвічі
          </Button>
          <Button
            variant="ghost"
            small
            data-action="opposite"
            onClick={() => setK(-1)}
          >
            Протилежний
          </Button>
          <Button
            variant="ghost"
            small
            data-action="zero"
            onClick={() => {
              setX(0);
              setY(0);
            }}
          >
            Нульовий вектор
          </Button>
          <Button variant="ghost" small data-action="reset" onClick={reset}>
            Скинути
          </Button>
        </div>
      </div>
      <LegacyHtml html={engine.theory} />
      <LessonTasks topic={topic} hrefForTask={hrefForTask} />
    </div>
  );
}
