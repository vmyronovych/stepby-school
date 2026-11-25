import type { Catalog, Subject, Topic } from '../../../types';
import { Breadcrumbs } from '../../../components/breadcrumbs';
import { PageHeading } from '../../../components/page-heading';
import { TopicGrid } from '../components/TopicGrid';
import { hrefHome } from '../../../navigation/routes';
function grades(topic: Topic, catalog: Catalog): number[] {
  if (topic.grades) return topic.grades;
  const name =
    catalog.classes.find((item) => item.id === topic.cls)?.name ?? '';
  return /^\d+$/.test(name) ? [Number(name)] : [];
}
export function CourseTopics({
  subject,
  catalog,
}: {
  subject: Subject;
  catalog: Catalog;
}) {
  const topics = catalog.topics.filter((topic) => topic.subject === subject.id);
  const groups = [
    ...new Set(topics.flatMap((topic) => grades(topic, catalog))),
  ].sort((a, b) => a - b);
  const ungraded = topics.filter((topic) => !grades(topic, catalog).length);
  return (
    <>
      <Breadcrumbs
        parts={[{ text: 'Головна', href: hrefHome() }, { text: subject.name }]}
      />
      <PageHeading
        title={subject.name}
        description="Оберіть заняття. Матеріали впорядковано за навчальною послідовністю."
      />
      <div className="course-groups">
        {groups.map((grade) => (
          <section key={grade} aria-labelledby={`grade-${grade}`}>
            <h2 id={`grade-${grade}`}>{grade} клас</h2>
            <TopicGrid
              topics={topics.filter((topic) =>
                grades(topic, catalog).includes(grade),
              )}
              tools={catalog.tools}
            />
          </section>
        ))}
        {ungraded.length > 0 && (
          <TopicGrid topics={ungraded} tools={catalog.tools} />
        )}
      </div>
    </>
  );
}
