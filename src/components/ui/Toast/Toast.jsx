import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';
import styles from './Toast.module.css';
const ToastContext = createContext(null);
let toastSeq = 0;
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  const dismissAll = useCallback(() => setToasts([]), []);
  const show = useCallback(
    (input) => {
      const id = `toast-${++toastSeq}`;
      const item = {
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
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
export function Toast({ title, description, intent = 'info', variant, onDismiss, className }) {
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
