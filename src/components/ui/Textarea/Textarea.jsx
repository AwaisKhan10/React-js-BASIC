import { forwardRef, useId } from 'react';
import { FormField, describedBy } from '@/components/ui/FormField';
import { cn } from '@/utils/cn';
import styles from './Textarea.module.css';
export const Textarea = forwardRef(function Textarea(
  { id, label, hint, helperText, error, fullWidth = true, required, className, ...rest },
  ref,
) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <FormField
      id={fieldId}
      label={label}
      required={required}
      hint={hint}
      helperText={helperText}
      error={error}
      fullWidth={fullWidth}
    >
      <textarea
        ref={ref}
        id={fieldId}
        className={cn(styles.textarea, error ? styles.hasError : undefined, className)}
        required={required}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={describedBy(
          hint ? `${fieldId}-hint` : undefined,
          !error && helperText ? `${fieldId}-helper` : undefined,
          error ? `${fieldId}-error` : undefined,
        )}
        {...rest}
      />
    </FormField>
  );
});
