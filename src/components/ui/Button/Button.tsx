import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import type { Size } from '@/types';
import { cn } from '@/utils/cn';
import { Spinner } from '@/components/ui/Spinner';
import styles from './Button.module.css';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'success'
  | 'link';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: Size;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
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
