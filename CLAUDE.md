# CLAUDE.md — The House of OROS Institute

## Project Overview

OROS is the marketing and talent application website for **The House of OROS Institute**, a private talent management and consulting institute for creatives. The site showcases the institute's divisions, philosophy, and provides a "Get Scouted" application form that sends submissions via email.

## Tech Stack

- **Framework:** Next.js 16 (App Router) with React 19
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (PostCSS plugin)
- **Animation:** Framer Motion 12
- **Email:** Nodemailer with Gmail SMTP
- **Deployment:** Netlify
- **Linting:** ESLint with eslint-config-next

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint (eslint)
```

## Project Structure

```
app/
├── layout.tsx                    # Root layout: fonts (Inter, Playfair), nav, footer, metadata
├── page.tsx                      # Home: hero video carousel, about, talent divisions, institute
├── globals.css                   # Tailwind import, CSS variables, dark-mode theme
├── get-scouted/
│   └── page.tsx                  # Application form with consent gates and validation
├── api/
│   └── get-scouted/
│       └── route.ts              # POST handler: parses JSON, sends email via Nodemailer
├── talent/
│   └── [division]/
│       └── page.tsx              # Dynamic division pages (models, artists, photographers, etc.)
├── privacy/
│   └── page.tsx                  # Privacy policy (static)
└── terms/
    └── page.tsx                  # Terms & conditions (static)

public/
├── images/                       # Editorial gallery images (01.png–06.png)
└── videos/                       # Hero background videos (home1–home4.mov)
```

## Key Architectural Decisions

- **Client vs Server components:** Home page (`app/page.tsx`) and Get Scouted form are `"use client"` for interactivity. Division pages (`app/talent/[division]/page.tsx`) are server components with async params.
- **No external state management:** All state uses React `useState`/`useMemo` locally.
- **Inline types:** Types are defined inline at point of use (no shared types directory).
- **Content as data:** Division content stored as `Record<string, {...}>` maps within page files rather than in a CMS or separate data files.
- **Form consent gates:** The Get Scouted form requires two checkboxes (privacy acceptance + understanding) before fields become enabled.

## Environment Variables

```
OROS_EMAIL          # Gmail address for sending applications
OROS_EMAIL_PASS     # Gmail app password
```

## Divisions

The site serves six talent divisions: Models, Artists & Musicians, Photographers, Videographers, Creators, Performers. Division slugs use kebab-case (e.g., `artists-musicians`).

## Additional Documentation

- [Architectural Patterns](.claude/docs/architectural_patterns.md) — Component patterns, styling conventions, form handling, animation, and type conventions
