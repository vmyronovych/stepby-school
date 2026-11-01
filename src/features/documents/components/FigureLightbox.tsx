import { useEffect, useMemo } from 'react';
import { Button } from '../../../components/ui';
import { FIGURE_PRINT_CSS, printHtml } from '../printing';

interface FigureLightboxProps {
  html: string | null;
  onClose(): void;
  notify(message: string): void;
}

export function FigureLightbox({ html, onClose, notify }: FigureLightboxProps) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const enlargedHtml = useMemo(() => {
    if (!html) return '';
    const figure = document.createElement('template');
    figure.innerHTML = html;
    const caption = figure.content.querySelector('figcaption');
    if (caption) caption.className = 'cap';
    return figure.innerHTML;
  }, [html]);

  return (
    <div
      className={`robo-lightbox${html !== null ? ' on' : ''}`}
      id="roboLightbox"
      onClick={onClose}
    >
      <div className="box">
        <div
          style={{ display: 'contents' }}
          dangerouslySetInnerHTML={{ __html: enlargedHtml }}
        />
        {html !== null && (
          <div className="acts" onClick={(event) => event.stopPropagation()}>
            <Button
              small
              data-print-fig
              onClick={() => printHtml('Схема', html, FIGURE_PRINT_CSS, notify)}
            >
              🖨 Друкувати цю схему
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
