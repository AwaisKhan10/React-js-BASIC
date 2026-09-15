import type { ImgHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import styles from './Avatar.module.css';

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'size'> {
  name?: string;
  size?: 'sm' | 'md' | 'lg';
}

function initials(name?: string) {
  if (!name) return '?';
  return name.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '').join('');
}

export function Avatar({ name, src, alt, size = 'md', className, ...rest }: AvatarProps) {
  return (
    <span className={cn(styles.avatar, styles[size], className)} role="img" aria-label={alt || name || 'Avatar'}>
      {src ? <img className={styles.img} src={src} alt={alt || name || ''} {...rest} /> : initials(name)}
    </span>
  );
}
