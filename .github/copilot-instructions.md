# Syntax Constitution (Copilot Instructions)

> **AI Enforcement Rule**: This file governs all code generated in this repository.  
> After every code generation, run §10 Self-Check. Auto-correct any violation and annotate the reason.
>
> **Scope**: Code conventions only.  
> Architecture rules & AI Core Principles → [ArkCon.md](../ArkCon.md)

---

## §1. TypeScript

- **Strict mode on.** `tsconfig.json` must have `"strict": true`.
- **No `any`.** Use `unknown` + type guard, or narrow to a concrete type.
- All function parameters, return types, and `useState<T>` generics must be explicitly typed.
- Use `ES2022+` features: optional chaining `?.`, nullish coalescing `??`, logical nullish assignment `??=`, `Object.hasOwn()`, `structuredClone()`.
- **`Result<T>` pattern** for all operations that can fail:

  ```ts
  // src/types/common.types.ts
  export type Result<T> =
    | { ok: true; data: T }
    | { ok: false; error: AppError };

  export interface AppError {
    code: string;
    details?: string;
  }
  ```

- Prefer `type` over `interface` for plain object shapes. Use `interface` only for class contracts or when declaration merging is needed.
- No type assertions (`as SomeType`) except at validated system boundaries (e.g., after a type-guard check). Document every assertion with an inline comment.

---

## §2. Naming Conventions

| Token | Convention | Example |
|-------|-----------|---------|
| Variable / function | camelCase | `calculateTotal`, `activeItem` |
| Component / Type / Enum | PascalCase | `SearchWidget`, `UserProfile`, `Status` |
| Constant / Enum value | UPPER_SNAKE_CASE | `MAX_ITEMS`, `SITE_URL`, `Status.ACTIVE` |
| React component file | PascalCase | `SearchWidget.tsx` |
| Next.js convention files | lowercase | `page.tsx`, `layout.tsx`, `not-found.tsx` |
| Hook file | camelCase prefixed `use` | `useUserProfile.ts` |
| Library / utility file | kebab-case | `unit-convert.ts`, `date-format.ts` |
| Type definition file | `*.types.ts` | `user.types.ts`, `api.types.ts` |
| i18n message key | dot-separated lowercase | `home.hero.title`, `common.button.submit` |

---

## §3. File & Directory Organization

- **One component per file.** File name must match the component name exactly.
- **Co-locate tests**: `FeatureWidget.test.tsx` lives next to `FeatureWidget.tsx`.
- **No barrel `index.ts` files** that re-export everything. They obscure tree-shaking and create circular import risk. Use direct named imports.
- **Import alias**: always use `@/` (mapped to `src/`). Never use relative `../../` paths beyond one level up.

  ```ts
  // ✅
  import { formatDate } from '@/lib/utils/format';
  // ❌
  import { formatDate } from '../../../lib/utils/format';
  ```

---

## §4. Component Architecture

### 4.1 Server vs Client Components

```tsx
// ✅ Default — Server Component (no directive, no imports from client APIs)
export default function FeatureCard({ id }: { id: string }) {
  const data = getFeatureById(id); // lib function runs at build time
  return <div>{data.title}</div>;
}

// ✅ Client Component — directive is the very first line, before all imports
'use client';
import { useState } from 'react';

type InputWidgetProps = {
  onSubmit: (value: number) => void;
};
export function InputWidget({ onSubmit }: InputWidgetProps) { ... }
```

### 4.2 Props

- Every component must have an explicit `Props` type alias. No implicit `any` from missing prop types.
- Destructure props in the function signature.
- Boolean props: use shorthand for `true` → `<Button disabled />`, not `<Button disabled={true} />`.

### 4.3 No Class Components

All components are function components with hooks. Class components are not used in this codebase.

### 4.4 Error Boundaries

Every interactive widget (Client Component root) must be wrapped in an `ErrorBoundary`. Error messages displayed to the user must come from `messages/en.json`, never from raw `Error.message` or stack traces.

---

## §5. Styling

### 5.1 Tailwind Only

