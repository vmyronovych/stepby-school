import type { Catalog } from '../../../types';
import { radianLesson, radianTool } from '../lessons/radians/radian';
import {
  irrationalLesson,
  irrationalTool,
} from '../lessons/irrational-equations/irrational';
import {
  rationalPowerLesson,
  rationalPowerTool,
} from '../lessons/rational-power/rational-power';
import { domainTool } from '../shared/domain';
export const algebraTools = [
  domainTool,
  irrationalTool,
  rationalPowerTool,
  radianTool,
];
export function assembleAlgebraLessons(catalog: Catalog): void {
  for (const [id, html] of [
    ['radian', radianLesson()],
    ['irrational', irrationalLesson()],
    ['rational-power', rationalPowerLesson()],
  ]) {
    const topic = catalog.topics.find(
      (entry) => entry.id === id && entry.subject === 'algebra',
    );
    if (!topic) throw new Error(`Тема «${id}» відсутня`);
    topic.lesson = html;
  }
}
export * from '../shared/domain';
export * from '../lessons/irrational-equations/irrational';
export * from '../lessons/rational-power/rational-power';
export { radianExamples } from '../lessons/radians/examples';
