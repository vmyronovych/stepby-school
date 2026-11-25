export { GeometryLesson } from './GeometryLesson';
export type { GeometryEngines } from '../shared/types';
import type { ToolInputRegistry } from '../../../components/notebook/inputs';
import { ScalarInputs } from '../lessons/scalar-product/Inputs';
import { ScalingInputs } from '../lessons/vector-scaling/Inputs';
export const geometryInputs: ToolInputRegistry = {
  'scalar-product': ScalarInputs,
  'vector-scaling': ScalingInputs,
};
export { geometryDocumentContent } from './documents';
