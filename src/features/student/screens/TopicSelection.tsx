import { clsTitle } from '../../../navigation/labels';
import type {
  SchoolClass,
  Subject,
  Topic,
  ToolDefinition,
} from '../../../types';
import { PageHeading } from '../../../components/ui';
import { StudentBreadcrumbs } from '../components/StudentBreadcrumbs';
import { TopicGrid } from '../components/TopicGrid';

interface TopicSelectionProps {
  schoolClass: SchoolClass;
  subject: Subject;
  topics: Topic[];
  tools: Record<string, ToolDefinition>;
}

export function TopicSelection({
  schoolClass,
  subject,
  topics,
  tools,
}: TopicSelectionProps) {
  const projectorTools = topics.filter((topic) => topic.kind === 'tool');
  const materials = topics.filter((topic) => topic.kind !== 'tool');
  const description = schoolClass.label
    ? 'Оберіть розділ курсу.'
    : projectorTools.length
      ? 'Оберіть тему навчальної програми або інструмент для проєктора.'
      : 'Оберіть тему навчальної програми.';

  return (
    <>
      <StudentBreadcrumbs schoolClass={schoolClass} subject={subject} />
      <PageHeading
        title={
          schoolClass.label
            ? clsTitle(schoolClass)
            : `${subject.name} — ${schoolClass.name} клас`
        }
        description={description}
      />
      {projectorTools.length > 0 && (
        <>
          <div className="section-title">🖥️ Інструменти на проєктор</div>
          <TopicGrid topics={projectorTools} tools={tools} />
          <div className="section-title">📚 Матеріали</div>
        </>
      )}
      <TopicGrid topics={materials} tools={tools} />
    </>
  );
}
