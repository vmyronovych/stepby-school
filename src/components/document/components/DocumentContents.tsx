import type { DocumentHeading } from '../types';

interface DocumentContentsProps {
  headings: DocumentHeading[];
  hrefForSub(sub: string): string;
}

export function DocumentContents({
  headings,
  hrefForSub,
}: DocumentContentsProps) {
  if (!headings.length) return null;
  return (
    <aside className="robo-toc" id="roboToc">
      <div className="tt">У цьому розділі</div>
      {headings.map((heading) => (
        <a key={heading.id} href={hrefForSub(heading.id)}>
          {heading.title}
        </a>
      ))}
    </aside>
  );
}
