import { forwardRef, useId } from 'react';
import { cn } from '@/utils/cn';
import styles from './Switch.module.css';
export const Switch = forwardRef(function Switch({ id, label, disabled, className, ...rest }, ref) {
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
