# Beginner Guide — React Enterprise Starter (A to Z)

Yeh document **beginner developer** ke liye hai.  
Har folder, har important file, **kyun bana**, **kya kaam karta hai**, aur **example** ke sath samjhaya gaya hai.

Agar aap confuse ho: **pehle Section 1–4** padho, phir Section 5 (folders), phir Section 10 (naya page kaise banaye).

---

## Table of contents

1. [Project kya hai?](#1-project-kya-hai)
2. [Pehle baar kaise chalaye](#2-pehle-baar-kaise-chalaye)
3. [Important tools — kya hain aur kyun use kiye](#3-important-tools--kya-hain-aur-kyun-use-kiye)
4. [App kaise start hoti hai (flow)](#4-app-kaise-start-hoti-hai-flow)
5. [Poori folder structure (kyun + kya kaam)](#5-poori-folder-structure-kyun--kya-kaam)
6. [Har important file ka detail](#6-har-important-file-ka-detail)
7. [Design tokens, theme, language (i18n)](#7-design-tokens-theme-language-i18n)
8. [Pages vs Features vs Components](#8-pages-vs-features-vs-components)
9. [Code examples (copy-paste style)](#9-code-examples-copy-paste-style)
10. [Naya page / feature / button kaise add kare](#10-naya-page--feature--button-kaise-add-kare)
11. [Rules — kya kabhi mat karo](#11-rules--kya-kabhi-mat-karo)
12. [Glossary (words meaning)](#12-glossary-words-meaning)
13. [Daily developer checklist](#13-daily-developer-checklist)

---

## 1. Project kya hai?

Yeh ek **ready-made React starter kit** hai — matlab company-level app shuru karne ka base.

Isme pehle se ready hai:

| Feature | Simple meaning |
| --- | --- |
| **UI components** | Button, Input, Modal, Table… ready hain — dobara mat banao |
| **Theme** | Light / Dark / System |
| **i18n** | English, Urdu, Arabic translations |
| **RTL** | Urdu/Arabic mein layout right-to-left |
| **Design tokens** | Colors/spacing ek jagah — change karo, poori app update |
| **Routing** | `/`, `/dashboard`, `/design-system`, `/404` |
| **API client** | Backend se baat karne ka central helper |

**Main idea (yaad rakho):**

> Ek jagah change → poori app update.  
> Example: primary color `tokens.css` mein badlo → saare buttons update.

---

## 2. Pehle baar kaise chalaye

```bash
cd react-enterprise-starter
cp .env.example .env
npm install
npm run dev
```

Browser: [http://localhost:5173](http://localhost:5173)

### Commands (scripts)

| Command | Kya karta hai |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Production build (dist folder) |
| `npm run preview` | Built app preview |
| `npm run lint` | Code mistakes check (ESLint) |
| `npm run format` | Code formatting (Prettier) |
| `npm run check` | lint + build |

### `.env` file kya hai?

`.env` mein app settings hoti hain (secret keys yahan mat daalo jo public hain).

```env
VITE_APP_NAME=React Enterprise Starter
VITE_API_BASE_URL=https://api.example.com
VITE_APP_ENV=development
```

**Note:** Browser mein sirf `VITE_` se start hone wale variables milte hain.

---

## 3. Important tools — kya hain aur kyun use kiye

### React

UI banane ki library. Screen = components (chhoti-chhoti building blocks).

**Kyun:** Modern web apps ka standard.

### Vite

Project ko fast chalata hai (dev server + build).

**Kyun:** Create React App se tez; aaj industry standard.

### JavaScript + JSX

- `.js` = normal JavaScript
- `.jsx` = JavaScript + HTML-like UI (`<Button />`)

**Kyun:** Team ne TypeScript nahi, plain JS rakha — beginner friendly.

### React Router (`react-router-dom`)

URL change → page change.

| URL | Page |
| --- | --- |
| `/` | Home |
| `/dashboard` | Dashboard |
| `/design-system` | Saare components dekhne ke liye |
| `/404` | Not found |

### i18next + react-i18next

Translations. Text hardcode nahi — `t('home.title')` use karte hain.

**Kyun:** English / Urdu / Arabic ek hi codebase se.

### Lucide React

Icons library (Home, Menu, Moon…).

**Kyun:** Ek hi icon set — design consistent.

### CSS Modules (`Button.module.css`)

Har component ki CSS usi ke folder mein. Class names collide nahi karte.

**Example:**

```js
import styles from './Button.module.css';
// styles.button → unique class ban jati hai
```

### ESLint + Prettier

- ESLint = bugs / bad patterns catch
- Prettier = code formatting same rakhta hai

---

## 4. App kaise start hoti hai (flow)

Browser open → yeh chain chalti hai:

```text
index.html
    ↓
src/main.jsx          ← React app yahan mount hoti hai
    ↓
BrowserRouter         ← URLs handle
    ↓
AppProviders          ← Theme + Language + Toast wrap
    ↓
App.jsx               ← sirf router call
    ↓
router.jsx            ← konse URL pe konsa page
    ↓
AppLayout.jsx         ← Header + Sidebar + Footer
    ↓
Outlet                ← andar actual page (Home / Dashboard…)
```

### Simple picture

```text
┌─────────────────────────────────────────┐
│  Header (logo, theme, language, user)   │
├──────────┬──────────────────────────────┤
│ Sidebar  │   Page content (Outlet)      │
│  Home    │   ← yahan HomePage /         │
│  Dash…   │     DashboardPage dikhta hai │
│  Design  │                              │
├──────────┴──────────────────────────────┤
│  Footer                                 │
└─────────────────────────────────────────┘
```

### `main.jsx` — pehli file (example)

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from '@/app/App';
import { AppProviders } from '@/app/providers/AppProviders';
import '@/styles/globals.css';

const rootEl = document.getElementById('root');
createRoot(rootEl).render(
  <StrictMode>
    <BrowserRouter>
      <AppProviders>
        <App />
      </AppProviders>
    </BrowserRouter>
  </StrictMode>,
);
```

**Kya samjhe:**

1. `#root` div milta hai `index.html` se  
2. CSS load hoti hai  
3. Router + Providers + App render  

`@/` ka matlab: `src/` folder.  
Example: `@/components/ui/Button` = `src/components/ui/Button`

---

## 5. Poori folder structure (kyun + kya kaam)

```text
react-enterprise-starter/
├── public/                 Static files (favicon, images jo change nahi)
├── scripts/                One-time helper scripts
├── src/                    ★ SARA APP CODE YAHAN ★
├── index.html              HTML shell
├── package.json            Dependencies + npm scripts
├── vite.config.js          Vite settings (@ alias, port)
├── eslint.config.js        Lint rules
├── .env / .env.example     Environment variables
├── README.md               Short overview
├── ARCHITECTURE.md         Architecture notes
├── DEVELOPMENT_GUIDELINES.md  Team rules
└── BEGINNER_GUIDE.md       Yeh document
```

### `src/` ke andar — har folder kyun

| Folder | Kyun hai? | Kya kaam? | Kab use karein? |
| --- | --- | --- | --- |
| `src/app/` | App bootstrap | App, router, providers | Routes / theme / language setup |
| `src/pages/` | Har URL ka screen | HomePage, DashboardPage… | Naya screen / route |
| `src/layouts/` | Common chrome | Header+Sidebar+Footer shell | Layout change |
| `src/components/` | Shared UI | Button, Card, Header… | Har jagah reuse |
| `src/features/` | Business logic | dashboard data, auth… | Feature-specific code |
| `src/hooks/` | Shared React hooks | useLocalStorage… | Reusable logic |
| `src/styles/` | Global design | tokens, themes, typography | Color / spacing change |
| `src/i18n/` | Translations | en / ur / ar JSON | Text translate |
| `src/lib/` | Low-level helpers | apiClient, validation | API / form helpers |
| `src/config/` | App config | env, defaults | Settings |
| `src/constants/` | Fixed values | storage keys | Magic strings avoid |
| `src/utils/` | Tiny helpers | `cn()` classNames | Small utilities |
| `src/assets/` | Images / static | logos, etc. | Media files |

### Golden rule (sabse important)

```text
pages/     = screen compose karti hai (UI + hooks milate hain)
features/  = business data / API logic
components/= reusable UI (kisi feature se free)
styles/    = colors, spacing, fonts (tokens)
i18n/      = user-facing text
```

**Galat:** Dashboard ke andar naya Button component banana.  
**Sahi:** `components/ui/Button` use karo. Agar nahi hai to `components/ui` mein banao.

---

## 6. Har important file ka detail

### Root files

#### `index.html`

Browser ki pehli HTML. Andar `#root` div + theme flash rokne wala chhota script.

**Help:** App yahan se load hoti hai; `main.jsx` link yahan hai.

#### `package.json`

- Dependencies list  
- `npm run …` scripts  

#### `vite.config.js`

- React plugin  
- Alias: `@` → `src`  
- Dev port `5173`  

**Help:** Lambi relative imports (`../../../`) se bachate ho.

```js
import { Button } from '@/components/ui/Button'; // clean
```

---

### `src/app/` — application brain

#### `src/app/App.jsx`

Sirf router return karta hai — simple entry component.

```jsx
import { AppRouter } from './router';
export function App() {
  return <AppRouter />;
}
```

#### `src/app/router.jsx`

**Saari routes yahan.** Naya page = yahan route add.

```jsx
<Route element={<AppLayout />}>
  <Route index element={<HomePage />} />
  <Route path="dashboard" element={<DashboardPage />} />
  <Route path="design-system" element={<DesignSystemPage />} />
  <Route path="404" element={<NotFoundPage />} />
  <Route path="*" element={<Navigate to="/404" replace />} />
</Route>
```

**`lazy()` kyun?**  
Page tab load hota hai jab zarurat ho — pehli load tez.

#### `src/app/providers/AppProviders.jsx`

Poori app ko wrap karta hai:

```jsx
<I18nextProvider>      {/* translations */}
  <LocalizationProvider> {/* language + RTL */}
    <ThemeProvider>      {/* light/dark */}
      <ToastProvider>    {/* toast messages */}
        {children}
      </ToastProvider>
    </ThemeProvider>
  </LocalizationProvider>
</I18nextProvider>
```

**Help:** Har page ko alag-alag theme/i18n setup nahi karna — ek baar wrap.

#### `ThemeProvider.jsx`

- Theme: `light` | `dark` | `system`  
- `localStorage` mein save  
- `<html data-theme="…">` set  

**Use:**

```jsx
const { theme, setTheme, resolvedTheme } = useTheme();
setTheme('dark');
```

#### `LocalizationProvider.jsx`

- Language save  
- `document.dir = rtl/ltr`  
- i18next language sync  

**Use:**

```jsx
const { language, setLanguage, isRtl } = useLocalization();
await setLanguage('ur');
```

---

### `src/layouts/` — page frame

#### `AppLayout.jsx`

Har page ke around Header, Sidebar, Footer.

Andar `<Outlet />` = current page content.

**Help:** Har page pe Header dobara likhne ki zarurat nahi.

---

### `src/pages/` — screens (URLs)

Har page folder pattern:

```text
pages/Home/
  HomePage.jsx      ← UI
  Home.module.css   ← page-specific CSS (kam se kam)
  index.js          ← export { HomePage }
```

| Page | File | Kaam |
| --- | --- | --- |
| Home | `HomePage.jsx` | Landing / intro |
| Dashboard | `DashboardPage.jsx` | Stats + orders table demo |
| DesignSystem | `DesignSystemPage.jsx` | Saare UI components showcase |
| NotFound | `NotFoundPage.jsx` | 404 |

**Page ka kaam:**  
Shared components + feature hooks **compose** karna. Heavy API logic yahan mat likho.

---

### `src/components/` — shared UI library

#### `components/ui/` — primitives

Button, Input, Select, Modal, Table, Toast, Spinner…  

**Kyun alag folder?**  
Ye “design system” hain — product ke har feature mein reuse.

**Typical component folder:**

```text
components/ui/Button/
  Button.jsx         ← React component
  Button.module.css  ← styles (tokens use karti hai)
  index.js           ← export { Button }
```

**Button example (idea):**

```jsx
import { Button } from '@/components/ui/Button';

<Button variant="primary" size="md" onClick={handleSave}>
  Save
</Button>

<Button variant="outline" loading>
  Saving…
</Button>
```

Props samjho:

| Prop | Meaning |
| --- | --- |
| `variant` | Look: primary, outline, ghost… |
| `size` | xs / sm / md / lg |
| `loading` | Spinner + disabled |
| `icon` | Lucide icon |
| `fullWidth` | Poori width |

#### `components/layout/`

Page structure helpers:

- `Container` — max width center  
- `Stack` / `HStack` / `VStack` — spacing  
- `Grid` — columns  
- `Page` / `PageHeader` / `PageContent` — page shell  
- `Header`, `Sidebar`, `Footer`, `Section`  

**Example:**

```jsx
import { Page, PageHeader, PageContent } from '@/components/layout/Page';
import { HStack } from '@/components/layout/Stack';

<Page>
  <PageHeader title="Orders" subtitle="Manage orders" />
  <PageContent>
    <HStack gap={3}>…</HStack>
  </PageContent>
</Page>
```

#### `components/navigation/`

- `LanguageSwitcher` — EN / UR / AR  
- `ThemeSwitcher` — light/dark/system  
- `NavigationMenu`, `MobileNavigation`, `UserMenu`  

#### `components/typography/`

Text styles: `PageTitle`, `BodyText`, `Label`, `Heading1`…  

**Kyun:** Har jagah alag font-size mat likho — role use karo.

#### `components/feedback/`

Error / empty / network / permission / success states.

```jsx
import { ErrorState } from '@/components/feedback/ErrorState';

if (error) return <ErrorState onRetry={reload} />;
```

---

### `src/features/` — business modules

```text
features/dashboard/
  hooks/useDashboardData.js     ← React state + load data
  services/dashboardService.js  ← data fetch (abhi mock)
  components/                   ← sirf isi feature ke UI pieces
  index.js                      ← public exports
```

`features/auth/` abhi scaffold (empty folders) — future login ke liye ready pattern.

#### Flow (Dashboard example)

```text
DashboardPage.jsx
      ↓ calls
useDashboardData.js          (hook)
      ↓ calls
dashboardService.js          (service / mock API)
      ↓ later real API
apiClient.js                 (HTTP)
```

**Kyun 3 layers?**

| Layer | Responsibility |
| --- | --- |
| Page | Dikhana (UI) |
| Hook | State: loading, error, data |
| Service | Data kahan se aati hai |

Kal mock hatao, real API lagaao — **page barely change**.

---

### `src/lib/`

#### `lib/services/apiClient.js`

Central `fetch` wrapper:

```js
import { apiClient } from '@/lib/services';

const users = await apiClient.get('/users');
await apiClient.post('/users', { name: 'Ali' });
```

**Help:** UI mein seedha `fetch()` mat likho. Services use karo.

#### `lib/validation.js`

Form validation helpers — messages i18n keys return karti hain.

---

### `src/hooks/` — shared hooks

| Hook | Kaam |
| --- | --- |
| `useLocalStorage` | State + localStorage sync |
| `useDisclosure` | open/close (modal/drawer) |
| `useMediaQuery` | screen size check |
| `useDirection` | rtl/ltr helper |

**Example:**

```js
const [name, setName] = useLocalStorage('user.name', '');
const { isOpen, open, close, toggle } = useDisclosure();
```

---

### `src/i18n/`

```text
i18n/
  config.js                 ← languages list + RTL/LTR
  index.js                  ← i18next init
  locales/en/common.json    ← English text
  locales/ur/common.json    ← Urdu text
  locales/ar/common.json    ← Arabic text
```

**Use in component:**

```jsx
import { useTranslation } from 'react-i18next';

function HomePage() {
  const { t } = useTranslation();
  return <h1>{t('home.title')}</h1>;
}
```

JSON mein:

```json
{
  "home": {
    "title": "Welcome"
  }
}
```

Urdu file mein same key, different value.

**Kabhi mat karo:**

```jsx
<button>Save</button>  // ❌ hardcode
```

**Sahi:**

```jsx
<button>{t('common.actions.save')}</button>  // ✅
```

---

### `src/styles/`

| File | Kaam |
| --- | --- |
| `tokens.css` | ★ Colors, spacing, radius, shadows — SOURCE OF TRUTH |
| `themes.css` | Light/dark semantic colors |
| `typography.css` | Text role classes |
| `globals.css` | Global resets + imports |
| `utilities.css` | Small utility classes |

**Example — primary color change:**

`src/styles/tokens.css` mein:

```css
--brand-primary-600: #1f48eb;
```

Ya semantic:

```css
--color-primary: #1f48eb;
```

Poori app ke buttons/links update.

**Component CSS mein:**

```css
/* ❌ mat likho */
.button { background: #1f48eb; }

/* ✅ likho */
.button { background: var(--color-primary); }
```

---

### `src/config/` + `src/constants/`

```js
// config — env se settings
import { env } from '@/config';
console.log(env.appName, env.apiBaseUrl);
```

```js
// constants — fixed keys
STORAGE_KEYS.theme    // 'app.theme'
STORAGE_KEYS.language // 'app.language'
```

**Help:** String `"app.theme"` har jagah copy-paste nahi.

---

### `src/utils/cn.js`

Class names merge:

```js
cn(styles.button, isActive && styles.active, className)
// → "button_xyz active_abc extra"
```

Falsy values ignore (`false`, `null`, `undefined`).

---

## 7. Design tokens, theme, language (i18n)

### Design tokens (visual system)

**Problem:** Har file mein alag color → product inconsistent.

**Solution:** Tokens.

```text
tokens.css (primitives + semantic)
    ↓
themes.css (light/dark overrides)
    ↓
Component CSS modules use var(--…)
```

### Theme system

1. `index.html` boot script — pehle se theme laga (flash kam)  
2. `ThemeProvider` — React state + localStorage  
3. `data-theme="dark"` on `<html>`  
4. CSS variables change → UI change  

Components ko pata hone ki zarurat nahi dark hai ya light — wo `var(--color-background)` use karte hain.

### Language + RTL

1. User language choose karta hai  
2. `LocalizationProvider` save + `dir="rtl"` set  
3. CSS **logical properties** use karti hai:

```css
/* ❌ physical — RTL toot jata hai */
margin-left: 16px;

/* ✅ logical — LTR + RTL dono theek */
margin-inline-start: 16px;
```

---

## 8. Pages vs Features vs Components

Yeh beginner ko sabse zyada confuse karta hai. Simple rule:

| Sawal | Answer folder |
| --- | --- |
| Yeh cheez **har feature** mein use hogi? (Button, Modal) | `components/` |
| Yeh **ek business area** ki logic hai? (orders API) | `features/` |
| Yeh **ek URL / screen** hai? | `pages/` |
| Yeh **color / spacing** hai? | `styles/tokens.css` |
| Yeh **user ko dikhne wala text** hai? | `i18n/locales` |

### Real example — Dashboard

```text
pages/Dashboard/DashboardPage.jsx
  → UI: Page, Button, Table, Card
  → data: useDashboardData() from features/dashboard

features/dashboard/hooks/useDashboardData.js
  → loading / error / stats / orders state

features/dashboard/services/dashboardService.js
  → mock data (baad mein apiClient.get(...))
```

---

## 9. Code examples (copy-paste style)

### Example A — Simple page

```jsx
// src/pages/About/AboutPage.jsx
import { useTranslation } from 'react-i18next';
import { Page, PageContent, PageHeader } from '@/components/layout/Page';
import { BodyText } from '@/components/typography';

export function AboutPage() {
  const { t } = useTranslation();
  return (
    <Page>
      <PageHeader title={t('about.title')} subtitle={t('about.subtitle')} />
      <PageContent>
        <BodyText>{t('about.body')}</BodyText>
      </PageContent>
    </Page>
  );
}
```

```js
// src/pages/About/index.js
export { AboutPage } from './AboutPage';
```

### Example B — Button + navigate

```jsx
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';

export function GoDashboardButton() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Button variant="primary" onClick={() => navigate('/dashboard')}>
      {t('home.ctaDashboard')}
    </Button>
  );
}
```

### Example C — Feature hook + service

```js
// features/orders/services/orderService.js
import { apiClient } from '@/lib/services';

export function fetchOrders() {
  return apiClient.get('/orders');
}
```

```js
// features/orders/hooks/useOrders.js
import { useEffect, useState } from 'react';
import { fetchOrders } from '../services/orderService';

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await fetchOrders();
        if (!cancelled) setOrders(data);
      } catch {
        if (!cancelled) setError('failed');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { orders, loading, error };
}
```

### Example D — Form field

```jsx
import { Input } from '@/components/ui/Input';

<Input
  label={t('common.labels.email')}
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={emailError}
  helperText={t('auth.emailHelper')}
/>
```

`FormField` already label / hint / error handle karta hai — Input ke andar built-in.

### Example E — Toast

```jsx
import { useToast } from '@/components/ui/Toast';

function SaveButton() {
  const toast = useToast();
  return (
    <button
      onClick={() => {
        toast.success(t('common.actions.save'));
      }}
    >
      Save
    </button>
  );
}
```

---

## 10. Naya page / feature / button kaise add kare

### A) Naya page add karna (step by step)

1. Folder banao: `src/pages/Reports/`
2. Files:
   - `ReportsPage.jsx`
   - `index.js` → `export { ReportsPage } from './ReportsPage';`
3. `src/app/router.jsx` mein:

```jsx
const ReportsPage = lazy(() =>
  import('@/pages/Reports').then((m) => ({ default: m.ReportsPage })),
);

// Routes ke andar:
<Route path="reports" element={<ReportsPage />} />
```

4. Sidebar nav: `AppLayout.jsx` ke `navItems` mein item add  
5. i18n keys: `en/ur/ar` common.json mein `nav.reports`, `reports.title`…  
6. Browser: `/reports`

### B) Naya feature add karna

```text
src/features/orders/
  components/     (optional)
  hooks/useOrders.js
  services/orderService.js
  index.js
```

Page sirf hook call kare.

### C) Naya shared Button-like component

1. `src/components/ui/MyWidget/`
2. `MyWidget.jsx` + `MyWidget.module.css` + `index.js`
3. Styles mein **sirf tokens** (`var(--…)`)
4. `/design-system` page pe demo add (optional but recommended)
5. Export: `src/components/ui/index.js` (agar barrel use ho)

### D) Nayi language

1. `src/i18n/config.js` → `LANGUAGE_META` mein entry  
2. `src/i18n/locales/fr/common.json` (example)  
3. `src/i18n/index.js` resources mein import  

### E) Real API connect

`.env`:

```env
VITE_API_BASE_URL=https://your-api.com
```

Service:

```js
import { apiClient } from '@/lib/services';
export const fetchDashboardStats = () => apiClient.get('/dashboard/stats');
```

Mock `delay()` hata do.

---

## 11. Rules — kya kabhi mat karo

| ❌ Mat karo | ✅ Karo |
| --- | --- |
| Color hex component CSS mein | `var(--color-…)` |
| Text hardcode `"Save"` | `t('common.actions.save')` |
| Page ke andar `fetch()` | `features/.../services` + `apiClient` |
| Naya Button har page pe | `components/ui/Button` |
| `margin-left` / `left` | `margin-inline-start` / `inset-inline-start` |
| Secrets `.env` commit | `.env.example` only, real secrets private |
| Feature logic `components/ui` mein | logic `features/` mein |

Poori list: `DEVELOPMENT_GUIDELINES.md`

---

## 12. Glossary (words meaning)

| Word | Simple meaning |
| --- | --- |
| **Component** | Reusable UI piece (`<Button />`) |
| **Page** | Poori screen ek URL pe |
| **Layout** | Common frame (header/sidebar) |
| **Feature** | Business module (dashboard, auth) |
| **Hook** | `use…` function — state/logic reuse |
| **Provider** | Context wrapper — global data (theme…) |
| **Props** | Parent → child data (`variant="primary"`) |
| **State** | Changing data (`useState`) |
| **Route** | URL → component mapping |
| **Lazy load** | Page tab load jab open ho |
| **Token** | Design variable (`--color-primary`) |
| **i18n** | Internationalization = multi language |
| **RTL** | Right-to-left (Urdu/Arabic) |
| **CSS Module** | Scoped CSS per component |
| **Alias `@/`** | Shortcut to `src/` |
| **Service** | API/data functions |
| **Mock** | Fake data (backend se pehle) |
| **Build** | Production files banana (`dist/`) |
| **Lint** | Code quality check |

---

## 13. Daily developer checklist

Naya kaam shuru karte waqt:

1. [ ] Kya yeh **shared UI** hai? → `components/`  
2. [ ] Kya yeh **ek screen** hai? → `pages/` + `router.jsx`  
3. [ ] Kya **API/data** hai? → `features/.../services` + hook  
4. [ ] Text user dikhega? → `i18n` keys (en + ur + ar)  
5. [ ] Color/spacing? → `tokens.css` / `themes.css`  
6. [ ] RTL break to nahi? → logical CSS  
7. [ ] `/design-system` pe dekh lo similar component pehle se to nahi  
8. [ ] `npm run lint` + browser check  

### Seekhne ka suggested order (beginner)

1. `npm run dev` → UI ghumao (theme, language switch)  
2. `HomePage.jsx` padho — simple composition  
3. `Button` component + CSS module  
4. `router.jsx` + `AppLayout.jsx`  
5. `DashboardPage` + `useDashboardData` + service  
6. `tokens.css` — ek color change karke dekho effect  
7. i18n JSON — ek text change karke language switch  
8. Khud chhota page `/about` add karo (Section 10)

---

## Quick “where is what?” map

| Mujhe chahiye… | Yahan jao |
| --- | --- |
| Naya URL / page | `src/app/router.jsx` + `src/pages/` |
| Header / sidebar | `src/layouts/AppLayout.jsx` + `components/layout` |
| Button / Input / Modal | `src/components/ui/` |
| Dashboard data | `src/features/dashboard/` |
| Theme light/dark | `ThemeProvider` + `styles/themes.css` |
| Language / Urdu | `i18n/` + `LocalizationProvider` |
| Primary color | `src/styles/tokens.css` |
| API base URL | `.env` → `VITE_API_BASE_URL` |
| API calls | `src/lib/services/apiClient.js` |
| Saare components demo | Browser `/design-system` |

---

## Related docs

| File | Kab padho |
| --- | --- |
| `README.md` | Quick start |
| `ARCHITECTURE.md` | Short architecture |
| `DEVELOPMENT_GUIDELINES.md` | Team coding rules |
| **`BEGINNER_GUIDE.md`** | Yeh — full beginner A→Z |

---

## Last line for the beginner

Confusion normal hai. Is project ka formula simple hai:

```text
Page dikhao → shared components se UI banao
Data chahiye → feature hook + service
Look change → tokens.css
Text change → i18n JSON
Naya URL → router.jsx
```

Jab bhi stuck ho: **pehle `/design-system` pe dekho** koi ready component to nahi, phir `HomePage` / `DashboardPage` copy karke pattern follow karo.

Agar koi section ab bhi clear na ho, us folder ka naam batao — usi pe aur short examples add kiye ja sakte hain.
