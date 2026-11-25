import { lessonImageAssets, moonImageAssets } from '../content/media';

export function ImageBank({
  onInsert,
  collection,
}: {
  onInsert(snippet: string): void;
  collection?: 'moon';
}) {
  const moon = collection === 'moon';
  const assets = moon ? moonImageAssets : lessonImageAssets;
  const archive = moon ? 'moon-images.zip' : 'images.zip';
  const example = moon ? 'moon-01.svg' : 'flower.svg';
  return (
    <details className="web-image-bank">
      <summary>{moon ? 'Ілюстрації Місяця' : 'Зображення для завдань'}</summary>
      <p>
        Постав курсор у body й обери зображення.
        {!moon && (
          <>
            {' '}
            Для фону використовуй назву файлу в CSS:{' '}
            <code>background-image: url("meadow.svg");</code>
          </>
        )}
      </p>
      <p>
        Для роботи в локальному редакторі завантаж картинки окремо або весь
        комплект.
      </p>
      <a
        href={`assets/web-development/media/${archive}`}
        download={archive}
        className="btn ghost"
      >
        {moon
          ? 'Завантажити ілюстрації Місяця (ZIP)'
          : 'Завантажити всі картинки (ZIP)'}
      </a>
      <ol>
        <li>Розпакуй архів в окрему папку.</li>
        <li>
          Створи в цій папці файл <code>index.html</code> поруч із картинками.
        </li>
        <li>
          Використовуй назви файлів без змін, наприклад{' '}
          <code>{`src="${example}"`}</code>
          {!moon && (
            <>
              {' '}
              або <code>url("meadow.svg")</code> у внутрішньому CSS
            </>
          )}
          .
        </li>
      </ol>
      <div className="web-image-options">
        {assets.map((asset) => (
          <div className="web-image-card" key={asset.filename}>
            <button
              type="button"
              onClick={() =>
                onInsert(
                  `\n<img src="${asset.filename}" alt="${asset.label}">\n`,
                )
              }
            >
              <img src={asset.src} alt="" width="90" height="54" />
              <span>{asset.label}</span>
              <code>{asset.filename}</code>
            </button>
            <a
              href={asset.src}
              download={asset.filename}
              aria-label={`Завантажити ${asset.filename}`}
            >
              Завантажити SVG
            </a>
          </div>
        ))}
      </div>
      <p className="web-note">
        Це локальні навчальні ілюстрації. Під час завантаження HTML вони
        вбудовуються у HTML-файл. Перегляд також підтримує вбудовані PNG, JPEG,
        GIF та WebP; зовнішні адреси не завантажуються.
      </p>
    </details>
  );
}
