import { flushSync } from 'react-dom';
import { catalog } from './catalog/catalog';
import { documents } from './documents/registry';
import { initializeApplication } from './composition';
import { readField } from './tools/read-field';
import { prefersReducedMotion } from '../components/motion';
import type { AppState } from '../types';
import {
  cfgQuery,
  hrefHome,
  hrefTool,
  hrefTopic,
  parseRoute,
  resolveRoute,
} from './navigation/routes';
import { notify } from './notifications';

export interface AppSnapshot extends AppState {
  hash: string;
  revision: number;
  scrollTop: number | null;
}
const emptyState: AppState = {
  cls: null,
  subject: null,
  topic: null,
  sub: null,
  tool: null,
  toolCfg: null,
  toolTaskId: null,
  toolFrom: null,
  step: 0,
  steps: [],
  model: null,
  anim: null,
};
let snapshot: AppSnapshot = {
  ...emptyState,
  hash: '',
  revision: 0,
  scrollTop: 0,
};
const listeners = new Set<() => void>();
const scrollPositions = new Map<string, number>();
let clickNavigation = false;
let started = false;
export const getSnapshot = () => snapshot;
export const getCatalog = () => catalog;
export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
function publish(next: AppSnapshot) {
  snapshot = next;
  // Diagram engines read positions immediately before and after a step transition.
  flushSync(() => listeners.forEach((listener) => listener()));
}
export function getToolDefinition(id = snapshot.tool) {
  return id ? catalog.tools[id] : undefined;
}
function taskTopic() {
  return catalog.topics.find((topic) =>
    topic.tasks?.some((task) => task.id === snapshot.toolTaskId),
  );
}
export function toolBackHref() {
  const topic = taskTopic();
  return topic ? hrefTopic(topic) : snapshot.toolFrom || hrefHome();
}
function buildTool(state: AppSnapshot) {
  const definition = state.tool ? catalog.tools[state.tool] : undefined;
  if (!definition || !state.toolCfg) return;
  try {
    const model = definition.build(state.toolCfg);
    if (!model || !Array.isArray(model.steps)) throw 'bad';
    state.model = model;
    state.steps = model.steps;
  } catch (error) {
    state.steps = [
      {
        text:
          typeof error === 'string' && error !== 'bad'
            ? error
            : definition.errorHint || 'Перевірте введені значення.',
        error: true,
      },
    ];
  }
}
export function pageTitle(state = snapshot) {
  const brand = 'StepBy School';
  if (state.tool) return `${catalog.tools[state.tool].name} — ${brand}`;
  const subject = catalog.subjects.find((item) => item.id === state.subject);
  if (!subject) return `${brand} — шкільні предмети крок за кроком`;
  const topic = catalog.topics.find(
    (item) =>
      item.id === state.topic &&
      item.cls === state.cls &&
      item.subject === state.subject,
  );
  const prefix = topic
    ? topic.title + ' · '
    : state.sub === 'tools'
      ? 'Інструменти · '
      : '';
  return `${prefix}${subject.name} — ${brand}`;
}
export function route() {
  const hash = location.hash || '#/';
  const result = resolveRoute(parseRoute(hash), catalog);
  if (result.state === undefined) {
    location.replace(result.redirect);
    return;
  }
  const state = result.state;
  const topic = catalog.topics.find(
    (item) =>
      item.id === state.topic &&
      item.cls === state.cls &&
      item.subject === state.subject,
  );
  const restore = !clickNavigation ? scrollPositions.get(hash) : undefined;
  clickNavigation = false;
  if (snapshot.hash) scrollPositions.set(snapshot.hash, window.scrollY);
  const sameDocument = !!(
    snapshot.hash &&
    topic?.doc &&
    !state.tool &&
    !snapshot.tool &&
    snapshot.topic === topic.id &&
    snapshot.cls === topic.cls &&
    snapshot.subject === topic.subject
  );
  if (sameDocument) {
    publish({
      ...snapshot,
      hash,
      sub: state.sub || null,
      scrollTop:
        topic?.doc && documents[topic.doc]?.onSub
          ? null
          : (restore ?? (state.sub ? null : 0)),
    });
    return;
  }
  const toolFrom =
    state.tool &&
    !state.toolTaskId &&
    snapshot.hash &&
    !parseRoute(snapshot.hash).tool
      ? snapshot.hash
      : snapshot.toolFrom;
  const anchored = topic?.doc && state.sub && !documents[topic.doc]?.onSub;
  const next: AppSnapshot = {
    ...emptyState,
    ...state,
    toolFrom,
    hash,
    revision: snapshot.revision + 1,
    scrollTop: restore ?? (anchored ? null : 0),
  };
  if (next.tool) buildTool(next);
  publish(next);
  document.title = pageTitle(next);
}
export function navigate(href: string) {
  clickNavigation = true;
  if (location.hash === href) route();
  else location.hash = href;
}
export function changeStep(index: number) {
  if (index < 0 || index >= snapshot.steps.length) return;
  const definition = getToolDefinition();
  const anim =
    definition?.prepare && snapshot.model && !prefersReducedMotion()
      ? definition.prepare(snapshot.model, snapshot.step, index) || null
      : null;
  publish({
    ...snapshot,
    step: index,
    anim,
    revision: snapshot.revision + 1,
    scrollTop: null,
  });
}
export function applyTool() {
  const definition = getToolDefinition();
  if (!definition || !snapshot.tool) return;
  const config = definition.read(readField);
  const topic = taskTopic();
  const hash = topic
    ? hrefTopic(topic, snapshot.toolTaskId) + cfgQuery(config)
    : hrefTool(snapshot.tool, config);
  clickNavigation = true;
  if (location.hash === hash) route();
  else location.replace(hash);
}
export function markDone() {
  const task = taskTopic()?.tasks?.find(
    (item) => item.id === snapshot.toolTaskId,
  );
  if (task) task.done = true;
  notify('Завдання виконано! 🎉');
}
export function startApplication() {
  if (started) return;
  initializeApplication();
  started = true;
  document.addEventListener(
    'click',
    (event) => {
      const link =
        event.target instanceof Element
          ? event.target.closest('a[href^="#"]')
          : null;
      if (
        link &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey
      )
        clickNavigation = true;
    },
    true,
  );
  window.addEventListener('hashchange', route);
  route();
}
