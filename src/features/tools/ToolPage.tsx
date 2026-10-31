import { Breadcrumbs, PageHeading } from '../../components/ui';
import { ToolConfiguration } from './components/ToolConfiguration';
import { ToolStage } from './components/ToolStage';
import { useToolAnimation } from './hooks/useToolAnimation';

export function ToolPage() {
  const definition = toolDef();
  const context = S.steps.length > 0 ? stepCtx() : null;
  const model = S.model;

  useToolAnimation(definition, model, context);

  return (
    <>
      <Breadcrumbs parts={[{ text: '← Назад', href: toolBackHref() }]} />
      <PageHeading
        title={`${definition.icon} ${definition.name}`}
        description="Покроковий інтерактивний розбір. Натискай «Далі», щоб побачити кожен крок."
      />
      <div className="tool-shell">
        <ToolConfiguration
          inputsHtml={definition.inputs(S.toolCfg || {})}
          inputHint={definition.inputHint}
          canMarkDone={!!S.toolTaskId}
          onApply={applyTool}
          onMarkDone={markDone}
        />
        <ToolStage
          context={context}
          count={S.steps.length}
          notebookHtml={
            context && !context.step.error
              ? definition.view(model, context)
              : undefined
          }
          onStepChange={stepTo}
        />
      </div>
    </>
  );
}
