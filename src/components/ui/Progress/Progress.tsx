import { cn } from '@/utils/cn';
import styles from './Progress.module.css';

export function Progress({ value, label, className }: { value: number; label?: string; className?: string }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn(styles.root, className)}>
      {label ? (
        <div className={styles.label}>
          <span className="typo-label">{label}</span>
          <span className="typo-caption">{clamped}%</span>
        </div>
      ) : null}
      <div className={styles.track} role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <div className={styles.bar} style={{ inlineSize: `${clamped}%` }} />
      </div>
    </div>
  );
}
