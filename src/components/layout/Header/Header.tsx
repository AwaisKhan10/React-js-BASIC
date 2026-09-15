import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './Header.module.css';

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  start?: ReactNode;
  center?: ReactNode;
  end?: ReactNode;
  children?: ReactNode;
  sticky?: boolean;
}

export function Header({
  start,
  center,
  end,
  children,
  sticky = true,
  className,
  ...rest
}: HeaderProps) {
  return (
    <header className={cn(styles.header, sticky && styles.sticky, className)} {...rest}>
      <div className={styles.inner}>
        <div className={styles.start}>{start}</div>
        <div className={styles.center}>{center ?? children}</div>
        <div className={styles.end}>{end}</div>
      </div>
    </header>
  );
}
