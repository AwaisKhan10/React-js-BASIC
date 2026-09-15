import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { Spinner } from '@/components/ui/Spinner';
import styles from './Button.module.css';
export const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled,
    icon,
    iconPosition = 'start',
    fullWidth,
    type = 'button',
    className,
    children,
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || loading;
  const iconOnly = Boolean(icon && !children);
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        iconOnly && styles.iconOnly,
        isDisabled && styles.disabled,
        className,
      )}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <span className={styles.icon} aria-hidden="true">
          <Spinner size={size === 'xs' || size === 'sm' ? 'xs' : 'sm'} />
        </span>
      ) : null}
      {!loading && icon && iconPosition === 'start' ? (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {children}
      {!loading && icon && iconPosition === 'end' ? (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      ) : null}
    </button>
  );
});
