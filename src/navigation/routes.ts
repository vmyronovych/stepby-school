import { courseRouting } from './course-registry';
import type { AppState, Catalog, ToolConfig, Topic } from '../types';

export function hrefHome() {
  return '#/';
}
export function hrefCourse(
  subject: string,
  section: 'lessons' | 'tools' = 'lessons',
) {
  return (
    courseRouting[subject]?.[section === 'tools' ? 'tools' : 'home'] ??
    `#/courses/${subject}${section === 'tools' ? '/tools' : ''}`
  );
}

export function hrefTopic(
  topic: Pick<Topic, 'cls' | 'subject' | 'id'>,
  sub?: string | null,
) {
  const base =
    courseRouting[topic.subject]?.topicUrls === 'course'
      ? `${hrefCourse(topic.subject)}/${topic.id}`
      : `#/${topic.cls}/${topic.subject}/${topic.id}`;
  return base + (sub ? '/' + encodeURIComponent(sub) : '');
}
export function cfgQuery(config?: ToolConfig | null) {
  return config ? '?c=' + encodeURIComponent(JSON.stringify(config)) : '';
}
export function hrefTool(id: string, config?: ToolConfig | null) {
  return `#/tool/${id}${cfgQuery(config)}`;
}

export interface ParsedRoute {
  course?: string;
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
    if (parts[0] === 'courses')
      return {
        course: parts[1] || '',
        topic: parts[2] || null,
        sub: parts[3] || null,
        cfg: config,
      };
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
    for (const routing of Object.values(courseRouting)) {
      if (
        routing.legacyDocumentPrefixes?.some(
          (id) => route.legacy === id || route.legacy?.startsWith(id + '-'),
        )
      )
        return { redirect: hrefCourse(routing.subject) };
    }
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
  if (!route.cls && route.course === undefined) return { state: {} };
  const subjectId = route.course ?? route.subject;
  if (!subjectId) {
    const subjects = catalog.subjects.filter((item) =>
      item.cls.includes(route.cls || ''),
    );
    return {
      redirect: subjects.length === 1 ? hrefCourse(subjects[0].id) : hrefHome(),
    };
  }
  if (route.course === undefined && !route.topic) {
    const moved = catalog.topics.find((item) =>
      item.aliases?.some(
        (alias) => alias.cls === route.cls && alias.subject === subjectId,
      ),
    );
    if (moved && moved.subject !== subjectId)
      return { redirect: hrefCourse(moved.subject) };
  }
  // Legacy topics can have moved to another course or merged into one lesson.
  const topic = catalog.topics.find(
    (item) =>
      (item.subject === subjectId &&
        item.id === route.topic &&
        (route.course !== undefined || item.cls === route.cls)) ||
      (route.course === undefined &&
        item.aliases?.some(
          (alias) =>
            alias.cls === route.cls &&
            alias.subject === route.subject &&
            alias.id === route.topic,
        )),
  );
  const subject = catalog.subjects.find((item) => item.id === subjectId);
  if (topic && (topic.subject !== subjectId || topic.id !== route.topic))
    return { redirect: hrefTopic(topic, route.sub) + cfgQuery(route.cfg) };
  if (
    !subject ||
    (route.course === undefined &&
      !topic &&
      !subject.cls.includes(route.cls || ''))
  )
    return { redirect: hrefHome() };
  if (
    route.course !== undefined &&
    route.topic === 'tools' &&
    !topic &&
    !route.sub &&
    catalog.topics.some(
      (item) => item.subject === subject.id && item.kind === 'tool',
    )
  ) {
    return { state: { subject: subject.id, sub: 'tools' } };
  }
  if (!route.topic) {
    if (route.course === undefined || courseRouting[subject.id]?.home)
      return { redirect: hrefCourse(subject.id) };
    return { state: { subject: subject.id } };
  }
  if (!topic) return { redirect: hrefCourse(subject.id) };
  const state: Partial<AppState> = {
    cls: topic.cls,
    subject: topic.subject,
    topic: topic.id,
  };
  if (topic.views) {
    if (route.sub && !topic.views.includes(route.sub))
      return { redirect: hrefTopic(topic) };
    return { state: { ...state, sub: route.sub ?? null } };
  }
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
