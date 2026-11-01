import { catalog } from '../../data/catalog';
import { engineState } from '../../runtime/state';
import type { Step, ToolConfig, ToolDefinition, ToolModel } from '../../types';

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
  color: string;
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

/** Composition is explicit and runs once, after all definitions are imported. */
export function registerTools(definitions: readonly ToolDefinition[]): void {
  const ids = new Set(Object.keys(catalog.tools));
  for (const definition of definitions) {
    if (ids.has(definition.id)) {
      throw new Error(`Інструмент «${definition.id}» уже зареєстровано`);
    }
    ids.add(definition.id);
    for (const key of [
      'name',
      'icon',
      'color',
      'bg',
      'build',
      'view',
      'read',
    ] as const) {
      if (definition[key] == null) {
        throw new Error(`Інструмент «${definition.id}»: не заповнено ${key}`);
      }
    }
  }
  for (const definition of definitions)
    catalog.tools[definition.id] = definition;
}

export function toolDef(id?: string): ToolDefinition | null {
  const key = id || engineState.tool;
  return key ? catalog.tools[key] || null : null;
}
export function topicForTool(id: string) {
  const topics = catalog.topics.filter((topic) =>
    (topic.tasks || []).some((task) => task.tool === id),
  );
  return (
    topics.find((topic) => topic.cls === engineState.cls) || topics[0] || null
  );
}
