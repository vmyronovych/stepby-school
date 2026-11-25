// One bundle gives each test its own assembled catalog and model registry.
import { initializeApplication } from '../../src/app/composition';
initializeApplication();
export { catalog } from '../../src/app/catalog/catalog';
export * from '../../src/lib/math';
export * from '../../src/components/notebook/rendering';
export * from '../../src/courses/algebra/runtime';
export * from '../../src/courses/mathematics/runtime';
