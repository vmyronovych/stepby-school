import { useSyncExternalStore } from 'react';

let message = '';
let timeout: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();
function publish(value: string) {
  message = value;
  listeners.forEach((listener) => listener());
}
export function notify(value: string) {
  clearTimeout(timeout);
  publish(value);
  timeout = setTimeout(() => publish(''), 2200);
}
export function Toast() {
  const value = useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => message,
  );
  return (
    <div className={`toast${value ? ' show' : ''}`} id="toast" role="status">
      {value}
    </div>
  );
}
