import type { EngineDocument } from '../../../runtime/types';
import { animationDocuments } from '../lessons/css-animation/content';
import { blockElementsDocuments } from '../lessons/block-elements/content';
import { webDevelopmentDocuments } from '../lessons/web-page/content';
import { cssIntroDocuments } from '../lessons/css-intro/content';
import { dropdownMenuDocuments } from '../lessons/dropdown-menu/content';
import { externalCssDocuments } from '../lessons/external-css/content';
import { flexBasicsDocuments } from '../lessons/flex-basics/content';
import { flexWrapDocuments } from '../lessons/flex-wrap/content';
import { webFormattingDocuments } from '../lessons/text-formatting/content';
import { formsChoiceDocuments } from '../lessons/forms-choice/content';
import { formsDocuments } from '../lessons/forms-basics/content';
import { imageLinksDocuments } from '../lessons/image-links/content';
import { imagesDocuments } from '../lessons/page-images/content';
import { linksDocuments } from '../lessons/hyperlinks/content';
import { listsDocuments } from '../lessons/lists-lines/content';
import { projectDocuments } from '../lessons/mini-project-1/content';
import { project2Documents } from '../lessons/mini-project-2/content';
import { project3Documents } from '../lessons/mini-project-3/content';
import { project4Documents } from '../lessons/mini-project-4/content';
import { responsiveScrollDocuments } from '../lessons/responsive-scroll/content';
import { reviewDocuments } from '../lessons/web-review/content';
import { review2Documents } from '../lessons/web-review-2/content';
import { semanticMediaDocuments } from '../lessons/semantic-media/content';
import { tableSpansDocuments } from '../lessons/table-spans/content';
import { tablesDocuments } from '../lessons/tables-basics/content';
import { review3Documents } from '../lessons/web-review-3/content';
import { review4Documents } from '../lessons/web-review-4/content';
export const webDocuments: Record<string, EngineDocument> = {};
for (const group of [
  animationDocuments,
  blockElementsDocuments,
  webDevelopmentDocuments,
  cssIntroDocuments,
  dropdownMenuDocuments,
  externalCssDocuments,
  flexBasicsDocuments,
  flexWrapDocuments,
  webFormattingDocuments,
  formsChoiceDocuments,
  formsDocuments,
  imageLinksDocuments,
  imagesDocuments,
  linksDocuments,
  listsDocuments,
  projectDocuments,
  project2Documents,
  project3Documents,
  project4Documents,
  responsiveScrollDocuments,
  reviewDocuments,
  review2Documents,
  semanticMediaDocuments,
  tableSpansDocuments,
  tablesDocuments,
  review3Documents,
  review4Documents,
]) {
  for (const [id, document] of Object.entries(group)) {
    if (webDocuments[id])
      throw new Error(`Duplicate web lesson document: ${id}`);
    webDocuments[id] = document;
  }
}
