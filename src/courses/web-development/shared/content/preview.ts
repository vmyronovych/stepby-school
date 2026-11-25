import {
  embedLessonMedia,
  isLessonImageSource,
  lessonImageAssets,
} from './media';
import { isLessonAvSource } from './av-media';

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
  formChoices?: boolean;
  menus?: boolean;
  semantic?: boolean;
  media?: boolean;
  scrollRegions?: boolean;
}

export function previewDocument(
  source: string,
  options: PreviewOptions = {},
  css = '',
  cssFilename = 'style.css',
): string {
  const document = new DOMParser().parseFromString(
    options.images || options.media ? embedLessonMedia(source) : source,
    'text/html',
  );
  if (options.externalCss) {
    for (const link of document.querySelectorAll('link')) {
      if (
        link.getAttribute('rel') === 'stylesheet' &&
        [cssFilename, './' + cssFilename].includes(
          link.getAttribute('href') ?? '',
        )
      ) {
        const style = document.createElement('style');
        // CSS is raw text in HTML. Escape '<' so serialization cannot close this style element.
        style.textContent = (
          options.images ? embedLessonMedia(css) : css
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
  if (options.semantic)
    for (const tag of ['HEADER', 'NAV', 'MAIN', 'SECTION', 'ARTICLE', 'FOOTER'])
      allowed.add(tag);
  if (options.media)
    for (const tag of ['AUDIO', 'VIDEO', 'SOURCE', 'TRACK']) allowed.add(tag);
  if (options.menus) for (const tag of ['NAV', 'BUTTON']) allowed.add(tag);
  if (options.forms)
    for (const tag of ['FORM', 'LABEL', 'INPUT', 'TEXTAREA', 'BUTTON'])
      allowed.add(tag);
  if (options.formChoices)
    for (const tag of ['FIELDSET', 'LEGEND', 'SELECT', 'OPTION'])
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
        (options.scrollRegions &&
          ((attribute.name === 'tabindex' && attribute.value === '0') ||
            (attribute.name === 'role' && attribute.value === 'region'))) ||
        (options.media &&
          ['AUDIO', 'VIDEO', 'SOURCE', 'TRACK'].includes(element.tagName) &&
          ((attribute.name === 'src' &&
            isLessonAvSource(
              attribute.value,
              element.tagName.toLowerCase() as
                'audio' | 'video' | 'source' | 'track',
            )) ||
            (['AUDIO', 'VIDEO'].includes(element.tagName) &&
              (['controls', 'loop', 'muted'].includes(attribute.name) ||
                (attribute.name === 'preload' &&
                  /^(none|metadata|auto)$/.test(attribute.value)))) ||
            (element.tagName === 'VIDEO' &&
              ((attribute.name === 'poster' &&
                isLessonImageSource(attribute.value)) ||
                (['width', 'height'].includes(attribute.name) &&
                  /^[1-9]\d{0,3}$/.test(attribute.value)))) ||
            (element.tagName === 'SOURCE' &&
              attribute.name === 'type' &&
              /^(audio\/wav|video\/webm)$/.test(attribute.value)) ||
            (element.tagName === 'TRACK' &&
              (['srclang', 'label', 'default'].includes(attribute.name) ||
                (attribute.name === 'kind' &&
                  /^(captions|subtitles|descriptions)$/.test(
                    attribute.value,
                  )))))) ||
        (options.menus &&
          element.tagName === 'BUTTON' &&
          attribute.name === 'type' &&
          attribute.value === 'button') ||
        (options.formChoices &&
          element.tagName === 'INPUT' &&
          ((attribute.name === 'type' &&
            /^(radio|checkbox)$/.test(attribute.value)) ||
            attribute.name === 'checked')) ||
        (options.formChoices &&
          ['SELECT', 'OPTION', 'FIELDSET'].includes(element.tagName) &&
          (attribute.name === 'disabled' ||
            (element.tagName === 'OPTION' &&
              ['value', 'selected'].includes(attribute.name)) ||
            (element.tagName === 'SELECT' &&
              (['name', 'required', 'multiple'].includes(attribute.name) ||
                (attribute.name === 'size' &&
                  /^[1-9]\d?$/.test(attribute.value)))))) ||
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
  if (options.media) policy.content += '; media-src data:';
  document.head.prepend(policy);
  return '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
}
