import { useId, useState } from 'react';
import { Button } from '../../../components/ui';
import {
  wordGalleryGroups,
  wordScreenshots,
  type WordGalleryGroup,
  type WordScreenshot,
} from '../data/word2013';
import { useFullscreenPreview } from '../hooks/useFullscreenPreview';

const colors = ['#dc2626', '#1565c0', '#13804b', '#8b36bd'];

function Screenshot({
  slide,
  marked,
}: {
  slide: WordScreenshot;
  marked: boolean;
}) {
  const view = slide.crop ?? [0, 0, slide.width, slide.height];
  const clipId = useId();
  return (
    <svg
      className="word-shot-image"
      viewBox={view.join(' ')}
      role="img"
      aria-label={`${slide.title}. ${slide.marks.map((mark) => mark.label).join('. ')}`}
    >
      <defs>
        <clipPath id={clipId}>
          <path
            d={`M${view[0]} ${view[1]}h${view[2]}v${view[3]}h${-view[2]}Z`}
          />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <image
          href={`assets/documents/word2013/${slide.image}`}
          width={slide.width}
          height={slide.height}
        />
        {marked &&
          slide.marks.map((mark, index) => (
            <g key={mark.label}>
              <rect
                x={mark.rect[0]}
                y={mark.rect[1]}
                width={mark.rect[2]}
                height={mark.rect[3]}
                fill="none"
                stroke="white"
                strokeWidth="6"
                vectorEffect="non-scaling-stroke"
              />
              <rect
                x={mark.rect[0]}
                y={mark.rect[1]}
                width={mark.rect[2]}
                height={mark.rect[3]}
                fill="none"
                stroke={colors[index % colors.length]}
                strokeWidth="3"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          ))}
      </g>
    </svg>
  );
}

export function WordScreenshotGallery({ group }: { group: WordGalleryGroup }) {
  const gallery = wordGalleryGroups[group];
  const [index, setIndex] = useState(0);
  const [marked, setMarked] = useState(true);
  const titleId = useId();
  const { dialogRef, presentationRef, openPreview, closePreview } =
    useFullscreenPreview();
  const slide = wordScreenshots[gallery.slides[index]];

  function move(delta: number) {
    setIndex((current) =>
      Math.max(0, Math.min(gallery.slides.length - 1, current + delta)),
    );
  }

  function controls() {
    return (
      <div className="word-shot-controls">
        <Button
          small
          variant="gray"
          disabled={index === 0}
          onClick={() => move(-1)}
        >
          Назад
        </Button>
        <span aria-live="polite">
          {index + 1} / {gallery.slides.length}
        </span>
        <Button
          small
          variant="gray"
          disabled={index === gallery.slides.length - 1}
          onClick={() => move(1)}
        >
          Далі
        </Button>
        <Button
          small
          variant="gray"
          aria-pressed={marked}
          onClick={() => setMarked((value) => !value)}
        >
          {marked ? 'Сховати обводки' : 'Показати обводки'}
        </Button>
      </div>
    );
  }

  function description() {
    return (
      <div className="word-shot-description">
        <p>{slide.instruction}</p>
        <ul className="word-shot-legend">
          {slide.marks.map((mark, markIndex) => (
            <li key={mark.label}>
              <span
                aria-hidden="true"
                style={{ borderColor: colors[markIndex % colors.length] }}
              />
              {mark.label}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <section
      className="word-shot-gallery"
      aria-labelledby={titleId}
      data-word-gallery={group}
    >
      <h4 id={titleId}>{gallery.title}</h4>
      <p className="inf-note">
        Навчальні ілюстрації інтерфейсу Word 2013 українською.
      </p>
      <div className="word-shot-tabs" aria-label="Ілюстрації для демонстрації">
        {gallery.slides.map((id, slideIndex) => (
          <button
            type="button"
            key={id}
            aria-pressed={index === slideIndex}
            onClick={() => setIndex(slideIndex)}
          >
            {wordScreenshots[id].title}
          </button>
        ))}
      </div>
      <div className="word-shot-heading">
        <strong aria-live="polite">{slide.title}</strong>
        <Button small variant="gray" onClick={openPreview}>
          На весь екран
        </Button>
      </div>
      <Screenshot slide={slide} marked={marked} />
      {description()}
      {controls()}
      <dialog
        ref={dialogRef}
        className="lesson-example-dialog word-shot-dialog"
        aria-label={gallery.title}
        onCancel={(event) => {
          event.preventDefault();
          closePreview();
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            move(event.key === 'ArrowRight' ? 1 : -1);
          }
        }}
      >
        <div
          ref={presentationRef}
          className="lesson-example-presentation word-shot-presentation"
        >
          <div className="lesson-example-toolbar">
            <strong aria-live="polite">{slide.title}</strong>
            <Button small variant="gray" onClick={closePreview} autoFocus>
              Закрити · Esc
            </Button>
          </div>
          <div className="word-shot-stage">
            <Screenshot slide={slide} marked={marked} />
            {description()}
          </div>
          {controls()}
        </div>
      </dialog>
    </section>
  );
}
