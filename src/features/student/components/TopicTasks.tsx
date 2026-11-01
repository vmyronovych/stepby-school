import { hrefTopic } from '../../../navigation/routes';
import type { Topic, ToolDefinition } from '../../../types';
import { TaskCard } from './TaskCard';

export function TopicTasks({
  topic,
  tools,
}: {
  topic: Topic;
  tools: Record<string, ToolDefinition>;
}) {
  return (
    <>
      <div className="section-title">🧩 Інтерактивні завдання від вчителя</div>
      <div className="grid c2">
        {(topic.tasks ?? []).map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            tool={tools[task.tool]}
            href={hrefTopic(topic, task.id)}
          />
        ))}
      </div>
    </>
  );
}
