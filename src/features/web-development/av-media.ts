import { lessonAvAssets } from './av-assets';

export { lessonAvAssets } from './av-assets';

/** Only the lesson's original recordings can become embedded playback sources. */
function replaceSources(source: string, embedded: boolean): string {
  return source.replace(
    /<(?:audio|video|source|track)\b(?:[^"'<>]|"[^"]*"|'[^']*')*>/gi,
    (tag) =>
      tag.replace(
        /(\s+[^\s=/>]+\s*=\s*)(?:(["'])(.*?)\2|([^\s>]+))/g,
        (
          match,
          prefix: string,
          quote: string | undefined,
          quoted: string | undefined,
          unquoted: string | undefined,
        ) => {
          if (!/^\s+src\s*=/i.test(prefix)) return match;
          const value = quoted ?? unquoted ?? '';
          const asset = lessonAvAssets.find((item) =>
            embedded
              ? value === item.filename || value === './' + item.filename
              : value === item.src,
          );
          return asset
            ? prefix +
                (quote ?? '"') +
                (embedded ? asset.src : asset.filename) +
                (quote ?? '"')
            : match;
        },
      ),
  );
}

export const embedAvMedia = (source: string) => replaceSources(source, true);
export const restoreAvMedia = (source: string) => replaceSources(source, false);
export const isLessonAvSource = (
  value: string,
  kind: 'audio' | 'video' | 'track' | 'source',
) =>
  lessonAvAssets.some(
    (asset) =>
      asset.src === value &&
      (kind === 'source'
        ? asset.mime.startsWith('audio/') || asset.mime.startsWith('video/')
        : asset.mime.startsWith(kind === 'track' ? 'text/vtt' : kind + '/')),
  );
