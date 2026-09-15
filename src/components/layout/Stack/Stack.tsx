import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './Stack.module.css';

export type StackGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column';
  gap?: StackGap;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  children?: ReactNode;
}

const GAP_VAR: Record<StackGap, string> = {
  0: 'var(--space-0)',
  1: 'var(--space-1)',
  2: 'var(--space-2)',
  3: 'var(--space-3)',
  4: 'var(--space-4)',
  5: 'var(--space-5)',
  6: 'var(--space-6)',
  8: 'var(--space-8)',
  10: 'var(--space-10)',
  12: 'var(--space-12)',
  16: 'var(--space-16)',
};

export function Stack({
  direction = 'column',
  gap = 4,
  align = 'stretch',
  justify = 'start',
  wrap,
  className,
  style,
  children,
  ...rest
}: StackProps) {
  const merged: CSSProperties = {
    ...style,
    gap: GAP_VAR[gap],
  };

  return (
    <div
      className={cn(
        styles.stack,
        direction === 'row' ? styles.row : styles.column,
        styles[`align-${align}`],
        styles[`justify-${justify}`],
        wrap && styles.wrap,
        className,
      )}
      style={merged}
      {...rest}
    >
      {children}
    </div>
  );
}

export function HStack(props: Omit<StackProps, 'direction'>) {
  return <Stack direction="row" align="center" {...props} />;
}

export function VStack(props: Omit<StackProps, 'direction'>) {
  return <Stack direction="column" {...props} />;
}
