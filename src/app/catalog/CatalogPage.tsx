import type { AppState, Catalog } from '../../types';
import { CourseSelection } from './screens/CourseSelection';
import { CourseTopics } from './screens/CourseTopics';
import { TopicDetails } from './screens/TopicDetails';
export function CatalogPage({
  catalog,
  state,
}: {
  catalog: Catalog;
  state: AppState;
}) {
  const subject = catalog.subjects.find((item) => item.id === state.subject);
  if (!subject) return <CourseSelection catalog={catalog} />;
  const topic = catalog.topics.find(
    (item) =>
      item.id === state.topic &&
      item.subject === subject.id &&
      item.cls === state.cls,
  );
  if (!topic)
    return (
      <CourseTopics
        subject={subject}
        catalog={catalog}
        section={state.sub === 'tools' ? 'tools' : 'lessons'}
      />
    );
  return <TopicDetails subject={subject} topic={topic} tools={catalog.tools} />;
}
