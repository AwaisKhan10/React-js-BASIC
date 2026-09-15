/**
 * Runtime configuration derived from Vite env vars.
 * Only VITE_* keys are available in the browser bundle.
 */
export const env = {
  appName: import.meta.env.VITE_APP_NAME ?? 'React Enterprise Starter',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
  appEnv: import.meta.env.VITE_APP_ENV ?? import.meta.env.MODE,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};
export const config = {
  env,
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'ur', 'ar'],
  defaultTheme: 'system',
};
