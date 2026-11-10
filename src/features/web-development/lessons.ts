import { linksStarter, linksTasks } from './links-tasks';
import { imageLinksStarter, imageLinksTasks } from './image-links-tasks';
import { tablesStarter, tablesTasks } from './tables-tasks';
import { tableSpansStarter, tableSpansTasks } from './table-spans-tasks';
import { review2Starter, review2Tasks } from './review2-tasks';
import { projectStarter, projectTasks } from './project-tasks';
import { reviewStarter, reviewTasks } from './review-tasks';
import { imagesStarter, imagesTasks } from './images-tasks';
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
  hyperlinks: {
    tasks: linksTasks,
    starter: linksStarter,
    preview: {
      formatting: true,
      classes: true,
      lists: true,
      images: true,
      links: true,
    },
  },
  'image-links': {
    tasks: imageLinksTasks,
    starter: imageLinksStarter,
    preview: {
      formatting: true,
      classes: true,
      lists: true,
      images: true,
      links: true,
    },
  },
  'tables-basics': {
    tasks: tablesTasks,
    starter: tablesStarter,
    preview: {
      formatting: true,
      classes: true,
      lists: true,
      images: true,
      links: true,
      tables: true,
    },
  },
  'table-spans': {
    tasks: tableSpansTasks,
    starter: tableSpansStarter,
    preview: {
      formatting: true,
      classes: true,
      lists: true,
      images: true,
      links: true,
      tables: true,
      tableSpans: true,
    },
  },
  'web-review-2': {
    tasks: review2Tasks,
    starter: review2Starter,
    preview: {
      formatting: true,
      classes: true,
      lists: true,
      images: true,
      links: true,
      tables: true,
      tableSpans: true,
    },
  },
  'mini-project-1': {
    tasks: projectTasks,
    starter: projectStarter,
    preview: { formatting: true, classes: true, lists: true, images: true },
  },
  'web-review': {
    tasks: reviewTasks,
    starter: reviewStarter,
    preview: { formatting: true, classes: true, lists: true, images: true },
  },
  'page-images': {
    tasks: imagesTasks,
    starter: imagesStarter,
    preview: { formatting: true, classes: true, lists: true, images: true },
  },
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
