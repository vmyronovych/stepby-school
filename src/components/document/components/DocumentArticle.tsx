import {
  useRef,
  type FocusEvent,
  type MouseEvent,
  type ReactNode,
} from 'react';
import type { Topic } from '../../../types';
import type { DocumentSection, DocumentServices } from '../types';
import { useDocumentLifecycle } from '../hooks/useDocumentLifecycle';

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
    const fields = services.editableFields?.();
    if (key && fields) fields[key] = field?.textContent?.trim() ?? '';
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
    if (button?.id) services.handleAction?.(button.id, body);
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
