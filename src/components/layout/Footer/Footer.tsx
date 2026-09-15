import type { HTMLAttributes, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/utils/cn';
import styles from './Footer.module.css';

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

export function Footer({ className, children, ...rest }: FooterProps) {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className={cn(styles.footer, className)} {...rest}>
      {children ?? (
        <>
          <span>{t('footer.rights', { year })}</span>
          <span>{t('footer.builtWith')}</span>
        </>
      )}
    </footer>
  );
}
