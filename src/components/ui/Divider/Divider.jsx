import { cn } from '@/utils/cn';
import styles from './Divider.module.css';
export function Divider({ orientation = 'horizontal', className }) {
  return (
    <hr className={cn(orientation === 'vertical' ? styles.vertical : styles.divider, className)} />
  );
}
