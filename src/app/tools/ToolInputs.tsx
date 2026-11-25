import { mathematicsInputs } from '../../courses/mathematics/ui';
import { algebraInputs } from '../../courses/algebra/ui';
import { geometryInputs } from '../../courses/geometry/ui';
import type {
  ToolInputProps,
  ToolInputRegistry,
} from '../../components/notebook/inputs';
export const toolInputs: ToolInputRegistry = {};
for (const course of [mathematicsInputs, algebraInputs, geometryInputs]) {
  for (const [id, Inputs] of Object.entries(course)) {
    if (toolInputs[id]) throw new Error(`Duplicate tool inputs: ${id}`);
    toolInputs[id] = Inputs;
  }
}
export function ToolInputs({
  toolId,
  config,
}: ToolInputProps & { toolId: string }) {
  const Inputs = toolInputs[toolId];
  if (!Inputs) throw new Error(`Unknown tool inputs: ${toolId}`);
  return (
    <div id="toolInputs">
      <Inputs config={config} />
    </div>
  );
}
