import { cn } from '@/utils/cn';
import styles from './Spinner.module.css';
export function Spinner({ size = 'md', className, label = 'Loading' }) {
  return (
    <span
      className={cn(styles.spinner, styles[size], className)}
      role="status"
      aria-label={label}
    />
  );
}
