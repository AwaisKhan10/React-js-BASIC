import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import type { AppLanguage } from '@/types';

import { DEFAULT_LANGUAGE, FALLBACK_LANGUAGE, LANGUAGE_META } from './config';
import en from './locales/en/common.json';
import ur from './locales/ur/common.json';
import ar from './locales/ar/common.json';

import './types';

const resources = {
  en: { common: en },
  ur: { common: ur },
  ar: { common: ar },
} as const;

void i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LANGUAGE,
  fallbackLng: FALLBACK_LANGUAGE,
  defaultNS: 'common',
  ns: ['common'],
  interpolation: {
    escapeValue: false,
  },
});

/**
 * Change the active app language and sync `<html lang>` / `dir` for RTL/LTR.
 */
export async function changeAppLanguage(lang: AppLanguage): Promise<void> {
  const meta = LANGUAGE_META[lang];
  await i18n.changeLanguage(lang);
  document.documentElement.lang = meta.code;
  document.documentElement.dir = meta.dir;
}

export default i18n;
