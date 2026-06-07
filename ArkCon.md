# Architecture Constitution (ArkCon)

> **AI Enforcement Rule**: This is the supreme architectural law for this repository.  
> After generating any code that touches routing, data flow, file structure, or cross-layer calls, you **MUST** run §11 Self-Check Checklist.
>
> **Scope boundary**: This file governs architecture-layer rules only.
> - Code conventions (TypeScript / Tailwind / naming) → [.github/copilot-instructions.md](.github/copilot-instructions.md)

---

## § Core Principles — AI Behavior Standards

These four principles govern **ALL** code generation in this repository. They take priority over any shortcut that might seem expedient in the moment.

### 1. Think Before Coding. Don't Assume. (思考先行，拒绝盲猜)

- **Never guess intent**: Before writing or modifying any code, explicitly state your assumptions. If there is any uncertainty about architecture, requirements, or implementation approach, **stop and ask**.
- **Expose trade-offs**: When multiple implementation paths exist, list them with pros/cons and let the user choose. Never make unilateral architectural decisions.
- **Manage ambiguity**: When encountering logical conflicts or unclear specifications, name them explicitly. Do not deliver code that carries hidden assumptions.

### 2. Simplicity First. No Over-Engineering. (精简至上，拒绝过度设计)

- **Minimum viable code**: Write only the code needed to solve the current problem. Never add speculative "future features."
- **No premature abstraction**: For code used only once, do not over-encapsulate or add unnecessary flexibility or configurability.
- **Complexity audit**: If 50 lines would solve the problem and you wrote 200, rewrite. Always ask: "Would a senior engineer find this overly complex?" If yes, simplify aggressively.

### 3. Surgical Changes. Never Touch Unrelated Code. (外科手术式修改)

- **Scope control**: Only modify code that must change. Only clean up "code garbage" you yourself created.
- **No opportunistic optimization**: When modifying existing code, never "improve" adjacent unrelated code, comments, or formatting. Even if the existing style is inelegant, respect and match it.
- **Precise cleanup**: Only remove imports, variables, or functions that became dead code *because of your change*. Never proactively clean up pre-existing dead code.

### 4. Flag Uncertainty Explicitly. (明确指出不确定性)

- If unsure about a library API, a side effect, or specific logic: declare it before acting — "I'm not certain whether X could cause Y; my recommendation is Z."
- Admitting a knowledge gap is always better than proceeding with false confidence and causing downstream damage.
- When the correct approach is genuinely unclear, present options rather than picking silently.

---

## §0. AI Reading Protocol

Before generating any code in this repository, load context in this order:

1. `README.MD` — product positioning, feature catalog, technical constraints
2. `ArkCon.md` **(this file)** — architecture rules
3. `.github/copilot-instructions.md` — code conventions
4. Relevant `Docs/` design document for the specific feature being built

---

## §1. Project Topology

**Single Next.js application. No monorepo. No workspaces.**

```
yourdomain.com/          ← single Vercel deployment
└── (repository root)    ← one package.json, one Next.js app
```

**Hard constraints**:
- There is exactly **ONE** `package.json` at the repository root.
- There is **NO** `pnpm-workspace.yaml`, **NO** `apps/` directory, **NO** `packages/` directory.
- Any PR that introduces a second `package.json` or a monorepo structure is **auto-rejected**.

---

## §2. Directory Architecture

Four-layer physical separation. A layer may only import from layers at the same level or below.

```
src/
├── app/           [LAYER 0 — Route]   Next.js App Router pages & layouts
├── components/    [LAYER 1 — View]    React components (render + interaction only)
├── lib/           [LAYER 2 — Logic]   Pure functions, calculators, static data, storage
├── hooks/         [LAYER 2 — Logic]   Custom React hooks
└── types/         [LAYER 3 — Types]   TypeScript interfaces & enums
```

### 2.1 Layer Import Rules

