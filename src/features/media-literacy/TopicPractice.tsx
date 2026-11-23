import type { MediaContent } from './content';
import { StudentPractice } from './StudentPractice';
export function TopicPractice({ content }: { content: MediaContent }) {
  return <StudentPractice key={content.id} topicId={content.id} />;
}
