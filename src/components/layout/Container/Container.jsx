import { cn } from '@/utils/cn';
import styles from './Container.module.css';
export function Container({ size = 'xl', className, children, ...rest }) {
  return (
    <div
      className={cn(styles.container, styles[size === '2xl' ? 'xxl' : size], className)}
      {...rest}
    >
      {children}
    </div>
  );
}
