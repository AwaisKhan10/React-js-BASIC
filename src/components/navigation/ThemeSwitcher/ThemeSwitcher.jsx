import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '@/app/providers/ThemeProvider';
import { cn } from '@/utils/cn';
import styles from './ThemeSwitcher.module.css';
const OPTIONS = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];
export function ThemeSwitcher({ className, toggleOnly }) {
  const { theme, setTheme, toggleLightDark, resolvedTheme } = useTheme();
  if (toggleOnly) {
    const Icon = resolvedTheme === 'dark' ? Sun : Moon;
    return (
      <button
        type="button"
        className={cn(styles.iconBtn, className)}
        onClick={toggleLightDark}
        aria-label={resolvedTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      >
        <Icon size={18} aria-hidden />
      </button>
    );
  }
  return (
    <div className={cn(styles.root, className)} role="group" aria-label="Theme">
      {OPTIONS.map(({ value, label, icon: Icon }) => {
        const selected = theme === value;
        return (
          <button
            key={value}
            type="button"
            className={cn(styles.btn, selected && styles.active)}
            aria-pressed={selected}
            aria-label={label}
            title={label}
            onClick={() => setTheme(value)}
          >
            <Icon size={16} aria-hidden />
          </button>
        );
      })}
    </div>
  );
}
