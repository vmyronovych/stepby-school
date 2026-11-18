import { lessonAvAssets } from './av-media';

export function MediaBank() {
  return (
    <details className="web-media-bank">
      <summary>Аудіо, відео та описи для завдань</summary>
      <p>
        Це власні навчальні файли: короткий тональний сигнал, беззвучний рух
        позначки й українські описи кадру. Збережи файли поруч із index.html.
      </p>
      <ul>
        {lessonAvAssets.map((asset) => (
          <li key={asset.filename}>
            <a href={asset.src} download={asset.filename}>
              Завантажити {asset.filename}
            </a>{' '}
            — {asset.label}
          </li>
        ))}
      </ul>
      <a href="assets/web-development/av/media.zip" download="media.zip">
        Завантажити комплект медіа (ZIP)
      </a>
      <p className="web-note">
        Під час завантаження HTML ці три файли вбудовуються в документ. У
        локальному редакторі використовуй їхні назви у src. Для відео завжди
        залишай видимий текстовий опис.
      </p>
    </details>
  );
}
