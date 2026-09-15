import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';
import { ToastProvider } from '@/components/ui/Toast';
import { LocalizationProvider } from './LocalizationProvider';
import { ThemeProvider } from './ThemeProvider';
export function AppProviders({ children }) {
  return (
    <I18nextProvider i18n={i18n}>
      <LocalizationProvider>
        <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </I18nextProvider>
  );
}
