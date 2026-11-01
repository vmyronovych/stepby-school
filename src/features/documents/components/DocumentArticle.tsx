import {
  useRef,
  type FocusEvent,
  type MouseEvent,
  type ReactNode,
} from 'react';
import type { Topic } from '../../../types';
import type { DocumentSection, DocumentServices } from '../types';
import { useDocumentLifecycle } from '../hooks/useDocumentLifecycle';
import { printKtp, printMorse, printRules } from '../printing';

interface DocumentArticleProps {
  children?: ReactNode;
  topic: Topic;
  section: DocumentSection;
  sub: string | null;
  services: DocumentServices;
  onOpenFigure(html: string): void;
}

export function DocumentArticle({
  topic,
  section,
  sub,
  services,
  onOpenFigure,
  children,
}: DocumentArticleProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  useDocumentLifecycle(bodyRef, topic.id, section, sub, services);

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    const field = event.target.closest<HTMLElement>(
      '[contenteditable][data-k]',
    );
    const key = field?.dataset.k;
    if (key) services.getKtp()[key] = field?.textContent?.trim() ?? '';
  }

  function clearKtp(body: HTMLElement) {
    if (!window.confirm('Очистити всі заповнені поля КТП?')) return;
    services.clearKtp();
    body
      .querySelectorAll<HTMLElement>('[contenteditable][data-k]')
      .forEach((field) => {
        if (/^[dn]\d/.test(field.dataset.k ?? '')) field.textContent = '';
      });
    services.notify('Поля КТП очищено');
  }

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    const target = event.target;
    const body = bodyRef.current;
    if (!(target instanceof Element) || !body) return;
    const figure = target.closest('figure.fig');
    if (figure) {
      onOpenFigure(figure.innerHTML);
      return;
    }
    const button = target.closest('button');
    switch (button?.id) {
      case 'rulesPoster':
        printRules(body, true, services.notify);
        break;
      case 'rulesCard':
        printRules(body, false, services.notify);
        break;
      case 'morsePrint':
        printMorse(body, services.notify);
        break;
      case 'ktpPrint':
        printKtp(body, services.notify);
        break;
      case 'ktpClear':
        clearKtp(body);
        break;
    }
  }

  return (
    <div
      className={section.app ? 'doc-app' : 'robo-body'}
      id="roboBody"
      ref={bodyRef}
      onClick={handleClick}
      onBlur={handleBlur}
    >
      <h1 className="page">{section.title}</h1>
      <p className="sub">{topic.desc}</p>
      {/* Lesson prose and SVG remain content assets. Diagram engines use their own mounted subtree. */}
      {children ?? (
        <div
          style={{ display: 'contents' }}
          dangerouslySetInnerHTML={{ __html: section.html }}
        />
      )}
    </div>
  );
}
