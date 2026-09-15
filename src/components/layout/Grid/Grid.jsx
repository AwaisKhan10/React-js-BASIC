import { cn } from '@/utils/cn';
import styles from './Grid.module.css';
export function Grid({
  columns = 12,
  gap = 'var(--space-4)',
  className,
  style,
  children,
  ...rest
}) {
  const merged = {
    ...style,
    ['--grid-columns']: typeof columns === 'number' ? String(columns) : columns,
    gap: typeof gap === 'number' ? `var(--space-${gap})` : gap,
  };
  return (
    <div className={cn(styles.grid, className)} style={merged} {...rest}>
      {children}
    </div>
  );
}
