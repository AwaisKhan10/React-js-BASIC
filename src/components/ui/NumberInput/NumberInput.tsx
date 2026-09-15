import { forwardRef } from 'react';
import { Input, type InputProps } from '@/components/ui/Input';

export interface NumberInputProps extends Omit<InputProps, 'type'> {
  min?: number;
  max?: number;
  step?: number;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
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
