/** Original code-native teaching illustrations. No external files are needed in exported homework. */
function svg(body: string, width = 300, height = 180) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${body}</svg>`;
}

const drawings = [
  {
    filename: 'flower.svg',
    label: 'Квітка',
    svg: svg(
      '<rect width="300" height="180" rx="12" fill="#fff1f2"/><path d="M150 155V83M150 132Q100 94 104 127Q117 149 150 145M150 117Q194 83 198 109Q185 135 150 133" fill="#4d7c0f" stroke="#4d7c0f" stroke-width="7"/><g fill="#fb7185"><ellipse cx="150" cy="45" rx="20" ry="28"/><ellipse cx="150" cy="98" rx="20" ry="28"/><ellipse cx="123" cy="71" rx="28" ry="20"/><ellipse cx="177" cy="71" rx="28" ry="20"/></g><circle cx="150" cy="71" r="19" fill="#fbbf24"/><circle cx="144" cy="66" r="4" fill="#fde68a"/>',
    ),
  },
  {
    filename: 'leaf.svg',
    label: 'Листок',
    svg: svg(
      '<rect width="300" height="180" rx="12" fill="#ecfdf5"/><path d="M75 145Q55 40 233 24Q241 151 75 145" fill="#16a34a"/><path d="M60 161L216 42M106 125L106 82M140 101L139 61M169 80L167 47M104 126L157 130M141 102L194 101" fill="none" stroke="#bbf7d0" stroke-width="5" stroke-linecap="round"/>',
    ),
  },
  {
    filename: 'meadow.svg',
    label: 'Візерунок лугу',
    svg: svg(
      '<rect width="120" height="120" fill="#e5f3df"/><g stroke="#a3be8c" stroke-width="3" fill="none"><path d="M16 38l5-13 6 13M75 94l5-16 7 16M80 26l4-12 4 12M24 100l4-9 4 9"/></g><g fill="#f8fafc"><circle cx="42" cy="54" r="7"/><circle cx="56" cy="54" r="7"/><circle cx="49" cy="47" r="7"/><circle cx="49" cy="61" r="7"/></g><circle cx="49" cy="54" r="5" fill="#eab308"/>',
      120,
      120,
    ),
  },
  {
    filename: 'rabbit.svg',
    label: 'Кролик',
    svg: svg(
      '<rect width="300" height="180" rx="12" fill="#dbeafe"/><path d="M0 142Q80 112 160 142T300 135V180H0" fill="#bbf7d0"/><ellipse cx="160" cy="126" rx="53" ry="33" fill="#f8fafc"/><ellipse cx="112" cy="95" rx="31" ry="30" fill="#f8fafc"/><ellipse cx="96" cy="53" rx="12" ry="38" fill="#f8fafc" transform="rotate(-12 96 53)"/><ellipse cx="120" cy="51" rx="12" ry="38" fill="#f8fafc" transform="rotate(9 120 51)"/><ellipse cx="98" cy="53" rx="5" ry="26" fill="#fda4af"/><ellipse cx="120" cy="51" rx="5" ry="26" fill="#fda4af"/><circle cx="105" cy="94" r="4" fill="#334155"/><circle cx="83" cy="104" r="5" fill="#fb7185"/><circle cx="213" cy="115" r="16" fill="white"/><ellipse cx="169" cy="153" rx="24" ry="9" fill="#e2e8f0"/>',
    ),
  },
  {
    filename: 'bird.svg',
    label: 'Пташка',
    svg: svg(
      '<rect width="300" height="180" rx="12" fill="#fef3c7"/><path d="M30 151H272" stroke="#92400e" stroke-width="10" stroke-linecap="round"/><path d="M134 133v18M158 133v18" stroke="#92400e" stroke-width="5"/><ellipse cx="150" cy="103" rx="49" ry="35" fill="#38bdf8"/><circle cx="186" cy="74" r="28" fill="#38bdf8"/><path d="M211 73l24 10-25 8" fill="#f97316"/><path d="M121 102Q167 73 164 112Q144 138 121 102" fill="#0284c7"/><path d="M105 104L61 85l24 42 29-8" fill="#0284c7"/><circle cx="193" cy="69" r="5" fill="#0f172a"/><circle cx="195" cy="67" r="1.5" fill="white"/>',
    ),
  },
  {
    filename: 'soup.svg',
    label: 'Миска борщу',
    svg: svg(
      '<rect width="300" height="180" rx="12" fill="#fff1e6"/><ellipse cx="151" cy="146" rx="107" ry="15" fill="#fed7aa"/><path d="M55 82Q66 150 150 151Q234 150 245 82" fill="#f8fafc" stroke="#94a3b8" stroke-width="4"/><ellipse cx="150" cy="82" rx="96" ry="37" fill="#e2e8f0" stroke="#94a3b8" stroke-width="4"/><ellipse cx="150" cy="81" rx="85" ry="29" fill="#b91c1c"/><g stroke="#fb923c" stroke-width="4"><path d="M90 75l31 12M165 67l26 8M148 94l24-12M202 88l-22 8"/></g><ellipse cx="143" cy="77" rx="22" ry="11" fill="#fff7ed"/><g fill="#15803d"><circle cx="126" cy="71" r="4"/><circle cx="162" cy="90" r="4"/><circle cx="182" cy="66" r="4"/><circle cx="104" cy="88" r="4"/></g>',
    ),
  },
  {
    filename: 'dumplings.svg',
    label: 'Вареники',
    svg: svg(
      '<rect width="300" height="180" rx="12" fill="#eef2ff"/><ellipse cx="150" cy="105" rx="118" ry="55" fill="white" stroke="#a5b4fc" stroke-width="4"/><g fill="#fef3c7" stroke="#d6b475" stroke-width="3"><path d="M65 97Q89 50 120 98Q94 117 65 97"/><path d="M121 88Q150 37 181 88Q151 111 121 88"/><path d="M179 106Q205 62 235 106Q207 126 179 106"/><path d="M107 126Q137 76 166 126Q137 147 107 126"/></g><g fill="#16a34a"><ellipse cx="88" cy="126" rx="12" ry="5"/><ellipse cx="191" cy="128" rx="12" ry="5"/></g>',
    ),
  },
  {
    filename: 'pancakes.svg',
    label: 'Деруни',
    svg: svg(
      '<rect width="300" height="180" rx="12" fill="#f0fdf4"/><ellipse cx="150" cy="108" rx="114" ry="53" fill="white" stroke="#86efac" stroke-width="4"/><g fill="#d99432" stroke="#a16207" stroke-width="3"><ellipse cx="102" cy="106" rx="39" ry="25"/><ellipse cx="161" cy="116" rx="39" ry="25"/><ellipse cx="191" cy="85" rx="39" ry="25"/></g><g fill="#fbbf24"><ellipse cx="102" cy="101" rx="27" ry="16"/><ellipse cx="161" cy="111" rx="27" ry="16"/><ellipse cx="191" cy="80" rx="27" ry="16"/></g><ellipse cx="146" cy="78" rx="24" ry="13" fill="#fff7ed"/><path d="M140 75l18-8M147 82l17-3" stroke="#16a34a" stroke-width="3"/>',
    ),
  },
];

export const lessonImageAssets = drawings.map((drawing) => ({
  ...drawing,
  src:
    'data:image/svg+xml,' +
    encodeURIComponent(drawing.svg).replace(/'/g, '%27'),
}));

function replaceImageReferences(source: string, embedded: boolean): string {
  function resolve(value: string) {
    const match = lessonImageAssets.find((asset) =>
      embedded
        ? value === asset.filename || value === './' + asset.filename
        : value === asset.src,
    );
    return match ? (embedded ? match.src : match.filename) : value;
  }
  return source
    .replace(/<(?:img|a)\b(?:[^"'<>]|"[^"]*"|'[^']*')*>/gi, (tag) => {
      const image = /^<img\b/i.test(tag);
      const attributes = [
        ...tag.matchAll(
          /\s+([^\s=/>]+)(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?/g,
        ),
      ];
      // Browsers block top-level data: navigation. Keep ordinary file links relative.
      if (
        embedded &&
        !image &&
        !attributes.some((match) => match[1].toLowerCase() === 'download')
      )
        return tag;
      return tag.replace(
        /(\s+[^\s=/>]+\s*=\s*)(?:(["'])(.*?)\2|([^\s>]+))/g,
        (
          _,
          prefix: string,
          quote: string | undefined,
          quoted: string | undefined,
          unquoted: string | undefined,
        ) => {
          const attribute = image ? 'src' : 'href';
          if (!new RegExp(`^\\s+${attribute}\\s*=`, 'i').test(prefix)) return _;
          const value = quoted ?? unquoted ?? '';
          const replacement = resolve(value);
          return replacement === value
            ? _
            : prefix + (quote ?? '"') + replacement + (quote ?? '"');
        },
      );
    })
    .replace(
      /url\(\s*(["']?)([^"')]+)\1\s*\)/gi,
      (_, _quote: string, value: string) => `url("${resolve(value.trim())}")`,
    );
}

export const embedLessonImages = (source: string) =>
  replaceImageReferences(source, true);
export const restoreLessonImages = (source: string) =>
  replaceImageReferences(source, false);

export function isLessonImageSource(value: string): boolean {
  return (
    lessonImageAssets.some((asset) => value === asset.src) ||
    /^data:image\/(?:png|jpeg|gif|webp);base64,[A-Za-z0-9+/=\s]+$/i.test(value)
  );
}
