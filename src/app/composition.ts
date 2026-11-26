import { catalog } from './catalog/catalog';
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
  assembleAlgebraLessons(catalog);
  Object.assign(documents, sections);
  initialized = true;
}
