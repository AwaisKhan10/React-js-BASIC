import { ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import styles from './Breadcrumb.module.css';
export function Breadcrumb({ items, className, separator }) {
  return (
    <nav aria-label="Breadcrumb" className={cn(styles.root, className)}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className={styles.item}>
              {index > 0 ? (
                <span className={styles.separator} aria-hidden="true">
                  {separator ?? <ChevronRight size={14} />}
                </span>
              ) : null}
              {isLast || (!item.href && !item.onClick) ? (
                <span className={styles.current} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              ) : item.href ? (
                <a className={styles.link} href={item.href}>
                  {item.label}
                </a>
              ) : (
                <button type="button" className={styles.link} onClick={item.onClick}>
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
