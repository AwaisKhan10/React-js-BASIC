import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';
import styles from './Drawer.module.css';
export function Drawer({ open, onClose, title, children, side = 'end' }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);
  if (!open) return null;
  return createPortal(
    <>
      <div className={styles.overlay} onClick={onClose} aria-hidden />
      <aside
        className={cn(styles.panel, side === 'start' && styles.start)}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.header}>
          {title ? <h2 className="typo-section-title">{title}</h2> : <span />}
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </aside>
    </>,
    document.body,
  );
}
