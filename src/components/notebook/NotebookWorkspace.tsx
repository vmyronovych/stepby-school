import { useRef, type ReactNode } from 'react';
import type { Step, ToolDefinition } from '../../types';
import { Breadcrumbs } from '../breadcrumbs';
import { PageHeading } from '../page-heading';
import { ToolConfiguration } from './workspace/ToolConfiguration';
import { ToolStage } from './workspace/ToolStage';
import { useToolAnimation } from './animation/useToolAnimation';

interface NotebookWorkspaceProps {
  state: {
    steps: Step[];
    step: number;
    model: unknown;
    anim: unknown;
    toolTaskId: string | null;
  };
  definition: ToolDefinition;
  backHref: string;
  children: ReactNode;
  onApply: () => void;
  onMarkDone: () => void;
  onStepChange: (index: number) => void;
}

export function NotebookWorkspace({
  state,
  definition,
  backHref,
  children,
  onApply,
  onMarkDone,
  onStepChange,
}: NotebookWorkspaceProps) {
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
          {children}
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
