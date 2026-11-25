export function htmlDocument(
  title: string,
  body: string,
  css?: string,
): string {
  return `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>${css ? `\n  <style>\n${css}\n  </style>` : ''}
</head>
<body>
${body}
</body>
</html>`;
}

export interface WebTask {
  id: string;
  title: string;
  brief: string;
  text: string;
  checklist: string[];
  hint: string;
  reference: string;
  referenceHeight?: number;
  referenceHover?: string;
  referenceTimeMs?: number;
}
