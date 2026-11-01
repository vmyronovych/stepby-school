import { hrefTool } from '../../../navigation/routes';
import type { Task, ToolDefinition } from '../../../types';
import { Card, Icon } from '../../../components/ui';

function FreeToolCard({ id, tool }: { id: string; tool: ToolDefinition }) {
  return (
    <Card href={hrefTool(id)}>
      <Icon background={tool.bg}>{tool.icon}</Icon>
      <h3>{tool.name}</h3>
      <p className="d">
        {tool.freeHint || 'Введи власні числа і розв’яжи крок за кроком'}
      </p>
    </Card>
  );
}

export function FreeTools({
  tasks,
  tools,
}: {
  tasks: Task[];
  tools: Record<string, ToolDefinition>;
}) {
  const toolIds = [...new Set(tasks.map((task) => task.tool))];
  return (
    <>
      <div className="section-title">🛠️ Спробувати інструменти вільно</div>
      <div className="grid c2">
        {toolIds.map((id) => (
          <FreeToolCard key={id} id={id} tool={tools[id]} />
        ))}
      </div>
    </>
  );
}
