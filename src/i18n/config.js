/**
 * Language metadata drives direction and native labels for the switcher.
 * Adding a language: extend this map + add a locales/<code>/common.json file.
 */
export const LANGUAGE_META = {
  en: { code: 'en', label: 'English', nativeLabel: 'English', dir: 'ltr' },
  ur: { code: 'ur', label: 'Urdu', nativeLabel: 'اردو', dir: 'rtl' },
  ar: { code: 'ar', label: 'Arabic', nativeLabel: 'العربية', dir: 'rtl' },
};
export const SUPPORTED_LANGUAGES = Object.keys(LANGUAGE_META);
export const DEFAULT_LANGUAGE = 'en';
export const FALLBACK_LANGUAGE = 'en';