| Layer | May import from | Forbidden |
|-------|-----------------|-----------|
| `app/` | `components/`, `lib/`, `hooks/`, `types/` | Direct DOM APIs, business math |
| `components/` | `hooks/`, `types/`, `lib/utils/` | `lib/calculators/` directly (use hooks as intermediaries) |
| `lib/calculators/` | `types/`, `lib/data/`, `lib/utils/` | React API, `useState`, `useEffect`, `localStorage` |
| `lib/data/` | `types/` | Anything else |
| `lib/storage/` | `types/`, `lib/utils/` | React API |
| `hooks/` | `lib/`, `types/` | Direct `localStorage` (use `lib/storage/` wrappers) |

### 2.2 Canonical Directory Structure

```
src/
├── app/
│   ├── layout.tsx                          # Root layout: fonts, Providers, analytics
│   ├── page.tsx                            # Homepage
│   ├── not-found.tsx                       # 404
│   ├── sitemap.ts                          # Auto-generated sitemap
│   ├── robots.ts                           # robots.txt
│   └── [section]/
│       ├── layout.tsx                      # Section layout (theme / shared context)
│       ├── page.tsx                        # Section hub / index page
│       ├── [tool-slug]/page.tsx            # Individual tool page
│       └── [content-slug]/
│           ├── page.tsx                    # Content index page
│           └── [slug]/page.tsx             # SEO-optimized dynamic page
├── components/
│   ├── ui/                                 # Primitives: Button, Card, Input, Badge…
│   ├── layout/                             # Header, Footer, Nav, Breadcrumb
│   └── [section]/                          # Section-specific widgets and forms
├── lib/
│   ├── calculators/                        # Pure business logic functions
│   ├── data/                               # Static TS data: lookup tables, reference data
│   ├── storage/                            # localStorage wrappers
│   └── utils/                              # Generic: format.ts, unit-convert.ts, url.ts
├── hooks/
│   ├── useLocalStorage.ts                  # Generic typed localStorage hook
│   └── use[Feature].ts                     # Feature-specific hooks
├── types/
│   ├── [domain].types.ts                   # Domain entity type shapes
│   └── common.types.ts                     # Result<T>, AppError
├── constants/
│   └── index.ts                            # SITE_URL and other app-wide constants
└── messages/
    └── en.json                             # All user-visible strings
```

---

## §3. Routing & URL Schema

### 3.1 Canonical URL Structure

The URL structure is defined in `README.MD` and is **immutable once published**. Do not deviate.

The general pattern:
```
yourdomain.com/
├── [section]/
│   ├── [tool-slug]/
│   └── [content-slug]/
│       └── [slug]/                         # SEO-optimized dynamic pages
└── [standalone-page]/
```

### 3.2 Dynamic Route Pages

All dynamic routes (`[slug]`) must pre-render at build time via `generateStaticParams()`.

Slug format must be defined in `README.MD` and derived from static data in `src/lib/data/`. No slug may be invented outside the data source.

```ts
// ✅ app/[section]/[content-slug]/[slug]/page.tsx
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}
```

### 3.3 URL Construction Rule

Never hardcode path segments in component `href` values. Always construct URLs via `lib/utils/url.ts`. This makes the v2 i18n prefix migration a single-file change.

```ts
// ✅ src/lib/utils/url.ts
export function pageUrl(path: string): string {
  return `/${path}/`;
}

// ✅ in a component
<a href={pageUrl('[section]/[tool-slug]')}>…</a>

// ❌ never
<a href="/[section]/[tool-slug]/">…</a>
```

### 3.4 Future i18n URL Prefix (v2+)

When multi-language launches, all routes gain a `[locale]` prefix:

```
/en/section/tool-slug/
/de/section/tool-slug/
```

Migration path: move route files under `app/[locale]/`, add `src/middleware.ts` for locale detection. The `pageUrl()` utility in §3.3 is the single point of change. No business logic changes required.

---

## §4. Rendering & Deployment Strategy

