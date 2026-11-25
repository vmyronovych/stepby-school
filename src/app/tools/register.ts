import type { Catalog, ToolDefinition } from '../../types';

/** Composition is explicit and runs once, after all definitions are imported. */
export function registerTools(
  catalog: Pick<Catalog, 'tools'>,
  definitions: readonly ToolDefinition[],
): void {
  const ids = new Set(Object.keys(catalog.tools));
  for (const definition of definitions) {
    if (ids.has(definition.id)) {
      throw new Error(`Інструмент «${definition.id}» уже зареєстровано`);
    }
    ids.add(definition.id);
    for (const key of [
      'name',
      'icon',
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
