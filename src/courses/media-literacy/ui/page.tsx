import type { CoursePageRenderer } from '../../../runtime/course-view';
import { hrefCourse, hrefHome } from '../../../navigation/routes';
import { mediaSubject } from '../course';
import { mediaLessonRoute } from '../shared/routes';
import { mediaContent } from './content';
import { MediaTopicPage } from './MediaTopicPage';
export const mediaPage: CoursePageRenderer = ({ topic, sub, pageUrl }) => {
  const content = topic.doc ? mediaContent[topic.doc] : undefined;
  if (!content) return null;
  const student = mediaLessonRoute(sub).view === 'student';
  return {
    content: (
      <MediaTopicPage
        key={topic.doc}
        content={content}
        topic={topic}
        sub={sub}
        pageUrl={pageUrl}
      />
    ),
    wide: true,
    hideHeader: student,
    breadcrumbs: student
      ? undefined
      : [
          { text: 'Головна', href: hrefHome() },
          { text: mediaSubject.name, href: hrefCourse(mediaSubject.id) },
          { text: topic.title },
        ],
  };
};
