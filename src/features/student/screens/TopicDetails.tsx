import type {
  SchoolClass,
  Subject,
  Topic,
  ToolDefinition,
} from '../../../types';
import { LegacyHtml, PageHeading } from '../../../components/ui';
import { StudentBreadcrumbs } from '../components/StudentBreadcrumbs';
import { TopicTasks } from '../components/TopicTasks';
import { TopicMaterials } from '../components/TopicMaterials';
import { FreeTools } from '../components/FreeTools';

interface TopicDetailsProps {
  schoolClass: SchoolClass;
  subject: Subject;
  topic: Topic;
  tools: Record<string, ToolDefinition>;
  onOpenMaterial: () => void;
}

export function TopicDetails({
  schoolClass,
  subject,
  topic,
  tools,
  onOpenMaterial,
}: TopicDetailsProps) {
  return (
    <>
      <StudentBreadcrumbs
        schoolClass={schoolClass}
        subject={subject}
        topic={topic}
      />
      <PageHeading title={topic.title} description={topic.desc} />
      {topic.lesson && (
        <LegacyHtml className="card lesson-intro" html={topic.lesson} />
      )}
      <TopicTasks topic={topic} tools={tools} />
      <TopicMaterials materials={topic.materials} onOpen={onOpenMaterial} />
      <FreeTools tasks={topic.tasks ?? []} tools={tools} />
    </>
  );
}
