import type { DocumentContentRenderer } from '../../../components/document';
import { hrefTopic } from '../../../navigation/routes';
import { VectorLesson } from '../lessons/vectors/vectors';
import { VectorPractice } from '../lessons/vectors/vector-practice';
import { VectorScaling } from '../lessons/vector-scaling/vector-scaling';
import { ScalarProduct } from '../lessons/scalar-product/scalar-product';
import { GeometryLesson } from './GeometryLesson';
const engines = {
  vectors: VectorLesson,
  practice: VectorPractice,
  scaling: VectorScaling,
  scalar: ScalarProduct,
};
export const geometryDocumentContent: DocumentContentRenderer = ({ topic }) =>
  topic.doc?.startsWith('geometry-') ? (
    <GeometryLesson
      sectionId={topic.doc}
      topic={topic}
      engines={engines}
      hrefForTask={(task) => hrefTopic(topic, task)}
    />
  ) : undefined;
