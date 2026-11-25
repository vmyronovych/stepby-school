import { McarFigure } from '../../shared/ui/McarFigure';
import { useState } from 'react';
import { Button, LegacyHtml, LinkButton } from '../../../../components/ui';
import { LessonScreen } from '../../shared/ui/LessonScreen';
import { MaterialPanels } from '../../shared/ui/MaterialPanels';
import { CoursePreparation } from '../../shared/ui/CoursePreparation';
import { practiceSections, teacherSections } from './lesson08-content';
import { mcarUrl, roboticsHref, type RoboticsView } from '../../shared/routes';

const lessonId = 'lesson-08';
const diagram = 'assets/robotics/lesson-08-wiring.png';

function Wiring({
  compact = false,
  active = true,
}: {
  compact?: boolean;
  active?: boolean;
}) {
  return (
    <McarFigure
      src={diagram}
      width={3600}
      height={2704}
      compact={compact}
      active={active}
      alt="Схема з Mcar: ESP32 встановлена в плату розширення; драйвер HW-627 встановлений у mini breadboard; GPIO16 і GPIO17 її ряду S підключені через отвори J6/J7 до IN1 та IN2; OUT1 і OUT2 до мотора. Батареї живлять драйвер, USB — ESP32; GND спільна."
      caption="ESP32 у платі розширення, HW-627 на mini breadboard. Сигнали підключаємо до ряду S, USB — до самої ESP32. Звіряйте назви контактів."
    />
  );
}

function ProgramBlocks({
  variant,
  active = true,
}: {
  variant: 'start' | 'demo' | 'solution';
  active?: boolean;
}) {
  const descriptions = {
    start:
      'Стартовий файл: коли плата увімкнеться, вимкнути GPIO16 і GPIO17, чекати 3 секунди. Далі додайте власні блоки.',
    demo: 'Програма показу: вимкнути GPIO16 і GPIO17, чекати 3 секунди, увімкнути GPIO16, чекати 1 секунду, вимкнути обидва входи.',
    solution:
      'Приклад учителя: вимкнути GPIO16 і GPIO17, чекати 3 секунди, увімкнути GPIO16, чекати 2 секунди, вимкнути обидва входи.',
  };
  return (
    <McarFigure
      program
      width={variant === 'start' ? 1064 : 1074}
      height={variant === 'start' ? 764 : 1500}
      active={active}
      src={`assets/robotics/lesson-08-${variant}-blocks.png`}
      alt={descriptions[variant]}
      caption={
        variant === 'start'
          ? 'Початок програми у Mcar. Продовження складаєте ви.'
          : 'Блоки з відповідного файлу Mcar.'
      }
    />
  );
}

function Classroom({ active }: { active: boolean }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <MaterialPanels
      active={active}
      materials={[
        {
          id: 'wiring',
          title: 'Підключення',
          prompt:
            'Простежте шлях команди від ESP32 та шлях енергії від батарей до мотора.',
          render: (visible) => (
            <>
              <Wiring active={visible} />
              <div className="robotics-material-discussion">
                <p>
                  ESP32 передає команду драйверу. Драйвер керує енергією від
                  батарей до мотора. Пристрої мають спільну землю GND.
                </p>
                <p className="robotics-callout">
                  Машинка стоїть на підставці. Колесо вільне, пальці й дроти
                  тримаємо осторонь.
                </p>
                <details>
                  <summary>
                    Як перенести знайому програму спалаху на мотор?
                  </summary>
                  <p>
                    Згадайте послідовність для LED: увімкнути, зачекати,
                    вимкнути. Тепер команда йде до входу драйвера, який керує
                    мотором.
                  </p>
                </details>
              </div>
            </>
          ),
        },
        {
          id: 'program',
          title: 'Програма',
          prompt:
            'Коли почнеться рух, скільки триватиме команда та що станеться після неї?',
          render: (visible) => (
            <>
              <ProgramBlocks variant="demo" active={visible} />
              <div className="robotics-material-discussion">
                <Button
                  onClick={() => setRevealed((value) => !value)}
                  aria-expanded={revealed}
                  aria-controls="motor-explanation"
                >
                  {revealed ? 'Приховати пояснення' : 'Показати пояснення'}
                </Button>
                {revealed && (
                  <p id="motor-explanation" className="robotics-callout">
                    Після початкової паузи команда триватиме одну секунду. Коли
                    обидва входи вимкнені, драйвер перестає обертати мотор.
                    Колесо може ще трохи докручуватися за інерцією.
                  </p>
                )}
                <p>
                  Учитель запускає демонстрацію. Порівняймо побачене з нашим
                  прогнозом.
                </p>
                <ul>
                  <li>Яке очікування дає нам час приготуватися?</li>
                  <li>Яке визначає тривалість роботи мотора?</li>
                  <li>Які команди завершують роботу?</li>
                </ul>
                <p>
                  Повторімо запуск і перевірмо пояснення. Торкатися колеса під
                  час роботи не потрібно.
                </p>
                <details>
                  <summary>Власна спроба: змініть тривалість команди</summary>
                  <p>
                    Після паузи 3 секунди подайте команду на 2 секунди, а потім
                    вимкніть мотор. Спочатку поясніть задум напарнику. Один
                    складає програму, другий звіряє її із задумом. Потім
                    поміняйтеся ролями.
                  </p>
                  <LinkButton href={roboticsHref(lessonId, 'practice')}>
                    Практика в парі · стартовий файл
                  </LinkButton>
                </details>
              </div>
            </>
          ),
        },
      ]}
    />
  );
}

