export default class QRCode { constructor(version: number, correction: number); addData(text: string): void; make(): void; getModuleCount(): number; isDark(row: number, col: number): boolean; }
