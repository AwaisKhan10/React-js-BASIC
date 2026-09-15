import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import type { Intent } from '@/types';
import { cn } from '@/utils/cn';
import styles from './Toast.module.css';

export type ToastVariant = Intent;

export interface ToastInput {
  title: ReactNode;
  description?: ReactNode;
  /** Prefer variant; intent kept as alias */
  variant?: ToastVariant;
  intent?: Intent;
  duration?: number;
}

export interface ToastItem extends ToastInput {
  id: string;
}

interface ToastContextValue {
  toasts: ToastItem[];
  show: (toast: ToastInput) => string;
  /** Convenience alias used by app pages */
  toast: (toast: ToastInput) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let toastSeq = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => setToasts([]), []);

  const show = useCallback(
    (input: ToastInput) => {
      const id = `toast-${++toastSeq}`;
      const item: ToastItem = {
        intent: input.variant ?? input.intent ?? 'info',
        duration: 5000,
        ...input,
        id,
      };
      setToasts((prev) => [...prev, item]);
      if (item.duration && item.duration > 0) {
        window.setTimeout(() => dismiss(id), item.duration);
      }
      return id;
    },
    [dismiss],
  );

  const value = useMemo(
    () => ({ toasts, show, toast: show, dismiss, dismissAll }),
    [toasts, show, dismiss, dismissAll],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof document !== 'undefined'
        ? createPortal(
            <div className={styles.viewport} aria-live="polite" aria-relevant="additions">
              {toasts.map((item) => {
                const tone = item.variant ?? item.intent ?? 'info';
                return (
                  <div key={item.id} className={cn(styles.toast, styles[tone])} role="status">
                    <div className={styles.body}>
                      <div className={styles.title}>{item.title}</div>
                      {item.description ? (
                        <div className={styles.description}>{item.description}</div>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      className={styles.close}
                      aria-label="Dismiss"
                      onClick={() => dismiss(item.id)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                );
              })}
            </div>,
            document.body,
          )
        : null}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export function Toast({
  title,
  description,
  intent = 'info',
  variant,
  onDismiss,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  intent?: Intent;
  variant?: ToastVariant;
  onDismiss?: () => void;
  className?: string;
}) {
  const tone = variant ?? intent;
  return (
    <div className={cn(styles.toast, styles[tone], className)} role="status">
      <div className={styles.body}>
        <div className={styles.title}>{title}</div>
        {description ? <div className={styles.description}>{description}</div> : null}
      </div>
      {onDismiss ? (
        <button type="button" className={styles.close} aria-label="Dismiss" onClick={onDismiss}>
          <X size={16} />
        </button>
      ) : null}
    </div>
  );
}
