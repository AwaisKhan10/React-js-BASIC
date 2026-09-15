import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/cn';
import styles from './NavigationMenu.module.css';
export function NavigationMenu({ items, orientation = 'vertical', className, collapsed }) {
  return (
    <nav
      className={cn(
        styles.root,
        orientation === 'horizontal' ? styles.horizontal : styles.vertical,
        collapsed && styles.collapsed,
        className,
      )}
      aria-label="Main"
    >
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) => cn(styles.link, isActive && styles.active)}
              title={typeof item.label === 'string' ? item.label : undefined}
            >
              {item.icon ? <span className={styles.icon}>{item.icon}</span> : null}
              {!collapsed ? <span className={styles.label}>{item.label}</span> : null}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
