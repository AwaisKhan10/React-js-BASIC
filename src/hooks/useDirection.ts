import { useLocalization } from '@/app/providers/LocalizationProvider';

/** Prefer logical CSS; use this only when JS must branch on direction. */
export function useDirection() {
  const { direction, isRtl, language } = useLocalization();
  return { direction, isRtl, language };
}
