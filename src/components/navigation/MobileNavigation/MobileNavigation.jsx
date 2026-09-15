import { Menu } from 'lucide-react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Drawer } from '@/components/ui/Drawer';
import { useDisclosure } from '@/hooks/useDisclosure';
import { cn } from '@/utils/cn';
import styles from './MobileNavigation.module.css';
export function MobileNavigation({ items, className, title = 'Menu' }) {
  const { isOpen, close, toggle } = useDisclosure(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => {
      if (mq.matches) close();
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [close]);
  return (
    <div className={cn(styles.root, className)}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={isOpen}
        onClick={toggle}
        aria-label="Open navigation"
      >
        <Menu size={20} aria-hidden />
      </button>
      <Drawer open={isOpen} onClose={close} title={title} side="start">
        <nav aria-label="Mobile">
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => cn(styles.link, isActive && styles.active)}
                  onClick={close}
                >
                  {item.icon ? <span className={styles.icon}>{item.icon}</span> : null}
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </Drawer>
    </div>
  );
}
