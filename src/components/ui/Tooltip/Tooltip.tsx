import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './Tooltip.module.css';

export function Tooltip({ content, children, className }: { content: ReactNode; children: ReactNode; className?: string }) {
  return (
    <span className={cn(styles.wrap, className)}>
      {children}
      <span className={styles.tip} role="tooltip">
        {content}
      </span>
    </span>
  );
}
