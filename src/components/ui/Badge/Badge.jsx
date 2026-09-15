import { cn } from '@/utils/cn';
import styles from './Badge.module.css';
export function Badge({ variant = 'neutral', className, ...rest }) {
  return <span className={cn(styles.badge, styles[variant], className)} {...rest} />;
}
