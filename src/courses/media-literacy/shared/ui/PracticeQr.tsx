import { useMemo } from 'react';
import { qrMatrix } from '../content/qr';

export function PracticeQr({ url, title }: { url: string; title: string }) {
  const code = useMemo(() => {
    try {
      return qrMatrix(url);
    } catch {
      return null;
    }
  }, [url]);
  const size = (code?.length ?? 0) + 8;
  const path = code
    ?.flatMap((row, y) =>
      row.flatMap((dark, x) => (dark ? [`M${x + 4},${y + 4}h1v1h-1z`] : [])),
    )
    .join(' ');
  return (
    <section className="media-qr-screen">
      <div>
        <h2>Практика учня</h2>
        <p>{title}</p>
        <p>Відскануйте QR-код і відкрийте завдання на своєму пристрої.</p>
        <a href={url}>Відкрити практику</a>
        <p className="media-share-url">{url}</p>
        {url.startsWith('file:') && (
          <p className="media-muted">
            Локальна перевірка: ця адреса відкриває файл на цьому комп’ютері.
            Для учнівських пристроїв відкрийте опублікований сайт.
          </p>
        )}
      </div>
      {code ? (
        <svg
          className="media-qr"
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-label={`QR-код: ${title} — практика учня`}
          shapeRendering="crispEdges"
        >
          <rect width={size} height={size} fill="white" />
          <path d={path} fill="black" />
        </svg>
      ) : (
        <p role="status">
          QR-код недоступний. Скористайтеся посиланням на практику.
        </p>
      )}
    </section>
  );
}
