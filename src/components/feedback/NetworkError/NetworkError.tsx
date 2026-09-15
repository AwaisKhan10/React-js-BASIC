import { WifiOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import styles from './NetworkError.module.css';

export interface NetworkErrorProps {
  title?: ReactNode;
  description?: ReactNode;
  actionLabel?: ReactNode;
  onRetry?: () => void;
  className?: string;
}

export function NetworkError({
  title,
  description,
  actionLabel,
  onRetry,
  className,
}: NetworkErrorProps) {
  const { t } = useTranslation();

  return (
    <div className={cn(styles.root, className)} role="alert">
      <div className={styles.icon} aria-hidden>
        <WifiOff size={40} />
      </div>
      <h2 className="typo-section-title">{title ?? t('states.network.title')}</h2>
      <p className="typo-body-small">{description ?? t('states.network.description')}</p>
      {onRetry ? (
        <Button variant="primary" onClick={onRetry}>
          {actionLabel ?? t('common.actions.retry')}
        </Button>
      ) : null}
    </div>
  );
}
