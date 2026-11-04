import { useRef, useState } from 'react';
import { previewDocument } from './preview';
import { starterHtml, webTasks } from './tasks';

export function WebPractice() {
  const [selected, setSelected] = useState(webTasks[0].id);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');
  const task = webTasks.find((item) => item.id === selected)!;
  const source = drafts[selected] ?? starterHtml;
  const selection = useRef(selected);
  selection.current = selected;

  function update(value: string) {
    setDrafts((current) => ({ ...current, [selected]: value }));
    setMessage('');
  }

  function download() {
    const url = URL.createObjectURL(
      new Blob([source], { type: 'text/html;charset=utf-8' }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = 'index.html';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage(
      'Файл завантажено. Передай його вчителю у звичний для вашої групи спосіб.',
    );
  }

  return (
    <section className="web-practice" aria-label="Практика HTML">
      <p id="web-task-label">
        <strong>Обери завдання</strong>
      </p>
      <div
        className="web-task-buttons"
        role="group"
        aria-labelledby="web-task-label"
      >
        {webTasks.map((item) => (
          <button
            key={item.id}
            type="button"
            data-web-task={item.id}
            aria-pressed={selected === item.id}
            onClick={() => {
              setSelected(item.id);
              setMessage('');
            }}
          >
            {item.title}
          </button>
        ))}
      </div>
      <h3>{task.title}</h3>
      <p>{task.brief}</p>
      <details>
        <summary>Текст для роботи</summary>
        <p className="web-task-text">{task.text}</p>
      </details>
      <details>
        <summary>Підказка</summary>
        <p>{task.hint}</p>
      </details>
      <div className="web-workspace">
        <div>
          <label htmlFor="web-source">Твій HTML-документ</label>
          <textarea
            id="web-source"
            spellCheck={false}
            value={source}
            onChange={(event) => update(event.target.value)}
          />
          <div className="web-actions">
            <button
              className="tool"
              onClick={() =>
                setPreviews((current) => ({
                  ...current,
                  [selected]: previewDocument(source),
                }))
              }
            >
              Оновити результат
            </button>
            <button className="tool" onClick={download}>
              Завантажити HTML
            </button>
          </div>
          <label className="web-import">
            Відкрити HTML-файл
            <input
              type="file"
              accept=".html,.htm,text/html"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                event.target.value = '';
                if (!file) return;
                if (file.size > 200_000) {
                  setMessage('Обери HTML-файл розміром до 200 КБ.');
                  return;
                }
                const target = selected;
                try {
                  const text = await file.text();
                  setDrafts((current) => ({ ...current, [target]: text }));
                  if (selection.current === target)
                    setMessage('Файл відкрито. Натисни «Оновити результат».');
                } catch {
                  setMessage('Не вдалося прочитати файл. Спробуй ще раз.');
                }
              }}
            />
          </label>
        </div>
        <div>
          <h4>Твій результат</h4>
          <iframe
            title="Твій результат HTML"
            sandbox=""
            srcDoc={previews[selected] ?? previewDocument(starterHtml)}
          />
          <p className="web-note">
            Натисни «Оновити результат» після змін. Перегляд підтримує елементи
            HTML цієї теми. Назву вкладки перевір у завантаженому файлі.
          </p>
        </div>
      </div>
      <figure className="web-reference">
        <img
          src={`assets/web-development/${task.id}.png`}
          width="720"
          height="420"
          alt={`Приклад результату: ${task.title}. Текст доступний у розділі «Текст для роботи».`}
        />
        <figcaption>
          Приклад у вікні 720 × 420 px. Шрифт і перенесення рядків можуть
          відрізнятися. Перевір структуру за списком нижче.
        </figcaption>
        <a
          href={`assets/web-development/${task.id}.png`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Відкрити зразок у повному розмірі
        </a>
      </figure>
      <h4>Самоперевірка</h4>
      <ul>
        {task.checklist.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="web-note">
        Чернетки зберігаються лише до виходу зі сторінки або її
        перезавантаження. Завантаж HTML, щоб продовжити пізніше.
      </p>
      <p role="status">{message}</p>
    </section>
  );
}
