import { Home, LayoutDashboard, Menu, Palette } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { Drawer } from '@/components/ui/Drawer';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { LanguageSwitcher } from '@/components/navigation/LanguageSwitcher';
import { NavigationMenu } from '@/components/navigation/NavigationMenu';
import { ThemeSwitcher } from '@/components/navigation/ThemeSwitcher';
import { UserMenu } from '@/components/navigation/UserMenu';
import { env } from '@/config';
import { cn } from '@/utils/cn';
import styles from './AppLayout.module.css';
export function AppLayout() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = useMemo(
    () => [
      {
        id: 'home',
        to: '/',
        end: true,
        label: t('nav.home'),
        icon: <Home size={18} aria-hidden />,
      },
      {
        id: 'dashboard',
        to: '/dashboard',
        label: t('nav.dashboard'),
        icon: <LayoutDashboard size={18} aria-hidden />,
      },
      {
        id: 'design-system',
        to: '/design-system',
        label: t('nav.designSystem'),
        icon: <Palette size={18} aria-hidden />,
      },
    ],
    [t],
  );
  return (
    <div className={styles.shell}>
      <Header
        start={
          <div className={styles.brandRow}>
            <span className={styles.menuBtn}>
              <Button
                variant="ghost"
                size="sm"
                icon={<Menu size={18} />}
                aria-label={t('nav.menu')}
                onClick={() => setMobileOpen(true)}
              />
            </span>
            <Link to="/" className={styles.brand}>
              <span className={styles.mark}>RS</span>
              <span>{env.appName}</span>
            </Link>
          </div>
        }
        end={
          <div className={styles.actions}>
            <LanguageSwitcher />
            <ThemeSwitcher />
            <UserMenu
              name="Alex Admin"
              email="alex@example.com"
              items={[
                { id: 'profile', label: t('nav.profile') },
                { id: 'settings', label: t('nav.settings') },
                { id: 'logout', label: t('nav.logout'), danger: true },
              ]}
            />
          </div>
        }
      />
      <div className={styles.body}>
        <Sidebar className={styles.sidebar}>
          <div className={styles.sidebarTitle}>{t('nav.menu')}</div>
          <NavigationMenu items={navItems} />
        </Sidebar>
        <div className={styles.main}>
          <main className={styles.content}>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        title={t('nav.menu')}
        side="start"
      >
        <nav aria-label={t('nav.menu')}>
          <ul className={styles.mobileList}>
            {navItems.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(styles.mobileLink, isActive && styles.mobileActive)
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {item.icon}
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
