import type { TeacherNotes } from '../shared/ui/TeacherGuidance';
import { notes as truth } from '../lessons/truth/teacher';
import { notes as publishing } from '../lessons/publishing/teacher';
import { notes as games } from '../lessons/games/teacher';
import { notes as safety } from '../lessons/safety/teacher';
export const topicTeacherNotes: Record<string, TeacherNotes[]> = {
  truth,
  publishing,
  games,
  safety,
};
