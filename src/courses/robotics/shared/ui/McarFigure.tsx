import { useEffect, useRef } from 'react';
import { Button } from '../../../../components/button';
export function McarFigure({
  src,
  alt,
  caption,
  width,
  height,
  program = false,
  compact = false,
  active = true,
}: {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  program?: boolean;
  compact?: boolean;
  active?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!active && dialog.current?.open) dialog.current.close();
  }, [active]);
  const name = program ? 'блоки' : 'схему';
  return (
    <figure
      className={`robotics-wiring${compact ? ' compact' : ''}${program ? ' robotics-blocks' : ''}`}
    >
      <img src={src} alt={alt} width={width} height={height} />
      <figcaption>{caption}</figcaption>
      <Button variant="gray" onClick={() => dialog.current?.showModal()}>
        Збільшити {name}
      </Button>
      <dialog
        ref={dialog}
        className="robotics-diagram-dialog"
        aria-label={
          program
            ? 'Блоки програми Mcar'
            : 'Зображення складання та підключення'
        }
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <Button variant="gray" onClick={() => dialog.current?.close()}>
          Закрити {name}
        </Button>
        <img src={src} alt={alt} width={width} height={height} />
        <a href={src} target="_blank" rel="noopener noreferrer">
          Відкрити зображення в повному розмірі
        </a>
      </dialog>
    </figure>
  );
}
