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
  children: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [mount, setMount] = useState<Element | null>(null);
  useLayoutEffect(() => {
    setMount(root.current?.querySelector(selector) ?? null);
  }, [html, selector]);
  return (
    <>
      <div
        ref={root}
        style={{ display: 'contents' }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {mount && createPortal(children, mount)}
    </>
  );
}
