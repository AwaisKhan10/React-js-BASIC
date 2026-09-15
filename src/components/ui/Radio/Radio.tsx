import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './Radio.module.css';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { id, label, disabled, className, ...rest },
  ref,
) {
  const autoId = useId();
  const fieldId = id ?? autoId;

  return (
    <label className={cn(styles.root, disabled && styles.rootDisabled, className)} htmlFor={fieldId}>
      <input
        ref={ref}
        id={fieldId}
        type="radio"
        className={styles.input}
        disabled={disabled}
        {...rest}
      />
      <span className={styles.dot} aria-hidden="true" />
      {label ? <span className={styles.label}>{label}</span> : null}
    </label>
  );
});

export interface RadioOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: RadioOption[];
  label?: ReactNode;
  hint?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

export function RadioGroup({
  name,
  value,
  defaultValue,
  onChange,
  options,
  label,
  hint,
  helperText,
  error,
  required,
  disabled,
  orientation = 'vertical',
  className,
}: RadioGroupProps) {
  const groupId = useId();

  return (
    <fieldset className={cn(styles.group, orientation === 'horizontal' && styles.horizontal, className)}>
      {label ? (
        <legend className={styles.legend}>
          {label}
          {required ? ' *' : null}
        </legend>
      ) : null}
      {hint ? <span className={styles.helper}>{hint}</span> : null}
      {options.map((opt) => (
        <Radio
          key={opt.value}
          id={`${groupId}-${opt.value}`}
          name={name}
          value={opt.value}
          label={opt.label}
          disabled={disabled || opt.disabled}
          checked={value !== undefined ? value === opt.value : undefined}
          defaultChecked={defaultValue !== undefined ? defaultValue === opt.value : undefined}
          onChange={() => onChange?.(opt.value)}
          required={required}
        />
      ))}
      {helperText && !error ? <span className={styles.helper}>{helperText}</span> : null}
      {error ? (
        <span className={styles.error} role="alert">
          {error}
        </span>
      ) : null}
    </fieldset>
  );
}