- All static styles: Tailwind utility classes exclusively.
- No CSS Modules, no `<style>` tags, no `styled-components`, no `emotion`.
- Dynamic computed values (e.g., progress bar width derived from a calculation) may use inline `style`:

  ```tsx
  // ✅ Dynamic value from state/calculation
  <div style={{ width: `${percentage}%` }} />

  // ❌ Static value — must use Tailwind
  <div style={{ color: 'red' }} />
  ```

### 5.2 Design Token Usage

Use CSS custom properties defined in `globals.css`. Do not hardcode hex values anywhere in JSX.

```tsx
// ✅ CSS custom property
<div className="text-[--brand-primary] bg-[--surface-default]" />

// ❌ Hardcoded hex
<div className="text-[#1B2D4F] bg-[#FFFBEB]" />
```

### 5.3 Responsive Breakpoints (Mandatory)

Every interactive component must be designed mobile-first and tested at:

- default (< 640px) — mobile portrait
- `sm:` ≥ 640px — mobile landscape
- `md:` ≥ 768px — tablet
- `lg:` ≥ 1024px — desktop

### 5.4 Standard Component Patterns

```tsx
// Glass card — standard container for inputs/results
<div className="bg-white/80 backdrop-blur-sm shadow-sm rounded-xl border border-white/20 p-6">

// Primary CTA button
<button className="bg-[--brand-primary] hover:bg-[--brand-primary-dark] text-white rounded-lg px-6 py-3 font-medium transition-colors">

// Secondary / neutral button
<button className="bg-[--surface-muted] hover:bg-[--surface-muted-dark] text-[--text-default] rounded-lg px-6 py-3 font-medium transition-colors">
```

---

## §6. i18n Coding Rules

All strings flow through `next-intl`. No exceptions.

```tsx
// ✅ Client Component
'use client';
import { useTranslations } from 'next-intl';

export function SubmitButton() {
  const t = useTranslations('common');
  return <button>{t('button.submit')}</button>;
}

// ✅ Server Component
import { getTranslations } from 'next-intl/server';

export default async function HeroSection() {
  const t = await getTranslations('home');
  return <h1>{t('hero.title')}</h1>;
}

// ❌ Never — hardcoded string
<button>Calculate</button>
```

- Add new keys to `messages/en.json` in the **same PR** as the feature that uses them.
- No orphan keys (keys in JSON not referenced in code).
- No missing keys (strings in code without a JSON entry).
- Every page section that produces a result or recommendation must include `{t('disclaimer.standard')}`.

---

## §7. localStorage Rules

- **Never call `localStorage` directly** from a component or hook.
- All reads and writes go through `src/lib/storage/[domain].storage.ts`.
- Every `JSON.parse` of localStorage data must be wrapped in `try/catch` with a type-guard:

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

- `crypto.randomUUID()` for all new profile IDs — no external UUID library needed.

---

## §8. Forbidden Patterns

| Pattern | Reason | Correct alternative |
|---------|--------|---------------------|
| `any` type | Defeats TypeScript safety | `unknown` + type guard |
| Class components | Not used in this codebase | Function component + hooks |
| `localStorage` called in components/hooks | Couples View to storage | `lib/storage/` wrappers |
| Business logic inside components | Untestable in isolation | `lib/calculators/` pure functions |
| Hardcoded user-visible strings in TSX | Blocks i18n | Key in `messages/en.json` |
| Hardcoded hex in `style={{}}` | Breaks design token system | CSS custom property via `className` |
| `../../../` relative imports | Fragile on refactoring | `@/` alias |
| Barrel `index.ts` re-exports | Circular import risk, hides tree-shaking | Direct named imports |
| `console.log` in committed code | Debug noise | Remove before commit |
| `getStaticProps` / `getServerSideProps` | Pages Router API — not used | `generateStaticParams()` / RSC data access |
| `dynamic(() => import(…), { ssr: false })` | Pages Router pattern | App Router Client Component |
| `as SomeType` without a guard | Bypasses type safety | Type guard function |
| Inline SVG icons without `aria-label` | Accessibility failure | Add `aria-label` or `aria-hidden="true"` |
| Result section without `{t('disclaimer.standard')}` | Compliance requirement | Add disclaimer to every result section |
| Magic numbers in logic | Unreadable, error-prone | Named constant in `src/constants/` |
| `useEffect` for synchronous derived state | Causes extra render cycle | `useMemo` or inline derivation |
| Prop drilling beyond 2 levels | Tight coupling, hard to maintain | Lift to shared hook or React Context |
| `fetch()` inside a component body | Re-runs on every render | Hook with `useEffect` or Server Component data access |
| Unhandled `Promise` rejections | Silent failures in production | Always `await` or chain `.catch()` |

