import { projectDocuments } from '../../web-development/project-content';
import { reviewDocuments } from '../../web-development/review-content';
import { imagesDocuments } from '../../web-development/images-content';
import { listsDocuments } from '../../web-development/lists-content';
import { catalog } from '../../../data/catalog';
import type { EngineDocument } from '../../../runtime/types';
import type { Catalog } from '../../../types';
import { composeInfoDocuments } from './info-sections';
import { roboticsModule1 } from './robo-mod1';
import { roboticsModule2 } from './robo-mod2';
import { roboticsSections } from './robo-sections';
import { webDevelopmentDocuments } from '../../web-development/content';
import { webFormattingDocuments } from '../../web-development/formatting-content';
import { cssIntroDocuments } from '../../web-development/css-intro-content';

/** Called once by runtime composition. Importing data never changes registries. */
export function composeDocuments(
  data: Catalog = catalog,
): Record<string, EngineDocument> {
  const documents: Record<string, EngineDocument> = {};
  for (const group of [
    roboticsSections,
    roboticsModule1,
    roboticsModule2,
    composeInfoDocuments(data),
    webDevelopmentDocuments,
    webFormattingDocuments,
    cssIntroDocuments,
    listsDocuments,
    imagesDocuments,
    reviewDocuments,
    projectDocuments,
  ]) {
    for (const [id, definition] of Object.entries(group)) {
      if (documents[id]) throw new Error(`Документ «${id}» уже зареєстровано`);
      documents[id] = definition;
    }
  }
  return documents;
}

export { INFO, lessonDates } from '../data/info';
export { buildNitWorkbook, nitNums } from '../services/nit';
export { crc32, xlsxOneColumn } from '../services/workbook';
