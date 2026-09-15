import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './Card.module.css';

export function Card({ className, interactive, ...rest }: HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return <div className={cn(styles.card, interactive && styles.interactive, className)} {...rest} />;
}

export function CardHeader({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(styles.header, className)} {...rest} />;
}

export function CardTitle({ className, children, ...rest }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('typo-section-title', styles.title, className)} {...rest}>
      {children}
    </h3>
  );
}

export function CardSubtitle({ className, children, ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('typo-body-small', styles.subtitle, className)} {...rest}>
      {children}
    </p>
  );
}

export function CardContent({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(styles.content, className)} {...rest} />;
}

export function CardFooter({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(styles.footer, className)} {...rest} />;
}

export type CardProps = HTMLAttributes<HTMLDivElement> & { interactive?: boolean; children?: ReactNode };
