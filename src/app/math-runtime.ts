import { algebraTools } from '../courses/algebra/runtime';
import { equationTool, proportionTool } from '../courses/mathematics/runtime';
export const algebraCoreTools = [
  ...algebraTools.slice(0, 3),
  equationTool,
  proportionTool,
  ...algebraTools.slice(3),
];
export * from '../courses/algebra/runtime';
export * from '../courses/mathematics/runtime';
export * from '../engines/core/linear';
