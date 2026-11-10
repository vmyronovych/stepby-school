import { lessonImageAssets } from './media';

export function ImageBank({ onInsert }: { onInsert(snippet: string): void }) {
  return (
    <details className="web-image-bank">
      <summary>Зображення для завдань</summary>
      <p>
        Постав курсор у body й обери зображення. Для фону використовуй назву
        файлу в CSS, наприклад <code>background-image: url("meadow.svg");</code>
        .
      </p>
      <div className="web-image-options">
        {lessonImageAssets.map((asset) => (
          <button
            type="button"
            key={asset.filename}
            onClick={() =>
              onInsert(`\n<img src="${asset.filename}" alt="${asset.label}">\n`)
            }
          >
            <img src={asset.src} alt="" width="90" height="54" />
            <span>{asset.label}</span>
            <code>{asset.filename}</code>
          </button>
        ))}
      </div>
      <p className="web-note">
        Це локальні навчальні ілюстрації. Під час завантаження вони вбудовуються
        у HTML-файл. Перегляд також підтримує вбудовані PNG, JPEG, GIF та WebP;
        зовнішні адреси не завантажуються.
      </p>
    </details>
  );
}
