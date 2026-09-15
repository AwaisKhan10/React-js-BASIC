# Architecture

This starter is designed so **global decisions live in one place**.

## Single source of truth

| Concern | Source |
| --- | --- |
| Colors, spacing, radius, shadows, motion | `src/styles/tokens.css` |
| Light / dark semantic overrides | `src/styles/themes.css` |
| Typography roles | `src/styles/typography.css` + `components/typography` |
| Theme preference | `ThemeProvider` + `localStorage` |
| Language + document direction | `LocalizationProvider` + i18n |
| User-facing copy | `src/i18n/locales/*` |
| HTTP access | `src/lib/services/apiClient.js` |

### Examples

1. **Primary color** — change `--color-primary` (or brand primitives) → whole app updates.
2. **Button radius** — change `--radius-button` → all buttons update.
3. **Card radius** — change `--radius-card` → all cards update.
4. **Font** — change `--font-family-base` → entire UI typography updates.
5. **Language** — English → Urdu → all `t()` strings update.
6. **Direction** — Urdu/Arabic set `dir="rtl"`; logical CSS adapts layout.

## Folder responsibilities

### `src/app`

Application bootstrap: `App`, router, providers (`Theme`, `Localization`, `Toast`).

### `src/components`

**Shared** reusable UI only.

- `ui/` — primitives (Button, Input, Modal, Table, …)
- `layout/` — Container, Stack, Grid, Page, Header, Sidebar, Footer
- `navigation/` — LanguageSwitcher, ThemeSwitcher, menus
- `typography/` — PageTitle, BodyText, …
- `feedback/` — ErrorState, Empty wrappers, …

### `src/features`

Feature-isolated modules (auth, dashboard, …). Each feature may own:

```text
features/<name>/
  components/
  hooks/
  services/
  index.js
```

Do **not** put shared buttons/inputs here.

### `src/pages`

Route screens compose shared components + feature hooks.

### `src/styles`

Design system CSS. Components consume tokens; they do not hardcode hex values.

### `src/i18n`

- `config.js` — language metadata (label, dir)
- `locales/<lang>/common.json` — translations
- `index.js` — i18next init + `changeAppLanguage`

### `src/lib/services`

API boundary. UI calls services; services call `apiClient`. Swap transport later without rewriting screens.

## Theme system

1. Boot script in `index.html` applies stored theme before paint (reduces flash).
2. `ThemeProvider` keeps `theme` (`light` | `dark` | `system`) and `resolvedTheme`.
3. `data-theme` on `<html>` selects CSS variable sets in `themes.css`.
4. Components only use semantic variables (`var(--color-background)`).

Hook:

```tsx
const { theme, setTheme, resolvedTheme } = useTheme();
```

## Localization + RTL

1. `LocalizationProvider` restores language from `localStorage`.
2. Changing language updates i18n **and** `document.documentElement.lang/dir`.
3. Prefer logical CSS: `margin-inline`, `padding-inline`, `inset-inline-start`, `text-align: start`.

Hook:

```tsx
const { language, setLanguage, isRtl } = useLocalization();
```

## Routing

Centralized in `src/app/router.jsx` with lazy-loaded pages and `AppLayout` chrome.

## Extension points

- **New language**: add `LANGUAGE_META` entry + `locales/<code>/common.json`.
- **New feature**: scaffold under `features/`, add route in `router.jsx`.
- **New brand**: retune brand primitives in `tokens.css`.
- **Real API**: implement methods in `lib/services/*` using `apiClient`.
