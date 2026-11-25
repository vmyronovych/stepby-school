import {
  ContentSlot,
  type DocumentContentRenderer,
} from '../../../components/document';
import { hrefTopic } from '../../../navigation/routes';
import { KeyboardEngine, KeyboardProjector } from '../tools/keyboard';
import { WindowsEngine, WindowsProjector } from '../tools/windows';
export const informaticsDocumentContent: DocumentContentRenderer = ({
  topic,
  section,
  sub,
}) => {
  if (topic.doc?.endsWith('-keyboard'))
    return (
      <ContentSlot html={section.html} selector=".inf-mount">
        <KeyboardProjector
          controller={KeyboardEngine}
          preset={sub}
          onPresetChange={(preset) =>
            location.replace(hrefTopic(topic, preset))
          }
        />
      </ContentSlot>
    );
  if (topic.doc?.endsWith('-windows'))
    return (
      <ContentSlot html={section.html} selector=".inf-mount">
        <WindowsProjector controller={WindowsEngine} sub={sub} />
      </ContentSlot>
    );
  return undefined;
};
