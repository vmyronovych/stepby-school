import { configureRuntimeServices } from '../runtime/services';
import { engineState } from '../runtime/state';
import { catalog, topicForTool } from './catalog/catalog';
import { registerTools } from './tools/register';
import { assembleAlgebraLessons } from '../courses/algebra/runtime';
import { tools } from './tools/registry';
import { composeDocuments, documents } from './documents/registry';
let initialized = false;
/** Application startup is explicit; importing a course never registers it. */
export function initializeApplication() {
  if (initialized) return;
  const sections = composeDocuments(catalog);
  registerTools(catalog, tools);
  configureRuntimeServices({
    topicForTool: (id) => topicForTool(id, engineState.cls),
  });
  assembleAlgebraLessons(catalog);
  Object.assign(documents, sections);
  initialized = true;
}
