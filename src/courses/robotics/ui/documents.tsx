import {
  ContentSlot,
  type DocumentContentRenderer,
} from '../../../components/document';
import { CircuitProjector, CircuitEngine } from '../tools/circuit';
export const roboticsDocumentContent: DocumentContentRenderer = ({
  topic,
  section,
}) =>
  topic.doc === 'sim' ? (
    <ContentSlot html={section.html} selector="#circuit">
      <CircuitProjector controller={CircuitEngine} />
    </ContentSlot>
  ) : undefined;
