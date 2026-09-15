import { cn } from '@/utils/cn';
import styles from './Section.module.css';
export function Section({ title, description, className, children, ...rest }) {
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
