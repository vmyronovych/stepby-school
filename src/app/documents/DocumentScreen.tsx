import {
  DocumentPage,
  type DocumentNavigation,
} from '../../components/document';
import { hrefTopic } from '../../navigation/routes';
import type { Topic } from '../../types';
import type { documentView } from './views';
import { documentServicesFor } from './services';

export function DocumentScreen({
  topic,
  sub,
  view,
  navigation,
}: {
  topic: Topic;
  sub: string | null;
  view: ReturnType<typeof documentView> | null;
  navigation: DocumentNavigation;
}) {
  return (
    <DocumentPage
      key={`${topic.cls}/${topic.subject}/${topic.id}`}
      topic={topic}
      section={view?.section}
      sub={sub}
      {...navigation}
      hrefForSub={(sub) => hrefTopic(topic, sub)}
      services={documentServicesFor(topic.subject)}
    >
      {view?.content}
    </DocumentPage>
  );
}
