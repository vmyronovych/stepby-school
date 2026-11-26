import { CourseNavigation } from '../../../components/course-navigation';
import type { Catalog, Subject } from '../../../types';
import { Breadcrumbs } from '../../../components/breadcrumbs';
import { PageHeading } from '../../../components/page-heading';
import { TopicGrid } from '../components/TopicGrid';
import { hrefHome, hrefCourse } from '../../navigation/routes';
export function CourseTopics({
  subject,
  catalog,
  section = 'lessons',
}: {
  subject: Subject;
  catalog: Catalog;
  section?: 'lessons' | 'tools';
}) {
  const courseTopics = catalog.topics.filter(
    (topic) => topic.subject === subject.id,
  );
  const hasTools = courseTopics.some((topic) => topic.kind === 'tool');
  const showTools = hasTools && section === 'tools';
  const topics = courseTopics.filter((topic) =>
    showTools ? topic.kind === 'tool' : topic.kind !== 'tool',
  );
  const groups = [
    ...new Set(topics.flatMap((topic) => topic.grades ?? [])),
  ].sort((a, b) => a - b);
  const ungraded = topics.filter((topic) => !(topic.grades ?? []).length);
  return (
    <>
      <Breadcrumbs
        parts={[
          { text: 'Головна', href: hrefHome() },
          {
            text: subject.name,
            href: showTools ? hrefCourse(subject.id) : undefined,
          },
          ...(hasTools
            ? [{ text: showTools ? 'Інструменти' : 'Заняття' }]
            : []),
        ]}
      />
      {hasTools && (
        <CourseNavigation
          label={`Розділи курсу «${subject.name}»`}
          section={showTools ? 'tools' : 'lessons'}
          lessonsHref={hrefCourse(subject.id)}
          toolsHref={hrefCourse(subject.id, 'tools')}
        />
      )}
      <PageHeading
        title={subject.name}
        description={
          showTools
            ? 'Оберіть інструмент для демонстрації та практики.'
            : 'Оберіть заняття. Матеріали впорядковано за навчальною послідовністю.'
        }
      />
      {showTools ? (
        <TopicGrid topics={topics} tools={catalog.tools} />
      ) : (
        <div className="course-groups">
          {groups.map((grade) => (
            <section key={grade} aria-labelledby={`grade-${grade}`}>
              <h2 id={`grade-${grade}`}>{grade} клас</h2>
              <TopicGrid
                topics={topics.filter((topic) =>
                  (topic.grades ?? []).includes(grade),
                )}
                tools={catalog.tools}
              />
            </section>
          ))}
          {ungraded.length > 0 && (
            <TopicGrid topics={ungraded} tools={catalog.tools} />
          )}
        </div>
      )}
    </>
  );
}
