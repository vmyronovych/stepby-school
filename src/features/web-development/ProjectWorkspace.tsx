import { useRef, useState } from 'react';
import { ImageBank } from './ImageBank';
import { embedLessonImages, restoreLessonImages } from './media';
import { previewDocument, type PreviewOptions } from './preview';
import {
  projectFilenames,
  type ProjectFilename,
  type WebProject,
} from './project-files';

/** Four local files share one in-memory draft. Preview remains a sandboxed document. */
export function ProjectWorkspace({
  project,
  preview,
}: {
  project: WebProject;
  preview: PreviewOptions;
}) {
  const [files, setFiles] = useState(project.starterFiles);
  const [active, setActive] = useState<ProjectFilename>('index.html');
  const [page, setPage] = useState<'index.html' | 'world.html'>('index.html');
  const [rendered, setRendered] = useState(project.starterFiles);
  const [message, setMessage] = useState('');
  const editor = useRef<HTMLTextAreaElement>(null);
  const html = active.endsWith('.html');
  const cssFilename = page === 'index.html' ? 'style.css' : 'world.css';

  function update(value: string) {
    setFiles((current) => ({ ...current, [active]: value }));
    setMessage('');
  }

  function download() {
    const url = URL.createObjectURL(
      new Blob([embedLessonImages(files[active])], {
        type: (html ? 'text/html' : 'text/css') + ';charset=utf-8',
      }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = active;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage(
      `Завантажено ${active}. Збережи всі чотири файли в одній папці.`,
    );
  }

  return (
    <div className="web-project-workspace">
      <p>
        Проєкт містить чотири файли. Перемикання файлів зберігає чернетки до
        виходу зі сторінки. Завантаж кожен файл перед завершенням роботи.
      </p>
      <div className="web-task-buttons" role="group" aria-label="Файли проєкту">
        {projectFilenames.map((filename) => (
          <button
            type="button"
            key={filename}
            aria-pressed={active === filename}
            onClick={() => {
              setActive(filename);
              setMessage('');
            }}
          >
            {filename}
          </button>
        ))}
      </div>
      {html && (
        <ImageBank
          onInsert={(snippet) => {
            const source = files[active];
            const end = source.toLowerCase().lastIndexOf('</body>');
            const position = end < 0 ? source.length : end;
            update(
              source.slice(0, position) + snippet + source.slice(position),
            );
            editor.current?.focus();
          }}
        />
      )}
      <div className="web-workspace">
        <div>
          <label htmlFor="web-project-source">Файл {active}</label>
          <textarea
            ref={editor}
            id="web-project-source"
            spellCheck={false}
            value={files[active]}
            onChange={(event) => update(event.target.value)}
          />
          <div className="web-actions">
            <button
              type="button"
              className="tool"
              onClick={() => setRendered({ ...files })}
            >
              Оновити результат
            </button>
            <button type="button" className="tool" onClick={download}>
              Завантажити {active}
            </button>
          </div>
          <label className="web-import">
            Відкрити файл у {active}
            <input
              type="file"
              accept={html ? '.html,.htm,text/html' : '.css,text/css'}
              onChange={async (event) => {
                const file = event.target.files?.[0];
                const target = active;
                event.target.value = '';
                if (!file) return;
                if (file.size > 200_000) {
                  setMessage('Обери файл розміром до 200 КБ.');
                  return;
                }
                try {
                  const text = restoreLessonImages(await file.text());
                  setFiles((current) => ({ ...current, [target]: text }));
                  setMessage(
                    `Файл відкрито у ${target}. Натисни «Оновити результат».`,
                  );
                } catch {
                  setMessage('Не вдалося прочитати файл. Спробуй ще раз.');
                }
              }}
            />
          </label>
        </div>
        <div>
          <h4>Твій результат</h4>
          <div
            className="web-task-buttons"
            role="group"
            aria-label="Сторінка перегляду"
          >
            {(['index.html', 'world.html'] as const).map((filename) => (
              <button
                key={filename}
                type="button"
                aria-pressed={page === filename}
                onClick={() => setPage(filename)}
              >
                Перегляд {filename}
              </button>
            ))}
          </div>
          <iframe
            title="Твій результат HTML"
            sandbox="allow-downloads allow-forms"
            srcDoc={previewDocument(
              rendered[page],
              preview,
              rendered[cssFilename],
              cssFilename,
            )}
          />
          <p className="web-note">
            Оновлення застосовує зміни всіх файлів. Кнопки перегляду перемикають
            сторінку. Перехід між HTML-файлами перевір у завантаженому проєкті.
            У перегляді працюють якорі й перевірка полів; надсилання вимкнено.
          </p>
        </div>
      </div>
      <p role="status">{message}</p>
    </div>
  );
}
