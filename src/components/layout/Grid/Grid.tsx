import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './Grid.module.css';

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number | string;
  gap?: number | string;
  children?: ReactNode;
}

export function Grid({ columns = 12, gap = 'var(--space-4)', className, style, children, ...rest }: GridProps) {
  const merged: CSSProperties = {
    ...style,
    ['--grid-columns' as string]: typeof columns === 'number' ? String(columns) : columns,
    gap: typeof gap === 'number' ? `var(--space-${gap})` : gap,
  };

  return (
    <div className={cn(styles.grid, className)} style={merged} {...rest}>
      {children}
    </div>
  );
}
