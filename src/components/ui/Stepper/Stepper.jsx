import { Check } from 'lucide-react';
import { cn } from '@/utils/cn';
import styles from './Stepper.module.css';
export function Stepper({ steps, activeIndex, className, orientation = 'horizontal' }) {
  return (
    <ol
      className={cn(
        styles.root,
        orientation === 'vertical' ? styles.vertical : styles.horizontal,
        className,
      )}
    >
      {steps.map((step, index) => {
        const status =
          index < activeIndex ? 'complete' : index === activeIndex ? 'current' : 'upcoming';
        return (
          <li
            key={step.id}
            className={cn(styles.step, styles[status])}
            aria-current={status === 'current' ? 'step' : undefined}
          >
            <span className={styles.indicator} aria-hidden="true">
              {status === 'complete' ? <Check size={14} /> : index + 1}
            </span>
            <span className={styles.copy}>
              <span className={styles.label}>{step.label}</span>
              {step.description ? (
                <span className={styles.description}>{step.description}</span>
              ) : null}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
