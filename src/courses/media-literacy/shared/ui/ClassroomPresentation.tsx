import { useEffect, useRef, useState } from 'react';
import { Button } from '../../../../components/button';
import { ChatScene } from './ChatScene';
import { ConsequenceNote } from './ConsequenceNote';
import { PracticeQr } from './PracticeQr';
import type { ClassroomScene } from '../content/classroom';

const phases = [
  'Історія',
  'Обираємо дію',
  'Обговорення',
  'Наслідки',
  'Висновок',
];

export function ClassroomPresentation({
  title,
  scenes,
  practiceUrl,
}: {
  title: string;
  scenes: ClassroomScene[];
  practiceUrl: string;
}) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [phase, setPhase] = useState(0);
  const [question, setQuestion] = useState(0);
  const [reveal, setReveal] = useState(false);
  const [qr, setQr] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [notice, setNotice] = useState('');
  const root = useRef<HTMLDivElement>(null);
  const scene = scenes[sceneIndex];
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const doc = element.ownerDocument;
    const update = () => setFullscreen(doc.fullscreenElement === element);
    doc.addEventListener('fullscreenchange', update);
    return () => {
      doc.removeEventListener('fullscreenchange', update);
    };
  }, []);
  function go(nextScene: number, nextPhase = 0) {
    setSceneIndex(nextScene);
    setPhase(nextPhase);
    setQuestion(0);
    setReveal(false);
    setQr(false);
    root.current?.scrollTo({ top: 0 });
  }
  async function toggleFullscreen() {
    const element = root.current;
    if (!element) return;
    try {
      if (element.ownerDocument.fullscreenElement === element)
        await element.ownerDocument.exitFullscreen();
      else await element.requestFullscreen();
      setNotice('');
    } catch {
      setNotice(
        'Повноекранний режим недоступний. Можна продовжити показ у цьому вікні.',
      );
    }
  }
  return (
    <div ref={root} className="media-projector" aria-label="Разом у класі">
      <div className="media-projector-toolbar">
        <span>{title}</span>
        <Button variant="gray" onClick={() => setQr((value) => !value)}>
          {qr ? 'Повернутися до уроку' : 'Перейти до практики'}
        </Button>
        <Button variant="ghost" onClick={toggleFullscreen}>
          {fullscreen ? 'Вийти з повного екрана' : 'На весь екран'}
        </Button>
      </div>
      {notice && <p role="status">{notice}</p>}
      {qr ? (
        <PracticeQr url={practiceUrl} title={title} />
      ) : (
        <>
          <nav
            className="media-projector-scenes"
            aria-label="Історії для показу"
          >
            {scenes.map((item, index) => (
              <button
                type="button"
                key={item.title}
                aria-current={index === sceneIndex ? 'step' : undefined}
                onClick={() => go(index)}
              >
                {index + 1}. {item.title}
              </button>
            ))}
          </nav>
          <nav
            className="media-projector-phases"
            aria-label="Етапи обговорення"
          >
            {phases.map((label, index) => (
              <button
                type="button"
                key={label}
                aria-current={index === phase ? 'step' : undefined}
                onClick={() => go(sceneIndex, index)}
              >
                {label}
              </button>
            ))}
          </nav>
          <section className="media-slide" aria-label={phases[phase]}>
            {phase === 0 && (
              <div className="media-slide-story">
                <div>
                  <span className="media-eyebrow">
                    Історія {sceneIndex + 1} із {scenes.length}
                  </span>
                  <h2>{scene.title}</h2>
                  <p>{scene.context}</p>
                  <p className="media-muted">
                    {scene.chat.medium === 'in-person'
                      ? 'Розгляньмо комікс разом.'
                      : 'Прочитаймо повідомлення разом.'}
                  </p>
                </div>
                <ChatScene story={scene.chat} />
              </div>
            )}
            {phase === 1 && (
              <>
                <h2>{scene.question}</h2>
                {scene.source && (
                  <p className="media-source-card">{scene.source}</p>
                )}
                <ol className="media-board-options">
                  {scene.options.map((option) => (
                    <li key={option}>{option}</li>
                  ))}
                </ol>
                <Button
                  onClick={() => setReveal((value) => !value)}
                  aria-expanded={reveal}
                >
                  {reveal ? 'Приховати пояснення' : 'Показати пояснення'}
                </Button>
                {reveal && (
                  <p className="media-feedback" role="status">
                    {scene.explanation}
                  </p>
                )}
              </>
            )}
            {phase === 2 && (
              <div className="media-discussion-slide">
                <span className="media-eyebrow">
                  Обговорімо · {question + 1} / {scene.discussion.length}
                </span>
                <h2>{scene.discussion[question]}</h2>
                <p>Спочатку подумайте самі, потім вислухаймо кілька думок.</p>
                <div className="media-footer">
                  <Button
                    variant="gray"
                    disabled={question === 0}
                    onClick={() => setQuestion((value) => value - 1)}
                  >
                    Попереднє запитання
                  </Button>
                  <Button
                    disabled={question === scene.discussion.length - 1}
                    onClick={() => setQuestion((value) => value + 1)}
                  >
                    Наступне запитання
                  </Button>
                </div>
              </div>
            )}
            {phase === 3 && <ConsequenceNote consequence={scene.consequence} />}
            {phase === 4 && (
              <div className="media-discussion-slide">
                <span className="media-eyebrow">Що запам’ятаємо?</span>
                <h2>{scene.takeaway}</h2>
                <p>Поясніть своїми словами, як це допоможе герою.</p>
              </div>
            )}
          </section>
          <div className="media-projector-footer">
            <Button
              variant="gray"
              disabled={sceneIndex === 0 && phase === 0}
              onClick={() =>
                phase > 0
                  ? go(sceneIndex, phase - 1)
                  : go(sceneIndex - 1, phases.length - 1)
              }
            >
              ← Назад
            </Button>
            <span>
              {sceneIndex + 1} / {scenes.length} · {phases[phase]}
            </span>
            <Button
              onClick={() =>
                phase < phases.length - 1
                  ? go(sceneIndex, phase + 1)
                  : sceneIndex < scenes.length - 1
                    ? go(sceneIndex + 1)
                    : setQr(true)
              }
            >
              {phase === phases.length - 1
                ? sceneIndex === scenes.length - 1
                  ? 'Перейти до практики →'
                  : 'Наступна історія →'
                : 'Далі →'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
