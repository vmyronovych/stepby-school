import { useRef, useState } from 'react';

const photo = 'assets/media-literacy/tower-on-desk.png';
const description =
  'На дерев’яному столі стоїть кольорова вежа з кубиків. Збоку лежить зошит із написами: Данило Коваль, школа «Веселка», телефон мами 000 000 00 00. Усі відомості вигадані.';

export function TowerPhoto() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [zoomed, setZoomed] = useState(false);
  return (
    <figure className="media-tower-photo" aria-label="Фото Данила">
      <figcaption>Фото, яке Данило хоче надіслати</figcaption>
      <button
        type="button"
        className="media-photo-open"
        aria-label="Розглянути фото на весь екран"
        onClick={() => dialog.current?.showModal()}
      >
        <img src={photo} alt={description} />
        <span>Розглянути фото ↗</span>
      </button>
      <p className="media-muted">
        Навчальна ілюстрація. Усі відомості вигадані.
      </p>
      <dialog
        ref={dialog}
        className="media-photo-dialog"
        aria-label="Розглядаємо фото Данила"
        onClose={() => setZoomed(false)}
      >
        <div className="media-photo-controls">
          <button
            className="btn gray"
            type="button"
            aria-pressed={zoomed}
            onClick={() => setZoomed(!zoomed)}
          >
            {zoomed ? 'Увесь знімок' : 'Збільшити деталі'}
          </button>
          <button
            className="btn primary"
            type="button"
            onClick={() => dialog.current?.close()}
            autoFocus
          >
            Закрити ✕
          </button>
        </div>
        <div
          className={`media-photo-viewport${zoomed ? ' is-zoomed' : ''}`}
          tabIndex={0}
          aria-label="Зображення; після збільшення його можна прокручувати"
        >
          <img src={photo} alt={description} />
        </div>
      </dialog>
    </figure>
  );
}
