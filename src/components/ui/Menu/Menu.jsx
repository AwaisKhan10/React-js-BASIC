import { cn } from '@/utils/cn';
import styles from './Menu.module.css';
export function Menu({ items, ariaLabel = 'Menu', className }) {
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
