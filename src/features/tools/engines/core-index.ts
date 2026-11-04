import { radianLesson, radianTool } from './radian';
import type { Catalog } from '../../../types';
import { domainTool } from './domain';
import { equationTool } from './equation';
import { irrationalLesson, irrationalTool } from './irrational';
import { proportionTool } from './proportion';
import { rationalPowerLesson, rationalPowerTool } from './rational-power';
export const algebraCoreTools = [
  domainTool,
  irrationalTool,
  rationalPowerTool,
  equationTool,
  proportionTool,
  radianTool,
];
export function assembleAlgebraLessons(catalog: Catalog): void {
  for (const [id, html] of [
    ['radian', radianLesson()],
    ['irrational', irrationalLesson()],
    ['rational-power', rationalPowerLesson()],
  ]) {
    const topic = catalog.topics.find((entry) => entry.id === id);
    if (!topic) throw new Error(`Тема «${id}» відсутня`);
    topic.lesson = html;
  }
}
export * from './domain';
export * from './equation';
export * from './irrational';
export * from './linear';
export * from './proportion';
export * from './rational-power';
