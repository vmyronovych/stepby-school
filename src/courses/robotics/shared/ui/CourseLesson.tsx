import { McarFigure } from './McarFigure';
import { useState } from 'react';
import { MaterialPanels } from './MaterialPanels';
import { LessonScreen } from './LessonScreen';
import { Button, LinkButton } from '../../../../components/ui';
import { roboticsLessons } from '../../course';
import { mcarUrl, roboticsHref, type RoboticsView } from '../../routes';
import type { LessonMaterial, RoboticsLessonContent } from '../content/types';
import { courseImages } from '../content/resources';

import { CoursePreparation } from './CoursePreparation';
import { LineRuleVisual } from './LineRuleVisual';
import { CircuitProjector } from '../../tools/circuit/CircuitProjector';
import { CircuitEngine } from '../../tools/circuit/engine';
import type { CircuitPreset } from '../../tools/circuit/types';
const idFor = (n: number) => `lesson-${String(n).padStart(2, '0')}`;
function Programs({
  number,
  variant,
  active = true,
}: {
  number: number;
  variant: 'start' | 'demo' | 'solution';
  active?: boolean;
}) {
  const source = `lessons/${idFor(number)}/files/${idFor(number)}-${variant}.mcar`;
  const images = courseImages.filter(
    (image) =>
      image.source === source &&
      !image.filename.includes('definition') &&
      !image.filename.includes('wiring'),
  );
  return (
    <div className="robotics-program-gallery">
      {images.map((image) => (
        <McarFigure
          key={image.filename}
          {...image}
          src={'assets/robotics/' + image.filename}
          alt={`${image.caption}. Справжні блоки редактора Mcar; редагований файл доступний поруч.`}
          program
          active={active}
        />
      ))}
    </div>
  );
}
function Files({
  number,
  teacher = false,
}: {
  number: number;
  teacher?: boolean;
}) {
  if (number < 6) return null;
  if (number >= 31 && !teacher)
    return (
      <p>
        Відкрийте власні перевірені «Пульт.mcar» та «Лінія.mcar» з папки пари.
        Якщо копію втрачено, зверніться до вчителя для відновлення.
      </p>
    );
  if (number >= 31)
    return (
      <p>
        Відкрийте власні перевірені «Пульт.mcar» і «Лінія.mcar». Для
        відновлення:{' '}
        <a href="assets/robotics/lesson-21-solution.mcar" download>
          приклад пульта
        </a>{' '}
        та{' '}
        <a href="assets/robotics/lesson-30-solution.mcar" download>
          приклад лінії
        </a>
        . Перед запуском поверніть свої швидкість і пороги.
      </p>
    );
  if (number === 22)
    return teacher ? (
      <p>
        <a href="assets/robotics/lesson-22-demo.mcar" download>
          Діагностика датчика · запускає вчитель
        </a>
      </p>
    ) : (
      <p>
        Готову діагностику запускає вчитель. Сьогодні досліджуємо покази, а не
        складаємо незнайомі блоки.
      </p>
    );
  return (
    <div className="robotics-actions">
      {(teacher ? ['demo', 'solution'] : ['start']).map((variant) => (
        <a
          key={variant}
          className="btn gray"
          download
          href={`assets/robotics/${idFor(number)}-${variant}.mcar`}
        >
          {variant === 'start'
            ? 'Стартовий файл'
            : variant === 'demo'
              ? 'Файл показу'
              : 'Приклад учителя'}{' '}
          · Mcar
        </a>
      ))}
    </div>
  );
}
function Connections({ sensor = false }: { sensor?: boolean }) {
  return (
    <>
      <div className="robotics-table-wrap">
        <table>
          <caption>Узгоджені підключення чотирьох моторів</caption>
          <thead>
            <tr>
              <th>Канал</th>
              <th>Входи драйвера ← GPIO ряду S</th>
              <th>Виходи → мотор</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['D1 · лівий передній', 'IN1 ← 16, IN2 ← 17', 'OUT1/OUT2 → M1'],
              ['D1 · лівий задній', 'IN3 ← 18, IN4 ← 19', 'OUT3/OUT4 → M2'],
              ['D2 · правий передній', 'IN1 ← 23, IN2 ← 25', 'OUT1/OUT2 → M3'],
              ['D2 · правий задній', 'IN3 ← 26, IN4 ← 27', 'OUT3/OUT4 → M4'],
            ].map((row) => (
              <tr key={row[0]}>
                {row.map((cell) => (
                  <td key={cell}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Напрямок кожного колеса звіряємо на підставці. У прикладі «вперед»
        активні GPIO16, 18, 23, 26; якщо реальний мотор обертається навпаки,
        учитель міняє його пару проводів без живлення й повторює перевірку.
      </p>
      {sensor && (
        <>
          <div className="robotics-table-wrap">
            <table>
              <caption>QTR-MD-05A · підготовлене підключення</caption>
              <thead>
                <tr>
                  <th>Контакт</th>
                  <th>До плати розширення ESP32</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['VCC', '3V3 · перевіряє дорослий'],
                  ['GND', 'Спільна GND'],
                  ['OUT1 · ліворуч', 'S · GPIO32'],
                  ['OUT3 · центр', 'S · GPIO34'],
                  ['OUT5 · праворуч', 'S · GPIO36'],
                ].map((row) => (
                  <tr key={row[0]}>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Боки звіряйте відносно переду машинки. QTR ще відсутній у редакторі
            проводки Mcar: у файлі збережена моторна схема, а датчик підключено
            окремо за цією таблицею та гайдом складання. Початковий поріг 2048 у
            прикладах потрібно перевірити для кожного каналу.
          </p>
        </>
      )}
    </>
  );
}
function Hardware({
  lesson,
  active = true,
  material,
}: {
  lesson: RoboticsLessonContent;
  active?: boolean;
  material?: LessonMaterial;
}) {
  const n = lesson.number;
  let filename =
    n === 4
      ? 'mcar-chassis.png'
      : n === 5
        ? 'mcar-wheels.png'
        : n >= 31
          ? 'mcar-robot.png'
          : n >= 22
            ? 'mcar-sensor.png'
            : n === 6
              ? 'lesson-06-wiring.png'
              : n >= 11
                ? 'lesson-11-wiring.png'
                : 'lesson-08-wiring.png';
  const circuitImage = courseImages.find(
    (i) =>
      i.filename ===
      (n === 1
        ? 'circuit-first.png'
        : n === 2
          ? 'circuit-button.png'
          : 'circuit-contact.png'),
  );
  if (n <= 3)
    return (
      <div className="robotics-panel">
        <h3>
          {n === 3
            ? material === 'assembly'
              ? 'Готова гра'
              : material === 'wiring'
                ? 'Коло гри'
                : 'Готова гра та її коло'
            : 'Зберіть і перевірте коло'}
        </h3>
        {n === 3 && material !== 'wiring' && (
          <McarFigure
            src="assets/robotics/wire-game-assembly.svg"
            width={1200}
            height={780}
            active={active}
            alt="Гра Нервовий дріт: металева траса, петля з ізольованою ручкою, активна пищалка на mini breadboard та джерело 3,3 В. Три з’єднувальні проводи не перетинаються."
            caption="Малюнок готової гри. Плюс джерела → плюс пищалки; мінус пищалки → траса; петля → мінус джерела. Дотик петлі до траси замикає коло."
          />
        )}

        {material !== 'assembly' && circuitImage && (
          <McarFigure
            {...circuitImage}
            src={'assets/robotics/' + circuitImage.filename}
            alt={circuitImage.caption}
            active={active}
          />
        )}
        {material !== 'assembly' && (
          <>
            <p>
              Відкрийте «Електричне коло». Перемикайте «Схема / Макетка»,
              простежуйте повний шлях і перевіряйте свою зміну.
              {n >= 2 &&
                ' Для цього заняття приберіть LED і резистор, додайте активну пищалку та кнопку за схемою. У властивостях пищалки виберіть гучність «тихо»: початкове налаштування — «без звуку». Натискайте кнопку по черзі.'}
              {n === 3 &&
                ' На електричній схемі кнопка позначає контакт петлі з трасою; у готовій грі окремої кнопки немає.'}
            </p>
            <LinkButton
              href={roboticsHref('r9')}
              target="_blank"
              rel="noopener noreferrer"
            >
              Електричне коло · нова вкладка
            </LinkButton>
          </>
        )}
        {n === 2 && (
          <p>
            <a
              href={roboticsHref('r8')}
              target="_blank"
              rel="noopener noreferrer"
            >
              Таблиця азбуки Морзе
            </a>
          </p>
        )}
      </div>
    );
  const image = courseImages.find((i) => i.filename === filename);
  return (
    <details className="robotics-panel" open>
      <summary>
        {n >= 22 && n <= 30
          ? 'Датчик: розташування та підключення'
          : 'Складання та підключення'}
      </summary>
      {image ? (
        <McarFigure
          {...image}
          src={'assets/robotics/' + filename}
          alt={image.caption}
          active={active}
        />
      ) : n >= 7 && n <= 10 ? (
        <McarFigure
          src="assets/robotics/lesson-08-wiring.png"
          width={3600}
          height={2704}
          caption="Один мотор: драйвер на mini breadboard, ESP32 у платі розширення, сигнали з ряду S. Зображення з редактора Mcar."
          alt="GPIO16 і GPIO17 до IN1 та IN2; OUT1 та OUT2 до мотора; спільна GND, окреме моторне живлення."
          active={active}
        />
      ) : null}
      {n === 6 && (
        <p>
          Ряд S · GPIO2 → резистор 330 Ом → A (анод) LED; K (катод) LED → окрема
          GND плати розширення. USB — до самої ESP32. Моторного живлення тут
          немає.
        </p>
      )}
      {n >= 22 && n <= 30 && (
        <p>
          На зображенні — кріплення датчика з гайда Mcar. Окремої монтажної
          схеми QTR у редакторі проводки поки немає; контакти звіряємо за
          таблицею нижче.
        </p>
      )}
      {n >= 11 && <Connections sensor={n >= 22} />}
      <a href={mcarUrl + '#assembly'} target="_blank" rel="noopener noreferrer">
        Відкрити інтерактивний гайд складання Mcar
      </a>
    </details>
  );
}
function Practice({
  lesson,
  active = true,
}: {
  lesson: RoboticsLessonContent;
  active?: boolean;
}) {
  const [hint, setHint] = useState(0),
    [checked, setChecked] = useState<number[]>([]);
  return (
    <div className="robotics-course-practice">
      <p className="robotics-callout">{lesson.safety}</p>
      <section className="robotics-panel">
        <h2>Підготуйте</h2>
        <ul>
          {lesson.materials.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p>
          Один виконує, другий звіряє та передбачає. Посеред роботи змініть
          ролі.
        </p>
        <Files number={lesson.number} />
        {lesson.number >= 6 && lesson.number <= 30 && lesson.number !== 22 && (
          <details open>
            <summary>Що вже є у стартовому файлі</summary>
            <Programs number={lesson.number} variant="start" active={active} />
          </details>
        )}
        {lesson.number >= 6 && (
          <p>
            <a href={mcarUrl} target="_blank" rel="noopener noreferrer">
              Відкрити Mcar · нова вкладка
            </a>
            . Збережіть свою попередню версію перед змінами. Файл відкриваємо в
            редакторі, програму на плату передаємо окремо.
          </p>
        )}
      </section>
      <Hardware lesson={lesson} active={active} />
      <LineRuleVisual number={lesson.number} active={active} />
      <div className="robotics-practice-steps">
        {lesson.practice.map((step, i) => (
          <section className="robotics-panel" key={step.title}>
            <h2>
              {i + 1}. {step.title}
            </h2>
            <p>{step.text}</p>
            <p>
              <strong>Перевірте:</strong> {step.check}
            </p>
            <label className="robotics-observation">
              <input
                type="checkbox"
                checked={checked.includes(i)}
                onChange={() =>
                  setChecked((list) =>
                    list.includes(i)
                      ? list.filter((n) => n !== i)
                      : [...list, i],
                  )
                }
              />{' '}
              Перевірили обоє й можемо пояснити
            </label>
          </section>
        ))}
      </div>
      <section className="robotics-panel">
        <h2>Потрібна підказка?</h2>
        <p>Спочатку назвіть очікування й те, що спостерігаєте.</p>
        {lesson.hints.slice(0, hint).map((t, i) => (
          <p key={t}>
            {i + 1}. {t}
          </p>
        ))}
        <Button
          variant="gray"
          disabled={hint === 3}
          onClick={() => setHint((v) => v + 1)}
        >
          {hint === 3 ? 'Усі підказки відкриті' : 'Відкрити наступну підказку'}
        </Button>
      </section>
      <section className="robotics-panel">
        <h2>Що вже вміємо</h2>
        <ul>
          {lesson.success.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <details>
          <summary>Додатковий дослід після основної перевірки</summary>
          <p>{lesson.extension}</p>
        </details>
        <p>
          Позначки вище — ваш запис спостережень, а не автоматична перевірка
          справжнього кола.
        </p>
      </section>
    </div>
  );
}
function Classroom({
  experiment,
  lesson,
  active,
}: {
  lesson: RoboticsLessonContent;
  experiment?: CircuitPreset;
  active: boolean;
}) {
  const n = lesson.number;
  const kinds: LessonMaterial[] =
    n <= 2
      ? ['wiring']
      : n === 3
        ? ['assembly', 'wiring']
        : n <= 5 || n >= 31
          ? ['assembly']
          : n === 7
            ? ['experiment', 'wiring', 'program']
            : n >= 25
              ? ['rule', 'program', 'wiring']
              : ['program', 'wiring'];
  const titles: Record<LessonMaterial, string> = {
    experiment: 'Дослід',
    wiring: n <= 3 ? 'Схема' : 'Підключення',
    program: 'Програма',
    assembly: n === 3 || n >= 31 ? 'Виріб' : 'Складання',
    rule: 'Правило руху',
  };
  const prompts: Record<LessonMaterial, string> = {
    experiment: 'Простежте шлях струму керування та струму мотора.',
    wiring:
      n <= 3
        ? 'Простежте повний шлях від одного контакту джерела до іншого.'
        : 'Звірте назви контактів і простежте кожне з’єднання.',
    program: 'Прочитайте блоки й передбачте результат перед запуском.',
    assembly: 'Знайдіть деталі на зображенні та на своєму виробі.',
    rule: 'Простежте, як покази датчика визначають дію машинки.',
  };
  return (
    <MaterialPanels
      active={active}
      materials={kinds.map((kind) => {
        const discussions = lesson.slides.filter(
          (slide) => slide.material === kind,
        );
        return {
          id: kind,
          title: titles[kind],
          prompt: discussions[0]?.prompt ?? prompts[kind],
          render: (visible) => (
            <>
              {kind === 'experiment' && (
                <CircuitProjector
                  controller={CircuitEngine}
                  preset={experiment}
                  compact
                  active={visible}
                />
              )}
              {(kind === 'wiring' || kind === 'assembly') && (
                <Hardware lesson={lesson} material={kind} active={visible} />
              )}
              {kind === 'program' && (
                <Programs number={n} variant="demo" active={visible} />
              )}
              {kind === 'rule' && (
                <LineRuleVisual number={n} active={visible} />
              )}
              <div className="robotics-material-discussion">
                {discussions.map((slide) => (
                  <div key={slide.title}>
                    <p>{slide.text}</p>
                    {[
                      { question: slide.question, answer: slide.answer },
                      ...(slide.followup ? [slide.followup] : []),
                    ].map((item) => (
                      <details key={item.question}>
                        <summary>{item.question}</summary>
                        <p>{item.answer}</p>
                      </details>
                    ))}
                  </div>
                ))}
              </div>
              {kind === kinds[0] && (
                <details className="robotics-recall">
                  <summary>Пригадати перед дослідом</summary>
                  <p>{lesson.recall}</p>
                </details>
              )}
            </>
          ),
        };
      })}
    />
  );
}
function Teacher({ lesson }: { lesson: RoboticsLessonContent }) {
  const first = [
    ['0–5', 'Готовність і ролі', lesson.safety],
    ['5–12', lesson.firstTitles?.[0] ?? 'Пригадуємо', lesson.first[0]],
    [
      '12–14',
      'Відпочинок для очей',
      'Відвести погляд від екрана, поморгати, подивитися вдалину.',
    ],
    ['14–25', lesson.firstTitles?.[1] ?? 'Спільний показ', lesson.first[1]],
    [
      '25–35',
      lesson.firstTitles?.[2] ?? 'Підготовка до практики',
      lesson.first[2],
    ],
    [
      '35–45',
      lesson.firstTitles?.[3] ??
        (lesson.number === 7
          ? 'Читаємо схему в Mcar'
          : 'Передбачаємо результат'),
      lesson.first[3],
    ],
  ];
  const second = [
    [
      '0–2',
      'Відпочинок для очей',
      'Після перерви підготуйтеся до короткого екранного відрізка.',
    ],
    ['2–15', lesson.secondTitles?.[0] ?? 'Перша спроба', lesson.second[0]],
    [
      '15–25',
      lesson.secondTitles?.[1] ?? 'Перевірка результату',
      lesson.second[1],
    ],
    [
      '25–27',
      'Відпочинок для очей',
      'Змінити фокус, відвести погляд, розслабити руки.',
    ],
    [
      '27–40',
      lesson.secondTitles?.[2] ?? 'Зміна ролей і друга спроба',
      lesson.second[2],
    ],
    ['40–43', lesson.secondTitles?.[3] ?? 'Підсумок', lesson.second[3]],
    [
      '43–45',
      'Збереження і порядок',
      'Збережіть файли або складіть деталі. Вимкніть живлення. Домашнього завдання немає.',
    ],
  ];
  return (
    <div className="robotics-course-teacher">
      <CoursePreparation number={lesson.number} />
      <LineRuleVisual number={lesson.number} />
      <section className="robotics-panel">
        <h2>Перед заняттям {lesson.number}</h2>
        <ul>
          {lesson.preparation.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <h3>Вхідна перевірка</h3>
        <p>{lesson.recall}</p>
        <p>
          Якщо відповідає лише один учасник, дайте іншому коротку дію з
          попереднього заняття. Скорочуйте додатковий дослід, а не обов’язкову
          основу.
        </p>
        <Files number={lesson.number} teacher />
      </section>
      {[first, second].map((rows, i) => (
        <section className="robotics-panel" key={i}>
          <h2>{i === 0 ? 'Перша' : 'Друга'} частина · 45 хв</h2>
          {i === 1 && <p>Між частинами — 10 хв перерви без екрана.</p>}
          <ol className="robotics-timeline">
            {rows.map(([time, title, text]) => (
              <li key={time}>
                <strong>
                  {time} хв · {title}
                </strong>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>
      ))}
      <section className="robotics-panel">
        <h2>Ключі та пояснення</h2>
        {lesson.slides.map((s) => (
          <p key={s.question}>
            <strong>{s.question}</strong> {s.answer}
          </p>
        ))}
        <h3>Спостережуваний результат практики</h3>
        <ul>
          {lesson.practice.map((s) => (
            <li key={s.title}>{s.check}</li>
          ))}
        </ul>
        {lesson.number >= 25 && lesson.number <= 30 && (
          <p>
            Ключ для трьох каналів (ліво, центр, право; 1 = темне): 000 → стоп;
            001 → праворуч; 010 → вперед; 011 → вперед; 100 → ліворуч; 101 →
            ліворуч; 110 → вперед; 111 → вперед. Із заняття 27 нульовий дозвіл
            означає стоп за будь-якої комбінації до нового запуску.
          </p>
        )}
        {lesson.number >= 6 && lesson.number <= 30 && (
          <Programs
            number={lesson.number}
            variant={lesson.number === 22 ? 'demo' : 'solution'}
          />
        )}
        {lesson.number >= 12 && (
          <details>
            <summary>Як побудовані власні команди</summary>
            <p>
              Власний блок відкривається подвійним кліком у Mcar. Команди руху
              спочатку викликають «Стоп», потім вмикають потрібні канали.
              Очікування й повторення залишаються в основній програмі. Нижче —
              визначення, введені на відповідному етапі.
            </p>
            <div className="robotics-program-gallery">
              {courseImages
                .filter((i) =>
                  i.filename.startsWith(
                    `lesson-${Math.min(15, lesson.number)}-definition`,
                  ),
                )
                .map((image) => (
                  <McarFigure
                    key={image.filename}
                    {...image}
                    src={'assets/robotics/' + image.filename}
                    alt={image.caption}
                    program
                  />
                ))}
            </div>
          </details>
        )}
      </section>
      <section className="robotics-panel">
        <h2>Як допомогти при труднощах</h2>
        <dl>
          {lesson.troubleshooting.map(([problem, action]) => (
            <div key={problem}>
              <dt>
                <strong>{problem}</strong>
              </dt>
              <dd>{action}</dd>
            </div>
          ))}
        </dl>
        <h3>Перевірка кожної дитини</h3>
        <ol>
          {lesson.exit.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ol>
        <p>
          Словесний зворотний зв’язок: назвіть дію, яку дитина вже виконує, і
          одну наступну перевірку. Збережіть нотатку для наступного заняття.
        </p>
        {lesson.number >= 22 && (
          <p>
            Параметри датчика:{' '}
            <a
              href="https://www.pololu.com/product/4245"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pololu QTR-MD-05A
            </a>
            . Наше живлення 3,3 В обмежує виходи датчика діапазоном входів
            ESP32.
          </p>
        )}
      </section>
    </div>
  );
}
export function CourseLesson({
  experiment,
  lesson,
  view,
}: {
  lesson: RoboticsLessonContent;
  experiment?: CircuitPreset;
  view: RoboticsView;
}) {
  const meta = roboticsLessons.find((l) => l.number === lesson.number)!;
  const isolated = view === 'student';
  if (isolated)
    return (
      <div className="robotics-student-only">
        <h1>
          {lesson.number}. {meta.title}
        </h1>
        <Practice lesson={lesson} />
      </div>
    );
  return (
    <LessonScreen
      number={lesson.number}
      view={view}
      prerequisites={lesson.prerequisites}
    >
      <div hidden={view !== 'classroom'}>
        <Classroom
          experiment={experiment}
          lesson={lesson}
          active={view === 'classroom'}
        />
      </div>
      <div hidden={view !== 'practice'}>
        <Practice lesson={lesson} active={view === 'practice'} />
      </div>
      {view === 'teacher' && <Teacher lesson={lesson} />}
      <footer className="robotics-lesson-footer">
        <a href={roboticsHref(meta.id, 'teacher')}>Матеріали для вчителя</a>
        <a
          href={roboticsHref(meta.id, 'student')}
          target="_blank"
          rel="noopener noreferrer"
        >
          Учнівська сторінка · нова вкладка
        </a>
      </footer>
      <nav className="robotics-lesson-footer" aria-label="Послідовність занять">
        {lesson.number > 1 && (
          <a href={roboticsHref(idFor(lesson.number - 1))}>
            ← Заняття {lesson.number - 1}
          </a>
        )}
        <a href={roboticsHref()}>Усі заняття</a>
        {lesson.number < 32 && (
          <a href={roboticsHref(idFor(lesson.number + 1))}>
            Заняття {lesson.number + 1} →
          </a>
        )}
      </nav>
    </LessonScreen>
  );
}
