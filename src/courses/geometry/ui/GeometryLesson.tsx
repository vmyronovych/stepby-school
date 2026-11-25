import type { GeometryLessonProps } from '../shared/types';
import { VectorLesson } from '../lessons/vectors/VectorLesson';
import { ScalingLesson } from '../lessons/vector-scaling/ScalingLesson';
import { ScalarLesson } from '../lessons/scalar-product/ScalarLesson';

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
