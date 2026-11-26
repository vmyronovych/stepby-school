import type { Course } from '../../types';
import type { Topic, Subject } from '../../types';
import type { DocumentSection } from '../../components/document';
import { metadata as truth } from './lessons/truth/metadata';
import { metadata as publishing } from './lessons/publishing/metadata';
import { metadata as games } from './lessons/games/metadata';
import { metadata as safety } from './lessons/safety/metadata';
const themes: {
  id: string;
  title: string;
  description: string;
  icon: string;
  robux?: boolean;
}[] = [truth, publishing, games, safety];
export const mediaTopics: Topic[] = themes.map((theme) => ({
  id: theme.id,
  cls: 'media',
  subject: 'literacy',
  doc: `media-${theme.id}`,
  title: theme.title,
  desc: theme.description,
  icon: theme.icon,
  cover: `assets/media-literacy/topic-${theme.id}.jpg`,
  chips: theme.robux
    ? ['1–4 класи', 'Урок про Robux · 4 клас']
    : ['1–4 класи', '4 історії та вправи'],
}));
export const mediaDocuments: Record<string, DocumentSection> =
  Object.fromEntries(
    themes.map((theme) => [
      `media-${theme.id}`,
      { title: theme.title, html: '', app: true },
    ]),
  );

export const mediaSubject: Subject = {
  id: 'literacy',
  name: 'Медіаграмотність',
  description:
    'Перевірка інформації, відповідальні публікації та безпека в інтернеті.',
  icon: '🔎',
  bg: 'var(--primary-l)',
  cls: ['media'],
};

export const mediaLiteracy: Course = {
  subject: mediaSubject,
  topics: mediaTopics,
};
