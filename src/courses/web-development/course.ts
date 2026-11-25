import type { Course } from '../../types';
import type { Topic, Subject } from '../../types';
import { metadata as lesson0 } from './lessons/web-page/metadata';
import { metadata as lesson1 } from './lessons/text-formatting/metadata';
import { metadata as lesson2 } from './lessons/css-intro/metadata';
import { metadata as lesson3 } from './lessons/lists-lines/metadata';
import { metadata as lesson4 } from './lessons/page-images/metadata';
import { metadata as lesson5 } from './lessons/web-review/metadata';
import { metadata as lesson6 } from './lessons/mini-project-1/metadata';
import { metadata as lesson7 } from './lessons/hyperlinks/metadata';
import { metadata as lesson8 } from './lessons/image-links/metadata';
import { metadata as lesson9 } from './lessons/tables-basics/metadata';
import { metadata as lesson10 } from './lessons/table-spans/metadata';
import { metadata as lesson11 } from './lessons/web-review-2/metadata';
import { metadata as lesson12 } from './lessons/mini-project-2/metadata';
import { metadata as lesson13 } from './lessons/block-elements/metadata';
import { metadata as lesson14 } from './lessons/external-css/metadata';
import { metadata as lesson15 } from './lessons/flex-basics/metadata';
import { metadata as lesson16 } from './lessons/flex-wrap/metadata';
import { metadata as lesson17 } from './lessons/forms-basics/metadata';
import { metadata as lesson18 } from './lessons/forms-choice/metadata';
import { metadata as lesson19 } from './lessons/web-review-3/metadata';
import { metadata as lesson20 } from './lessons/mini-project-3/metadata';
import { metadata as lesson21 } from './lessons/dropdown-menu/metadata';
import { metadata as lesson22 } from './lessons/semantic-media/metadata';
import { metadata as lesson23 } from './lessons/responsive-scroll/metadata';
import { metadata as lesson24 } from './lessons/css-animation/metadata';
import { metadata as lesson25 } from './lessons/web-review-4/metadata';
import { metadata as lesson26 } from './lessons/mini-project-4/metadata';
export const webTopics: Topic[] = [
  lesson0,
  lesson1,
  lesson2,
  lesson3,
  lesson4,
  lesson5,
  lesson6,
  lesson7,
  lesson8,
  lesson9,
  lesson10,
  lesson11,
  lesson12,
  lesson13,
  lesson14,
  lesson15,
  lesson16,
  lesson17,
  lesson18,
  lesson19,
  lesson20,
  lesson21,
  lesson22,
  lesson23,
  lesson24,
  lesson25,
  lesson26,
];
export const webSubject: Subject = {
  id: 'html-css',
  name: 'Веброзробка',
  description: 'HTML і CSS: пояснення, практика та власні вебсторінки.',
  icon: '🌐',
  bg: 'var(--primary-l)',
  cls: ['web'],
};

export const webDevelopment: Course = {
  subject: webSubject,
  topics: webTopics,
};
