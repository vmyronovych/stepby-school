import { useEffect, useRef, useState, type ReactNode } from 'react';
import { roboticsLessons } from '../../course';
import { roboticsHref, type RoboticsView } from '../../routes';

/** Shared compact lesson layout: navigation stays secondary to the teaching material. */
export function LessonScreen({
  number,
  view,
  prerequisites,
  children,
}: {
  number: number;
  view: RoboticsView;
  prerequisites: number[];
  children: ReactNode;
}) {
  const meta = roboticsLessons.find((lesson) => lesson.number === number)!;
  const root = useRef<HTMLElement>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [notice, setNotice] = useState('');
  useEffect(() => {
    const element = root.current!;
    const doc = element.ownerDocument;
    const update = () => setFullscreen(doc.fullscreenElement === element);
    doc.addEventListener('fullscreenchange', update);
    return () => {
      doc.removeEventListener('fullscreenchange', update);
      if (doc.fullscreenElement === element)
        void doc.exitFullscreen().catch(() => {});
    };
  }, []);
  useEffect(() => {
    const element = root.current;
    if (
      element &&
      view !== 'classroom' &&
      element.ownerDocument.fullscreenElement === element
    )
      void element.ownerDocument.exitFullscreen().catch(() => {});
  }, [view]);
  async function toggleFullscreen() {
    const element = root.current!;
    try {
      if (element.ownerDocument.fullscreenElement === element)
        await element.ownerDocument.exitFullscreen();
      else await element.requestFullscreen();
      setNotice('');
    } catch {
      setNotice('Повноекранний показ недоступний. Продовжуйте в цьому вікні.');
    }
  }
  return (
    <section ref={root} className="robotics-lesson-screen">
      <header className="robotics-lesson-bar">
        <a
          className="robotics-back"
          href={roboticsHref()}
          aria-label="До списку занять"
          title="Усі заняття"
        >
          ←
        </a>
        <h1>
          {number}. {meta.title}
        </h1>
        <nav className="robotics-mode-nav" aria-label="Режим заняття">
          {(
            [
              ['classroom', 'Разом у класі'],
              ['practice', 'Практика в парі'],
              ['teacher', 'Вчителю'],
            ] as const
          ).map(([mode, label]) => (
            <a
              key={mode}
              href={roboticsHref(
                meta.id,
                mode === 'classroom' ? undefined : mode,
              )}
              aria-current={view === mode ? 'page' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <details className="robotics-lesson-info">
          <summary>Про заняття</summary>
          <div>
            <p>{meta.description}</p>
            {prerequisites.length > 0 && (
              <p>
                Спираємося на:{' '}
                {prerequisites.map((n, i) => (
                  <span key={n}>
                    {i > 0 && ', '}
                    <a
                      href={roboticsHref(
                        `lesson-${String(n).padStart(2, '0')}`,
                      )}
                    >
                      заняття {n}
                    </a>
                  </span>
                ))}
                .
              </p>
            )}
            <a href={roboticsHref('tools')}>Інструменти робототехніки →</a>
          </div>
        </details>
        {view === 'classroom' && (
          <button className="robotics-fullscreen" onClick={toggleFullscreen}>
            {fullscreen ? 'Вийти з повного екрана' : 'На весь екран'}
          </button>
        )}
      </header>
      {notice && (
        <p role="status" className="robotics-screen-notice">
          {notice}
        </p>
      )}
      {children}
    </section>
  );
}
