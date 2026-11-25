import type { ToolInputRegistry } from '../../../components/notebook/inputs';
import {
  ArithmeticInputs,
  CommonFactorInputs,
  SingleNumberInputs,
} from '../shared/inputs/NumberInputs';
import { FractionInputs, ProportionInputs } from '../shared/inputs/RatioInputs';
import { EquationInputs } from '../lessons/linear-equations/Inputs';
export const mathematicsInputs: ToolInputRegistry = {
  add: (props) => <ArithmeticInputs {...props} toolId="add" />,
  sub: (props) => <ArithmeticInputs {...props} toolId="sub" />,
  mult: (props) => <ArithmeticInputs {...props} toolId="mult" />,
  div: (props) => <ArithmeticInputs {...props} toolId="div" />,
  dvk: (props) => <SingleNumberInputs {...props} toolId="dvk" />,
  factor: (props) => <SingleNumberInputs {...props} toolId="factor" />,
  nsk: (props) => <CommonFactorInputs {...props} toolId="nsk" />,
  nsd: (props) => <CommonFactorInputs {...props} toolId="nsd" />,
  frac: FractionInputs,
  prop: ProportionInputs,
  eq: EquationInputs,
};
