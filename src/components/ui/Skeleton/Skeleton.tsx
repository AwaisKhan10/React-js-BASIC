import type { CSSProperties } from 'react';
import { cn } from '@/utils/cn';
import styles from './Skeleton.module.css';

export function Skeleton({ width, height, circle, className }: { width?: string | number; height?: string | number; circle?: boolean; className?: string }) {
  const style: CSSProperties = { width, height: height ?? (circle ? width : undefined) };
  return <span className={cn(styles.skeleton, !height && !circle && styles.text, circle && styles.circle, className)} style={style} aria-hidden />;
}
