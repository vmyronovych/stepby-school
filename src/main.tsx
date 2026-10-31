import { createRoot, type Root } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { Fragment, type ReactNode } from 'react';
import { StudentPage } from './features/student/StudentPage';
import { ToolPage } from './features/tools/ToolPage';

let root: Root | null = null;
let revision = 0;
function mount(page: ReactNode) {
  root ??= createRoot(document.getElementById('app')!);
  // Legacy routing reads DOM and scroll positions immediately after render().
  // Each revision replaces input and formula DOM, matching the existing engines.
  flushSync(() => root!.render(<Fragment key={++revision}>{page}</Fragment>));
}
export function renderStudent() {
  mount(<StudentPage />);
}
export function renderTool() {
  mount(<ToolPage />);
}
export function unmount() {
  if (root) {
    root.unmount();
    root = null;
  }
}
