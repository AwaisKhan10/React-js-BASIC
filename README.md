# React Enterprise Starter

Professional React + JavaScript foundation for production applications.

**One global change → the entire application updates** via design tokens, theme providers, and i18n.

## Stack

- React 19 + JavaScript (JSX)
- Vite
- React Router
- CSS Variables / Design Tokens
- i18next + react-i18next (en / ur / ar + RTL)
- Lucide React (single icon library)
- ESLint + Prettier

## Getting started

```bash
cd react-enterprise-starter
cp .env.example .env
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run check` | lint + build |

## Routes

- `/` — Home
- `/dashboard` — Realistic dashboard demo
- `/design-system` — Component / token showcase
- `/404` — Not found

## Change the global primary color

Edit `src/styles/tokens.css`:

```css
--brand-primary-600: #1f48eb;
```

Or override the semantic token:

```css
--color-primary: #1f48eb;
```

Every button, focus ring, link, and active nav state updates.

## Change button / card radius

```css
--radius-button: var(--radius-md);
--radius-card: var(--radius-lg);
```

## Change the base font

```css
--font-family-base: 'IBM Plex Sans', system-ui, sans-serif;
```

## Theme

Use the header **Theme** control: Light / Dark / System.

Preference persists in `localStorage` (`app.theme`). System follows OS preference.

## Localization

Use the header **Language** control: English / اردو / العربية.

- English → LTR
- Urdu & Arabic → RTL (`document.documentElement.dir`)

See [ARCHITECTURE.md](./ARCHITECTURE.md) and [DEVELOPMENT_GUIDELINES.md](./DEVELOPMENT_GUIDELINES.md).

## Project layout (high level)

```text
src/
  app/           App shell, router, providers
  components/    Shared UI, layout, navigation, feedback
  features/      Feature-isolated modules
  pages/         Route-level screens
  styles/        Tokens, themes, typography
  i18n/          Locales + i18n bootstrap
  lib/services/  API client patterns
```

## License

Internal starter template — adapt for your organization.
