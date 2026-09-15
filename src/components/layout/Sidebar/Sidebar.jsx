import { cn } from '@/utils/cn';
import styles from './Sidebar.module.css';
export function Sidebar({ collapsed = false, className, children, ...rest }) {
  return (
    <aside
      className={cn(styles.sidebar, collapsed && styles.collapsed, className)}
      data-collapsed={collapsed || undefined}
      {...rest}
    >
      {children}
    </aside>
  );
}
