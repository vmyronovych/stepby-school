// One bundle gives a test its own catalog, state mirror, and assembled domain.
import { catalog } from '../../src/data/catalog';
import { registerTools } from '../../src/engines/core/registry';
import {
  algebraCoreTools,
  assembleAlgebraLessons,
} from '../../src/app/math-runtime';
registerTools(algebraCoreTools);
assembleAlgebraLessons(catalog);
export * from '../../src/engines/core/formula';
export { toolDef } from '../../src/engines/core/registry';
export * from '../../src/app/math-runtime';
export { catalog };
