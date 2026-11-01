import { WindowsProjector } from '../features/windows/WindowsProjector';
import type { ReactNode } from 'react';
import { engine } from '../runtime';
import type { Topic } from '../types';
import type { DocumentSection } from '../features/documents/types';
import { ContentSlot } from '../features/documents/components/ContentSlot';
import { CircuitProjector } from '../features/circuit/CircuitProjector';
import { KeyboardProjector } from '../features/keyboard/KeyboardProjector';
import { GeometryLesson } from '../features/geometry/GeometryLesson';
import { hrefTopic } from '../navigation/routes';

const sections = new Map<string, DocumentSection>();
const geometryEngines = {
  vectors: engine.VectorLesson,
  practice: engine.VectorPractice,
  scaling: engine.VectorScaling,
  scalar: engine.ScalarProduct,
};
function reactSection(id: string) {
  let section = sections.get(id);
  if (!section) {
    const source = engine.DOCS[id];
    section = { title: source.title, html: source.html, app: source.app };
    sections.set(id, section);
  }
  return section;
}
export function documentView(
  topic: Topic,
  sub: string | null,
): { section: DocumentSection | undefined; content?: ReactNode } {
  const id = topic.doc!;
  const source = engine.DOCS[id];
  if (id.startsWith('geometry-'))
    return {
      section: reactSection(id),
      content: (
        <GeometryLesson
          sectionId={id}
          topic={topic}
          engines={geometryEngines}
          hrefForTask={(task) => hrefTopic(topic, task)}
        />
      ),
    };
  if (id.endsWith('-keyboard'))
    return {
      section: reactSection(id),
      content: (
        <ContentSlot html={source.html} selector=".inf-mount">
          <KeyboardProjector
            controller={engine.KeyboardEngine}
            preset={sub}
            onPresetChange={(preset) =>
              location.replace(hrefTopic(topic, preset))
            }
          />
        </ContentSlot>
      ),
    };
  if (id.endsWith('-windows'))
    return {
      section: reactSection(id),
      content: (
        <ContentSlot html={source.html} selector=".inf-mount">
          <WindowsProjector controller={engine.windows} sub={sub} />
        </ContentSlot>
      ),
    };
  if (id === 'sim')
    return {
      section: reactSection(id),
      content: (
        <ContentSlot html={source.html} selector="#circuit">
          <CircuitProjector controller={engine.CircuitEngine} />
        </ContentSlot>
      ),
    };
  return { section: source };
}
