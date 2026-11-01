import { useLayoutEffect, useRef, useState } from 'react';
import { Button, LegacyHtml } from '../../components/ui';
import type { PracticeEngine } from './types';
import { VectorSymbol } from './components/VectorSymbol';

type Feedback = 'correct' | 'wrong' | 'invalid' | null;
interface ProblemState {
  answer: string;
  feedback: Feedback;
  solved: boolean;
  reveal: boolean;
  hint: boolean;
}
const emptyState = (): ProblemState => ({
  answer: '',
  feedback: null,
  solved: false,
  reveal: false,
  hint: false,
});

export function VectorPractice({ engine }: { engine: PracticeEngine }) {
  const [current, setCurrent] = useState(0);
  const [states, setStates] = useState(() => engine.problems.map(emptyState));
  const [focus, setFocus] = useState<{
    target: 'heading' | 'feedback';
    revision: number;
  } | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const problem = engine.problems[current],
    state = states[current];
  useLayoutEffect(() => {
    if (focus)
      (focus.target === 'heading'
        ? headingRef.current
        : feedbackRef.current
      )?.focus({ preventScroll: true });
  }, [focus]);
  function focusOn(target: 'heading' | 'feedback') {
    setFocus((previous) => ({
      target,
      revision: (previous?.revision ?? 0) + 1,
    }));
  }
  function update(patch: Partial<ProblemState>) {
    setStates((previous) =>
      previous.map((item, index) =>
        index === current ? { ...item, ...patch } : item,
      ),
    );
  }
  function select(index: number) {
    setCurrent(index);
    focusOn('heading');
  }
  function check() {
    const result = engine.checkAnswer(problem, state.answer);
    update({
      feedback: !result.valid
        ? 'invalid'
        : result.correct
          ? 'correct'
          : 'wrong',
      ...(result.correct ? { solved: true, reveal: true } : {}),
    });
    focusOn('feedback');
  }
  const feedback =
    state.feedback === 'correct'
      ? 'Правильно! Задачу зараховано.'
      : state.feedback === 'wrong'
        ? 'Поки неправильно. Спробуй ще раз або відкрий підказку.'
        : state.feedback === 'invalid'
          ? problem.kind === 'number'
            ? 'Введи невід’ємне число.'
            : 'Обери один варіант відповіді.'
          : '';
  return (
    <>
      <div className="vec-practice-head">
        <div>
          <h2 id="vector-practice-title">Спробуй розв’язати</h2>
          <p>
            На рисунку сторона клітинки дорівнює 1 одиниці. Відповіді перевіряй
            після власної спроби.
          </p>
        </div>
        <span className="pill">
          Розв’язано {states.filter((item) => item.solved).length} із{' '}
          {engine.problems.length}
        </span>
      </div>
      <nav className="vec-problem-tabs" aria-label="Вибір задачі">
        {engine.problems.map((item, index) => (
          <button
            type="button"
            data-problem={index}
            aria-pressed={index === current}
            aria-label={`Задача ${index + 1}: ${item.title}${states[index].solved ? ', розв’язано' : ''}`}
            key={item.id}
            onClick={() => select(index)}
          >
            {index + 1}
            {states[index].solved ? ' ✓' : ''}
          </button>
        ))}
      </nav>
      <div className="vec-practice-layout">
        <div className="vec-problem-diagram">
          <LegacyHtml html={engine.diagram(problem)} />
          <p>
            Фіолетовий — <VectorSymbol name="AB" />
            {problem.points.length === 4 && (
              <>
                ; бірюзовий — <VectorSymbol name="CD" />
              </>
            )}
            .
          </p>
        </div>
        <form
          className="vec-problem-form"
          onSubmit={(event) => {
            event.preventDefault();
            check();
          }}
        >
          <span className="vec-problem-count">
            Задача {current + 1} із {engine.problems.length}
          </span>
          <h3 ref={headingRef} tabIndex={-1}>
            {problem.title}
          </h3>
          <LegacyHtml
            className="vec-question"
            id="vec-question"
            html={problem.question}
          />
          {problem.kind === 'number' ? (
            <label className="vec-answer-label">
              Модуль вектора{' '}
              <input
                name="vec-answer"
                type="text"
                inputMode="decimal"
                maxLength={32}
                autoComplete="off"
                aria-describedby="vec-question"
                placeholder="Введи число"
                value={state.answer}
                onChange={(event) =>
                  update({ answer: event.target.value, feedback: null })
                }
              />
            </label>
          ) : (
            <fieldset>
              <legend className="vec-sr-only">
                {problem.title}: обери відповідь
              </legend>
              {problem.options?.map(([key, text]) => (
                <label className="vec-option" key={key}>
                  <input
                    type="radio"
                    name="vec-answer"
                    value={key}
                    checked={state.answer === key}
                    onChange={() => update({ answer: key, feedback: null })}
                  />
                  <span dangerouslySetInnerHTML={{ __html: text }} />
                </label>
              ))}
            </fieldset>
          )}
          <div className="vec-answer-actions">
            <Button type="submit" small>
              Перевірити
            </Button>
            <Button
              variant="ghost"
              small
              data-practice-action="hint"
              onClick={() => update({ hint: !state.hint })}
            >
              Підказка
            </Button>
            <Button
              variant="gray"
              small
              data-practice-action="solution"
              onClick={() => update({ reveal: !state.reveal })}
            >
              Розв’язання
            </Button>
          </div>
          <div
            ref={feedbackRef}
            tabIndex={-1}
            className={`vec-answer-feedback${state.feedback === 'correct' ? ' correct' : state.feedback ? ' retry' : ''}`}
            role="status"
            aria-live="polite"
          >
            {feedback}
          </div>
          {state.hint && <p className="vec-problem-hint">{problem.hint}</p>}
          {state.reveal && (
            <div className="vec-solution">
              <b>Розв’язання</b>
              <LegacyHtml html={problem.solution} />
            </div>
          )}
        </form>
      </div>
      <div className="vec-practice-footer">
        <Button
          variant="ghost"
          small
          data-practice-action="previous"
          disabled={current === 0}
          onClick={() => select(current - 1)}
        >
          ← Попередня
        </Button>
        <Button
          variant="gray"
          small
          data-practice-action="reset"
          onClick={() => {
            setStates(engine.problems.map(emptyState));
            select(0);
          }}
        >
          Почати знову
        </Button>
        <Button
          small
          data-practice-action="next"
          disabled={current === engine.problems.length - 1}
          onClick={() => select(current + 1)}
        >
          Наступна →
        </Button>
      </div>
    </>
  );
}
