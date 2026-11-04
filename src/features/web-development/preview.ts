/** Keep learner markup outside the application DOM and deny active content. */
export interface PreviewOptions {
  formatting?: boolean;
  classes?: boolean;
}

export function previewDocument(
  source: string,
  options: PreviewOptions = {},
): string {
  const document = new DOMParser().parseFromString(source, 'text/html');
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
  document.head.prepend(policy);
  return '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
}
