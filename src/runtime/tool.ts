import type { Step, ToolConfig, ToolDefinition, ToolModel } from '../types';

export type FieldReader = (id: string) => string;
export interface EngineStepContext<EngineStep extends Step = Step> {
  step: EngineStep;
  index: number;
  anim: unknown;
  root?: HTMLElement;
}
export interface EngineToolDefinition<Model extends ToolModel> {
  name: string;
  icon: string;
  bg: string;
  errorHint?: string;
  freeHint?: string;
  inputHint?: string;
  build(config: ToolConfig): Model;
  read(readField: FieldReader): ToolConfig;
  view(
    model: NoInfer<Model>,
    context: EngineStepContext<NoInfer<Model>['steps'][number]>,
  ): string;
  prepare?(model: NoInfer<Model>, from: number, to: number): unknown;
  animate?(
    model: NoInfer<Model>,
    context: EngineStepContext<NoInfer<Model>['steps'][number]>,
  ): void;
}

/** Erase heterogeneous models only at the application boundary. Built model identity
 * proves the model type before dispatching to a feature callback. */
export function defineTool<Model extends ToolModel>(
  id: string,
  definition: EngineToolDefinition<Model>,
): ToolDefinition {
  const models = new WeakSet<object>();
  function isModel(value: unknown): value is Model {
    return typeof value === 'object' && value !== null && models.has(value);
  }
  function modelFor(value: unknown): Model {
    if (!isModel(value)) throw new Error(`Інструмент «${id}»: невідома модель`);
    return value;
  }
  function contextFor(model: Model, context: EngineStepContext) {
    const step = model.steps[context.index];
    if (!step || step !== context.step) {
      throw new Error(`Інструмент «${id}»: невідомий крок`);
    }
    return {
      step,
      index: context.index,
      anim: context.anim,
      root: context.root,
    };
  }
  return {
    ...definition,
    id,
    build(config) {
      const model = definition.build(config);
      models.add(model);
      return model;
    },
    view(value, context) {
      const model = modelFor(value);
      return definition.view(model, contextFor(model, context));
    },
    prepare: definition.prepare
      ? (value, from, to) => definition.prepare?.(modelFor(value), from, to)
      : undefined,
    animate: definition.animate
      ? (value, context) => {
          const model = modelFor(value);
          definition.animate?.(model, contextFor(model, context));
        }
      : undefined,
  };
}
