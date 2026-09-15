/**
 * Validation helpers return i18n keys — never hardcoded user-facing messages.
 * Components call t(key, options) to render localized text.
 */

export type ValidationResult =
  | { valid: true }
  | { valid: false; messageKey: string; messageOptions?: Record<string, unknown> };

export function required(value: unknown): ValidationResult {
  const empty = value === undefined || value === null || String(value).trim() === '';
  return empty ? { valid: false, messageKey: 'common.validation.required' } : { valid: true };
}

export function email(value: string): ValidationResult {
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  return ok ? { valid: true } : { valid: false, messageKey: 'common.validation.invalidEmail' };
}

export function minLength(value: string, count: number): ValidationResult {
  return value.length >= count
    ? { valid: true }
    : { valid: false, messageKey: 'common.validation.minLength', messageOptions: { count } };
}

export function maxLength(value: string, count: number): ValidationResult {
  return value.length <= count
    ? { valid: true }
    : { valid: false, messageKey: 'common.validation.maxLength', messageOptions: { count } };
}
