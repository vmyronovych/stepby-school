import type { ToolInputRegistry } from '../../../components/notebook/inputs';
import { DomainInputs } from '../lessons/function-domain/Inputs';
import { IrrationalInputs } from '../lessons/irrational-equations/Inputs';
import { RadianInputs } from '../lessons/radians/Inputs';
import { RationalPowerInputs } from '../lessons/rational-power/Inputs';
export const algebraInputs: ToolInputRegistry = {
  domain: DomainInputs,
  irrational: IrrationalInputs,
  radian: RadianInputs,
  'rational-power': RationalPowerInputs,
};
