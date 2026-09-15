import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './Switch.module.css';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { id, label, disabled, className, ...rest },
  ref,
) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <label className={cn(styles.root, disabled && styles.disabled, className)} htmlFor={fieldId}>
      <input
        ref={ref}
        id={fieldId}
        type="checkbox"
        role="switch"
        className={styles.input}
        disabled={disabled}
        {...rest}
      />
      <span className={styles.track} aria-hidden>
        <span className={styles.thumb} />
      </span>
      {label ? <span className="typo-label">{label}</span> : null}
    </label>
  );
});
