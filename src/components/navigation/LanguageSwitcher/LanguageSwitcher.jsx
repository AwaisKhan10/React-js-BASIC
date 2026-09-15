import { LANGUAGE_META, SUPPORTED_LANGUAGES } from '@/i18n/config';
import { useLocalization } from '@/app/providers/LocalizationProvider';
import { cn } from '@/utils/cn';
import styles from './LanguageSwitcher.module.css';
export function LanguageSwitcher({ className, compact }) {
  const { language, setLanguage } = useLocalization();
  return (
    <div className={cn(styles.root, className)} role="group" aria-label="Language">
      {SUPPORTED_LANGUAGES.map((code) => {
        const meta = LANGUAGE_META[code];
        const selected = language === code;
        return (
          <button
            key={code}
            type="button"
            className={cn(styles.btn, selected && styles.active)}
            aria-pressed={selected}
            onClick={() => void setLanguage(code)}
          >
            {compact ? code.toUpperCase() : meta.nativeLabel}
          </button>
        );
      })}
    </div>
  );
}
