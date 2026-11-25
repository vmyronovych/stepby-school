import {
  ContentSlot,
  type DocumentContentRenderer,
} from '../../../components/document';
import { WebPractice } from '../shared/ui/WebPractice';
import { webLessonPractice } from './lessons';
export const webDocumentContent: DocumentContentRenderer = ({
  topic,
  section,
}) => {
  const practice = topic.doc ? webLessonPractice[topic.doc] : undefined;
  return practice ? (
    <ContentSlot html={section.html} selector=".web-practice-mount">
      <WebPractice key={topic.doc} {...practice} />
    </ContentSlot>
  ) : undefined;
};
