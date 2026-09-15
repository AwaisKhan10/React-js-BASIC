import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: ReactNode;
}

export function Breadcrumb({ items, className, separator }: BreadcrumbProps) {
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
