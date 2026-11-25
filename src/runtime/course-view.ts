import type { ReactNode } from 'react';
import type { Topic } from '../types';
export interface CourseViewContext {
  topic: Topic;
  sub: string | null;
  pageUrl: string;
}
export interface CoursePageView {
  content: ReactNode;
  wide?: boolean;
  hideHeader?: boolean;
  headerClassName?: string;
  shellClassName?: string;
  breadcrumbs?: { text: string; href?: string }[];
}
export type CoursePageRenderer = (
  context: CourseViewContext,
) => CoursePageView | null;
