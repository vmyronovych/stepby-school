import { useLayoutEffect, type RefObject } from 'react';
import type { StepContext, ToolDefinition } from '../../../types';

export function useToolAnimation(
  definition: ToolDefinition,
  model: unknown,
  context: StepContext | null,
  root: RefObject<HTMLElement | null>,
) {
  // Keep the legacy prepare -> commit -> two frames -> animate contract.
  // Cancel pending animation when navigation or another step unmounts this page.
  useLayoutEffect(() => {
    if (!context || !model || !definition.animate) return;
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() =>
        definition.animate?.(model, {
          ...context,
          root: root.current ?? undefined,
        }),
      );
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, [definition, model, context, root]);
}
