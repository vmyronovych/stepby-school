import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

/** Lesson prose stays an asset; interactive content inside its slot is React. */
export function ContentSlot({
  html,
  selector,
  children,
}: {
  html: string;
  selector: string;
  children: ReactNode | ((mount: Element) => ReactNode);
}) {
  const root = useRef<HTMLDivElement>(null);
  const [mounts, setMounts] = useState<Element[]>([]);
  useLayoutEffect(() => {
    setMounts([...(root.current?.querySelectorAll(selector) ?? [])]);
  }, [html, selector]);
  return (
    <>
      <div
        ref={root}
        style={{ display: 'contents' }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {mounts.map((mount, index) =>
        createPortal(
          typeof children === 'function' ? children(mount) : children,
          mount,
          String(index),
        ),
      )}
    </>
  );
}
