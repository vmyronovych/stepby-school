import { useLayoutEffect, useRef, type RefObject } from 'react';
import type { DocumentSection, DocumentServices } from '../types';

function jumpTo(
  body: HTMLElement,
  id: string,
  instant: boolean,
  reducedMotion: boolean,
) {
  const target = [...body.querySelectorAll<HTMLElement>('[id]')].find(
    (element) => element.id === id,
  );
  target?.scrollIntoView({
    behavior: instant || reducedMotion ? 'auto' : 'smooth',
    block: 'start',
  });
}

/** Keep interactive diagrams alive when only a document anchor or preset changes. */
export function useDocumentLifecycle(
  bodyRef: RefObject<HTMLDivElement | null>,
  topicId: string,
  section: DocumentSection,
  sub: string | null,
  services: DocumentServices,
) {
  const latest = useRef({ sub, services });
  latest.current = { sub, services };
  const previousSub = useRef(sub);

  useLayoutEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    const current = latest.current;
    const ktp = current.services.getKtp();
    body
      .querySelectorAll<HTMLElement>('[contenteditable][data-k]')
      .forEach((field) => {
        const key = field.dataset.k;
        if (key && ktp[key]) field.textContent = ktp[key];
      });
    previousSub.current = current.sub;
    section.init?.(body, current.sub);
    if (current.sub && !section.onSub) {
      jumpTo(body, current.sub, true, current.services.reducedMotion());
    }
    return () => section.leave?.();
  }, [bodyRef, section, topicId]);

  useLayoutEffect(() => {
    if (previousSub.current === sub) return;
    previousSub.current = sub;
    if (section.onSub) {
      section.onSub(sub);
    } else if (sub && bodyRef.current) {
      jumpTo(
        bodyRef.current,
        sub,
        false,
        latest.current.services.reducedMotion(),
      );
    } else {
      window.scrollTo({
        top: 0,
        behavior: latest.current.services.reducedMotion() ? 'auto' : 'smooth',
      });
    }
  }, [bodyRef, section, sub, topicId]);
}
