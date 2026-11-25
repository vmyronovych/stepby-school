import type { ComponentProps } from 'react';
import { SelectField } from './fields';
export function ExampleInputs({
  helper,
  ...field
}: ComponentProps<typeof SelectField> & { helper: string }) {
  return (
    <>
      <SelectField {...field} />
      <p className="helper">{helper}</p>
    </>
  );
}
