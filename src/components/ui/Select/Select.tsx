import { forwardRef, useId, type ReactNode, type SelectHTMLAttributes } from 'react';
import { FormField, describedBy } from '@/components/ui/FormField';
import { cn } from '@/utils/cn';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: ReactNode;
  hint?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { id, label, hint, helperText, error, options, placeholder, fullWidth = true, required, className, ...rest },
  ref,
) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <FormField id={fieldId} label={label} required={required} hint={hint} helperText={helperText} error={error} fullWidth={fullWidth}>
      <select
        ref={ref}
        id={fieldId}
        className={cn(styles.select, error ? styles.hasError : undefined, className)}
        required={required}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={describedBy(hint ? `${fieldId}-hint` : undefined, !error && helperText ? `${fieldId}-helper` : undefined, error ? `${fieldId}-error` : undefined)}
        {...rest}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
    </FormField>
  );
});
