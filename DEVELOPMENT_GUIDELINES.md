# Development Guidelines

Rules for teams using this starter for years.

## NEVER

- Hardcode colors, spacing, radius, or shadows in components — use tokens.
- Hardcode user-facing strings — use `t('…')`.
- Duplicate components that already exist in `components/ui`.
- Put API/`fetch` calls directly inside presentational UI.
- Use physical CSS (`margin-left`, `left`) when logical properties work.
- Use `any` without a documented reason.
- Commit secrets or real `.env` values.
- Use `!important` unless fighting a third-party constraint (comment why).
- Create one-off page CSS that should be a shared token or component.

## ALWAYS

- Use design tokens (`var(--…)`).
- Use shared components for buttons, inputs, cards, typography, layout.
- Support RTL via logical CSS and document direction.
- Keep accessibility: labels, focus, keyboard, `aria-*` where needed.
- Prefer TypeScript-strict patterns and `import type`.
- Keep feature logic inside `features/`.
- Keep shared UI inside `components/`.
- Name files by component (`Button.tsx`, `Button.module.css`, `index.ts`).

## Naming

- Components: `PascalCase`
- Hooks: `useSomething`
- CSS modules: `camelCase` class names
- Tokens: `--color-*`, `--space-*`, `--radius-*`, `--font-*`
- i18n keys: nested, domain-first (`dashboard.table.status`)

## Imports

Prefer the `@/` alias:

```ts
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/app/providers/ThemeProvider';
```

## Creating a reusable component

1. Add folder under `components/ui/<Name>/`.
2. Implement with CSS module using **tokens only**.
3. Export via `index.ts` and optionally `components/ui/index.ts`.
4. Document visually on `/design-system`.
5. Ensure LTR + RTL, light + dark, keyboard access.

## Forms

- Wrap controls with `FormField` (label, hint, helper, error).
- Validation helpers in `src/lib/validation.ts` return **i18n keys**.
- Render messages with `t(result.messageKey, result.messageOptions)`.

## API / services

```ts
// features/orders/services/orderService.ts
import { apiClient } from '@/lib/services';

export const orderService = {
  list: () => apiClient.get<Order[]>('/orders'),
};
```

UI hooks call services — not `fetch`.

## Theming checklist

When adding a new color role:

1. Add brand primitive if needed.
2. Add semantic token in `tokens.css`.
3. Override in `themes.css` for light and dark.
4. Consume only the semantic token in components.

## Localization checklist

1. Add keys to `en/common.json` first (source of truth).
2. Translate `ur` and `ar`.
3. Use `t('key')` in UI.
4. Verify RTL layout for ur/ar.

## Comments

Comment **why** (architecture, non-obvious constraints, extension points).  
Do not narrate obvious code.

## PR expectations

- No hardcoded theme values
- No hardcoded copy
- No new icon library
- Design-system page updated for new primitives
- `npm run check` passes
