import type { FormulaNode } from '../../../engines/core/formula';
import type { Step } from '../../../types';
export interface VectorToken {
  kind: 'vector';
  name: string;
  modulus?: boolean;
  square?: boolean;
}
export interface AstToken {
  kind: 'ast';
  value: FormulaNode;
}
export interface TextToken {
  kind: 'text';
  value: string;
}
export type NotebookToken = VectorToken | AstToken | TextToken;
export interface NotebookStep extends Step {
  label: string;
  tokens: NotebookToken[];
  value?: FormulaNode | FormulaNode[];
  appendTo?: number;
}
export interface NotebookModel {
  steps: NotebookStep[];
}
export interface NotebookContext {
  index: number;
  step: NotebookStep;
  anim: unknown;
}
