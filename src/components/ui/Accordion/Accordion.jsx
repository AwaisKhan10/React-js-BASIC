import { ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';
import { cn } from '@/utils/cn';
import styles from './Accordion.module.css';
export function Accordion({ items, multiple = false, defaultOpenIds = [], className }) {
  const baseId = useId();
  const [openIds, setOpenIds] = useState(defaultOpenIds);
  const toggle = (id) => {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id);
      if (multiple) {
        return isOpen ? prev.filter((x) => x !== id) : [...prev, id];
      }
      return isOpen ? [] : [id];
    });
  };
  return (
    <div className={cn(styles.root, className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const panelId = `${baseId}-${item.id}-panel`;
        const headerId = `${baseId}-${item.id}-header`;
        return (
          <div key={item.id} className={styles.item}>
            <h3 className={styles.heading}>
              <button
                type="button"
                id={headerId}
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                disabled={item.disabled}
                onClick={() => toggle(item.id)}
              >
                <span>{item.title}</span>
                <ChevronDown
                  className={cn(styles.chevron, isOpen && styles.chevronOpen)}
                  aria-hidden
                  size={18}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              hidden={!isOpen}
              className={styles.panel}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
