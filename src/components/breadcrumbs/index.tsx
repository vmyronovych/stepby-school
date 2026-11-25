import { Fragment } from 'react';

export function Breadcrumbs({
  parts,
}: {
  parts: { text: string; href?: string }[];
}) {
  return (
    <div className="crumbs">
      {parts.map((part, index) => (
        <Fragment key={index}>
          {part.href ? (
            <a href={part.href}>{part.text}</a>
          ) : (
            <span>{part.text}</span>
          )}
          {index < parts.length - 1 && <span className="sep">›</span>}
        </Fragment>
      ))}
    </div>
  );
}
