/** Lesson links need display metadata, never projector controller state. */
export interface ProjectorMetadata {
  title: string;
  icon: string;
  presets: Readonly<Record<string, { label: string }>>;
}

export const projectorMetadata: Readonly<Record<string, ProjectorMetadata>> = {
  keyboard: {
    title: 'Клавіатура на проєктор',
    icon: '⌨️',
    presets: {
      five: { label: "П'ять головних" },
      caps: { label: 'Велика літера' },
      bsdel: { label: 'Backspace і Delete' },
      win: { label: 'Мова: Win + Пробіл' },
      alt: { label: 'Мова: Alt + Shift' },
      let: { label: 'Літери і знаки' },
      num: { label: 'Цифри' },
      fn: { label: 'Функціональні' },
      ctl: { label: 'Спеціальні' },
      nav: { label: 'Стрілки' },
    },
  },
  windows: {
    title: 'Windows на проєктор',
    icon: '🪟',
    presets: { '10': { label: 'Windows 10' }, '11': { label: 'Windows 11' } },
  },
};
