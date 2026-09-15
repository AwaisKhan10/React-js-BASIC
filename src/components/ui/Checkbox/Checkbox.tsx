import { Check, Minus } from 'lucide-react';
import { forwardRef, useEffect, useId, useRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  hint?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    id,
    label,
    hint,
    helperText,
    error,
    indeterminate,
    disabled,
    required,
    className,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const localRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const node = localRef.current;
    if (node) node.indeterminate = Boolean(indeterminate);
  }, [indeterminate]);

  return (
    <div
      className={cn(
        styles.root,
        disabled ? styles.rootDisabled : undefined,
        error ? styles.hasError : undefined,
        className,
      )}
    >
      <input
        ref={(node) => {
          localRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        id={fieldId}
        type="checkbox"
        className={styles.input}
        disabled={disabled}
        required={required}
        aria-invalid={error ? true : undefined}
        {...rest}
      />
      <span className={styles.box} aria-hidden="true">
        {indeterminate ? <Minus className={styles.mark} /> : <Check className={styles.mark} />}
      </span>
      {(label || hint || helperText || error) && (
        <div className={styles.text}>
          {label ? (
            <label htmlFor={fieldId} className={styles.label}>
              {label}
              {required ? ' *' : null}
            </label>
          ) : null}
          {hint ? <span className={styles.helper}>{hint}</span> : null}
          {helperText && !error ? <span className={styles.helper}>{helperText}</span> : null}
          {error ? (
            <span className={styles.error} role="alert">
              {error}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
});
