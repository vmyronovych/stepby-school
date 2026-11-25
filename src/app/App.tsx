import { coursePageFor } from './course-pages';
import { Breadcrumbs } from '../components/breadcrumbs';
import { documentView } from './documents/views';
import { useLayoutEffect, useSyncExternalStore } from 'react';
import { catalog } from './catalog/catalog';
import { DocumentScreen } from './documents/DocumentScreen';
import { documentNavigationFor } from './documents/navigation';
import { CatalogPage } from './catalog/CatalogPage';
import { NotebookWorkspace } from '../components/notebook';
import { ToolInputs } from './tools/ToolInputs';
import {
  applyTool,
  changeStep,
  getSnapshot,
  markDone,
  subscribe,
  toolBackHref,
} from './controller';
import { Header } from './Header';
import { Toast } from './notifications';

export function App() {
  const state = useSyncExternalStore(subscribe, getSnapshot);
  const topic = catalog.topics.find(
    (item) =>
      item.id === state.topic &&
      item.cls === state.cls &&
      item.subject === state.subject,
  );
  const coursePage =
    topic && !state.tool
      ? coursePageFor({ topic, sub: state.sub, pageUrl: window.location.href })
      : null;
  const isDocument = !state.tool && !!topic?.doc;
  const document =
    isDocument && topic && !coursePage
      ? documentView(topic, state.sub, window.location.href)
      : null;
  useLayoutEffect(() => {
    if (state.scrollTop !== null) window.scrollTo(0, state.scrollTop);
  }, [state.hash, state.revision, state.scrollTop]);

  const subject = catalog.subjects.find((item) => item.id === state.subject);
  const definition = state.tool ? catalog.tools[state.tool] : undefined;
  return (
    <>
      {!coursePage?.hideHeader && (
        <Header className={coursePage?.headerClassName} />
      )}
      <main
        className={`wrap${state.tool || isDocument || coursePage?.wide ? ' wide' : ''}${coursePage?.shellClassName ? ' ' + coursePage.shellClassName : ''}`}
        id="app"
      >
        {coursePage ? (
          <>
            {coursePage.breadcrumbs && (
              <Breadcrumbs parts={coursePage.breadcrumbs} />
            )}
            {coursePage.content}
          </>
        ) : definition ? (
          <NotebookWorkspace
            key={state.revision}
            state={state}
            definition={definition}
            backHref={toolBackHref()}
            onApply={applyTool}
            onMarkDone={markDone}
            onStepChange={changeStep}
          >
            <ToolInputs toolId={definition.id} config={state.toolCfg || {}} />
          </NotebookWorkspace>
        ) : isDocument && topic ? (
          <DocumentScreen
            topic={topic}
            navigation={documentNavigationFor(topic, subject)}
            sub={state.sub}
            view={document}
          />
        ) : (
          <CatalogPage catalog={catalog} state={state} />
        )}
      </main>
      <Toast />
    </>
  );
}
