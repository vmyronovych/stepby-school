export { esc } from './escape';
// Only repository-authored lesson and tool HTML belongs here. Never pass user HTML.
export function LegacyHtml({
  html,
  className,
  id,
}: {
  html: string;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
