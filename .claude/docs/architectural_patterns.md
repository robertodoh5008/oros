# Architectural Patterns

Detailed patterns and conventions used across the OROS codebase.

## Component Patterns

### Client vs Server Components
- **Client components** (`"use client"`): Used when the page needs interactivity (state, event handlers, animations). Examples: `app/page.tsx:1`, `app/get-scouted/page.tsx:1`
- **Server components** (default): Used for static or data-driven pages with no client-side state. Example: `app/talent/[division]/page.tsx:43` — uses `async function` with `await params`

### Inline Sub-Components
Helper components are defined as plain functions in the same file, below the default export. They are not extracted to separate files unless reused across pages.
- `SectionTitle` in `app/page.tsx:29` — section header with optional eyebrow text
- `Field` in `app/get-scouted/page.tsx:213` — form input wrapper with label

### Props Typing
Props are typed inline with destructured parameters rather than separate interface declarations:
```tsx
function Field({ label, placeholder }: { label: string; placeholder: string }) { ... }
```
See `app/page.tsx:29`, `app/get-scouted/page.tsx:213`

## State Management

- **No external library.** All state is local `useState` within client components.
- Form state uses a single `useState<FormState>` object (`app/get-scouted/page.tsx:18`) updated via spread: `setForm({ ...form, name: v })`
- Derived state computed inline: `isFormEnabled`, `isFormValid` (`app/get-scouted/page.tsx:35-41`)
- `useMemo` for static data that shouldn't re-create on render (`app/page.tsx:52`, `app/get-scouted/page.tsx:30`)

## API Route Patterns

Single API route at `app/api/get-scouted/route.ts`:
- Exports named `POST` function (Next.js App Router convention)
- Returns `NextResponse.json(...)` with appropriate status codes
- Wraps logic in `try-catch`, logs errors with `console.error`
- Parses request body with `await req.json()`
- No input validation or sanitization on the server side

## Styling Conventions

### Tailwind Utility-First
All styling uses Tailwind classes directly on elements. No custom component CSS or CSS modules.

### Opacity Hierarchy for Text
White text uses opacity variants to establish visual hierarchy:
- `text-white` — primary headings, emphasis
- `text-white/80` — secondary emphasis
- `text-white/75` — body text with weight
- `text-white/70` — standard body text
- `text-white/60` — subheadings, hero labels
- `text-white/55` — eyebrow labels, section markers
- `text-white/50` — captions, hints

### Typography Scale
- Serif font (`font-serif` / Playfair Display): headings, titles, statement text
- Sans font (Inter): body text, labels, navigation
- Eyebrow labels: `text-[11px] tracking-[0.22em]` or `tracking-[0.28em]`
- Body: `text-[15px] leading-[1.9]`
- Navigation: `text-[12px] tracking-[0.18em]`

### Responsive Breakpoints
Uses Tailwind's `md:` prefix (768px) as the primary breakpoint. No other breakpoints used.
- Mobile-first: base styles are mobile, `md:` overrides for desktop
- Grid shifts: `md:grid-cols-2`, `md:grid-cols-3`, `md:grid-cols-12`
- Spacing adjusts: `px-5` → `md:px-8`, `py-16` → `md:py-24`

### Card/Container Pattern
Consistent container styling: `rounded-2xl border border-white/10 bg-white/5 p-8`

## Form Handling

### Consent Gates
The Get Scouted form (`app/get-scouted/page.tsx:100-124`) requires two checkboxes before the form fields become interactive:
1. Privacy Policy and Terms acceptance
2. Understanding that submission doesn't guarantee acceptance

Both must be checked for `isFormEnabled` to be `true`, which controls the `disabled` prop on all form fields.

### Controlled Components
All form inputs are controlled via the `form` state object. The `Field` sub-component (`app/get-scouted/page.tsx:213`) abstracts the label + input pattern with an `onChange` callback that passes the raw value string.

### Submission Flow
1. Client-side validation checks `isFormValid` (`app/get-scouted/page.tsx:36-41`)
2. `fetch` POST to `/api/get-scouted` with JSON body
3. On success: reset form state and consent checkboxes
4. Loading state disables submit button, shows "SUBMITTING..." text

## Email Integration

- **Transport:** Nodemailer with Gmail SMTP service (`app/api/get-scouted/route.ts:8-14`)
- **Credentials:** `OROS_EMAIL` and `OROS_EMAIL_PASS` environment variables (Gmail app password)
- **Email format:** HTML template with form field values interpolated directly
- **Recipient:** Hardcoded email address in route handler

## Animation Patterns

### Framer Motion Usage
Only used in client components. Import: `import { AnimatePresence, motion } from "framer-motion"`

### Common Patterns
- **Hero entrance:** `initial={{ opacity: 0, y: 18 }}` → `animate={{ opacity: 1, y: 0 }}` (`app/page.tsx:89-92`)
- **Scroll reveal:** `whileInView={{ opacity: 1, y: 0 }}` with `viewport={{ once: true, amount: 0.2 }}` (`app/page.tsx:187-189`)
- **Staggered children:** `transition={{ delay: i * 0.05 }}` where `i` is the array index (`app/page.tsx:189`)
- **Video crossfade:** `AnimatePresence mode="wait"` with `motion.video` elements (`app/page.tsx:67-81`)
- **Modal:** `AnimatePresence` wrapping a conditional `motion.div` with scale + opacity transitions (`app/page.tsx:290-316`)

### Transition Defaults
- Duration: `0.6` for scroll reveals, `1.1` for hero entrance, `1.2` for video crossfade
- Easing: `"easeInOut"` for crossfades, default for others

## Type Conventions

- **Strict mode** enabled in `tsconfig.json:7`
- **Inline types:** Form state defined as `type FormState = { ... }` in the same file (`app/get-scouted/page.tsx:5-12`)
- **Record for content maps:** `Record<string, { title: string; body: string; images: string[] }>` for division data (`app/talent/[division]/page.tsx:4`)
- **No shared types directory** — types live next to usage
- **Path alias:** `@/*` maps to project root (`tsconfig.json:23`)

## File and Naming Conventions

- **Directories:** kebab-case (e.g., `get-scouted/`, `artists-musicians`)
- **Page files:** `page.tsx` (Next.js App Router convention)
- **API routes:** `route.ts` in `app/api/` directories
- **Dynamic segments:** `[param]` directory naming (e.g., `[division]`)
- **Static assets:** numbered files in `public/images/` and `public/videos/`
- **Layout:** Single root `layout.tsx` — no nested layouts
