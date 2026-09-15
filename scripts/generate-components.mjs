/**
 * One-shot generator for the component library.
 * Run: node scripts/generate-components.mjs
 * Idempotent — safe to re-run.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

function write(rel, content) {
  const full = path.join(root, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.endsWith('\n') ? content : `${content}\n`);
}

const inputCss = `.wrap {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.input {
  width: 100%;
  height: var(--control-height-md);
  padding-inline: var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-input);
  background: var(--color-surface);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast),
    background-color var(--transition-fast);
}

.input::placeholder {
  color: var(--color-text-muted);
}

.input:hover:not(:disabled):not(:read-only) {
  border-color: var(--color-text-muted);
}

.input:focus-visible {
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 4px var(--color-focus-ring);
  outline: none;
}

.input:disabled {
  background: var(--color-background-secondary);
  color: var(--color-text-disabled);
  cursor: not-allowed;
}

.hasError {
  border-color: var(--color-error);
}

.hasIconStart {
  padding-inline-start: calc(var(--space-3) + var(--icon-sm) + var(--space-2));
}

.hasIconEnd {
  padding-inline-end: calc(var(--space-3) + var(--icon-sm) + var(--space-2));
}

.iconStart,
.iconEnd {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  color: var(--color-text-muted);
  pointer-events: none;
}

.iconStart {
  inset-inline-start: var(--space-3);
}

.iconEnd {
  inset-inline-end: var(--space-3);
}

.iconEndClickable {
  pointer-events: auto;
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  color: var(--color-text-muted);
}

.iconEndClickable:hover {
  color: var(--color-text-primary);
}

.loading {
  position: absolute;
  inset-inline-end: var(--space-3);
  top: 50%;
  transform: translateY(-50%);
  width: var(--icon-sm);
  height: var(--icon-sm);
  animation: spin 0.7s linear infinite;
  color: var(--color-text-muted);
}

@keyframes spin {
  to {
    transform: translateY(-50%) rotate(360deg);
  }
}
`;

write('src/components/ui/Input/Input.module.css', inputCss);

write(
  'src/components/ui/Input/Input.tsx',
  `import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { LoaderCircle } from 'lucide-react';
import { FormField, describedBy } from '@/components/ui/FormField';
import { cn } from '@/utils/cn';
import styles from './Input.module.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode;
  hint?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    label,
    hint,
    helperText,
    error,
    leftIcon,
    rightIcon,
    loading,
    fullWidth = true,
    required,
    disabled,
    className,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hintId = hint ? \`\${inputId}-hint\` : undefined;
  const helperId = !error && helperText ? \`\${inputId}-helper\` : undefined;
  const errorId = error ? \`\${inputId}-error\` : undefined;

  return (
    <FormField
      id={inputId}
      label={label}
      required={required}
      hint={hint}
      helperText={helperText}
      error={error}
      fullWidth={fullWidth}
    >
      <div className={styles.wrap}>
        {leftIcon ? <span className={styles.iconStart}>{leftIcon}</span> : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            styles.input,
            error && styles.hasError,
            leftIcon && styles.hasIconStart,
            (rightIcon || loading) && styles.hasIconEnd,
            className,
          )}
          required={required}
          disabled={disabled || loading}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={describedBy(hintId, helperId, errorId)}
          {...rest}
        />
        {loading ? <LoaderCircle className={styles.loading} aria-hidden /> : null}
        {!loading && rightIcon ? <span className={styles.iconEnd}>{rightIcon}</span> : null}
      </div>
    </FormField>
  );
});
`,
);

write('src/components/ui/Input/index.ts', `export { Input } from './Input';\nexport type { InputProps } from './Input';\n`);

console.log('generator partial — continuing in next chunk');
