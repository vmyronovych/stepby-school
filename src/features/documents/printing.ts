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

export function printRules(
  body: HTMLElement,
  large: boolean,
  notify: (message: string) => void,
) {
  const rules = [...body.querySelectorAll('.rule')];
  const css =
    '@page{size:A4 portrait;margin:' +
    (large ? '10mm' : '14mm') +
    '}' +
    'body{font-family:"Trebuchet MS",Arial,sans-serif;color:#111;margin:0}' +
    'h1{text-align:center;font-size:' +
    (large ? '30pt' : '18pt') +
    ';margin:0 0 ' +
    (large ? '8mm' : '5mm') +
    '}' +
    '.r{display:flex;gap:' +
    (large ? '8mm' : '5mm') +
    ';align-items:flex-start;margin:' +
    (large ? '7mm 0' : '3.5mm 0') +
    '}' +
    '.n{flex:none;width:' +
    (large ? '18mm' : '10mm') +
    ';height:' +
    (large ? '18mm' : '10mm') +
    ';border-radius:50%;' +
    'background:#5b4be6;color:#fff;font-weight:bold;font-size:' +
    (large ? '22pt' : '13pt') +
    ';display:flex;align-items:center;justify-content:center}' +
    '.t{font-size:' +
    (large ? '20pt' : '12.5pt') +
    ';font-weight:bold;line-height:1.25}' +
    '.s{font-size:' +
    (large ? '14pt' : '10.5pt') +
    ';color:#444;margin-top:1mm}';
  const html =
    '<h1>Правила нашого гуртка</h1>' +
    rules
      .map(
        (rule, index) =>
          '<div class="r"><div class="n">' +
          (index + 1) +
          '</div><div><div class="t">' +
          escapeHtml(rule.querySelector('.rtitle')?.textContent ?? '') +
          '</div><div class="s">' +
          escapeHtml(rule.querySelector('.rsub')?.textContent ?? '') +
          '</div></div></div>',
      )
      .join('');
  printHtml('Правила гуртка', html, css, notify);
}

export function printKtp(body: HTMLElement, notify: (message: string) => void) {
  const page = body.cloneNode(true) as HTMLElement;
  page.querySelectorAll('.noprint, .robo-toc').forEach((node) => node.remove());
  const css =
    '@page{size:A4 landscape;margin:12mm}' +
    'body{font-family:Georgia,"Times New Roman",serif;color:#000;margin:0;font-size:11pt}' +
    'h1.page,p.sub{display:none}' +
    '.approve{display:flex;gap:40px;font-size:9.5pt;margin:0 0 6mm}.approve span{flex:1}' +
    'h2.ktptitle{text-align:center;font-size:15pt;margin:0 0 1mm}' +
    '.ktpsub{text-align:center;margin:0 0 3mm;font-size:11pt}' +
    '.ktpmeta{font-size:10pt;margin:0 0 4mm}' +
    'h2{font-size:12pt;margin:6mm 0 2mm}' +
    'table{border-collapse:collapse;width:100%;font-size:9.5pt}' +
    'th,td{border:1px solid #000;padding:2px 4px;vertical-align:top}th{background:#eee}' +
    'tr.modrow td{background:#ddd;font-weight:bold}' +
    '[contenteditable]{background:none;padding:0}' +
    'ul{margin:1mm 0 2mm;padding-left:6mm}li{margin:0.6mm 0}tr{page-break-inside:avoid}';
  printHtml('КТП гуртка робототехніки', page.innerHTML, css, notify);
}

export function printMorse(
  body: HTMLElement,
  notify: (message: string) => void,
) {
  const blocks = [...body.querySelectorAll('.mgrid')];
  const titles = [
    'Українські літери',
    'Цифри',
    'Розділові знаки й сигнали',
    'Латинські літери',
  ];
  const css =
    'body{font-family:Georgia,serif;margin:14mm;color:#111}' +
    'h1{font-size:20pt;margin:0 0 2mm}p.sub{margin:0 0 6mm;color:#555;font-size:10pt}' +
    'h2{font-size:12pt;margin:6mm 0 2mm}table{border-collapse:collapse;width:100%}' +
    'th,td{border:1px solid #bbb;padding:3px 6px;font-size:11pt}' +
    'th{background:#f0f0f0;width:34px;text-align:center}' +
    'td{font-family:Consolas,monospace;letter-spacing:2px}' +
    'th:empty,td:empty{border:none;background:none}';
  const html =
    '<h1>Азбука Морзе</h1><p class="sub">Крапка = 1, тире = 3. ' +
    'Пауза між літерами = 3, між словами = 7.</p>' +
    blocks
      .map(
        (block, index) =>
          '<h2>' + (titles[index] || '') + '</h2>' + block.innerHTML,
      )
      .join('');
  printHtml('Азбука Морзе', html, css, notify);
}
