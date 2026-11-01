import { useState } from 'react';
import type { Topic } from '../../types';
import { Button, LegacyHtml } from '../../components/ui';
import type { ScalarEngine } from './types';
import { RangeControl } from './components/RangeControl';
import { VectorSymbol } from './components/VectorSymbol';
import { LessonTasks } from './components/LessonTasks';

export function ScalarLesson({
  engine,
  topic,
  hrefForTask,
}: {
  engine: ScalarEngine;
  topic: Topic;
  hrefForTask: (id: string) => string;
}) {
  const [lengthA, setLengthA] = useState(5);
  const [lengthB, setLengthB] = useState(2);
  const [angle, setAngle] = useState(30);
  const vectors = engine.polar(lengthA, lengthB, angle);
  const dot = lengthA * lengthB * Math.cos((angle * Math.PI) / 180);
  return (
    <div className="vec-lesson sp-lesson">
      <LegacyHtml html={engine.theory} />
      <section className="sp-explore">
        <h2>Досліди вплив кута</h2>
        <p>Змінюй кут і довжини. Стеж за знаком добутку.</p>
        <div className="vec-layout">
          <LegacyHtml
            className="sp-live-diagram"
            html={engine.diagram(
              ...vectors,
              ['a', 'b'],
              `α = ${angle}°`,
              'live',
            )}
          />
          <div>
            <div className="vs-sliders">
              <RangeControl
                id="sp-angle"
                name="angle"
                label="Кут α"
                min={0}
                max={180}
                value={angle}
                output={`${angle}°`}
                onChange={setAngle}
              />
              <RangeControl
                id="sp-la"
                name="la"
                label="Довжина a"
                min={1}
                max={10}
                value={lengthA}
                onChange={setLengthA}
              />
              <RangeControl
                id="sp-lb"
                name="lb"
                label="Довжина b"
                min={1}
                max={10}
                value={lengthB}
                onChange={setLengthB}
              />
            </div>
            <div className="sp-live-result" aria-live="polite">
              <div className="sp-equation">
                <VectorSymbol name="a" /> · <VectorSymbol name="b" /> ={' '}
                {lengthA} · {lengthB} · cos {angle}° ≈{' '}
                <b>{engine.format(dot)}</b>
              </div>
              <p>
                {angle === 90
                  ? 'Прямий кут: добуток дорівнює 0. Вектори перпендикулярні.'
                  : angle < 90
                    ? 'Добуток додатний.'
                    : 'Добуток від’ємний.'}
              </p>
              <p className="sp-source">
                На рисунку довжини пропорційні. Значення округлено до тисячних.
              </p>
            </div>
            <div className="vec-actions">
              {[0, 90, 180].map((value) => (
                <Button
                  variant="ghost"
                  small
                  data-angle={value}
                  key={value}
                  onClick={() => setAngle(value)}
                >
                  {value}°
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
      <LessonTasks topic={topic} scalar hrefForTask={hrefForTask} />
    </div>
  );
}
