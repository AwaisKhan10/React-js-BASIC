import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { FormField, describedBy } from '@/components/ui/FormField';
import { cn } from '@/utils/cn';
import styles from './FileInput.module.css';

export interface FileInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  hint?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  fullWidth?: boolean;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(function FileInput(
  { id, label, hint, helperText, error, fullWidth = true, required, className, ...rest },
  ref,
) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <FormField id={fieldId} label={label} required={required} hint={hint} helperText={helperText} error={error} fullWidth={fullWidth}>
      <input
        ref={ref}
        id={fieldId}
        type="file"
        className={cn(styles.file, className)}
        required={required}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={describedBy(hint ? `${fieldId}-hint` : undefined, !error && helperText ? `${fieldId}-helper` : undefined, error ? `${fieldId}-error` : undefined)}
        {...rest}
      />
    </FormField>
  );
});