### 4.1 Static Export (Mandatory)

```js
// next.config.mjs
const nextConfig = {
  output: 'export',       // Full SSG — zero server cost, CDN-served
  trailingSlash: true,    // /[section]/[tool-slug]/ resolves correctly on Vercel
  reactStrictMode: true,
};
export default nextConfig;
```

**Consequences of `output: 'export'` — must respect these hard constraints**:

| Forbidden | Reason |
|-----------|--------|
| `dynamic = 'force-dynamic'` on any route | Requires server runtime |
| Next.js `<Image>` component | Image optimizer requires server runtime |
| API Routes (`app/api/*`) | Requires server runtime |
| Dynamic routes without `generateStaticParams()` | Cannot pre-render |

For images: use `<img>` with pre-optimized WebP assets (≤ 150 KB) in `public/`.

### 4.2 Server Components vs Client Components

**Default: every component is a Server Component.** Do not add `'use client'` unless required.

Add `'use client'` only when the component requires:
- React hooks (`useState`, `useEffect`, `useContext`, etc.)
- Browser APIs (`localStorage`, `window`, `navigator`)
- Event handlers (`onClick`, `onChange`, etc.)

**Critical pattern — push `'use client'` to the leaf node**:

```tsx
// ✅ app/[section]/[tool-slug]/page.tsx — Server Component (no directive)
import { ToolWidget } from '@/components/[section]/ToolWidget';

export const metadata = { title: '[Tool Name] — [Brand Name]' };

export default function ToolPage() {
  return (
    <main>
      <h1>[Tool Name]</h1>   {/* Rendered at build time, zero JS */}
      <ToolWidget />          {/* Client Component leaf */}
    </main>
  );
}

// ✅ components/[section]/ToolWidget.tsx — Client Component leaf
'use client';
import { useState } from 'react';
```

A `page.tsx` file **must never** contain the `'use client'` directive.

### 4.3 Metadata — Mandatory per Page

Every `page.tsx` must export either a static `metadata` object or a `generateMetadata` function.

```ts
export const metadata: Metadata = {
  title: '[Tool Name] — [Brand Name]',
  description: '[One-sentence description of what the tool does. Free, no login.]',
  alternates: {
    canonical: `${SITE_URL}/[section]/[tool-slug]/`,
  },
  openGraph: {
    title: '[Tool Name] — [Brand Name]',
    description: '…',
    url: `${SITE_URL}/[section]/[tool-slug]/`,
    images: [{ url: '/og/[tool-slug].png', width: 1200, height: 630 }],
  },
};
```

`SITE_URL` is defined in `src/constants/index.ts` and must never be hardcoded inline.

Schema.org JSON-LD is inlined as `<script type="application/ld+json">` in the page's Server Component body.

---

## §5. Data Architecture

### 5.1 Client-Side Only — No Backend

This site has zero backend services. All computation runs in the browser.

```
User Input (Client Component state)
    │
    ▼
lib/calculators/[domain].calc.ts   ← pure function — deterministic, unit-testable
    │
    ├─ ok: true  → Result data rendered in UI
    └─ ok: false → AppError code → localized error message via messages/en.json
                                        │
                                        ▼  (optional, if persistence needed)
                             lib/storage/[domain].storage.ts → localStorage
```

**Absolute prohibition**: No user input or calculation result may ever be sent to an external server or third-party analytics service beyond what is explicitly defined in the privacy policy.

### 5.2 localStorage Storage Contract

Storage keys must be namespaced with the site identifier to avoid collisions:

```
[mysite]_[entity]      →  mysite_profiles
[mysite]_[entity]_[id] →  mysite_active_profile_id
```

All localStorage reads/writes must go through `src/lib/storage/`. No component or hook may call `localStorage` directly. Every `JSON.parse` of localStorage data must be wrapped in `try/catch` with a type-guard validator. Malformed data is silently discarded and re-initialized to a safe default.

