import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { LoaderCircle } from 'lucide-react';
import { FormField, describedBy } from '@/components/ui/FormField';
import { cn } from '@/utils/cn';
import styles from './Input.module.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode;
  hint?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { id, label, hint, helperText, error, leftIcon, rightIcon, loading, fullWidth = true, required, disabled, className, ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <FormField id={inputId} label={label} required={required} hint={hint} helperText={helperText} error={error} fullWidth={fullWidth}>
      <div className={styles.wrap}>
        {leftIcon ? <span className={styles.iconStart}>{leftIcon}</span> : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            styles.input,
            error ? styles.hasError : undefined,
            leftIcon ? styles.hasIconStart : undefined,
            rightIcon || loading ? styles.hasIconEnd : undefined,
            className,
          )}
          required={required}
          disabled={disabled || loading}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={describedBy(hint ? `${inputId}-hint` : undefined, !error && helperText ? `${inputId}-helper` : undefined, error ? `${inputId}-error` : undefined)}
          {...rest}
        />
        {loading ? <LoaderCircle className={styles.loading} aria-hidden /> : null}
        {!loading && rightIcon ? <span className={styles.iconEnd}>{rightIcon}</span> : null}
      </div>
    </FormField>
  );
});
