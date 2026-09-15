import { AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import styles from './ErrorState.module.css';
export function ErrorState({ title, description, actionLabel, onRetry, className }) {
  const { t } = useTranslation();
  return (
    <div className={cn(styles.root, className)} role="alert">
      <div className={styles.icon} aria-hidden>
        <AlertTriangle size={40} />
      </div>
      <h2 className="typo-section-title">{title ?? t('states.error.title')}</h2>
      <p className="typo-body-small">{description ?? t('states.error.description')}</p>
      {onRetry ? (
        <Button variant="primary" onClick={onRetry}>
          {actionLabel ?? t('common.actions.retry')}
        </Button>
      ) : null}
    </div>
  );
}
