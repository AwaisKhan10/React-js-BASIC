import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './Menu.module.css';

export interface MenuItem {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  onSelect?: () => void;
  separator?: boolean;
}

export interface MenuProps {
  items: MenuItem[];
  ariaLabel?: string;
  className?: string;
}

export function Menu({ items, ariaLabel = 'Menu', className }: MenuProps) {
  return (
    <ul className={cn(styles.menu, className)} role="menu" aria-label={ariaLabel}>
      {items.map((item) =>
        item.separator ? (
          <li key={item.id} role="separator" className={styles.separator} />
        ) : (
          <li key={item.id} role="none">
            <button
              type="button"
              role="menuitem"
              className={cn(styles.item, item.danger && styles.danger)}
              disabled={item.disabled}
              onClick={item.onSelect}
            >
              {item.icon ? <span className={styles.icon}>{item.icon}</span> : null}
              <span>{item.label}</span>
            </button>
          </li>
        ),
      )}
    </ul>
  );
}
