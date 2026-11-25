import type { Catalog, Course } from '../../types';
import { courses } from './registry';

export function createCatalog(courses: readonly Course[]): Catalog {
  return {
    subjects: courses.map((course) => course.subject),
    topics: courses.flatMap((course) => course.topics),
    tools: {},
  };
}

export const catalog = createCatalog(courses);

export function topicForTool(id: string, addressClass: string | null) {
  const topics = catalog.topics.filter((topic) =>
    topic.tasks?.some((task) => task.tool === id),
  );
  return (
    topics.find((topic) => topic.cls === addressClass) || topics[0] || null
  );
}
