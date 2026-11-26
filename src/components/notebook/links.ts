import type { ToolConfig, Topic } from '../../types';

export interface NotebookLinks {
  lessonForTool(id: string): { title: string; href: string } | null;
  hrefTopic(topic: Topic, sub?: string | null): string;
  hrefTool(id: string, config?: ToolConfig | null): string;
}
function unconfigured(): never {
  throw new Error('Notebook links are not configured');
}
/** The host supplies links; the notebook never imports its router or catalog. */
export const notebookLinks: NotebookLinks = {
  lessonForTool: () => null,
  hrefTopic: unconfigured,
  hrefTool: unconfigured,
};
export function configureNotebookLinks(links: NotebookLinks) {
  Object.assign(notebookLinks, links);
}
