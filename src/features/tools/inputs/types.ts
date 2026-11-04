import type { ReactNode } from 'react';
import type { ToolConfig } from '../../../types';

export interface ExampleOption {
  value: string;
  label: string;
  group?: number;
  part?: number;
}

export interface ToolInputServices {
  examples: Partial<
    Record<
      'radian' | 'rational-power' | 'vector-scaling' | 'scalar-product',
      ExampleOption[]
    >
  >;
  renderDomainPreview: (formula: string) => ReactNode;
}

export interface ToolInputsProps {
  toolId: string;
  config: ToolConfig;
  services: ToolInputServices;
}

export function configValue(
  config: ToolConfig,
  key: string,
  fallback: string | number,
): string {
  return String(config[key] ?? fallback);
}
