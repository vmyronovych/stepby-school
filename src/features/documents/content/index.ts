import { dropdownMenuDocuments } from '../../web-development/dropdown-menu-content';
import { formsChoiceDocuments } from '../../web-development/forms-choice-content';
import { review3Documents } from '../../web-development/web-review-3-content';
import { project3Documents } from '../../web-development/project3-content';
import { blockElementsDocuments } from '../../web-development/block-elements-content';
import { externalCssDocuments } from '../../web-development/external-css-content';
import { flexBasicsDocuments } from '../../web-development/flex-basics-content';
import { flexWrapDocuments } from '../../web-development/flex-wrap-content';
import { formsDocuments } from '../../web-development/forms-content';
import { project2Documents } from '../../web-development/project2-content';
import { linksDocuments } from '../../web-development/links-content';
import { imageLinksDocuments } from '../../web-development/image-links-content';
import { tablesDocuments } from '../../web-development/tables-content';
import { tableSpansDocuments } from '../../web-development/table-spans-content';
import { review2Documents } from '../../web-development/review2-content';
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
    linksDocuments,
    imageLinksDocuments,
    tablesDocuments,
    tableSpansDocuments,
    review2Documents,
    project2Documents,
    blockElementsDocuments,
    externalCssDocuments,
    flexBasicsDocuments,
    flexWrapDocuments,
    formsDocuments,
    formsChoiceDocuments,
    review3Documents,
    project3Documents,
    dropdownMenuDocuments,
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
