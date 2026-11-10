/** Authored teaching illustrations. These assets are not application screenshots. */
export interface ScreenshotMark {
  rect: [number, number, number, number];
  label: string;
}

export interface WordScreenshot {
  id: string;
  title: string;
  instruction: string;
  image: string;
  width: number;
  height: number;
  crop?: [number, number, number, number];
  marks: ScreenshotMark[];
}

const editor = { image: 'illustrations/editor.svg', width: 1280, height: 840 };
const screen = (image: string) => ({
  image: `illustrations/${image}.svg`,
  width: 1280,
  height: 840,
});

export const wordScreenshots: Record<string, WordScreenshot> = {
  window: {
    ...editor,
    id: 'window',
    title: 'Чотири частини вікна Word',
    instruction:
      'Знайди стрічку, лінійку, аркуш і рядок стану. На аркуші вводимо текст, а на стрічці обираємо інструменти.',
    marks: [
      { rect: [1, 33, 1277, 149], label: 'Стрічка — вкладки та інструменти' },
      { rect: [159, 196, 964, 25], label: 'Лінійка — межі тексту й відступи' },
      { rect: [159, 232, 964, 530], label: 'Аркуш — робоче поле документа' },
      {
        rect: [1, 770, 1277, 29],
        label: 'Рядок стану — сторінки, слова та масштаб',
      },
    ],
  },
  font: {
    ...editor,
    id: 'font',
    title: 'Назва та розмір шрифту',
    crop: [188, 65, 640, 120],
    instruction:
      'Виділи основний текст. На вкладці Основне обери шрифт Arial і розмір 16.',
    marks: [
      { rect: [193, 77, 210, 34], label: 'Назва шрифту — Arial' },
      { rect: [405, 77, 62, 34], label: 'Розмір основного тексту — 16 пт' },
    ],
  },
  bold: {
    ...screen('title'),
    id: 'bold',
    title: 'Оформити заголовок',
    crop: [188, 65, 640, 120],
    instruction:
      'Виділи тільки «Про мене». Установи розмір 20 та натисни Напівжирний (Ctrl+B). Вирівнювання залиш ліворуч.',
    marks: [
      { rect: [405, 77, 62, 34], label: 'Розмір заголовка — 20 пт' },
      {
        rect: [193, 113, 34, 34],
        label: 'Напівжирний — кнопка з товстою літерою (Ctrl+B)',
      },
      { rect: [544, 113, 34, 34], label: 'Вирівнювання ліворуч' },
    ],
  },
  selection: {
    ...screen('title'),
    id: 'selection',
    title: 'Виділити заголовок',
    crop: [150, 225, 980, 360],
    instruction:
      'Протягни мишею від початку до кінця заголовка. Синє тло показує виділений текст. Тепер зміни розмір і накреслення.',
    marks: [
      {
        rect: [211, 287, 168, 51],
        label: 'Виділено тільки заголовок «Про мене»',
      },
    ],
  },
  file: {
    ...editor,
    id: 'file',
    title: 'Вкладка Файл',
    crop: [0, 0, 540, 185],
    instruction:
      'Через вкладку Файл створюємо, відкриваємо й зберігаємо документи.',
    marks: [
      { rect: [1, 32, 76, 33], label: 'Файл — команди роботи з документом' },
    ],
  },
  new: {
    ...screen('new'),
    id: 'new',
    title: 'Створити новий документ',
    instruction: 'Файл → Створити → Новий документ. Швидкий спосіб — Ctrl+N.',
    marks: [
      { rect: [2, 118, 214, 45], label: 'Створити' },
      { rect: [265, 205, 224, 290], label: 'Новий документ — порожній аркуш' },
    ],
  },
  save: {
    ...editor,
    id: 'save',
    title: 'Зберегти зміни',
    crop: [0, 0, 540, 185],
    instruction:
      'Натисни значок дискети або Ctrl+S. Під час першого збереження обери папку та ім’я файла. Надалі Ctrl+S зберігатиме зміни в цей самий файл.',
    marks: [
      { rect: [43, 2, 29, 28], label: 'Зберегти — значок дискети (Ctrl+S)' },
    ],
  },
  location: {
    ...screen('save-location'),
    id: 'location',
    title: 'Вибрати папку на комп’ютері',
    instruction:
      'Файл → Зберегти як → Комп’ютер → Огляд. У вікні збереження відкрий свою папку Тексти.',
    marks: [
      { rect: [2, 265, 214, 45], label: 'Зберегти як' },
      {
        rect: [265, 218, 370, 76],
        label: 'Комп’ютер — файл залишиться на цьому ПК',
      },
      { rect: [706, 399, 157, 125], label: 'Огляд — вибрати свою папку' },
    ],
  },
  filename: {
    ...screen('save-dialog'),
    id: 'filename',
    title: 'Назвати файл і зберегти',
    instruction:
      'Перевір папку Тексти. Уведи своє прізвище та _знайомство. Максим зберігає файл як Коваленко_знайомство. Натисни Зберегти.',
    marks: [
      { rect: [154, 87, 748, 35], label: 'Папка Тексти' },
      { rect: [222, 568, 971, 28], label: 'Ім’я файлу — Прізвище_знайомство' },
      { rect: [893, 681, 142, 32], label: 'Зберегти' },
    ],
  },
  close: {
    ...screen('close'),
    id: 'close',
    title: 'Закрити документ після збереження',
    instruction:
      'Спочатку натисни Ctrl+S. Потім Файл → Закрити або Ctrl+W. Тепер можна перевірити, чи відкривається збережений файл.',
    marks: [
      { rect: [2, 461, 214, 45], label: 'Закрити поточний документ (Ctrl+W)' },
    ],
  },
  open: {
    ...screen('open'),
    id: 'open',
    title: 'Відкрити збережений документ',
    instruction: 'Натисни Ctrl+O або Файл → Відкрити. Обери Комп’ютер → Огляд.',
    marks: [
      { rect: [2, 167, 214, 45], label: 'Відкрити (Ctrl+O)' },
      { rect: [265, 218, 370, 76], label: 'Комп’ютер' },
      { rect: [706, 399, 157, 125], label: 'Огляд' },
    ],
  },
  reopen: {
    ...screen('open-dialog'),
    id: 'reopen',
    title: 'Знайти свій файл',
    instruction:
      'У папці Тексти вибери свій документ і натисни Відкрити. Переконайся, що текст і форматування збереглися.',
    marks: [
      { rect: [275, 224, 915, 45], label: 'Наш збережений документ' },
      { rect: [893, 681, 142, 32], label: 'Відкрити' },
    ],
  },
};

export const wordGalleryGroups = {
  introduction: {
    title: 'Word 2013 на проєкторі',
    slides: ['window', 'font', 'bold'],
  },
  tour: {
    title: 'Екскурсія по вікну Word 2013',
    slides: ['window', 'font', 'selection', 'bold', 'file'],
  },
  files: {
    title: 'Створити, зберегти, відкрити',
    slides: [
      'file',
      'new',
      'save',
      'location',
      'filename',
      'close',
      'open',
      'reopen',
    ],
  },
  practice: {
    title: 'Кнопки для документа «Про мене»',
    slides: [
      'font',
      'selection',
      'bold',
      'save',
      'filename',
      'close',
      'open',
      'reopen',
    ],
  },
  recap: {
    title: 'Пригадай інструменти Word',
    slides: ['window', 'font', 'save'],
  },
} satisfies Record<string, { title: string; slides: string[] }>;

export type WordGalleryGroup = keyof typeof wordGalleryGroups;
