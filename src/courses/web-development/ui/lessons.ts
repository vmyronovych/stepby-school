import { review4Starter, review4Tasks } from '../lessons/web-review-4/tasks';
import {
  project4Starter,
  project4Tasks,
} from '../lessons/mini-project-4/tasks';
import {
  semanticMediaStarter,
  semanticMediaTasks,
} from '../lessons/semantic-media/tasks';
import {
  responsiveScrollStarter,
  responsiveScrollTasks,
} from '../lessons/responsive-scroll/tasks';
import {
  animationStarter,
  animationTasks,
} from '../lessons/css-animation/tasks';
import {
  dropdownMenuStarter,
  dropdownMenuTasks,
} from '../lessons/dropdown-menu/tasks';
import {
  formsChoiceStarter,
  formsChoiceTasks,
} from '../lessons/forms-choice/tasks';
import { review3Starter, review3Tasks } from '../lessons/web-review-3/tasks';
import {
  project3Starter,
  project3Tasks,
} from '../lessons/mini-project-3/tasks';
import {
  project3FilesStarter,
  project3MapReferenceHeight,
} from '../lessons/mini-project-3/tasks';
import type { WebProject } from '../shared/content/project-files';
import {
  blockElementsStarter,
  blockElementsTasks,
} from '../lessons/block-elements/tasks';
import {
  externalCssStarter,
  externalCssTasks,
} from '../lessons/external-css/tasks';
import {
  flexBasicsStarter,
  flexBasicsTasks,
} from '../lessons/flex-basics/tasks';
import { flexWrapStarter, flexWrapTasks } from '../lessons/flex-wrap/tasks';
import { formsStarter, formsTasks } from '../lessons/forms-basics/tasks';
import {
  project2Starter,
  project2Tasks,
} from '../lessons/mini-project-2/tasks';
import { linksStarter, linksTasks } from '../lessons/hyperlinks/tasks';
import {
  imageLinksStarter,
  imageLinksTasks,
} from '../lessons/image-links/tasks';
import { tablesStarter, tablesTasks } from '../lessons/tables-basics/tasks';
import {
  tableSpansStarter,
  tableSpansTasks,
} from '../lessons/table-spans/tasks';
import { review2Starter, review2Tasks } from '../lessons/web-review-2/tasks';
import { projectStarter, projectTasks } from '../lessons/mini-project-1/tasks';
import { reviewStarter, reviewTasks } from '../lessons/web-review/tasks';
import { imagesStarter, imagesTasks } from '../lessons/page-images/tasks';
import { listsStarter, listsTasks } from '../lessons/lists-lines/tasks';
import { cssIntroStarter, cssIntroTasks } from '../lessons/css-intro/tasks';
import {
  formattingStarter,
  formattingTasks,
} from '../lessons/text-formatting/tasks';
import type { WebTask } from '../shared/content/tasks';
import type { PreviewOptions } from '../shared/content/preview';
import { starterHtml, webTasks } from '../lessons/web-page/tasks';

interface WebLessonPractice {
  tasks: WebTask[];
  starter: string;
  preview: PreviewOptions;
  project?: WebProject;
  imageCollection?: 'moon';
}

export const webLessonPractice: Record<string, WebLessonPractice> = {
  'web-review-4': {
    tasks: review4Tasks,
    starter: review4Starter,
    preview: {
      formatting: true,
      classes: true,
      lists: true,
      images: true,
      links: true,
      tables: true,
      tableSpans: true,
      forms: true,
      formChoices: true,
      menus: true,
      semantic: true,
      media: true,
      scrollRegions: true,
    },
  },
  'mini-project-4': {
    tasks: project4Tasks,
    starter: project4Starter,
    preview: {
      formatting: true,
      classes: true,
      lists: true,
      images: true,
      links: true,
      tables: true,
      tableSpans: true,
      forms: true,
      formChoices: true,
      menus: true,
      semantic: true,
      externalCss: true,
    },
    imageCollection: 'moon',
  },
  'semantic-media': {
    tasks: semanticMediaTasks,
    starter: semanticMediaStarter,
    preview: {
      formatting: true,
      classes: true,
      lists: true,
      images: true,
      links: true,
      tables: true,
      tableSpans: true,
      forms: true,
      formChoices: true,
      menus: true,
      semantic: true,
      media: true,
    },
  },
  'responsive-scroll': {
    tasks: responsiveScrollTasks,
    starter: responsiveScrollStarter,
    preview: {
      formatting: true,
      classes: true,
      lists: true,
      images: true,
      links: true,
      tables: true,
      tableSpans: true,
      forms: true,
      formChoices: true,
      menus: true,
      semantic: true,
      scrollRegions: true,
    },
  },
  'css-animation': {
    tasks: animationTasks,
    starter: animationStarter,
    preview: {
      formatting: true,
      classes: true,
      lists: true,
      images: true,
      links: true,
      tables: true,
      tableSpans: true,
      forms: true,
      formChoices: true,
      menus: true,
      semantic: true,
    },
  },
  'dropdown-menu': {
    tasks: dropdownMenuTasks,
    starter: dropdownMenuStarter,
    preview: {
      formatting: true,
      classes: true,
      lists: true,
      images: true,
      links: true,
      tables: true,
      tableSpans: true,
      forms: true,
      formChoices: true,
      menus: true,
    },
  },
  'forms-choice': {
    tasks: formsChoiceTasks,
    starter: formsChoiceStarter,
    preview: {
      formatting: true,
      classes: true,
      lists: true,
      images: true,
      links: true,
      tables: true,
      tableSpans: true,
      forms: true,
      formChoices: true,
    },
  },
  'web-review-3': {
    tasks: review3Tasks,
    starter: review3Starter,
    preview: {
      formatting: true,
      classes: true,
      lists: true,
      images: true,
      links: true,
      tables: true,
      tableSpans: true,
      forms: true,
      formChoices: true,
    },
  },
  'mini-project-3': {
    tasks: project3Tasks,
    starter: project3Starter,
    preview: {
      formatting: true,
      classes: true,
      lists: true,
      images: true,
      links: true,
      tables: true,
      tableSpans: true,
      forms: true,
      formChoices: true,
      externalCss: true,
    },
    project: {
      starterFiles: project3FilesStarter,
      mapReferenceHeight: project3MapReferenceHeight,
    },
  },
  'block-elements': {
    tasks: blockElementsTasks,
    starter: blockElementsStarter,
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
  'external-css': {
    tasks: externalCssTasks,
    starter: externalCssStarter,
    preview: {
      formatting: true,
      classes: true,
      lists: true,
      images: true,
      links: true,
      tables: true,
      tableSpans: true,
      externalCss: true,
    },
  },
  'flex-basics': {
    tasks: flexBasicsTasks,
    starter: flexBasicsStarter,
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
  'flex-wrap': {
    tasks: flexWrapTasks,
    starter: flexWrapStarter,
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
  'forms-basics': {
    tasks: formsTasks,
    starter: formsStarter,
    preview: {
      formatting: true,
      classes: true,
      lists: true,
      images: true,
      links: true,
      tables: true,
      tableSpans: true,
      forms: true,
    },
  },
  'mini-project-2': {
    tasks: project2Tasks,
    starter: project2Starter,
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
