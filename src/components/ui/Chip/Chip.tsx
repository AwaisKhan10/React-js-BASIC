import { X } from 'lucide-react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './Chip.module.css';

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  onRemove?: () => void;
  icon?: ReactNode;
}

export function Chip({ className, children, onRemove, icon, onClick, ...rest }: ChipProps) {
  return (
    <span className={cn(styles.chip, (onClick || onRemove) && styles.clickable, className)} onClick={onClick} {...rest}>
      {icon}
      {children}
      {onRemove ? (
        <button type="button" className={styles.remove} onClick={(e) => { e.stopPropagation(); onRemove(); }} aria-label="Remove">
          <X size={14} />
        </button>
      ) : null}
    </span>
  );
}