---

## §9. Testing Conventions

### 9.1 What Must Be Tested

| Code unit | Required test cases |
|-----------|--------------------|
| `lib/calculators/` function | Normal input → exact output value; boundary values (0, negative, max); invalid input → `Result<T>` error code (never throws) |
| `lib/storage/` module | Happy-path round-trip; missing key → safe default; malformed JSON → safe default, no exception |
| `lib/utils/` function | Each branch of conditional logic; edge cases for string/date/number formatting |
| Client Component with form | Renders; fill → submit → correct result displayed; invalid input → error message rendered |

### 9.2 Test File Placement

- Unit tests co-located: `my-calc.test.ts` beside `my-calc.ts`
- Component tests co-located: `MyWidget.test.tsx` beside `MyWidget.tsx`
- E2E tests in `e2e/` at repo root — never inside `src/`

### 9.3 Test Writing Rules

```ts
// ✅ Descriptive, domain-readable test description
it('returns error code WEIGHT_ZERO when weight is 0', () => {
  const result = calculateMetric({ weight: 0 });
  expect(result.ok).toBe(false);
  if (!result.ok) expect(result.error.code).toBe('WEIGHT_ZERO');
});

// ❌ Vague, meaningless test description
it('works correctly', () => { … });
```

- Assert exact values, not just truthiness: `toBe(42)`, not `toBeTruthy()`.
- Never use `setTimeout` / `sleep` in tests. Use `vi.useFakeTimers()` or `waitFor()`.
- Playwright selectors: `data-testid="[component]-[element]"`. Never select by CSS class or visible text.

---

## §10. AI Self-Check Checklist

After every code generation:

**TypeScript & Architecture**
- [ ] **Followed Core Principles?** (see ArkCon.md §Core Principles) Did I state assumptions? Did I keep it minimal? Did I only touch necessary code? Did I flag uncertainty?
- [ ] Any `any` type? → Replace with typed alternative.
- [ ] Any component missing an explicit `Props` type? → Add it.
- [ ] Any business logic / formula inside a component? → Move to `lib/calculators/` or `lib/`.
- [ ] Any `localStorage` call outside `lib/storage/`? → Refactor.
- [ ] Any `import` using `../../` beyond one level? → Replace with `@/` alias.
- [ ] Any `console.log` in committed code? → Remove.
- [ ] Any `getStaticProps` or `getServerSideProps` used? → Replace with App Router equivalent.
- [ ] Any unhandled `Promise` rejection? → Add `.catch()` or `await` with `try/catch`.

**i18n & Styling**
- [ ] Any hardcoded user-visible string in `.tsx`/`.ts`? → Move to `messages/en.json`.
- [ ] Any new key added to code without a matching entry in `messages/en.json`? → Add the entry.
- [ ] Any hardcoded hex color in `style={{}}` or `className`? → Use CSS custom property.
- [ ] Any result/recommendation section missing `{t('disclaimer.standard')}`? → Add it.

**Components**
- [ ] Any interactive Client Component widget missing an `ErrorBoundary` wrapper? → Add it.
- [ ] Any magic number in logic? → Extract to a named constant in `src/constants/`.
- [ ] Any `useEffect` used for synchronous derived state? → Replace with `useMemo`.

**Testing**
- [ ] Any new `lib/calculators/` function without a unit test? → Add it.
- [ ] Any new `lib/storage/` function without tests for the malformed-data branch? → Add it.
- [ ] Any new component with form inputs without a submit-flow test? → Add it.

**Accessibility**
- [ ] Any `<input>` / `<select>` / `<textarea>` missing a `<label>` or `aria-label`? → Add it.
- [ ] Any icon-only button missing `aria-label`? → Add it.
- [ ] Any `<img>` missing `alt`? → Add it (`alt=""` for decorative).
- [ ] Any `focus:outline-none` without a `focus-visible:ring-*` companion? → Fix it.
