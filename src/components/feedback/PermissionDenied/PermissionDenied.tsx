import { ShieldOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import styles from './PermissionDenied.module.css';

export interface PermissionDeniedProps {
  title?: ReactNode;
  description?: ReactNode;
  actionLabel?: ReactNode;
  onAction?: () => void;
  className?: string;
}

export function PermissionDenied({
  title,
  description,
  actionLabel,
  onAction,
  className,
}: PermissionDeniedProps) {
  const { t } = useTranslation();

  return (
    <div className={cn(styles.root, className)} role="alert">
      <div className={styles.icon} aria-hidden>
        <ShieldOff size={40} />
      </div>
      <h2 className="typo-section-title">{title ?? t('states.permission.title')}</h2>
      <p className="typo-body-small">{description ?? t('states.permission.description')}</p>
      {onAction ? (
        <Button variant="outline" onClick={onAction}>
          {actionLabel ?? t('common.actions.back')}
        </Button>
      ) : null}
    </div>
  );
}
