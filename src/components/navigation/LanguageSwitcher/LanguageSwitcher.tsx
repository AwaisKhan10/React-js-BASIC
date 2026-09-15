import { LANGUAGE_META, SUPPORTED_LANGUAGES } from '@/i18n/config';
import { useLocalization } from '@/app/providers/LocalizationProvider';
import type { AppLanguage } from '@/types';
import { cn } from '@/utils/cn';
import styles from './LanguageSwitcher.module.css';

export interface LanguageSwitcherProps {
  className?: string;
  compact?: boolean;
}

export function LanguageSwitcher({ className, compact }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLocalization();

  return (
    <div className={cn(styles.root, className)} role="group" aria-label="Language">
      {SUPPORTED_LANGUAGES.map((code) => {
        const meta = LANGUAGE_META[code as AppLanguage];
        const selected = language === code;
        return (
          <button
            key={code}
            type="button"
            className={cn(styles.btn, selected && styles.active)}
            aria-pressed={selected}
            onClick={() => void setLanguage(code as AppLanguage)}
          >
            {compact ? code.toUpperCase() : meta.nativeLabel}
          </button>
        );
      })}
    </div>
  );
}
