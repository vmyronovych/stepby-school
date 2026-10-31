import type { ReactNode } from 'react';
import { LegacyHtml } from './ui';

/** Shared notebook surface. Existing engines retain ownership of formula markup. */
export function Notebook({ html, children }: { html?: string; children?: ReactNode }) {
  return <div className="calc">{html !== undefined
    ? <LegacyHtml className="paper sheet" html={html} />
    : <div className="paper sheet">{children}</div>}</div>;
}
