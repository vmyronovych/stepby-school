import type { Task, ToolDefinition } from '../../../types';
import { Card, Icon, LinkButton } from '../../../components/ui';

export function TaskCard({
  task,
  tool,
  href,
}: {
  task: Task;
  tool: ToolDefinition;
  href: string;
}) {
  return (
    <Card>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start',
          marginBottom: 8,
        }}
      >
        <Icon background={tool.bg} style={{ margin: 0 }}>
          {tool.icon}
        </Icon>
        <span className={`badge ${task.done ? 'ok' : 'new'}`}>
          {task.done ? '✓ виконано' : 'нове'}
        </span>
      </div>
      <h3>{task.title}</h3>
      <p className="d">{tool.name}</p>
      <div style={{ marginTop: 14 }}>
        <LinkButton small href={href}>
          ▶ Розв’язати крок за кроком
        </LinkButton>
      </div>
    </Card>
  );
}
