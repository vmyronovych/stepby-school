import type { ToolLinks } from '../../types';
import { topicForTool } from '../catalog/catalog';
import { hrefTopic, hrefTool } from '../navigation/routes';

/** Capture the address class of this rendering, without copying controller state. */
export function createToolLinks(addressClass: string | null): ToolLinks {
  return {
    lessonForTool: (id) => {
      const topic = topicForTool(id, addressClass);
      return topic ? { title: topic.title, href: hrefTopic(topic) } : null;
    },
    hrefTopic,
    hrefTool,
  };
}
