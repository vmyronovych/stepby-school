import { useState } from 'react';
import { Button } from '../../components/ui';
import { ChatScene } from './ChatScene';
import {
  freshPracticeAttempt,
  practiceSolved,
  practiceFeedback,
  practiceTasks,
} from './practice-content';

export function StudentPractice({ topicId }: { topicId: string }) {
  const tasks = practiceTasks[topicId];
  const [current, setCurrent] = useState(0);
  const [attempts, setAttempts] = useState(() =>
    tasks.map(freshPracticeAttempt),
  );
  const [notice, setNotice] = useState('');
  const task = tasks[current];
  const attempt = attempts[current];
  const solved = practiceSolved(task, attempt);
  const feedback = practiceFeedback(task, attempt);
  const allSolved = tasks.every((item, i) => practiceSolved(item, attempts[i]));
  function go(index: number) {
    setCurrent(index);
    setNotice('');
  }
  function choose(part: 'action' | 'reason', index: number) {
    setAttempts((old) =>
      old.map((value, i) =>
        i !== current
          ? value
          : part === 'action'
            ? { action: index, reason: null, checked: false }
            : { ...value, reason: index, checked: false },
      ),
    );
    setNotice('');
  }
  function check() {
    if (attempt.action === null || attempt.reason === null) {
      setNotice(
        attempt.action === null
          ? 'Спочатку обери дію.'
          : 'Тепер обери пояснення: чому ти так думаєш?',
      );
      return;
    }
    setAttempts((old) =>
      old.map((value, i) =>
        i === current ? { ...value, checked: true } : value,
      ),
    );
    setNotice('');
  }
  return (
    <div className="media-practice media-transfer-practice">
      <p>
        Нові історії — знайомі правила. У кожній обери дію та пояснення. Після
        цього натисни «Перевірити».
      </p>
      <p className="media-muted">
        Ситуації вигадані. У грі реєструватися, щось купувати або вводити
        особисті дані не потрібно.
      </p>
      <nav className="media-story-nav" aria-label="Завдання практики">
        {tasks.map((item, index) => (
          <button
            type="button"
            key={item.id}
            aria-current={index === current ? 'step' : undefined}
            onClick={() => go(index)}
          >
            <span>{index + 1}</span>
            <strong>
              {item.title}
              {practiceSolved(item, attempts[index]) ? ' ✓' : ''}
            </strong>
          </button>
        ))}
      </nav>
      <section className="media-story-section media-stage">
        <div className="media-story-heading">
          <span className="media-eyebrow">
            Завдання {current + 1} із {tasks.length}
          </span>
          <h2 tabIndex={-1}>{task.title}</h2>
          <p>{task.context}</p>
        </div>
        <div className="media-dialogue-grid">
          <ChatScene story={task.chat} />
          <section className="media-decision">
            <h3>1. {task.question}</h3>
            <div className="media-choices" role="group" aria-label="Обери дію">
              {task.actions.map((item, index) => (
                <button
                  type="button"
                  className="media-choice"
                  key={item.text}
                  aria-pressed={attempt.action === index}
                  onClick={() => choose('action', index)}
                >
                  {item.text}
                </button>
              ))}
            </div>
            {attempt.action !== null && (
              <>
                <h3>2. Чому ти так думаєш?</h3>
                <div
                  className="media-choices"
                  role="group"
                  aria-label="Обери пояснення"
                >
                  {task.reasons.map((item, index) => (
                    <button
                      type="button"
                      className="media-choice"
                      key={item.text}
                      aria-pressed={attempt.reason === index}
                      onClick={() => choose('reason', index)}
                    >
                      {item.text}
                    </button>
                  ))}
                </div>
              </>
            )}
            <Button onClick={check}>Перевірити</Button>
            {notice && (
              <p role="status" className="media-feedback">
                {notice}
              </p>
            )}
            {feedback && (
              <div
                role="status"
                className="media-feedback"
                data-success={solved}
              >
                <strong>{feedback.title}</strong>
                <p>{feedback.text}</p>
              </div>
            )}
          </section>
        </div>
        {attempt.checked && (
          <details className="media-consequence media-panel">
            <summary>Що може статися?</summary>
            <p>{task.consequence}</p>
          </details>
        )}
        {solved && <p className="media-rule">{task.rule}</p>}
        <div className="media-footer">
          <Button
            variant="gray"
            disabled={current === 0}
            onClick={() => go(current - 1)}
          >
            ← Попереднє завдання
          </Button>
          <span className="media-muted">
            Пояснюй рішення, а не вгадуй кнопку.
          </span>
          {current < tasks.length - 1 && (
            <Button onClick={() => go(current + 1)}>Наступне завдання →</Button>
          )}
        </div>
      </section>
      {current === tasks.length - 1 && (
        <section className="media-panel media-final-task">
          {allSolved ? (
            <>
              <h2>Практику завершено</h2>
              <p>
                Ти обрав дії та пояснив причини в усіх історіях. Яке правило
                допоможе тобі наступного разу?
              </p>
              <Button
                variant="gray"
                onClick={() => {
                  setAttempts(tasks.map(freshPracticeAttempt));
                  go(0);
                }}
              >
                Спробувати ще раз
              </Button>
            </>
          ) : (
            <>
              <h2>Перевірмо всі рішення</h2>
              <p>Завдання завершене, коли правильно обрано і дію, і причину.</p>
              <Button
                onClick={() =>
                  go(
                    tasks.findIndex(
                      (item, i) => !practiceSolved(item, attempts[i]),
                    ),
                  )
                }
              >
                До незавершеного завдання
              </Button>
            </>
          )}
        </section>
      )}
    </div>
  );
}
