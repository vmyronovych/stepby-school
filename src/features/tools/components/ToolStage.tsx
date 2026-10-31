import { Notebook } from '../../../components/Notebook';
import { LegacyHtml } from '../../../components/ui';
import type { StepContext } from '../../../types';
import { StepHeader } from './StepHeader';
import { StepNavigation } from './StepNavigation';

interface ToolStageProps {
  context: StepContext | null;
  count: number;
  notebookHtml?: string;
  onStepChange: (index: number) => void;
}

export function ToolStage({
  context,
  count,
  notebookHtml,
  onStepChange,
}: ToolStageProps) {
  const last = context?.index === count - 1;
  return (
    <div className="panel stage">
      {context ? (
        <>
          <StepHeader
            index={context.index}
            count={count}
            onRestart={() => onStepChange(0)}
          />
          {context.step.error ? (
            <Notebook>
              <div className="empty">{context.step.text}</div>
            </Notebook>
          ) : (
            <Notebook html={notebookHtml} />
          )}
          <LegacyHtml
            className={`explain${last ? ' done' : ''}`}
            html={`<span>${last ? '🎉 ' : ''}${context.step.text}</span>`}
          />
          <StepNavigation
            index={context.index}
            count={count}
            onStepChange={onStepChange}
          />
        </>
      ) : (
        <div className="empty">
          Введи умову ліворуч і натисни «Показати розв’язання», щоб побачити
          покроковий розбір 👈
        </div>
      )}
    </div>
  );
}
