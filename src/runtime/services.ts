import type { ToolConfig, Topic } from '../types';

export interface RuntimeServices {
  hrefHome(): string;
  hrefCls(id: string): string;
  hrefSubj(classId: string, subjectId: string): string;
  hrefTopic(topic: Topic, sub?: string | null): string;
  hrefTool(id: string, config?: ToolConfig | null): string;
  hrefDoc(id: string, sub?: string | null): string;
  docReplaceSub(sub: string | null): void;
  toast(message: string): void;
}

// Link defaults allow repository lesson getters to run before the app mounts.
// React installs document navigation and notifications during application setup.
export const runtimeServices: RuntimeServices = {
  hrefHome: () => '#/',
  hrefCls: (id) => `#/${id}`,
  hrefSubj: (classId, subjectId) => `#/${classId}/${subjectId}`,
  hrefTopic: (topic, sub) =>
    `#/${topic.cls}/${topic.subject}/${topic.id}${sub ? '/' + encodeURIComponent(sub) : ''}`,
  hrefTool: (id, config) =>
    `#/tool/${id}${config ? '?c=' + encodeURIComponent(JSON.stringify(config)) : ''}`,
  hrefDoc: () => '#/',
  docReplaceSub: () => {
    throw new Error('Document navigation service is not configured');
  },
  toast: () => {
    throw new Error('Notification service is not configured');
  },
};

export function configureRuntimeServices(services: RuntimeServices) {
  Object.assign(runtimeServices, services);
}
