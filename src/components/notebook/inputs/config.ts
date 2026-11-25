import type { ToolConfig } from '../../../types';
export function configValue(
  config: ToolConfig,
  key: string,
  fallback: string | number,
): string {
  return String(config[key] ?? fallback);
}
