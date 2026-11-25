import type { EngineDocument } from '../../../runtime/types';
import { scalarTool } from '../lessons/scalar-product/notebook';
import { scalingTool } from '../lessons/vector-scaling/notebook';
export { F, fmlText } from '../../../engines/core/formula';
export { ScalarProduct } from '../lessons/scalar-product/scalar-product';
export { ScalarNotebook, scalarTool } from '../lessons/scalar-product/notebook';
export {
  ScalingNotebook,
  scalingTool,
} from '../lessons/vector-scaling/notebook';
export { VectorNotebook } from '../../../components/notebook';
export { VectorPractice } from '../lessons/vectors/vector-practice';
export { VectorScaling } from '../lessons/vector-scaling/vector-scaling';
export { VectorLesson } from '../lessons/vectors/vectors';
export const geometryTools = [scalingTool, scalarTool];
export const geometryDocuments: Record<string, EngineDocument> = {
  'geometry-vectors': {
    title: 'Вектор. Модуль і напрям вектора',
    app: true,
    html: '<div class="vec-lesson"></div>',
  },
  'geometry-vector-scaling': {
    title: 'Множення вектора на число',
    app: true,
    html: '<div class="vec-lesson vs-lesson"></div>',
  },
  'geometry-scalar-product': {
    title: 'Скалярний добуток векторів',
    app: true,
    html: '<div class="vec-lesson sp-lesson"></div>',
  },
};

export type { GeometryEngines } from '../shared/types';
