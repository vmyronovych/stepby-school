import { useEffect, useRef, type MouseEvent } from 'react';

export function useFullscreenPreview() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const presentationRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const wasFullscreen = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    const presentation = presentationRef.current;
    function handleFullscreenChange() {
      if (document.fullscreenElement === presentation) {
        wasFullscreen.current = true;
      } else if (wasFullscreen.current) {
        wasFullscreen.current = false;
        dialog?.close();
        openerRef.current?.focus();
      }
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      if (presentation && document.fullscreenElement === presentation) {
        void document.exitFullscreen().catch(() => {});
      }
    };
  }, []);

  function openPreview(event: MouseEvent<HTMLButtonElement>) {
    const dialog = dialogRef.current;
    if (!dialog) return;
    openerRef.current = event.currentTarget;
    dialog.showModal();
    // Keep the modal usable when native fullscreen is unavailable.
    void presentationRef.current?.requestFullscreen?.().catch(() => {});
  }

  function closePreview() {
    if (document.fullscreenElement === presentationRef.current) {
      void document.exitFullscreen().catch(() => {});
    }
    dialogRef.current?.close();
    openerRef.current?.focus();
  }

  return { dialogRef, presentationRef, openPreview, closePreview };
}
