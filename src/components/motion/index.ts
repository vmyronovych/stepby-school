export function prefersReducedMotion(): boolean {
  return !!(
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}
