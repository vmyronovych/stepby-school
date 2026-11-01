import {
  ArithmeticInputs,
  CommonFactorInputs,
  SingleNumberInputs,
} from './NumberInputs';
import { FractionInputs, ProportionInputs } from './RatioInputs';
import { EquationInputs, IrrationalInputs } from './EquationInputs';
import { DomainInputs } from './DomainInputs';
import { ExampleInputs } from './ExampleInputs';
import type { ToolInputsProps } from './types';

export type {
  ExampleOption,
  ToolInputServices,
  ToolInputsProps,
} from './types';

export function ToolInputs({ toolId, config, services }: ToolInputsProps) {
  let inputs;
  switch (toolId) {
    case 'add':
    case 'sub':
    case 'mult':
    case 'div':
      inputs = <ArithmeticInputs toolId={toolId} config={config} />;
      break;
    case 'dvk':
    case 'factor':
      inputs = <SingleNumberInputs toolId={toolId} config={config} />;
      break;
    case 'nsk':
    case 'nsd':
      inputs = <CommonFactorInputs toolId={toolId} config={config} />;
      break;
    case 'frac':
      inputs = <FractionInputs config={config} />;
      break;
    case 'prop':
      inputs = <ProportionInputs config={config} />;
      break;
    case 'eq':
      inputs = <EquationInputs config={config} />;
      break;
    case 'irrational':
      inputs = <IrrationalInputs config={config} />;
      break;
    case 'domain':
      inputs = (
        <DomainInputs
          config={config}
          renderPreview={services.renderDomainPreview}
        />
      );
      break;
    case 'rational-power':
    case 'scalar-product':
    case 'vector-scaling':
      inputs = (
        <ExampleInputs
          toolId={toolId}
          config={config}
          examples={services.examples}
        />
      );
      break;
    default:
      throw new Error(`Unknown tool inputs: ${toolId}`);
  }
  return <div id="toolInputs">{inputs}</div>;
}
