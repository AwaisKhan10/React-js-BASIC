import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './Popover.module.css';

export function Popover({ trigger, children, className }: { trigger: ReactNode; children: ReactNode; className?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);
  return (
    <div className={cn(styles.root, className)} ref={ref}>
      <div onClick={() => setOpen((v) => !v)}>{trigger}</div>
      {open ? <div className={styles.panel}>{children}</div> : null}
    </div>
  );
}
