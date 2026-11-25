import { geometryDocuments } from '../../courses/geometry/runtime';
import { webDocuments } from '../../courses/web-development/documents';
import { mediaDocuments } from '../../courses/media-literacy';
import type { EngineDocument } from '../../runtime/types';
import type { Catalog } from '../../types';
import { composeInfoDocuments } from '../../courses/informatics/documents';
import { roboticsModule1 } from '../../courses/robotics/shared/documents';
import { roboticsModule2 } from '../../courses/robotics/shared/documents';
import { roboticsSections } from '../../courses/robotics/shared/documents';

/** Called once by runtime composition. Importing data never changes registries. */
export function composeDocuments(
  data: Catalog,
): Record<string, EngineDocument> {
  const documents: Record<string, EngineDocument> = {};
  for (const group of [
    geometryDocuments,
    mediaDocuments,
    webDocuments,
    roboticsSections,
    roboticsModule1,
    roboticsModule2,
    composeInfoDocuments(data),
  ]) {
    for (const [id, definition] of Object.entries(group)) {
      if (documents[id]) throw new Error(`Документ «${id}» уже зареєстровано`);
      documents[id] = definition;
    }
  }
  return documents;
}

export const documents: Record<string, EngineDocument> = {};
