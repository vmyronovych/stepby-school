import type { CourseRouting } from '../../types';
import { mathematicsRouting } from '../../courses/mathematics/routing';
import { algebraRouting } from '../../courses/algebra/routing';
import { geometryRouting } from '../../courses/geometry/routing';
import { roboticsRouting } from '../../courses/robotics/routing';
// Data-only entries keep link construction independent of lesson imports and startup.
export const courseRouting: Record<string, CourseRouting> = Object.fromEntries(
  [mathematicsRouting, algebraRouting, geometryRouting, roboticsRouting].map(
    (routing) => [routing.subject, routing],
  ),
);
