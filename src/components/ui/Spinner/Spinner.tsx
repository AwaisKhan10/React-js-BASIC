import { cn } from '@/utils/cn';
import type { Size } from '@/types';
import styles from './Spinner.module.css';

export type SpinnerSize = Extract<Size, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;

export interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
  label?: string;
}

export function Spinner({ size = 'md', className, label = 'Loading' }: SpinnerProps) {
  return (
    <span
      className={cn(styles.spinner, styles[size], className)}
      role="status"
      aria-label={label}
    />
  );
}
