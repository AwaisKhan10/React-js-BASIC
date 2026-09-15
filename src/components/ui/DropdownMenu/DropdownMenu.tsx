import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Menu, type MenuItem } from '@/components/ui/Menu';
import { cn } from '@/utils/cn';
import styles from './DropdownMenu.module.css';

export interface DropdownMenuProps {
  trigger: ReactNode;
  items: MenuItem[];
  align?: 'start' | 'end';
  className?: string;
  menuLabel?: string;
}

export function DropdownMenu({
  trigger,
  items,
  align = 'start',
  className,
  menuLabel = 'Actions',
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const wrappedItems = items.map((item) => ({
    ...item,
    onSelect: () => {
      item.onSelect?.();
      setOpen(false);
    },
  }));

  return (
    <div ref={rootRef} className={cn(styles.root, className)}>
      <div
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((v) => !v);
          }
        }}
      >
        <button
          type="button"
          className={styles.triggerButton}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={open ? menuId : undefined}
        >
          {trigger}
        </button>
      </div>
      {open ? (
        <div
          id={menuId}
          className={cn(styles.panel, align === 'end' ? styles.alignEnd : styles.alignStart)}
        >
          <Menu items={wrappedItems} ariaLabel={menuLabel} />
        </div>
      ) : null}
    </div>
  );
}
