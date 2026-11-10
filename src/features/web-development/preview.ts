import {
  embedLessonImages,
  isLessonImageSource,
  lessonImageAssets,
} from './media';

/** Keep learner markup outside the application DOM and deny active content. */
export interface PreviewOptions {
  formatting?: boolean;
  classes?: boolean;
  lists?: boolean;
  images?: boolean;
  links?: boolean;
  tables?: boolean;
  tableSpans?: boolean;
  externalCss?: boolean;
  forms?: boolean;
}

export function previewDocument(
  source: string,
  options: PreviewOptions = {},
  css = '',
): string {
  const document = new DOMParser().parseFromString(
    options.images ? embedLessonImages(source) : source,
    'text/html',
  );
  if (options.externalCss) {
    for (const link of document.querySelectorAll('link')) {
      if (
        link.getAttribute('rel') === 'stylesheet' &&
        ['style.css', './style.css'].includes(link.getAttribute('href') ?? '')
      ) {
        const style = document.createElement('style');
        // CSS is raw text in HTML. Escape '<' so serialization cannot close this style element.
        style.textContent = (
          options.images ? embedLessonImages(css) : css
        ).replace(/</g, '\\3c ');
        link.replaceWith(style);
      }
    }
  }
  const allowed = new Set([
    'HTML',
    'HEAD',
    'BODY',
    'TITLE',
    'META',
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
    'P',
    'BR',
  ]);
  if (options.links) allowed.add('A');
  if (options.forms)
    for (const tag of ['FORM', 'LABEL', 'INPUT', 'TEXTAREA', 'BUTTON'])
      allowed.add(tag);
  if (options.tables)
    for (const tag of [
      'TABLE',
      'CAPTION',
      'THEAD',
      'TBODY',
      'TFOOT',
      'TR',
      'TH',
      'TD',
      'DIV',
    ])
      allowed.add(tag);
  if (options.lists)
    for (const tag of ['UL', 'OL', 'LI', 'HR']) allowed.add(tag);
  if (options.images)
    for (const tag of ['IMG', 'FIGURE', 'FIGCAPTION', 'DIV']) allowed.add(tag);
  if (options.formatting) {
    for (const tag of [
      'STYLE',
      'STRONG',
      'EM',
      'B',
      'I',
      'U',
      'S',
      'DEL',
      'SUP',
      'SUB',
      'SPAN',
    ])
      allowed.add(tag);
  }
  for (const element of [...document.querySelectorAll('*')]) {
    if (!allowed.has(element.tagName)) {
      element.remove();
      continue;
    }
    for (const attribute of [...element.attributes]) {
      const keep =
        (options.forms &&
          attribute.name === 'id' &&
          /^\S{1,100}$/.test(attribute.value)) ||
        (options.forms &&
          element.tagName === 'LABEL' &&
          attribute.name === 'for') ||
        (options.forms &&
          ['INPUT', 'TEXTAREA', 'BUTTON'].includes(element.tagName) &&
          (['name', 'value', 'placeholder', 'disabled'].includes(
            attribute.name,
          ) ||
            (attribute.name === 'type' &&
              (element.tagName === 'INPUT'
                ? /^(text|password|submit|reset|button)$/
                : /^(submit|reset|button)$/
              ).test(attribute.value)) ||
            (['INPUT', 'TEXTAREA'].includes(element.tagName) &&
              ['required', 'readonly', 'maxlength'].includes(attribute.name)) ||
            (element.tagName === 'TEXTAREA' &&
              ['rows', 'cols'].includes(attribute.name) &&
              /^[1-9]\d{0,2}$/.test(attribute.value)))) ||
        (options.links &&
          element.tagName === 'A' &&
          ['href', 'title', 'target', 'rel', 'download'].includes(
            attribute.name,
          )) ||
        ((options.links || options.tableSpans) &&
          attribute.name === 'id' &&
          /^\S{1,100}$/.test(attribute.value)) ||
        ((options.links || options.tables) &&
          ['title', 'aria-label'].includes(attribute.name)) ||
        (options.tables &&
          element.tagName === 'TH' &&
          attribute.name === 'scope' &&
          /^(col|row|colgroup|rowgroup)$/.test(attribute.value)) ||
        (options.tableSpans &&
          ['TD', 'TH'].includes(element.tagName) &&
          ['colspan', 'rowspan'].includes(attribute.name) &&
          /^[1-9]\d?$/.test(attribute.value)) ||
        (options.tableSpans &&
          ['TD', 'TH'].includes(element.tagName) &&
          attribute.name === 'headers' &&
          /^[\w -]+$/.test(attribute.value)) ||
        (options.lists &&
          ['UL', 'OL'].includes(element.tagName) &&
          attribute.name === 'role' &&
          attribute.value === 'list') ||
        (options.lists &&
          element.tagName === 'OL' &&
          ((attribute.name === 'type' && /^[1AaIi]$/.test(attribute.value)) ||
            (attribute.name === 'start' &&
              /^-?\d{1,6}$/.test(attribute.value)))) ||
        (options.images &&
          element.tagName === 'IMG' &&
          (attribute.name === 'alt' ||
            (attribute.name === 'src' &&
              isLessonImageSource(attribute.value)) ||
            (['width', 'height'].includes(attribute.name) &&
              /^[1-9]\d{0,3}$/.test(attribute.value)))) ||
        (options.classes && attribute.name === 'class') ||
        (element.tagName === 'HTML' && attribute.name === 'lang') ||
        (element.tagName === 'META' &&
          ['charset', 'name', 'content'].includes(attribute.name));
      if (!keep) element.removeAttribute(attribute.name);
    }
  }
  if (options.links) {
    for (const anchor of document.querySelectorAll('a')) {
      const href = anchor.getAttribute('href');
      const asset = lessonImageAssets.find((item) => item.src === href);
      anchor.removeAttribute('target');
      anchor.removeAttribute('rel');
      if (href?.startsWith('#') && !/\s/.test(href)) {
        // srcdoc inherits its parent's base URL; an explicit URL keeps anchors inside this frame.
        anchor.setAttribute('href', 'about:srcdoc' + href);
        anchor.removeAttribute('download');
      } else if (options.images && asset && anchor.hasAttribute('download')) {
        anchor.setAttribute('download', asset.filename);
      } else {
        anchor.removeAttribute('href');
        anchor.removeAttribute('download');
        if (href !== null) {
          anchor.setAttribute('role', 'link');
          anchor.setAttribute('aria-disabled', 'true');
          anchor.setAttribute('tabindex', '0');
          anchor.setAttribute('data-preview-href', asset?.filename ?? href);
          anchor.setAttribute(
            'title',
            `Перевір це посилання у завантаженому HTML: ${asset?.filename ?? href}`,
          );
        }
      }
    }
  }
  const policy = document.createElement('meta');
  policy.httpEquiv = 'Content-Security-Policy';
  policy.content = "default-src 'none'; form-action 'none'; base-uri 'none'";
  if (options.formatting) policy.content += "; style-src 'unsafe-inline'";
  if (options.images) policy.content += '; img-src data:';
  document.head.prepend(policy);
  return '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
}
