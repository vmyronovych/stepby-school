import type { Topic } from '../../types';
import { LinkButton } from '../../components/ui';
import { hrefSubj, hrefTopic } from '../../navigation/routes';
import type { MediaContent } from './content';
import { TopicPractice } from './TopicPractice';
import { RobuxPractice } from './RobuxPractice';
import { TopicTeacherPlan } from './TopicTeacherPlan';
import { TeacherPlan } from './TeacherPlan';
import { ClassroomPresentation } from './ClassroomPresentation';
import { classroomScenes } from './classroom';
import {
  mediaLessonHref,
  mediaLessonRoute,
  studentLessonUrl,
} from './lesson-routes';

export function MediaTopicPage({
  content,
  topic,
  sub,
  pageUrl = '',
}: {
  content: MediaContent;
  topic: Topic;
  sub: string | null;
  pageUrl?: string;
}) {
  const route = mediaLessonRoute(sub);
  const robux = !!content.robux && route.robux;
  const title = robux
    ? 'Безкоштовні Robux: подарунок чи пастка?'
    : content.title;
  const isolated = route.view === 'student';
  const practiceUrl = pageUrl ? studentLessonUrl(pageUrl, topic, robux) : '';
  const practice = robux ? (
    <RobuxPractice />
  ) : (
    <TopicPractice content={content} />
  );
  if (isolated)
    return (
      <section
        className="media-course media-student-only"
        aria-label="Практика учня"
      >
        <header>
          <span className="media-eyebrow">StepBy School · Практика учня</span>
          <h1>{title}</h1>
          <p>
            Читай історії, обирай відповіді й перевіряй пояснення. Тут можна
            помилятися та пробувати ще.
          </p>
        </header>
        {practice}
      </section>
    );
  return (
    <section className="media-course" aria-label={title}>
      <div className="media-lesson-heading">
        <h1>{title}</h1>
        <LinkButton variant="ghost" href={hrefSubj(topic.cls, topic.subject)}>
          ← Теми курсу
        </LinkButton>
      </div>
      <nav className="media-mode-nav" aria-label="Режим уроку">
        <LinkButton
          variant={route.view === 'classroom' ? 'primary' : 'gray'}
          aria-current={route.view === 'classroom' ? 'page' : undefined}
          href={mediaLessonHref(topic, robux, 'classroom')}
        >
          Разом у класі
        </LinkButton>
        <LinkButton
          variant={route.view === 'practice' ? 'primary' : 'gray'}
          aria-current={route.view === 'practice' ? 'page' : undefined}
          href={mediaLessonHref(topic, robux, 'practice')}
        >
          Практика учня
        </LinkButton>
      </nav>
      <div hidden={route.view !== 'classroom'}>
        <ClassroomPresentation
          key={`${content.id}-${robux}`}
          title={title}
          scenes={classroomScenes(content.id, robux)}
          practiceUrl={practiceUrl}
        />
      </div>
      <div hidden={route.view !== 'practice'}>{practice}</div>
      {route.view === 'teacher' && (
        <div className="media-teacher-view">
          {robux ? <TeacherPlan /> : <TopicTeacherPlan content={content} />}
        </div>
      )}
      <footer className="media-lesson-services">
        <a
          href={mediaLessonHref(topic, robux, 'teacher')}
          aria-current={route.view === 'teacher' ? 'page' : undefined}
        >
          Матеріали для вчителя
        </a>
        {content.robux && !robux && (
          <a href={hrefTopic(topic, 'robux')}>Відкрити урок про Robux →</a>
        )}
      </footer>
    </section>
  );
}
