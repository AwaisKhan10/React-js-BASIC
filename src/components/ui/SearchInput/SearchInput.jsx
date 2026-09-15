import { Search, X } from 'lucide-react';
import { forwardRef } from 'react';
import { Input } from '@/components/ui/Input';
import { cn } from '@/utils/cn';
import styles from './SearchInput.module.css';
export const SearchInput = forwardRef(function SearchInput(
  { value, onClear, clearLabel = 'Clear search', rightIcon, className, ...rest },
  ref,
) {
  const showClear = Boolean(onClear && value != null && String(value).length > 0);
  const clearControl = showClear ? (
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
