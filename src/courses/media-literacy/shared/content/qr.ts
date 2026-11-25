import QRCode from '../vendor/QRCode';

export function qrMatrix(url: string): boolean[][] {
  // URL serializations are ASCII: Unicode paths are percent-encoded by URL.
  const text = new URL(url).href;
  const qr = new QRCode(-1, 0); // Auto version, medium error correction.
  qr.addData(text);
  qr.make();
  return Array.from({ length: qr.getModuleCount() }, (_, row) =>
    Array.from({ length: qr.getModuleCount() }, (_, col) =>
      qr.isDark(row, col),
    ),
  );
}
