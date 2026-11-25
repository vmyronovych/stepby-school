import type { ComponentType } from 'react';
import type { ToolConfig } from '../../../types';
export interface ToolInputProps {
  config: ToolConfig;
}
export type ToolInputRegistry = Record<string, ComponentType<ToolInputProps>>;
