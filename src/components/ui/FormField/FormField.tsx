import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './FormField.module.css';

export interface FormFieldProps {
  id: string;
  label?: ReactNode;
  required?: boolean;
  hint?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

/** Shared chrome for every form control so label/error/a11y wiring stays consistent. */
export function FormField({
  id,
  label,
  required,
  hint,
  helperText,
  error,
  children,
  className,
  fullWidth = true,
}: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const helperId = !error && helperText ? `${id}-helper` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={cn(styles.field, fullWidth && styles.fullWidth, className)}>
      {label ? (
        <div className={styles.labelRow}>
          <label className="typo-label" htmlFor={id}>
            {label}
            {required ? (
              <span className={styles.required} aria-hidden="true">
                {' '}
                *
              </span>
            ) : null}
          </label>
        </div>
      ) : null}
      {hint ? (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      ) : null}
      <div className={styles.control}>{children}</div>
      {error ? (
        <span id={errorId} className={styles.error} role="alert">
          {error}
        </span>
      ) : helperText ? (
        <span id={helperId} className={styles.helper}>
          {helperText}
        </span>
      ) : null}
    </div>
  );
}

export function describedBy(...ids: Array<string | undefined>): string | undefined {
  const value = ids.filter(Boolean).join(' ');
  return value || undefined;
}
