import { runtimeServices } from '../../runtime/services';

export function toast(message: string): void {
  runtimeServices.toast(message);
}
export function esc(value: unknown): string {
  const entities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
  };
  return String(value).replace(/[&<>"]/g, (character) => entities[character]);
}
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a || 1;
}
export function fmtNum(value: number): string {
  return Number.isInteger(value)
    ? String(value)
    : String(Math.round(value * 100) / 100);
}
export function prefersReducedMotion(): boolean {
  return !!(
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}
export function readField(id: string): string {
  const field = document.getElementById(id);
  if (
    field instanceof HTMLInputElement ||
    field instanceof HTMLSelectElement ||
    field instanceof HTMLTextAreaElement
  )
    return field.value;
  throw new Error(`Поле «${id}» не знайдено`);
}
