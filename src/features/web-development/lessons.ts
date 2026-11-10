import { listsStarter, listsTasks } from './lists-tasks';
import { cssIntroStarter, cssIntroTasks } from './css-intro-tasks';
import { formattingStarter, formattingTasks } from './formatting-tasks';
import type { PreviewOptions } from './preview';
import { starterHtml, webTasks, type WebTask } from './tasks';

interface WebLessonPractice {
  tasks: WebTask[];
  starter: string;
  preview: PreviewOptions;
}

export const webLessonPractice: Record<string, WebLessonPractice> = {
  'lists-lines': {
    tasks: listsTasks,
    starter: listsStarter,
    preview: { formatting: true, classes: true, lists: true },
  },
  'web-page': { tasks: webTasks, starter: starterHtml, preview: {} },
  'text-formatting': {
    tasks: formattingTasks,
    starter: formattingStarter,
    preview: { formatting: true },
  },
  'css-intro': {
    tasks: cssIntroTasks,
    starter: cssIntroStarter,
    preview: { formatting: true, classes: true },
  },
};
