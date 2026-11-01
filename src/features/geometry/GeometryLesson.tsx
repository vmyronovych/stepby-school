import type { GeometryLessonProps } from './types';
import { VectorLesson } from './VectorLesson';
import { ScalingLesson } from './ScalingLesson';
import { ScalarLesson } from './ScalarLesson';

export function GeometryLesson({
  sectionId,
  topic,
  engines,
  hrefForTask,
}: GeometryLessonProps) {
  switch (sectionId) {
    case 'geometry-vectors':
      return (
        <VectorLesson engine={engines.vectors} practice={engines.practice} />
      );
    case 'geometry-vector-scaling':
      return (
        <ScalingLesson
          engine={engines.scaling}
          topic={topic}
          hrefForTask={hrefForTask}
        />
      );
    case 'geometry-scalar-product':
      return (
        <ScalarLesson
          engine={engines.scalar}
          topic={topic}
          hrefForTask={hrefForTask}
        />
      );
    default:
      return null;
  }
}
