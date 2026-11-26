import type { ReactNode } from 'react';
import type { Topic, CourseLinks } from '../../types';

/** Repository-authored lesson content and an optional interactive illustration. */
export interface DocumentSection {
  title: string;
  html: string;
  app?: boolean;
  init?(body: HTMLElement, sub: string | null): void;
  onSub?(sub: string | null): void;
  leave?(): void;
}

export interface DocumentServices {
  handleAction?(action: string, body: HTMLElement): void;
  editableFields?(): Record<string, string>;
  notify(message: string): void;
  reducedMotion(): boolean;
}

export interface DocumentPageProps {
  children?: ReactNode;
  navigation?: ReactNode;
  topic: Topic;
  section: DocumentSection | undefined;
  sub: string | null;
  breadcrumbs: { text: string; href?: string }[];
  hrefForSub(sub: string): string;
  services: DocumentServices;
}

export interface DocumentHeading {
  id: string;
  title: string;
}

/** Navigation supplied by a course or by the application's default layout. */
export type DocumentNavigation = Pick<
  DocumentPageProps,
  'breadcrumbs' | 'navigation'
>;

export interface DocumentContentContext {
  links: CourseLinks;
  topic: Topic;
  section: DocumentSection;
  sub: string | null;
  pageUrl: string;
}
export type DocumentContentRenderer = (
  context: DocumentContentContext,
) => ReactNode;
