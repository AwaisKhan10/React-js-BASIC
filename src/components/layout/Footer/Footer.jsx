import { useTranslation } from 'react-i18next';
import { cn } from '@/utils/cn';
import styles from './Footer.module.css';
export function Footer({ className, children, ...rest }) {
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
