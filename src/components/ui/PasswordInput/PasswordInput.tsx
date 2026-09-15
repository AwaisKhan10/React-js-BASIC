import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { Input, type InputProps } from '@/components/ui/Input';
import styles from './PasswordInput.module.css';

export interface PasswordInputProps extends Omit<InputProps, 'type' | 'rightIcon'> {
  revealLabel?: string;
  hideLabel?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    { revealLabel = 'Show password', hideLabel = 'Hide password', ...rest },
    ref,
  ) {
    const [visible, setVisible] = useState(false);

    return (
      <Input
        ref={ref}
        type={visible ? 'text' : 'password'}
        autoComplete={rest.autoComplete ?? 'current-password'}
        rightIcon={
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? hideLabel : revealLabel}
            tabIndex={-1}
          >
            {visible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
          </button>
        }
        {...rest}
      />
    );
  },
);
