import { useId, useState } from 'react';
import { cn } from '@/utils/cn';
import styles from './Tabs.module.css';
export function Tabs({ items, defaultTabId, className }) {
  const baseId = useId();
  const [active, setActive] = useState(defaultTabId ?? items[0]?.id);
  const current = items.find((t) => t.id === active) ?? items[0];
  return (
    <div className={className}>
      <div className={styles.list} role="tablist">
        {items.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`${baseId}-${tab.id}`}
            aria-selected={active === tab.id}
            aria-controls={`${baseId}-panel-${tab.id}`}
            className={cn(styles.tab)}
            disabled={tab.disabled}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {current ? (
        <div
          className={styles.panel}
          role="tabpanel"
          id={`${baseId}-panel-${current.id}`}
          aria-labelledby={`${baseId}-${current.id}`}
        >
          {current.content}
        </div>
      ) : null}
    </div>
  );
}
