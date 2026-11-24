import type { ChatMessage } from './ChatScene';

const conversations = {
  'marko-shopping': ['Марко', 'мама'],
  'marko-help': ['Марко', 'мама'],
  'ostap-dad': ['Остап', 'тато'],
  'nina-brother': ['Ніна', 'брат'],
  'vlad-sister': ['Влад', 'сестра'],
  'ruslan-ivan': ['Руслан', 'Іван'],
  'sasha-oleh': ['Саша', 'Олег'],
  'kyrylo-polia': ['Кирило', 'Поля'],
  'alina-maksym': ['Аліна', 'Максим'],
} as const;

export type ComicStripId = keyof typeof conversations;

/** Each strip has two equal panels; CSS shows one without altering the asset. */
export function comicStrip(
  id: ComicStripId,
  panel: 0 | 1,
): NonNullable<ChatMessage['comicArt']> {
  const people = conversations[id];
  return {
    src: `assets/media-literacy/comic-${id}.png`,
    panel,
    alt: `${people[0]} і ${people[1]} розмовляють наживо. Говорить ${people[panel]}, слухає ${people[panel === 0 ? 1 : 0]}.`,
  };
}
