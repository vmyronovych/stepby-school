import { hrefHome, hrefTopic, hrefTool } from '../navigation/routes';
import type { ToolConfig, Topic } from '../types';

export interface RuntimeServices {
  topicForTool(id: string): Topic | null;
  hrefHome(): string;
  hrefTopic(topic: Topic, sub?: string | null): string;
  hrefTool(id: string, config?: ToolConfig | null): string;
  hrefDoc(id: string, sub?: string | null): string;
  docReplaceSub(sub: string | null): void;
  toast(message: string): void;
}

// Link defaults allow repository lesson getters to run before the app mounts.
// React installs document navigation and notifications during application setup.
export const runtimeServices: RuntimeServices = {
  topicForTool: () => null,
  hrefHome,
  hrefTopic,
  hrefTool,
  hrefDoc: () => '#/',
  docReplaceSub: () => {
    throw new Error('Document navigation service is not configured');
  },
  toast: () => {
    throw new Error('Notification service is not configured');
  },
};

export function configureRuntimeServices(services: Partial<RuntimeServices>) {
  Object.assign(runtimeServices, services);
}
