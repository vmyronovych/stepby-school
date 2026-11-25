import { mediaLessonRoute } from '../features/media-literacy/lesson-routes';
import { RoboticsPage } from '../courses/robotics/ui';
import { RoboticsNav } from '../courses/robotics/ui';
import { roboticsHref } from '../courses/robotics';
import { documentView } from './documentViews';
import { useLayoutEffect, useSyncExternalStore } from 'react';
import { engine } from '../runtime';
import { StudentPage } from '../features/student/StudentPage';
import { StudentBreadcrumbs } from '../features/student/components/StudentBreadcrumbs';
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
  const isMedia = topic?.cls === 'media' && topic.subject === 'literacy';
  const isRobotics = state.cls === 'robo' && state.subject === 'robot';
  const isRoboticsPage =
    isRobotics &&
    (topic?.kind === 'robotics-lesson' || topic?.kind === 'course-navigation');
  const isRoboticsLesson = isRoboticsPage && topic?.kind === 'robotics-lesson';
  const studentOnly =
    (isMedia && mediaLessonRoute(state.sub).view === 'student') ||
    (isRoboticsPage &&
      topic?.kind === 'robotics-lesson' &&
      state.sub === 'student');
  const isDocument = !state.tool && !!topic?.doc;
  const document =
    isDocument && topic
      ? documentView(topic, state.sub, window.location.href)
      : null;
  useLayoutEffect(() => {
    if (state.scrollTop !== null) window.scrollTo(0, state.scrollTop);
  }, [state.hash, state.revision, state.scrollTop]);

  const schoolClass = catalog.classes.find((item) => item.id === state.cls);
  const subject = catalog.subjects.find((item) => item.id === state.subject);
  const definition = state.tool ? catalog.tools[state.tool] : undefined;
  return (
    <>
      {!studentOnly && <Header compact={isRoboticsLesson} />}
      <main
        className={`wrap${state.tool || isDocument || isRoboticsPage ? ' wide' : ''}${isRoboticsLesson ? ' robotics-lesson-wrap' : ''}`}
        id="app"
      >
        {isRoboticsPage && topic ? (
          <RoboticsPage key={topic.id} topic={topic} sub={state.sub} />
        ) : isMedia ? (
          <>
            {!studentOnly && schoolClass && (
              <StudentBreadcrumbs
                schoolClass={schoolClass}
                subject={subject}
                topic={topic}
              />
            )}
            {document?.content}
          </>
        ) : definition ? (
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
          <>
            {isRobotics && (
              <RoboticsNav
                section={['r8', 'r9'].includes(topic.id) ? 'tools' : 'lessons'}
              />
            )}
            <DocumentPage
              key={`${topic.cls}/${topic.subject}/${topic.id}`}
              topic={topic}
              section={document?.section}
              sub={state.sub}
              breadcrumbs={
                isRobotics
                  ? [
                      { text: 'Головна', href: hrefHome() },
                      { text: 'Робототехніка', href: roboticsHref() },
                      {
                        text: ['r8', 'r9'].includes(topic.id)
                          ? 'Інструменти'
                          : 'Заняття',
                        href: roboticsHref(
                          ['r8', 'r9'].includes(topic.id) ? 'tools' : 'lessons',
                        ),
                      },
                      { text: topic.title },
                    ]
                  : [
                      { text: 'Класи', href: hrefHome() },
                      {
                        text: schoolClass ? clsCrumb(schoolClass) : '',
                        href: schoolClass?.courseSubject
                          ? hrefSubj(topic.cls, schoolClass.courseSubject)
                          : hrefCls(topic.cls),
                      },
                      ...(!schoolClass?.courseSubject
                        ? [
                            {
                              text: subject?.name || 'Предмет',
                              href: hrefSubj(topic.cls, topic.subject),
                            },
                          ]
                        : []),
                      { text: topic.title },
                    ]
              }
              hrefForSub={(sub) => hrefTopic(topic, sub)}
              services={documentServices}
            >
              {document?.content}
            </DocumentPage>
          </>
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
