// Only route spelling changes are normalized; model data and rendered teaching steps stay exact.
const { createHash } = require('node:crypto');
function normalize(value) {
  if (typeof value === 'bigint') return { $bigint: String(value) };
  if (typeof value === 'string')
    return value
      .replace(/nlp\d+_/g, 'nlp_')
      .replace(/#\/courses\/algebra\//g, '#/10a/math/')
      .replace(/#\/courses\/geometry\//g, '#/9a/geometry/')
      .replace(
        /#\/courses\/math\/(t\d+)(?=[/"?]|$)/g,
        (_, id) =>
          '#/' +
          (['t11', 't1', 't2', 't3'].includes(id) ? '5a' : '6a') +
          '/math/' +
          id,
      );
  if (Array.isArray(value)) return value.map(normalize);
  if (value && typeof value === 'object')
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, v]) => v !== undefined)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => [k, normalize(v)]),
    );
  return value;
}
const digest = (value) =>
  createHash('sha256')
    .update(JSON.stringify(normalize(value)))
    .digest('hex');
module.exports = { digest };
