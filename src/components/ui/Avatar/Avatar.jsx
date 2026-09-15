import { cn } from '@/utils/cn';
import styles from './Avatar.module.css';
function initials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
}
export function Avatar({ name, src, alt, size = 'md', className, ...rest }) {
  return (
    <span
      className={cn(styles.avatar, styles[size], className)}
      role="img"
      aria-label={alt || name || 'Avatar'}
    >
      {src ? (
        <img className={styles.img} src={src} alt={alt || name || ''} {...rest} />
      ) : (
        initials(name)
      )}
    </span>
  );
}
