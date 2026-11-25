import { transistorMotorPreset } from '../lessons/lesson-07/experiment';
import type { Topic } from '../../../types';
import { Card, LinkButton, PageHeading } from '../../../components/ui';
import { roboticsLessons, roboticsStages } from '../course';
import { mcarUrl, roboticsHref, roboticsView } from '../shared/routes';
import { RoboticsBreadcrumbs, RoboticsNav } from './RoboticsNav';
import { CourseLesson } from '../shared/ui/CourseLesson';
import { lessonContents } from '../lessons';
import { MotorLesson } from '../lessons/lesson-08/MotorLesson';

export function RoboticsPage({
  topic,
  sub,
}: {
  topic: Topic;
  sub: string | null;
}) {
  const lesson = roboticsLessons.find((item) => item.id === topic.id);
  const isolated = lesson?.ready && sub === 'student';
  const section = topic.id === 'tools' ? 'tools' : 'lessons';
  return (
    <section className="robotics-course">
      {!isolated && !lesson && (
        <>
          <RoboticsBreadcrumbs section={section} />
          <RoboticsNav section={section} />
        </>
      )}
      {lesson?.ready ? (
        lesson.number === 8 ? (
          <MotorLesson view={roboticsView(sub)} />
        ) : (
          <CourseLesson
            key={lesson.number}
            experiment={lesson.number === 7 ? transistorMotorPreset : undefined}
            lesson={lessonContents.find(
              (item) => item.number === lesson.number,
            )!}
            view={roboticsView(sub)}
          />
        )
      ) : lesson ? (
        <>
          <PageHeading
            title={`${lesson.number}. ${lesson.title}`}
            description={lesson.description}
          />
          <div className="robotics-panel">
            <span className="robotics-status">Готується</span>
            <p>
              Матеріали цього заняття ще готуються. Поверніться до списку, щоб
              обрати доступне заняття.
            </p>
            {[1, 2, 3].includes(lesson.number) && (
              <p>
                Уже доступний{' '}
                <a
                  href={
                    roboticsHref('r5') +
                    `/mod1-${lesson.number === 3 ? 5 : lesson.number}`
                  }
                >
                  наявний матеріал цієї теми
                </a>
                .
              </p>
            )}
            <LinkButton href={roboticsHref()}>До занять</LinkButton>
          </div>
        </>
      ) : section === 'tools' ? (
        <>
          <PageHeading
            title="Інструменти робототехніки"
            description="Відкривайте майстерні для власних дослідів або переходьте до них із заняття."
          />
          <div className="grid c3 robotics-tool-grid">
            <Card href={roboticsHref('r9')}>
              <span className="robotics-tool-icon" aria-hidden="true">
                ⚡
              </span>
              <h2>Електричне коло</h2>
              <p>
                Збирайте кола, досліджуйте світлодіод, резистор і кнопку на
                схемі та макетці.
              </p>
              <span className="robotics-status ready">Конструктор</span>
            </Card>
            <a
              className="card click"
              href={mcarUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="robotics-tool-icon" aria-hidden="true">
                🚗
              </span>
              <h2>Мандрівник</h2>
              <p>
                Підключення, програмування блоками та завантаження програми на
                ESP32.
              </p>
              <span className="robotics-status">
                Зовнішній сайт · нова вкладка
              </span>
            </a>
            <Card href={roboticsHref('r8')}>
              <span className="robotics-tool-icon" aria-hidden="true">
                📡
              </span>
              <h2>Азбука Морзе</h2>
              <p>Короткі й довгі сигнали, таблиця літер та картка для друку.</p>
              <span className="robotics-status">Довідник</span>
            </Card>
          </div>
        </>
      ) : (
        <>
          <PageHeading
            title="Заняття з робототехніки"
            description="Від першого електричного кола до власного Мандрівника. Збираємо, програмуємо й досліджуємо в парах."
          />
          {roboticsStages.map((stage, index) => (
            <section
              className="robotics-stage"
              key={stage}
              aria-labelledby={`stage-${index}`}
            >
              <h2 id={`stage-${index}`}>{stage}</h2>
              <div className="grid c3">
                {roboticsLessons
                  .filter((item) => item.stage === index)
                  .map((item) => (
                    <Card key={item.id} href={roboticsHref(item.id)}>
                      <h3>
                        {item.number}. {item.title}
                      </h3>
                      <p>{item.description}</p>
                    </Card>
                  ))}
              </div>
            </section>
          ))}
        </>
      )}
    </section>
  );
}
