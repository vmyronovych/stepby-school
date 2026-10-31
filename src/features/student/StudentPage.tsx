import { ClassSelection } from './screens/ClassSelection';
import { SubjectSelection } from './screens/SubjectSelection';
import { TopicSelection } from './screens/TopicSelection';
import { TopicDetails } from './screens/TopicDetails';

// Read the legacy route state at the feature boundary. Screens receive typed data.
export function StudentPage() {
  const schoolClass = DB.classes.find((item) => item.id === S.cls);
  if (!schoolClass) {
    return <ClassSelection classes={DB.classes} topics={DB.topics} />;
  }

  const subjects = DB.subjects.filter((item) =>
    item.cls.includes(schoolClass.id),
  );
  const subject = subjects.find((item) => item.id === S.subject);
  if (!subject) {
    return <SubjectSelection schoolClass={schoolClass} subjects={subjects} />;
  }

  const topics = DB.topics.filter(
    (item) => item.cls === schoolClass.id && item.subject === subject.id,
  );
  const topic = topics.find((item) => item.id === S.topic);
  if (!topic) {
    return (
      <TopicSelection
        schoolClass={schoolClass}
        subject={subject}
        topics={topics}
        tools={DB.tools}
      />
    );
  }

  return (
    <TopicDetails
      schoolClass={schoolClass}
      subject={subject}
      topic={topic}
      tools={DB.tools}
      onOpenMaterial={() => toast('Демо: матеріал відкрито')}
    />
  );
}
