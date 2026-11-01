import { useCallback, useMemo, useState } from 'react';
import { Breadcrumbs } from '../../components/ui';
import type { DocumentHeading, DocumentPageProps } from './types';
import { DocumentArticle } from './components/DocumentArticle';
import { DocumentContents } from './components/DocumentContents';
import { FigureLightbox } from './components/FigureLightbox';

function readHeadings(html: string): DocumentHeading[] {
  const template = document.createElement('template');
  template.innerHTML = html;
  return [...template.content.querySelectorAll('h2[id]')].map((heading) => ({
    id: heading.id,
    title: heading.textContent ?? '',
  }));
}

export function DocumentPage({
  topic,
  section,
  sub,
  breadcrumbs,
  hrefForSub,
  services,
  children,
}: DocumentPageProps) {
  const [figure, setFigure] = useState<string | null>(null);
  const closeFigure = useCallback(() => setFigure(null), []);
  const headings = useMemo(
    () => (section && !section.app ? readHeadings(section.html) : []),
    [section],
  );

  if (!section) return <div className="empty">Розділ не знайдено</div>;

  return (
    <>
      <Breadcrumbs parts={breadcrumbs} />
      <div className={`robo-doc${headings.length ? '' : ' no-toc'}`}>
        <DocumentContents headings={headings} hrefForSub={hrefForSub} />
        <DocumentArticle
          topic={topic}
          section={section}
          sub={sub}
          services={services}
          onOpenFigure={setFigure}
        >
          {children}
        </DocumentArticle>
      </div>
      <FigureLightbox
        html={figure}
        onClose={closeFigure}
        notify={services.notify}
      />
    </>
  );
}
