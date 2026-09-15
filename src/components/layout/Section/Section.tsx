import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './Section.module.css';

export interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

export function Section({ title, description, className, children, ...rest }: SectionProps) {
  return (
    <section className={cn(styles.section, className)} {...rest}>
      {title || description ? (
        <header className={styles.header}>
          {title ? <h2 className="typo-section-title">{title}</h2> : null}
          {description ? <p className="typo-body-small">{description}</p> : null}
        </header>
      ) : null}
      {children}
    </section>
  );
}
