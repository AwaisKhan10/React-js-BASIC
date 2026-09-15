import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { STORAGE_KEYS } from '@/constants';
import { LANGUAGE_META, DEFAULT_LANGUAGE } from '@/i18n/config';
const LocalizationContext = createContext(null);
function isAppLanguage(value) {
  return value === 'en' || value === 'ur' || value === 'ar';
}
function readStoredLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.language);
    if (isAppLanguage(stored)) return stored;
  } catch {
    /* ignore */
  }
  return DEFAULT_LANGUAGE;
}
function applyDocumentLanguage(language) {
  const meta = LANGUAGE_META[language];
  const root = document.documentElement;
  root.lang = language;
  root.dir = meta.dir;
}
/**
 * LocalizationProvider syncs i18next language with document dir/lang + persistence.
 * RTL/LTR is a global document concern — never per-page CSS forks.
 */
export function LocalizationProvider({ children }) {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState(() => readStoredLanguage());
  const setLanguage = useCallback(
    async (next) => {
      setLanguageState(next);
      try {
        localStorage.setItem(STORAGE_KEYS.language, next);
      } catch {
        /* ignore */
      }
      applyDocumentLanguage(next);
      await i18n.changeLanguage(next);
    },
    [i18n],
  );
  // Hydrate i18n + document on first mount from persisted preference
  useEffect(() => {
    const initial = readStoredLanguage();
    applyDocumentLanguage(initial);
    if (i18n.language !== initial) {
      void i18n.changeLanguage(initial);
    }
  }, [i18n]);
  const direction = LANGUAGE_META[language].dir;
  const value = useMemo(
    () => ({
      language,
      direction,
      setLanguage,
      isRtl: direction === 'rtl',
    }),
    [language, direction, setLanguage],
  );
  return <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>;
}
export function useLocalization() {
  const ctx = useContext(LocalizationContext);
  if (!ctx) {
    throw new Error('useLocalization must be used within LocalizationProvider');
  }
  return ctx;
}
