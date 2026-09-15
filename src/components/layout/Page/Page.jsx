import { cn } from '@/utils/cn';
import styles from './Page.module.css';
export function Page({ className, ...rest }) {
  return <div className={cn(styles.page, className)} {...rest} />;
}
export function PageHeader({ title, subtitle, description, actions, className }) {
  const supporting = subtitle ?? description;
  return (
    <header className={cn(styles.header, className)}>
      <div>
        <h1 className="typo-page-title">{title}</h1>
        {supporting ? <p className="typo-subtitle">{supporting}</p> : null}
      </div>
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </header>
  );
}
export function PageContent({ className, ...rest }) {
  return <div className={cn(styles.content, className)} {...rest} />;
}
