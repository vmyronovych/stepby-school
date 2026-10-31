import type { Topic, ToolDefinition } from '../../../types';
import { Card, Icon } from '../../../components/ui';

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'start',
} as const;
export function TopicCard({
  topic: t,
  tools,
}: {
  topic: Topic;
  tools: Record<string, ToolDefinition>;
}) {
  const tasks = t.tasks ?? [];
  const tool = t.kind === 'tool';
  return (
    <Card href={hrefTopic(t)}>
      <div style={rowStyle}>
        <Icon
          background={
            t.doc
              ? tool
                ? 'var(--amber-l)'
                : 'var(--green-l)'
              : 'var(--primary-l)'
          }
        >
          {t.icon || '📘'}
        </Icon>
        <span className={`pill${tool ? ' tool' : ''}`}>
          {t.doc
            ? tool
              ? 'інструмент'
              : 'матеріал'
            : `${tasks.filter((k) => k.done).length}/${tasks.length} виконано`}
        </span>
      </div>
      <h3>{t.title}</h3>
      <p className="d">{t.desc}</p>
      <div className="tag-row">
        {t.doc
          ? t.chips?.map((chip) => (
              <span className="chip" key={chip}>
                {chip}
              </span>
            ))
          : [...new Set(tasks.map((k) => k.tool))].map((id) => (
              <span className="chip" key={id}>
                {tools[id].icon} {tools[id].name}
              </span>
            ))}
      </div>
    </Card>
  );
}
