/**
 * Lightweight className merger — keeps class composition readable without
 * pulling in an extra dependency for a 5-line helper.
 */
export function cn(...parts: unknown[]): string {
  return parts
    .flatMap((part) => {
      if (!part) return [];
      if (typeof part === 'string') return [part];
      if (typeof part === 'number') return [String(part)];
      return [];
    })
    .join(' ');
}