```ts
// ✅ src/lib/storage/[domain].storage.ts
export function getEntities(): Entity[] {
  try {
    const raw = localStorage.getItem('mysite_entities');
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isValidEntity) : [];
  } catch {
    return [];
  }
}
```

Use `crypto.randomUUID()` for all new entity IDs. No external UUID library needed.

### 5.3 Static Reference Data

All lookup data (tables, rules, reference values) lives in `src/lib/data/` as TypeScript modules with typed exports.

- No runtime `fetch()` calls to external APIs.
- No CDN-hosted JSON loaded at runtime.
- Data is bundled at build time and tree-shaken per page.

---

## §6. SEO Architecture

### 6.1 Canonical & Discovery

- Every page sets `metadata.alternates.canonical` to its absolute URL (constructed via `SITE_URL` constant — never hardcoded).
- `app/sitemap.ts` generates the sitemap programmatically from route data. Never hand-write a static sitemap.
- `app/robots.ts` explicitly allows all crawlers.
- **Do not manually add `<link rel="canonical">` tags in JSX.** The `alternates.canonical` field in `metadata` already emits this tag. Duplicating it breaks crawlers.

#### `app/robots.ts` — canonical implementation

```ts
import { MetadataRoute } from 'next';
import { SITE_URL } from '@/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

#### `app/sitemap.ts` — canonical implementation

```ts
import { MetadataRoute } from 'next';
import { SITE_URL } from '@/constants';
// Import route data from lib/data/ — never hardcode URL arrays here
import { getAllToolSlugs } from '@/lib/data/routes';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    // Add each section hub page here
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = getAllToolSlugs().map((slug) => ({
    url: `${SITE_URL}/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
```

---

### 6.2 Metadata — Static vs Dynamic Pages

#### Static pages (most tool pages)

```ts
// app/[section]/[tool-slug]/page.tsx
import { Metadata } from 'next';
import { SITE_URL } from '@/constants';

export const metadata: Metadata = {
  title: '[Tool Name] — [Brand Name]',          // ≤ 60 characters
  description: '[One sentence. What it does, who it helps. No filler.]', // ≤ 155 characters
  alternates: {
    canonical: `${SITE_URL}/[section]/[tool-slug]/`,
  },
  openGraph: {
    type: 'website',
    title: '[Tool Name] — [Brand Name]',
    description: '[Same or slightly shorter than meta description.]',
    url: `${SITE_URL}/[section]/[tool-slug]/`,
    siteName: '[Brand Name]',
    images: [{ url: `${SITE_URL}/og/[tool-slug].png`, width: 1200, height: 630, alt: '[Tool Name]' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '[Tool Name] — [Brand Name]',
    description: '[Same as OG description.]',
    images: [`${SITE_URL}/og/[tool-slug].png`],
  },
};
```

#### Dynamic pages (content/SEO pages with `[slug]`)

Use `generateMetadata()` when the title and description vary per slug:

```ts
// app/[section]/[content-slug]/[slug]/page.tsx
import { Metadata } from 'next';
import { SITE_URL } from '@/constants';
import { getEntryBySlug } from '@/lib/data/[domain]';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntryBySlug(slug); // ✅ from lib/data/ — never fetch() at runtime

  return {
    title: `${entry.title} — [Brand Name]`,  // ≤ 60 characters
    description: entry.description,           // ≤ 155 characters
    alternates: { canonical: `${SITE_URL}/[section]/[content-slug]/${slug}/` },
    openGraph: {
      type: 'article',
      title: `${entry.title} — [Brand Name]`,
      description: entry.description,
      url: `${SITE_URL}/[section]/[content-slug]/${slug}/`,
      siteName: '[Brand Name]',
      images: [{ url: `${SITE_URL}/og/[content-slug].png`, width: 1200, height: 630, alt: entry.title }],
    },
  };
}
```

#### Hard limits on metadata strings

| Field | Hard limit | Why |
|-------|-----------|-----|
| `title` | ≤ 60 characters | Google truncates beyond this |
| `description` | ≤ 155 characters | Google truncates beyond this |
| OG image | 1200 × 630 px, WebP, ≤ 150 KB | Required for all major social platforms |
| `alt` on OG image | Required, descriptive | Accessibility + some crawlers read it |

---

### 6.3 Schema.org JSON-LD — Implementation Rules

Inline JSON-LD as a `<script>` in the **Server Component body** — not in `<head>` via metadata. This ensures it's part of the static HTML and works with `output: 'export'`.

**Page-type → Schema mapping (mandatory):**

| Page type | Required schema types |
|-----------|----------------------|
| Homepage | `Organization` + `WebSite` (with `SearchAction` if search exists) |
| Interactive tool / calculator pages | `WebApplication` + `BreadcrumbList` |
| Article / content pages | `Article` + `BreadcrumbList` + optionally `FAQPage` |
| Category / hub pages | `WebPage` + `BreadcrumbList` |

#### Pattern — WebApplication (tool pages)

```tsx
// app/[section]/[tool-slug]/page.tsx — Server Component
import { SITE_URL } from '@/constants';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '[Tool Name]',
  url: `${SITE_URL}/[section]/[tool-slug]/`,
  description: '[Same as meta description]',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export default function ToolPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* page content */}
    </>
  );
}
```

#### Pattern — BreadcrumbList (every non-homepage page)

```tsx
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: '[Section Name]', item: `${SITE_URL}/[section]/` },
    { '@type': 'ListItem', position: 3, name: '[Tool Name]', item: `${SITE_URL}/[section]/[tool-slug]/` },
  ],
};
```

**Rules:**
- The last `ListItem` must NOT include `item` (current page has no outbound breadcrumb link).
- `position` values must be sequential integers starting from 1.
- Never hardcode URLs — always use `SITE_URL` from `@/constants`.

---

### 6.4 Core Web Vitals Targets

| Metric | Target | Primary cause of failure to avoid |
|--------|--------|----------------------------------|
| LCP | < 2.5 s | Render-blocking scripts; unoptimized hero images |
| CLS | < 0.1 | Missing `width`/`height` on `<img>`; late-loading fonts |
| INP | < 200 ms | Heavy JS in event handlers; unthrottled state updates |

**CLS prevention rules (mandatory):**
- Every `<img>` must have explicit `width` and `height` attributes matching the rendered intrinsic size. Never omit them.
- Font loading uses `next/font/google` with `display: 'swap'`. Never use `@import` in CSS.
- Dynamic content that changes layout (e.g., results area appearing) must use `min-height` to reserve space.

---

### 6.5 SEO Forbidden Patterns

| Pattern | Why forbidden | Correct approach |
|---------|--------------|-----------------|
| Manual `<link rel="canonical">` in JSX | Duplicates the tag Next.js already emits from `metadata.alternates.canonical` | Use only `alternates.canonical` in `metadata` |
| `title` > 60 characters | Google silently truncates — optimized title is lost | Count before committing |
| `description` > 155 characters | Truncated in SERPs — wastes copy | Count before committing |
| Hardcoded `https://yourdomain.com` in metadata | Breaks staging/preview environments | Always `${SITE_URL}` from `@/constants` |
| JSON-LD in a Client Component | Executes after hydration — crawlers may miss it | Only in Server Components |
| `dangerouslySetInnerHTML` for JSON-LD without `JSON.stringify` | XSS risk if any data field contains user input | Always use `JSON.stringify(jsonLd)` with server-side data only |
| Dynamic route page without `generateStaticParams()` | Page is not pre-rendered — crawlers get a 404 on SSG export | Always implement `generateStaticParams()` |
| Missing `alt` on OG image in metadata | Some parsers reject the image | Always include descriptive `alt` |
| `<img>` without `width` and `height` | Causes CLS — Google penalizes | Always set both attributes |
| `next/head` usage | Pages Router API — incompatible with App Router | Use `metadata` export or `generateMetadata()` |

---

### 6.6 SEO Self-Check (run after every page implementation)

- [ ] Does `metadata` (or `generateMetadata`) exist on every `page.tsx`? → Add it.
- [ ] Does `metadata.alternates.canonical` use `SITE_URL` from constants? → Fix hardcoded URLs.
- [ ] Is `title` ≤ 60 characters? → Shorten it.
- [ ] Is `description` ≤ 155 characters? → Shorten it.
- [ ] Is there a manual `<link rel="canonical">` in JSX? → Remove it.
- [ ] Does the page have a JSON-LD block matching its page type from §6.3? → Add it.
- [ ] Does JSON-LD use `JSON.stringify()` and only server-side data? → Verify no user input flows into it.
- [ ] Does the BreadcrumbList omit `item` on the last `ListItem`? → Fix it.
- [ ] Does every `<img>` have `width`, `height`, and `alt`? → Add them.
- [ ] Does `sitemap.ts` include this page's URL? → Add it if missing.

---

## §7. i18n Architecture

### 7.1 v1 Scope: English Only

All user-visible strings in `src/messages/en.json`. No locale prefix in URLs.

**Zero hardcoded strings rule**: No user-visible text may appear in `.tsx` or `.ts` source files. Every string — button labels, error messages, disclaimer text, formula citations — must be a key in `messages/en.json`.

### 7.2 Key Schema

```
[page].[section].[element]     →  home.hero.title
[tool].error.[code]            →  calorieCalc.error.weightRequired
common.[element]               →  common.button.calculate
disclaimer.standard            →  disclaimer.standard
```

### 7.3 Implementation Library

Use **`next-intl`**. Even in v1 English-only mode, all strings flow through `useTranslations` / `getTranslations`. This eliminates the need to touch component files when adding languages in v2.

### 7.4 v2 Migration Path (design for it now, implement later)

1. Move all route files under `app/[locale]/`
2. Add `src/middleware.ts` for locale detection and redirect
3. Add `messages/de.json`, `messages/fr.json`, `messages/es.json`
4. Update `pageUrl()` in `lib/utils/url.ts` to prepend locale
5. **Zero changes** to calculator logic or component JSX

### 7.5 Number & Date Formatting

All dates and numbers must be formatted via the `Intl` API, never by string concatenation.

```ts
// ✅
new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(weightKg)
new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(date))

// ❌
`${weightKg} kg`
`${month}/${day}/${year}`
```

---

## §8. Performance Mandates

1. **No render-blocking third-party scripts.** Analytics scripts must load via `next/script strategy="afterInteractive"`.
2. **No runtime data fetching on interactive pages.** Computations run from user input + bundled static data only.
3. **Framer Motion** is permitted only for page-level entry animations and modal transitions. Never animate each item in a list loop — animate the wrapping container instead.
4. **Fonts**: use `next/font/google` with `display: 'swap'`. Load only the weight variants used by the design system.
5. **Images**: pre-optimized WebP, ≤ 150 KB for hero and OG images. Use `<img>` (not `<Image>`) because `output: 'export'` disables the Next.js image optimizer.

---

## §9. Security & Compliance

1. **No server-side secrets.** No API keys, DB credentials, or auth tokens in source. If a future integration requires a key, use a Vercel Edge Function with the key in Vercel environment variables — never committed to source.
2. **CSP header**: configured in `vercel.json` headers block. Deny `unsafe-eval`; document any `unsafe-inline` exception with an inline comment.
3. **localStorage XSS hardening**: every `JSON.parse` of localStorage data must be wrapped in `try/catch` with a type-guard validator. Malformed data must be silently discarded and re-initialized to a safe default.
4. **Disclaimer mandatory**: every page section that produces a result or recommendation must render the standard disclaimer (keyed as `disclaimer.standard` in `messages/en.json`). It is not optional and must not be conditionally hidden via a prop.
5. **Content guardrails**: no page output may use language implying professional advice (medical, legal, financial, or otherwise) beyond the site's stated scope. Violating copy is rejected at PR review.

---

## §10. Dependency Policy

### 10.1 Approved Core Dependencies

| Package | Purpose | Type |
|---------|---------|------|
| `next` | Framework | Runtime |
| `react`, `react-dom` | UI runtime | Runtime |
| `typescript` | Type safety | Dev |
| `tailwindcss` | Styling | Dev |
| `next-intl` | i18n | Runtime |
| `framer-motion` | Animations (scoped per §8) | Runtime |
| `next-sitemap` | Sitemap generation | Dev/Build |
| `vitest` | Unit & integration testing | Dev |
| `@testing-library/react` | Component testing | Dev |
| `@playwright/test` | E2E smoke tests | Dev |

### 10.2 Adding a New Dependency

Any new runtime dependency must be justified on three axes in the PR description:

1. **Bundle size**: check bundlephobia.com — include gzipped size.
2. **Maintenance health**: last publish date and weekly download count.
3. **Can this be a `< 20 line` utility instead?**

If (3) is yes, write the utility. Do not add a package.

---

## §11. AI Self-Check Checklist

Run after every code generation that touches architecture:

- [ ] **Core Principles met?** Did I state my assumptions? Did I keep the change minimal? Did I only touch code that had to change? Did I flag any uncertainty?
- [ ] Does any `page.tsx` contain `'use client'`? → Remove; push to child component.
- [ ] Does any component call `localStorage` directly? → Route through `lib/storage/`.
- [ ] Does any component contain business logic or calculation math? → Move to `lib/calculators/`.
- [ ] Does any `.tsx` or `.ts` file contain a hardcoded user-visible string? → Move to `messages/en.json`.
- [ ] Does any route `page.tsx` lack a `metadata` export? → Add it.
- [ ] Does any `metadata` export lack `alternates.canonical`? → Add the absolute URL via `SITE_URL` constant.
- [ ] Does `title` exceed 60 characters? → Shorten it.
- [ ] Does `description` exceed 155 characters? → Shorten it.
- [ ] Does any page body contain a manual `<link rel="canonical">`? → Remove; `alternates.canonical` handles it.
- [ ] Does any page lack a JSON-LD block matching its type from §6.3? → Add it.
- [ ] Does JSON-LD appear in a Client Component? → Move to the Server Component parent.
- [ ] Does any result/recommendation section lack the standard disclaimer? → Add it.
- [ ] Does any PR introduce a second `package.json` or monorepo structure? → Reject.
- [ ] Does any dynamic route (`[slug]`) lack `generateStaticParams()`? → Add it.
- [ ] Does any date or number format use string concatenation instead of `Intl` API? → Fix it.
- [ ] Does any component `href` hardcode a path segment instead of using `pageUrl()`? → Fix it.
- [ ] Does any new runtime dependency lack the three-axis justification? → Add it.
- [ ] Does any `lib/calculators/` function lack a corresponding unit test? → Add it.
- [ ] Does any `<input>` lack an associated `<label>` or `aria-label`? → Add it.
- [ ] Does any icon-only button lack `aria-label`? → Add it.
- [ ] Does any `<img>` lack an `alt` attribute? → Add it (`alt=""` for decorative).
- [ ] Does any interactive element suppress `:focus-visible` without an accessible alternative? → Fix it.

---

## §12. Testing Architecture

### 12.1 Coverage Requirements by Layer

| Layer | Tool | Minimum Coverage |
|-------|------|-----------------|
| `lib/calculators/` | Vitest | **100%** — every formula, every boundary value, every error path |
| `lib/utils/` | Vitest | ≥ 90% |
| `lib/storage/` | Vitest | ≥ 90% — including malformed-input and missing-key branches |
| `hooks/` | Vitest + `@testing-library/react` | ≥ 80% |
| `components/` | `@testing-library/react` | Critical render paths + every form interaction flow |
| E2E smoke | `@playwright/test` | ≥ 1 test per interactive page: happy path + validation error state |

### 12.2 What to Test — Required Cases

**Every `lib/calculators/` function must have tests for:**
- Normal inputs → assert exact output value (not just non-null)
- Boundary values: zero, negative, maximum representable
- Invalid / missing inputs → returns `Result<T>` with correct `error.code` (must never throw)

**Every `lib/storage/` module must have tests for:**
- Happy path read → write → read round-trip
- Missing key → returns correct safe default
- Malformed JSON in localStorage → returns safe default, no exception escapes
- Type-guard rejects unknown shape

**Every component with form inputs must have tests for:**
- Renders without crashing (snapshot or existence check)
- Fill form → submit → assert correct result is displayed
- Invalid input → assert error message rendered with correct i18n key

### 12.3 Test File Conventions

- Co-locate unit tests next to the source: `my-calc.test.ts` beside `my-calc.ts`
- Co-locate component tests: `MyWidget.test.tsx` beside `MyWidget.tsx`
- E2E tests live in `e2e/` at the repo root — never inside `src/`
- Playwright selectors use `data-testid="[component]-[element]"`. Never select by CSS class or visible text content.
- Test descriptions use plain English: `it('returns error when weight is zero', …)`. No abbreviations.

### 12.4 CI Quality Gate

The following checks must pass on every PR before merge — no exceptions:

```
pnpm typecheck    # zero TypeScript errors (tsc --noEmit)
pnpm lint         # zero ESLint errors
pnpm test         # all unit + component tests pass
pnpm build        # production build succeeds without error or warning
```

A PR that fails any gate is **auto-blocked**. "Fix in follow-up PR" is not an acceptable resolution.

---

## §13. Accessibility (WCAG 2.1 AA)

All interactive components must meet WCAG 2.1 Level AA. This is both a legal requirement in target markets (EU EAA, US ADA) and a Core Web Vitals signal.

### 13.1 Requirements

| Requirement | Rule |
|-------------|------|
| Color contrast | ≥ 4.5:1 for body text; ≥ 3:1 for large text (≥ 24 px regular or ≥ 18.66 px bold) |
| Keyboard navigation | Every interactive element is reachable via Tab / Shift+Tab and operable via Enter / Space |
| Focus ring | Never use `outline-none` / `focus:outline-none` without a `focus-visible:` ring replacement |
| Form inputs | Every `<input>`, `<select>`, `<textarea>` has a `<label>` via `for`/`id`, or `aria-label` / `aria-labelledby` |
| Error messages | Validation errors are announced via `role="alert"` or `aria-live="polite"` |
| Images | Informational `<img>` has descriptive `alt`. Decorative `<img>` has `alt=""` |
| Icon-only buttons | Must have `aria-label` describing the action, not the icon |
| Heading hierarchy | Exactly one `<h1>` per page. Levels must not skip (e.g. `h1` → `h3` is forbidden) |
| Motion | Wrap all Framer Motion animations in a `useReducedMotion()` check; disable or reduce when true |
| Touch targets | Minimum 44 × 44 px tap target for all interactive elements on mobile |

### 13.2 AI Self-Check for Accessibility

After generating any component, verify:
- [ ] Every `<input>` / `<select>` / `<textarea>` has a visible or screen-reader `<label>`?
- [ ] Every icon-only button has `aria-label`?
- [ ] Every `<img>` has `alt` (descriptive or `""` for decorative)?
- [ ] No `focus:outline-none` without a `focus-visible:ring-*` companion?
- [ ] Error states use `role="alert"` or `aria-live`?
- [ ] Heading hierarchy is sequential with no skipped levels?
- [ ] Framer Motion animations respect `useReducedMotion()`?
