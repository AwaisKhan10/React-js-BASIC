import { SearchX } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import styles from './NotFoundState.module.css';

export interface NotFoundStateProps {
  title?: ReactNode;
  description?: ReactNode;
  actionLabel?: ReactNode;
  onAction?: () => void;
  className?: string;
}

export function NotFoundState({
  title,
  description,
  actionLabel,
  onAction,
  className,
}: NotFoundStateProps) {
  const { t } = useTranslation();

  return (
    <div className={cn(styles.root, className)} role="status">
      <div className={styles.icon} aria-hidden>
        <SearchX size={40} />
      </div>
      <h2 className="typo-section-title">{title ?? t('states.notFound.title')}</h2>
      <p className="typo-body-small">{description ?? t('states.notFound.description')}</p>
      {onAction ? (
        <Button variant="primary" onClick={onAction}>
          {actionLabel ?? t('states.notFound.backHome')}
        </Button>
      ) : null}
    </div>
  );
}
