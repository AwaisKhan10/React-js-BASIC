import { Inbox } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './EmptyState.module.css';

export function EmptyState({ title, description, action, icon, className }: { title: ReactNode; description?: ReactNode; action?: ReactNode; icon?: ReactNode; className?: string }) {
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.icon}>{icon ?? <Inbox size={40} aria-hidden />}</div>
      <h3 className="typo-section-title">{title}</h3>
      {description ? <p className="typo-body-small">{description}</p> : null}
      {action ? <div className={styles.actions}>{action}</div> : null}
    </div>
  );
}
