import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './Page.module.css';

export type PageProps = HTMLAttributes<HTMLDivElement>;

export function Page({ className, ...rest }: PageProps) {
  return <div className={cn(styles.page, className)} {...rest} />;
}

export interface PageHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, description, actions, className }: PageHeaderProps) {
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

export type PageContentProps = HTMLAttributes<HTMLDivElement>;

export function PageContent({ className, ...rest }: PageContentProps) {
  return <div className={cn(styles.content, className)} {...rest} />;
}
