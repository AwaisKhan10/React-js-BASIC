import { cn } from '@/utils/cn';
import styles from './Tooltip.module.css';
export function Tooltip({ content, children, className }) {
  return (
    <span className={cn(styles.wrap, className)}>
      {children}
      <span className={styles.tip} role="tooltip">
        {content}
      </span>
    </span>
  );
}
