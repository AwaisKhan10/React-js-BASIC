import { forwardRef } from 'react';
import { Input } from '@/components/ui/Input';
export const NumberInput = forwardRef(function NumberInput(
  { min, max, step = 1, inputMode = 'decimal', ...rest },
  ref,
) {
  return (
    <Input
      ref={ref}
      type="number"
      min={min}
      max={max}
      step={step}
      inputMode={inputMode}
      {...rest}
    />
  );
});
