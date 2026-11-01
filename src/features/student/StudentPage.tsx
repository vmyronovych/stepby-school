import type { AppState, Catalog } from '../../types';
import { ClassSelection } from './screens/ClassSelection';
import { SubjectSelection } from './screens/SubjectSelection';
import { TopicSelection } from './screens/TopicSelection';
import { TopicDetails } from './screens/TopicDetails';

interface StudentPageProps {
  catalog: Catalog;
  state: AppState;
  onOpenMaterial: () => void;
}

export function StudentPage({
  catalog,
  state,
  onOpenMaterial,
}: StudentPageProps) {
  const schoolClass = catalog.classes.find((item) => item.id === state.cls);
  if (!schoolClass) {
    return <ClassSelection classes={catalog.classes} topics={catalog.topics} />;
  }

  const subjects = catalog.subjects.filter((item) =>
    item.cls.includes(schoolClass.id),
  );
  const subject = subjects.find((item) => item.id === state.subject);
  if (!subject) {
    return <SubjectSelection schoolClass={schoolClass} subjects={subjects} />;
  }

  const topics = catalog.topics.filter(
    (item) => item.cls === schoolClass.id && item.subject === subject.id,
  );
  const topic = topics.find((item) => item.id === state.topic);
  if (!topic) {
    return (
      <TopicSelection
        schoolClass={schoolClass}
        subject={subject}
        topics={topics}
        tools={catalog.tools}
      />
    );
  }

  return (
    <TopicDetails
      schoolClass={schoolClass}
      subject={subject}
      topic={topic}
      tools={catalog.tools}
      onOpenMaterial={onOpenMaterial}
    />
  );
}
