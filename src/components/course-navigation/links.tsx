import { createContext, useContext, type ReactNode } from 'react';
import type { CourseLinks } from '../../types';

const LinksContext = createContext<CourseLinks | null>(null);

export function CourseLinksProvider({
  links,
  children,
}: {
  links: CourseLinks;
  children: ReactNode;
}) {
  return (
    <LinksContext.Provider value={links}>{children}</LinksContext.Provider>
  );
}
export function useCourseLinks(): CourseLinks {
  const links = useContext(LinksContext);
  if (!links) throw new Error('Course navigation links are not supplied');
  return links;
}
