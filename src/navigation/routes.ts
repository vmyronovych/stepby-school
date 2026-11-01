import type { AppState, Catalog, ToolConfig, Topic } from '../types';

export function hrefHome() {
  return '#/';
}
export function hrefCls(id: string) {
  return `#/${id}`;
}
export function hrefSubj(classId: string, subject: string) {
  return `#/${classId}/${subject}`;
}
export function hrefTopic(topic: Topic, sub?: string | null) {
  return `#/${topic.cls}/${topic.subject}/${topic.id}${sub ? '/' + encodeURIComponent(sub) : ''}`;
}
export function cfgQuery(config?: ToolConfig | null) {
  return config ? '?c=' + encodeURIComponent(JSON.stringify(config)) : '';
}
export function hrefTool(id: string, config?: ToolConfig | null) {
  return `#/tool/${id}${cfgQuery(config)}`;
}

export interface ParsedRoute {
  legacy?: string;
  tool?: string;
  cls?: string | null;
  subject?: string | null;
  topic?: string | null;
  sub?: string | null;
  cfg?: ToolConfig | null;
}

export function parseRoute(hash: string): ParsedRoute {
  try {
    const value = hash.replace(/^#/, '');
    if (value && value[0] !== '/') return { legacy: decodeURIComponent(value) };
    const [path, query] = value.split('?');
    const parts = path.split('/').filter(Boolean).map(decodeURIComponent);
    let config: ToolConfig | null = null;
    const encoded = /(?:^|&)c=([^&]*)/.exec(query || '');
    if (encoded) {
      try {
        const parsed: unknown = JSON.parse(decodeURIComponent(encoded[1]));
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed))
          config = parsed as ToolConfig;
      } catch {
        /* Invalid custom conditions fall back to the lesson's condition. */
      }
    }
    if (parts[0] === 'tool') return { tool: parts[1] || '', cfg: config };
    return {
      cls: parts[0] || null,
      subject: parts[1] || null,
      topic: parts[2] || null,
      sub: parts[3] || null,
      cfg: config,
    };
  } catch {
    return {};
  }
}

type RouteResult =
  | { state: Partial<AppState>; redirect?: never }
  | { redirect: string; state?: never };
export function resolveRoute(
  route: ParsedRoute,
  catalog: Catalog,
): RouteResult {
  if (route.legacy !== undefined) {
    for (
      let id = route.legacy;
      id;
      id = id.includes('-') ? id.slice(0, id.lastIndexOf('-')) : ''
    ) {
      const topic = catalog.topics.find((item) => item.doc === id);
      if (topic)
        return {
          redirect: hrefTopic(topic, id === route.legacy ? null : route.legacy),
        };
    }
    return { redirect: hrefHome() };
  }
  if (route.tool !== undefined) {
    if (!catalog.tools[route.tool]) return { redirect: hrefHome() };
    return {
      state: { tool: route.tool, toolCfg: route.cfg ?? null, toolTaskId: null },
    };
  }
  if (!route.cls) return { state: {} };
  const schoolClass = catalog.classes.find((item) => item.id === route.cls);
  if (!schoolClass) return { redirect: hrefHome() };
  if (!route.subject) return { state: { cls: schoolClass.id } };
  const subject = catalog.subjects.find(
    (item) =>
      item.id === route.subject &&
      item.active &&
      item.cls.includes(schoolClass.id),
  );
  if (!subject) return { redirect: hrefCls(schoolClass.id) };
  if (!route.topic)
    return { state: { cls: schoolClass.id, subject: subject.id } };
  const topic = catalog.topics.find(
    (item) =>
      item.id === route.topic &&
      item.cls === schoolClass.id &&
      item.subject === subject.id,
  );
  if (!topic) return { redirect: hrefSubj(schoolClass.id, subject.id) };
  const state: Partial<AppState> = {
    cls: schoolClass.id,
    subject: subject.id,
    topic: topic.id,
  };
  if (topic.doc && !(topic.tasks ?? []).some((task) => task.id === route.sub))
    return { state: { ...state, sub: route.sub ?? null } };
  if (!route.sub) return { state };
  const task = topic.tasks?.find((item) => item.id === route.sub);
  if (!task) return { redirect: hrefTopic(topic) };
  return {
    state: {
      ...state,
      tool: task.tool,
      toolCfg: route.cfg || task.cfg,
      toolTaskId: task.id,
    },
  };
}
