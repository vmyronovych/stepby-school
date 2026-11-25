import { comicStrip, type ComicStripId } from './comic-art';
import type { ChatStory, ChatMessage } from '../ui/ChatScene';

export interface PracticeOption {
  text: string;
  feedback: string;
}
export interface PracticeReason extends PracticeOption {
  action: number;
}
export interface PracticeTask {
  id: string;
  title: string;
  skill: string;
  transfer: string;
  kind: 'risk' | 'ordinary';
  context: string;
  chat: ChatStory;
  question: string;
  actions: PracticeOption[];
  correctAction: number;
  reasons: PracticeReason[];
  correctReason: number;
  consequence: string;
  rule: string;
  sourceIds: string[];
}
export interface PracticeSource {
  title: string;
  url: string;
  note: string;
}
export const practiceSources: Record<string, PracticeSource> = {
  unicefFacts: {
    title: 'UNICEF: як перевіряти інформацію',
    url: 'https://www.unicef.org/eca/stories/quick-guide-spotting-misinformation',
    note: 'Рекомендації про джерела, перевірку й відповідальне поширення. Шкільні історії нижче вигадані; це не випадки, описані UNICEF.',
  },
  unicefPrivacy: {
    title: 'UNICEF: безпека дитини онлайн',
    url: 'https://www.unicef.org/parenting/child-care/keep-your-child-safe-online',
    note: 'Рекомендації про приватність, поширення матеріалів, повагу й підтримку після неприємного досвіду. Персонажі та діалоги — авторські.',
  },
  esafetyMoney: {
    title: 'eSafety Commissioner: гроші в іграх',
    url: 'https://www.esafety.gov.au/parents/issues-and-advice/gaming/how-to-manage-money-in-games',
    note: 'Основа для обговорення вартості ігрових покупок і сімейних домовленостей. Ціни й умови в завданнях вигадані.',
  },
  esafetyKids: {
    title: 'eSafety Commissioner: безпека для дітей',
    url: 'https://www.esafety.gov.au/kids/I-want-help-with/being-safe-online',
    note: 'Рекомендації щодо особистих відомостей і допомоги дорослого. Завдання адаптовано до вже вивчених правил.',
  },
  ftc: {
    title: 'FTC, 14.03.2023: небажані покупки у Fortnite',
    url: 'https://www.ftc.gov/news-events/news/press-releases/2023/03/ftc-finalizes-order-requiring-fortnite-maker-epic-games-pay-245-million-tricking-users-making',
    note: 'Реальний випадок: FTC описала незрозуміле розташування кнопок, що призводило до небажаних покупок, і затвердила відповідний припис. Вправа «Я хотів лише подивитися» — вигадана адаптація цього механізму; вона не описує сучасний інтерфейс Fortnite й не обіцяє повернення грошей.',
  },
  robloxShare: {
    title: 'Roblox Support: чи можна ділитися акаунтом',
    url: 'https://en.help.roblox.com/hc/en-us/articles/360000236103-Can-I-share-my-account',
    note: 'Офіційне пояснення: інший користувач акаунта може змінювати його та витрачати ігрові цінності. Допомога друга не потребує передавання пароля.',
  },
  robloxSafe: {
    title: 'Roblox Support: захист профілю',
    url: 'https://en.help.roblox.com/hc/en-us/articles/203313380-Keep-Your-Account-Safe',
    note: 'Основа для правил про паролі, коди, невідомі завантаження та підроблені пропозиції. Вигадані діалоги не є цитатами або підтвердженими інцидентами.',
  },
};
export const option = (text: string, feedback: string): PracticeOption => ({
  text,
  feedback,
});
export const reason = (
  action: number,
  text: string,
  feedback: string,
): PracticeReason => ({ action, text, feedback });
type ChatLine = [string, string, Pick<ChatMessage, 'reactions' | 'forwarded'>?];
export const chat = (name: string, lines: ChatLine[]): ChatStory => ({
  name,
  subtitle: 'Вигадана навчальна ситуація',
  messages: lines.map(([author, text, details], i) => ({
    ...details,
    author,
    text,
    time: `15:${String(10 + i).padStart(2, '0')}`,
    outgoing: i % 2 === 1,
  })),
});

export const conversation = (
  name: string,
  lines: [string, string][],
  art: ComicStripId,
): ChatStory => ({
  ...chat(name, lines),
  messages: chat(name, lines).messages.map((message, index) => ({
    ...message,
    comicArt: comicStrip(art, index % 2 === 0 ? 0 : 1),
  })),
  medium: 'in-person',
  adultAuthors: lines
    .map(([author]) => author)
    .filter((author) => ['Мама', 'Тато'].includes(author)),
});

export interface PracticeAttempt {
  action: number | null;
  reason: number | null;
  checked: boolean;
}
export function practiceSolved(task: PracticeTask, attempt: PracticeAttempt) {
  return (
    attempt.checked &&
    attempt.action === task.correctAction &&
    attempt.reason === task.correctReason
  );
}
export const freshPracticeAttempt = (): PracticeAttempt => ({
  action: null,
  reason: null,
  checked: false,
});

/** Respond to the child's reasoning, including when both choices are mistaken. */
export function practiceFeedback(task: PracticeTask, attempt: PracticeAttempt) {
  if (!attempt.checked || attempt.action === null || attempt.reason === null)
    return null;
  const action = task.actions[attempt.action];
  const reason = task.reasons[attempt.reason];
  if (!action || !reason) return null;
  const actionCorrect = attempt.action === task.correctAction;
  const reasonCorrect = attempt.reason === task.correctReason;
  return {
    title:
      actionCorrect && reasonCorrect
        ? 'Так, правильно!'
        : reasonCorrect
          ? 'Ти правильно пояснюєш. А як тоді вчинити?'
          : actionCorrect
            ? 'Дія підходить. Розберімо твоє пояснення.'
            : 'Не зовсім так. Розберімося.',
    text: reason.feedback,
  };
}
