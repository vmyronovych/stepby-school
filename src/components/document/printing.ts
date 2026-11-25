/** Printing is isolated from the page so its event handlers remain declarative. */
export const FIGURE_PRINT_CSS =
  'body{margin:0;display:flex;align-items:center;justify-content:center;height:100vh;' +
  'font-family:sans-serif}svg{width:96%;height:auto}';

function escapeHtml(value: string) {
  return value.replace(/[&<>\"]/g, (character) => {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[
      character
    ]!;
  });
}

export function printHtml(
  title: string,
  html: string,
  css: string,
  notify: (message: string) => void,
) {
  const target = window.open('', '_blank');
  if (!target) {
    notify('Дозвольте відкривати вікна, щоб друкувати');
    return;
  }
  target.document.write(
    '<!DOCTYPE html><html lang="uk"><head><meta charset="utf-8"><title>' +
      escapeHtml(title) +
      '</title><style>' +
      css +
      '</style></head><body>' +
      html +
      '</body></html>',
  );
  target.document.close();
  target.focus();
  window.setTimeout(() => target.print(), 400);
}
