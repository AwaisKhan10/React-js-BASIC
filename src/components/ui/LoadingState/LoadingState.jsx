import { Spinner } from '@/components/ui/Spinner';
import { cn } from '@/utils/cn';
import styles from './LoadingState.module.css';
export function LoadingState({ title, description, className }) {
  return (
    <div className={cn(styles.root, className)} role="status">
      <Spinner size="lg" />
      {title ? <h3 className="typo-section-title">{title}</h3> : null}
      {description ? <p className="typo-body-small">{description}</p> : null}
    </div>
  );
}
