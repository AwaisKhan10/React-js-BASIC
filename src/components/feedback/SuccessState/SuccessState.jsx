import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import styles from './SuccessState.module.css';
export function SuccessState({ title, description, actionLabel, onAction, className }) {
  const { t } = useTranslation();
  return (
    <div className={cn(styles.root, className)} role="status">
      <div className={styles.icon} aria-hidden>
        <CheckCircle2 size={40} />
      </div>
      <h2 className="typo-section-title">{title ?? t('states.success.title')}</h2>
      <p className="typo-body-small">{description ?? t('states.success.description')}</p>
      {onAction ? (
        <Button variant="primary" onClick={onAction}>
          {actionLabel ?? t('common.actions.confirm')}
        </Button>
      ) : null}
    </div>
  );
}
