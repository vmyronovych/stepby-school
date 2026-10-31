import type { Topic, ToolDefinition } from '../../../types';
import { TopicCard } from './TopicCard';

export function TopicGrid({
  topics,
  tools,
}: {
  topics: Topic[];
  tools: Record<string, ToolDefinition>;
}) {
  return (
    <div className="grid c2">
      {topics.length ? (
        topics.map((t) => <TopicCard key={t.id} topic={t} tools={tools} />)
      ) : (
        <div className="empty">Тем поки немає</div>
      )}
    </div>
  );
}
