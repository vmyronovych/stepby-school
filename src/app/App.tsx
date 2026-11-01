import { documentView } from './documentViews';
import { useLayoutEffect, useSyncExternalStore } from 'react';
import { engine } from '../runtime';
import { StudentPage } from '../features/student/StudentPage';
import { ToolPage } from '../features/tools/ToolPage';
import { DocumentPage } from '../features/documents/DocumentPage';
import { hrefCls, hrefHome, hrefSubj, hrefTopic } from '../navigation/routes';
import { clsCrumb } from '../navigation/labels';
import {
  applyTool,
  changeStep,
  getSnapshot,
  markDone,
  subscribe,
  toolBackHref,
} from './controller';
import { documentServices, inputServices } from './services';
import { Header } from './Header';
import { notify, Toast } from './notifications';

export function App() {
  const state = useSyncExternalStore(subscribe, getSnapshot);
  const catalog = engine.DB;
  const topic = catalog.topics.find(
    (item) =>
      item.id === state.topic &&
      item.cls === state.cls &&
      item.subject === state.subject,
  );
  const isDocument = !state.tool && !!topic?.doc;
  const document = isDocument && topic ? documentView(topic, state.sub) : null;
  useLayoutEffect(() => {
    if (state.scrollTop !== null) window.scrollTo(0, state.scrollTop);
  }, [state.hash, state.revision, state.scrollTop]);

  const schoolClass = catalog.classes.find((item) => item.id === state.cls);
  const subject = catalog.subjects.find((item) => item.id === state.subject);
  const definition = state.tool ? catalog.tools[state.tool] : undefined;
  return (
    <>
      <Header />
      <main
        className={`wrap${state.tool || isDocument ? ' wide' : ''}`}
        id="app"
      >
        {definition ? (
          <ToolPage
            key={state.revision}
            state={state}
            definition={definition}
            backHref={toolBackHref()}
            inputServices={inputServices}
            onApply={applyTool}
            onMarkDone={markDone}
            onStepChange={changeStep}
          />
        ) : isDocument && topic ? (
          <DocumentPage
            key={`${topic.cls}/${topic.subject}/${topic.id}`}
            topic={topic}
            section={document?.section}
            sub={state.sub}
            breadcrumbs={[
              { text: 'Класи', href: hrefHome() },
              {
                text: schoolClass ? clsCrumb(schoolClass) : '',
                href: hrefCls(topic.cls),
              },
              {
                text: subject?.name || 'Предмет',
                href: hrefSubj(topic.cls, topic.subject),
              },
              { text: topic.title },
            ]}
            hrefForSub={(sub) => hrefTopic(topic, sub)}
            services={documentServices}
          >
            {document?.content}
          </DocumentPage>
        ) : (
          <StudentPage
            catalog={catalog}
            state={state}
            onOpenMaterial={() => notify('Демо: матеріал відкрито')}
          />
        )}
      </main>
      <Toast />
    </>
  );
}
