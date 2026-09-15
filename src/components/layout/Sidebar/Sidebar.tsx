import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './Sidebar.module.css';

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
  children?: ReactNode;
}

export function Sidebar({ collapsed = false, className, children, ...rest }: SidebarProps) {
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
