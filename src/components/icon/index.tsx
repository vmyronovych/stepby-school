import type { ReactNode, CSSProperties } from 'react';

export function Icon({
  children,
  background,
  style,
}: {
  children: ReactNode;
  background: string;
  style?: CSSProperties;
}) {
  return (
    <div className="ico" style={{ background, ...style }}>
      {children}
    </div>
  );
}
