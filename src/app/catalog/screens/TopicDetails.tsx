import type { Subject, Topic, ToolDefinition } from '../../../types';
import { LegacyHtml } from '../../../components/legacy-html';
import { PageHeading } from '../../../components/page-heading';
import { CatalogBreadcrumbs } from '../components/CatalogBreadcrumbs';
import { TopicTasks } from '../components/TopicTasks';
import { FreeTools } from '../components/FreeTools';

interface TopicDetailsProps {
  subject: Subject;
  topic: Topic;
  tools: Record<string, ToolDefinition>;
}

export function TopicDetails({ subject, topic, tools }: TopicDetailsProps) {
  return (
    <>
      <CatalogBreadcrumbs subject={subject} topic={topic} />
      <PageHeading title={topic.title} description={topic.desc} />
      {topic.lesson && (
        <LegacyHtml className="card lesson-intro" html={topic.lesson} />
      )}
      <TopicTasks topic={topic} tools={tools} />
      <FreeTools tasks={topic.tasks ?? []} tools={tools} />
    </>
  );
}
