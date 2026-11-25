import { arithmeticTools } from '../courses/mathematics/runtime';
import { algebraCoreTools } from './math-runtime';
// Preserve the former catalog insertion order, independent from import evaluation.
export const algebraTools = [
  ...algebraCoreTools.slice(0, 3),
  ...arithmeticTools.slice(0, 5),
  ...algebraCoreTools.slice(3),
  ...arithmeticTools.slice(5),
];
export { assembleAlgebraLessons, domPreviewHtml, RP } from './math-runtime';
