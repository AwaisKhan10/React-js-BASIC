import type enCommon from './locales/en/common.json';

/** Shape of the `common` namespace resources (English is the source of truth). */
export type CommonResources = typeof enCommon;

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: CommonResources;
    };
  }
}
