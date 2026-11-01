import { useRef } from 'react';
import type { AppState, ToolDefinition } from '../../types';
import { Breadcrumbs, PageHeading } from '../../components/ui';
import { ToolConfiguration } from './components/ToolConfiguration';
import { ToolStage } from './components/ToolStage';
import { ToolInputs, type ToolInputServices } from './inputs/ToolInputs';
import { useToolAnimation } from './hooks/useToolAnimation';

interface ToolPageProps {
  state: AppState;
  definition: ToolDefinition;
  backHref: string;
  inputServices: ToolInputServices;
  onApply: () => void;
  onMarkDone: () => void;
  onStepChange: (index: number) => void;
}

export function ToolPage({
  state,
  definition,
  backHref,
  inputServices,
  onApply,
  onMarkDone,
  onStepChange,
}: ToolPageProps) {
  const root = useRef<HTMLDivElement>(null);
  const context =
    state.steps.length > 0
      ? { step: state.steps[state.step], index: state.step, anim: state.anim }
      : null;
  useToolAnimation(definition, state.model, context, root);
  return (
    <>
      <Breadcrumbs parts={[{ text: '← Назад', href: backHref }]} />
      <PageHeading
        title={`${definition.icon} ${definition.name}`}
        description="Покроковий інтерактивний розбір. Натискай «Далі», щоб побачити кожен крок."
      />
      <div className="tool-shell" ref={root}>
        <ToolConfiguration
          inputHint={definition.inputHint}
          canMarkDone={!!state.toolTaskId}
          onApply={onApply}
          onMarkDone={onMarkDone}
        >
          <ToolInputs
            toolId={definition.id}
            config={state.toolCfg || {}}
            services={inputServices}
          />
        </ToolConfiguration>
        <ToolStage
          context={context}
          count={state.steps.length}
          notebookHtml={
            context && !context.step.error
              ? definition.view(state.model, context)
              : undefined
          }
          onStepChange={onStepChange}
        />
      </div>
    </>
  );
}
