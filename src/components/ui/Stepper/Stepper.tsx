import { Check } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './Stepper.module.css';

export interface StepperStep {
  id: string;
  label: ReactNode;
  description?: ReactNode;
}

export interface StepperProps {
  steps: StepperStep[];
  activeIndex: number;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function Stepper({
  steps,
  activeIndex,
  className,
  orientation = 'horizontal',
}: StepperProps) {
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
