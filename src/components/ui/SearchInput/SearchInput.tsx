import { Search, X } from 'lucide-react';
import { forwardRef, type ReactNode } from 'react';
import { Input, type InputProps } from '@/components/ui/Input';
import { cn } from '@/utils/cn';
import styles from './SearchInput.module.css';

export interface SearchInputProps extends Omit<InputProps, 'type' | 'leftIcon'> {
  onClear?: () => void;
  clearLabel?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { value, onClear, clearLabel = 'Clear search', rightIcon, className, ...rest },
  ref,
) {
  const showClear = Boolean(onClear && value != null && String(value).length > 0);

  const clearControl: ReactNode = showClear ? (
    <button type="button" className={styles.clear} onClick={onClear} aria-label={clearLabel}>
      <X aria-hidden="true" />
    </button>
  ) : (
    rightIcon
  );

  return (
    <Input
      ref={ref}
      type="search"
      value={value}
      leftIcon={<Search aria-hidden="true" />}
      rightIcon={clearControl}
      className={cn(styles.input, className)}
      {...rest}
    />
  );
});
