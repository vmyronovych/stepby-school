// One bundle gives a test its own catalog, state mirror, and assembled domain.
import { catalog } from '../../../data/catalog';
import { registerTools } from '../../../engines/core/registry';
import { algebraCoreTools, assembleAlgebraLessons } from './core-index';
registerTools(algebraCoreTools);
assembleAlgebraLessons(catalog);
export * from '../../../engines/core/formula';
export { toolDef } from '../../../engines/core/registry';
export * from './core-index';
export { catalog };
