/** Persistence keys — keep in sync with the theme boot script in index.html */
export const STORAGE_KEYS = {
  theme: 'app.theme',
  language: 'app.language',
  sidebarCollapsed: 'app.sidebarCollapsed',
} as const;

export const APP_NAME = import.meta.env.VITE_APP_NAME ?? 'React Enterprise Starter';

export const BREAKPOINTS = {
  mobile: 0,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;
