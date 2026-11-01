const { createHash } = require('node:crypto');
function normalize(value) {
 if (typeof value === 'bigint') return { $bigint: String(value) };
 if (typeof value === 'string') return value.replace(/nlp\d+_/g, 'nlp_');
 if (Array.isArray(value)) return value.map(normalize);
 if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).filter(([,v])=>v!==undefined).sort(([a],[b])=>a.localeCompare(b)).map(([k,v])=>[k,normalize(v)]));
 return value;
}
const digest = value => createHash('sha256').update(JSON.stringify(normalize(value))).digest('hex');
module.exports = {digest};
