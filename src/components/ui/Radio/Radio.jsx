import { forwardRef, useId } from 'react';
import { cn } from '@/utils/cn';
import styles from './Radio.module.css';
export const Radio = forwardRef(function Radio({ id, label, disabled, className, ...rest }, ref) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <label
      className={cn(styles.root, disabled && styles.rootDisabled, className)}
      htmlFor={fieldId}
    >
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
}) {
  const groupId = useId();
  return (
    <fieldset
      className={cn(styles.group, orientation === 'horizontal' && styles.horizontal, className)}
    >
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