const hints = [
  'Вам потрібні три частини: дати команду мотору, залишити її на потрібний час, забрати команду.',
  'У «Пінах» є команди ввімкнення й вимкнення. У «Керуванні» — «чекати … секунд». Перший вхід драйвера підключений до GPIO16. GPIO17 залишається вимкненим.',
  'Після початкової паузи додайте «пін GPIO16 увімкнути · 1». Визначте місце для очікування двох секунд і команд вимкнення. Напарник пояснює порядок до запуску.',
];

function Practice({ active = true }: { active?: boolean }) {
  const [hintCount, setHintCount] = useState(0);
  return (
    <div className="robotics-practice" aria-label="Практика в парі">
      <aside
        className="robotics-practice-tools"
        aria-label="Схема та майстерня"
      >
        <h2>Схема поруч</h2>
        <Wiring compact active={active} />
        <a
          className="btn green"
          href={mcarUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Відкрити Мандрівника
        </a>
        <p>
          Зовнішня майстерня відкриється в новій вкладці. Інструкція залишиться
          тут.
        </p>
        <a href="assets/robotics/lesson-08-start.mcar" download>
          Завантажити стартовий файл .mcar
        </a>
      </aside>
      <div className="robotics-prose">
        {practiceSections.map((section, index) => (
          <section
            key={section.title}
            className="robotics-panel"
            aria-labelledby={`practice-${index}`}
          >
            <h2 id={`practice-${index}`}>{section.title}</h2>
            <LegacyHtml html={section.html} />
            {section.title === 'Відкрийте свій проєкт' && (
              <div className="robotics-hints">
                <ProgramBlocks variant="start" active={active} />
                <h3>Підказки до програми</h3>
                <p>
                  Почніть із власної спроби. Відкривайте допомогу поступово.
                </p>
                <div aria-live="polite">
                  {hints.slice(0, hintCount).map((hint, i) => (
                    <p className="robotics-callout" key={hint}>
                      <strong>Підказка {i + 1}.</strong> {hint}
                    </p>
                  ))}
                </div>
                {hintCount < hints.length && (
                  <Button
                    variant="gray"
                    onClick={() => setHintCount((count) => count + 1)}
                  >
                    {hintCount ? 'Наступна підказка' : 'Перша підказка'}
                  </Button>
                )}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

function Teacher() {
  return (
    <div
      className="robotics-teacher robotics-prose"
      aria-label="Матеріали для вчителя"
    >
      <div className="robotics-panel">
        <h2>Підготовка до показу</h2>
        <p>
          2 × 45 хв із перервою 10 хв. Шість пар, один перевірений моторний
          канал на пару. Перед заняттям повторіть запуск на своєму комплекті.
        </p>
        <p>
          Для показу класу відкривайте «Разом у класі». Учнівська сторінка
          містить практику без цих розв’язків.
        </p>
        <LinkButton
          href={roboticsHref(lessonId, 'student')}
          target="_blank"
          rel="noopener noreferrer"
        >
          Відкрити учнівську сторінку
        </LinkButton>
      </div>
      <nav
        className="robotics-teacher-contents"
        aria-label="Зміст матеріалів учителя"
      >
        {teacherSections.map((section, index) => (
          <button
            key={section.title}
            type="button"
            onClick={(event) => {
              event.currentTarget.ownerDocument
                .getElementById(`teacher-section-${index}`)
                ?.scrollIntoView({ block: 'start' });
            }}
          >
            {section.title}
          </button>
        ))}
      </nav>
      <CoursePreparation number={8} />
      {teacherSections.map((section, index) => (
        <section
          key={section.title}
          className="robotics-panel"
          id={`teacher-section-${index}`}
        >
          <h2>{section.title}</h2>
          <LegacyHtml html={section.html} />
          {section.title === 'Підготовка до заняття' && <Wiring />}
          {section.title === 'Повний приклад програми' && (
            <ProgramBlocks variant="solution" />
          )}
        </section>
      ))}
    </div>
  );
}

export function MotorLesson({ view }: { view: RoboticsView }) {
  if (view === 'student')
    return (
      <div className="robotics-student-only">
        <p className="robotics-eyebrow">
          StepBy School · Практика в парі · Заняття 8
        </p>
        <h1>Запускаємо та зупиняємо мотор</h1>
        <p className="robotics-lead">
          Працюйте разом, передбачайте результат і змінюйте ролі.
        </p>
        <Practice />
      </div>
    );
  return (
    <LessonScreen number={8} view={view} prerequisites={[6, 7]}>
      <div hidden={view !== 'classroom'}>
        <Classroom active={view === 'classroom'} />
      </div>
      <div hidden={view !== 'practice'}>
        <Practice active={view === 'practice'} />
      </div>
      {view === 'teacher' && <Teacher />}
      <footer className="robotics-lesson-footer">
        <a
          href={roboticsHref(lessonId, 'teacher')}
          aria-current={view === 'teacher' ? 'page' : undefined}
        >
          Матеріали для вчителя
        </a>
        <a
          href={roboticsHref(lessonId, 'student')}
          target="_blank"
          rel="noopener noreferrer"
        >
          Учнівська сторінка · нова вкладка
        </a>
      </footer>
      <nav className="robotics-lesson-footer" aria-label="Послідовність занять">
        <a href={roboticsHref('lesson-07')}>← Заняття 7</a>
        <a href={roboticsHref()}>Усі заняття</a>
        <a href={roboticsHref('lesson-09')}>Заняття 9 →</a>
      </nav>
    </LessonScreen>
  );
}
