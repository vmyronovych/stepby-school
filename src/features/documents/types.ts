import type { ReactNode } from 'react';
import type { Topic } from '../../types';

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
  getKtp(): Record<string, string>;
  clearKtp(): void;
  notify(message: string): void;
  reducedMotion(): boolean;
}

export interface DocumentPageProps {
  children?: ReactNode;
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
