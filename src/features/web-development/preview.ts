import { embedLessonImages, isLessonImageSource } from './media';

/** Keep learner markup outside the application DOM and deny active content. */
export interface PreviewOptions {
  formatting?: boolean;
  classes?: boolean;
  lists?: boolean;
  images?: boolean;
}

export function previewDocument(
  source: string,
  options: PreviewOptions = {},
): string {
  const document = new DOMParser().parseFromString(
    options.images ? embedLessonImages(source) : source,
    'text/html',
  );
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
  const policy = document.createElement('meta');
  policy.httpEquiv = 'Content-Security-Policy';
  policy.content = "default-src 'none'; form-action 'none'; base-uri 'none'";
  if (options.formatting) policy.content += "; style-src 'unsafe-inline'";
  if (options.images) policy.content += '; img-src data:';
  document.head.prepend(policy);
  return '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
}
