import { useLayoutEffect, useSyncExternalStore } from 'react';
import type { KeyboardController } from '../types';

export function useKeyboardController(
  controller: KeyboardController,
  preset: string | null,
) {
  const snapshot = useSyncExternalStore(
    controller.subscribe,
    controller.getSnapshot,
  );
  useLayoutEffect(() => {
    controller.activate(preset);
    const handleKey = (event: KeyboardEvent) => controller.handleKey(event);
    const releaseKeys = () => controller.releaseKeys();
    document.addEventListener('keydown', handleKey);
    document.addEventListener('keyup', handleKey);
    window.addEventListener('blur', releaseKeys);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('keyup', handleKey);
      window.removeEventListener('blur', releaseKeys);
      controller.deactivate();
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    };
    // Preset changes update the model without removing native key listeners.
  }, [controller]);
  useLayoutEffect(() => controller.applyPreset(preset), [controller, preset]);
  return snapshot;
}
