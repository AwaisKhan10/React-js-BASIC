import { cn } from '@/utils/cn';
import styles from './Stack.module.css';
const GAP_VAR = {
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
}) {
  const merged = {
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
export function HStack(props) {
  return <Stack direction="row" align="center" {...props} />;
}
export function VStack(props) {
  return <Stack direction="column" {...props} />;
}
