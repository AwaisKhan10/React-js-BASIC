import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import styles from './Alert.module.css';
const icons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
};
export function Alert({ variant = 'info', title, children, onClose, className }) {
  const Icon = icons[variant];
  return (
    <div className={cn(styles.alert, styles[variant], className)} role="status">
      <Icon className={styles.icon} size={18} aria-hidden />
      <div className={styles.body}>
        {title ? <div className={styles.title}>{title}</div> : null}
        {children ? <div className="typo-body-small">{children}</div> : null}
      </div>
      {onClose ? (
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
          <X size={16} />
        </button>
      ) : null}
    </div>
  );
}
