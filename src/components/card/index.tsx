import type { ReactNode, CSSProperties } from 'react';

export function Card({
  href,
  children,
  style,
}: {
  href?: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return href ? (
    <a className="card click" href={href} style={style}>
      {children}
    </a>
  ) : (
    <div className="card" style={style}>
      {children}
    </div>
  );
}
