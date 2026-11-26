import { hrefTopic, hrefHome } from '../navigation/routes';
import { notify } from '../notifications';
import { geometryDocuments } from '../../courses/geometry/runtime';
import { webDocuments } from '../../courses/web-development/documents';
import { mediaDocuments } from '../../courses/media-literacy';
import type { DocumentSection } from '../../components/document';
import type { Catalog } from '../../types';
import {
  composeInfoDocuments,
  type InfoDocumentServices,
} from '../../courses/informatics/documents';
import { roboticsModule1 } from '../../courses/robotics/shared/documents';
import { roboticsModule2 } from '../../courses/robotics/shared/documents';
import { roboticsSections } from '../../courses/robotics/shared/documents';

/** Called once by runtime composition. Importing data never changes registries. */
export function composeDocuments(
  data: Catalog,
  services?: InfoDocumentServices,
): Record<string, DocumentSection> {
  const documents: Record<string, DocumentSection> = {};
  for (const group of [
    geometryDocuments,
    mediaDocuments,
    webDocuments,
    roboticsSections,
    roboticsModule1,
    roboticsModule2,
    composeInfoDocuments(
      data,
      services ?? {
        hrefTopic,
        hrefHome,
        notify,
        hrefDoc: (id, sub) => {
          const topic = data.topics.find((topic) => topic.doc === id);
          return topic ? hrefTopic(topic, sub) : hrefHome();
        },
      },
    ),
  ]) {
    for (const [id, definition] of Object.entries(group)) {
      if (documents[id]) throw new Error(`Документ «${id}» уже зареєстровано`);
      documents[id] = definition;
    }
  }
  return documents;
}

export const documents: Record<string, DocumentSection> = {};
