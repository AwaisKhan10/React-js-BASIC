import { LogOut, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Avatar } from '@/components/ui/Avatar';
import { DropdownMenu } from '@/components/ui/DropdownMenu';
import type { MenuItem } from '@/components/ui/Menu';
import { cn } from '@/utils/cn';
import styles from './UserMenu.module.css';

export interface UserMenuProps {
  name?: string;
  email?: string;
  avatarUrl?: string;
  items?: MenuItem[];
  className?: string;
}

export function UserMenu({
  name = 'User',
  email,
  avatarUrl,
  items,
  className,
}: UserMenuProps) {
  const { t } = useTranslation();

  const menuItems: MenuItem[] =
    items ??
    [
      {
        id: 'profile',
        label: t('nav.profile'),
        icon: <User size={16} aria-hidden />,
      },
      {
        id: 'logout',
        label: t('nav.logout'),
        icon: <LogOut size={16} aria-hidden />,
        danger: true,
      },
    ];

  return (
    <DropdownMenu
      className={cn(styles.root, className)}
      align="end"
      menuLabel="User menu"
      trigger={
        <span className={styles.trigger}>
          <Avatar name={name} src={avatarUrl} size="sm" />
          <span className={styles.meta}>
            <span className={styles.name}>{name}</span>
            {email ? <span className={styles.email}>{email}</span> : null}
          </span>
        </span>
      }
      items={menuItems}
    />
  );
}
