import type { EngineDocument } from '../../../runtime/types';
import { scalarTool } from './tools/scalar-product';
import { scalingTool } from './tools/vector-scaling';
export { F, fmlText } from '../../../engines/core/formula';
export { ScalarProduct } from './scalar-product';
export { ScalarNotebook, scalarTool } from './tools/scalar-product';
export { ScalingNotebook, scalingTool } from './tools/vector-scaling';
export { VectorNotebook } from './vector-notebook';
export { VectorPractice } from './vector-practice';
export { VectorScaling } from './vector-scaling';
export { VectorLesson } from './vectors';
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

export { catalog } from '../../../data/catalog';
export { runtimeServices } from '../../../runtime/services';
