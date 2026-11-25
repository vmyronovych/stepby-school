import type { ReactNode } from 'react';
import type { Topic } from '../../types';
import type {
  DocumentSection,
  DocumentContentRenderer,
} from '../../components/document';
import { geometrySubject } from '../../courses/geometry';
import { geometryDocumentContent } from '../../courses/geometry/ui';
import { informaticsSubject } from '../../courses/informatics';
import { informaticsDocumentContent } from '../../courses/informatics/ui';
import { roboticsSubject } from '../../courses/robotics';
import { roboticsDocumentContent } from '../../courses/robotics/ui';
import { webSubject } from '../../courses/web-development';
import { webDocumentContent } from '../../courses/web-development/ui';
import { documents } from './registry';
const renderers: Record<string, DocumentContentRenderer> = {
  [geometrySubject.id]: geometryDocumentContent,
  [informaticsSubject.id]: informaticsDocumentContent,
  [roboticsSubject.id]: roboticsDocumentContent,
  [webSubject.id]: webDocumentContent,
};
const sections = new Map<string, DocumentSection>();
export function documentView(
  topic: Topic,
  sub: string | null,
  pageUrl = '',
): { section: DocumentSection | undefined; content?: ReactNode } {
  const id = topic.doc!;
  const source = documents[id];
  if (!source) return { section: undefined };
  const content = renderers[topic.subject]?.({
    topic,
    section: source,
    sub,
    pageUrl,
  });
  if (content == null) return { section: source };
  // React owns interactive content; retain a stable section without imperative hooks.
  let section = sections.get(id);
  if (!section) {
    section = { title: source.title, html: source.html, app: source.app };
    sections.set(id, section);
  }
  return { section, content };
}
