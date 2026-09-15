import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '@/constants';
const ThemeContext = createContext(null);
function getSystemTheme() {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
function resolveTheme(theme) {
  return theme === 'system' ? getSystemTheme() : theme;
}
function readStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.theme);
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  } catch {
    /* private mode / blocked storage */
  }
  return 'system';
}
function applyThemeToDocument(resolved) {
  const root = document.documentElement;
  root.setAttribute('data-theme', resolved);
  root.style.colorScheme = resolved;
}
/**
 * ThemeProvider owns the single source of truth for light/dark/system.
 * Components consume semantic CSS variables — they never need to know the mode.
 */
export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => readStoredTheme());
  const [resolvedTheme, setResolvedTheme] = useState(() => resolveTheme(readStoredTheme()));
  const setTheme = useCallback((next) => {
    setThemeState(next);
    try {
      localStorage.setItem(STORAGE_KEYS.theme, next);
    } catch {
      /* ignore */
    }
    const resolved = resolveTheme(next);
    setResolvedTheme(resolved);
    applyThemeToDocument(resolved);
  }, []);
  const toggleLightDark = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);
  useEffect(() => {
    applyThemeToDocument(resolveTheme(theme));
  }, [theme]);
  // Follow OS changes when preference is "system"
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (theme !== 'system') return;
      const resolved = getSystemTheme();
      setResolvedTheme(resolved);
      applyThemeToDocument(resolved);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [theme]);
  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleLightDark }),
    [theme, resolvedTheme, setTheme, toggleLightDark],
  );
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}
