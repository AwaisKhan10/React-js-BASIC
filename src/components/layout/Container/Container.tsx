import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './Container.module.css';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  children?: ReactNode;
}

export function Container({ size = 'xl', className, children, ...rest }: ContainerProps) {
  return (
    <div className={cn(styles.container, styles[size === '2xl' ? 'xxl' : size], className)} {...rest}>
      {children}
    </div>
  );
}
