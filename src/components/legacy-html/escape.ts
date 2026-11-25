export function esc(value: unknown): string {
  const entities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
  };
  return String(value).replace(/[&<>"]/g, (character) => entities[character]);
}
