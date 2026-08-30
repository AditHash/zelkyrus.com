# Zelkyrus

Marketing site for **Zelkyrus** — a small studio that builds websites, full-stack
applications, and GenAI-powered apps, and consults on application development,
AI/ML & GenAI, and DevOps & Cloud.

Live: [zelkyrus.com](https://zelkyrus.com) · Repo: `github.com/AditHash/zelkyrus.com`

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS 3** for styling (no CSS-in-JS)
- **lucide-react** for icons
- Real brand logos on the About page's tech-stack section via
  [Simple Icons](https://simpleicons.org) and [Devicon](https://devicon.dev) CDNs
  (no npm dependency, just `<img>` tags — see "Icons" below)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build, also type-checks
npm run start    # serve the production build
```

## Project structure

```
src/
  app/
    layout.tsx          # root layout: fonts, theme-init script, Navbar/Footer
    globals.css          # base styles + the one shared .shadow-product utility
    page.tsx              # home
    about/page.tsx
    services/page.tsx
    contact/page.tsx      # client component: contact form (local state only, no backend yet)
  components/
    Navbar.tsx             # sticky black nav, mobile menu, ThemeToggle
    Footer.tsx
    ThemeToggle.tsx         # dark mode toggle (see "Dark mode" below)
    OptionWheel.tsx/.css    # picker-wheel used in the home hero to cycle services
    ui/button.tsx           # shadcn-generated scaffold — currently unused, kept as-is
public/
  Images/                   # all photography + logo; see "Images" below
```

## Design system

Built on a light/dark, Apple-influenced flat system — see the git history on
`main` for the full rationale. The short version:

- **One accent color**: `#0066cc` (light) everywhere — buttons, links, icon tints.
- **Surfaces**: white/`#f5f5f7` (light) and `#000`/`#1c1c1e`/`#2c2c2e` (dark),
  alternating per section for rhythm. No decorative gradients, no glassmorphism.
- **Radius**: `rounded-2xl` for cards/images, `rounded-full` for every button and pill.
- **Shadow**: exactly one, `.shadow-product` in `globals.css`, reserved for
  photography resting on a surface — never on cards, buttons, or text.
- **Type**: Inter, tight negative tracking on headlines, no eyebrow-style
  uppercase labels anywhere on the site (a deliberate choice, not an oversight).
- Colors/spacing are hardcoded as Tailwind arbitrary values (`bg-[#1d1d1f]`,
  `dark:bg-[#2c2c2e]`) rather than theme tokens — consistent with how the file
  was originally scaffolded. If this grows much further, promoting the repeated
  hex values to `tailwind.config.js` `theme.extend.colors` would cut noise.

## Dark mode

- Defaults to the visitor's OS preference (`prefers-color-scheme`).
- Manual override via the Sun/Moon toggle in the nav, persisted to
  `localStorage` (`zelkyrus-theme`).
- A `beforeInteractive` script in `layout.tsx` sets the `dark` class on `<html>`
  before first paint, so there's no flash of the wrong theme.
- Every section has an explicit `dark:` variant — this was audited page by page,
  not just the background color.

## Images

Everything in `public/Images/` is real supplied/generated photography, not stock
placeholders:

| File | Used on |
|---|---|
| `logo.png` | Nav |
| `hero-desk.png` | Home hero |
| `office-planning.png` | Home, process section |
| `team-celebrating.png` | Home, "why work with us" |
| `team.png` | About hero |
| `consulting-desk.png` | About, "how we work together" |
| `team-group.png` | Contact, "what happens next" |
| `service-websites.png`, `service-fullstack.png`, `service-genai.png`, `service-consulting.png` | Services cards |

If you add more, drop them in `public/Images/` and reference as `/Images/<file>.png`
via `next/image` (or a plain `<img>` for external/remote sources, since
`next.config.mjs` has no `images.remotePatterns` configured).

## Icons

The About page's tech-stack section pulls real brand logos live from:

- `https://cdn.simpleicons.org/<slug>` — most languages/frameworks/databases
- `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/<path>.svg` — AWS, Azure
  (Simple Icons doesn't carry these)

Every slug/path used was verified against the source's official list before
being added — **don't add a new one without checking it resolves first**
(`curl -o /dev/null -w "%{http_code}" <url>`), since a bad slug fails silently
as a blank broken image, not an error. A few real products (OpenAI, Groq,
Pinecone) have no public brand icon on either service; those use a plain
`lucide-react` glyph instead rather than a guessed logo.

## Known cleanup opportunities (not yet done)

- `package.json` still lists `ogl`, `framer-motion`, `@base-ui/react`,
  `class-variance-authority`, `tailwind-merge`, `tw-animate-css`, and `shadcn`
  as dependencies. None of them are currently imported anywhere in `src/`
  (`ogl` was for a WebGL background that was removed; the rest came from an
  earlier shadcn scaffold). Safe to `npm uninstall` if nothing new starts using
  them, but left in place since removing dependencies wasn't asked for.
- `src/components/ui/button.tsx` is an unused shadcn-generated component.
- There's no real backend yet: the Contact page's form only sets local
  component state on submit (`setSent(true)`) — no email is actually sent.
  Wire it to a real endpoint (e.g. Formspree, Resend, or an API route) before
  relying on it in production.
- No portfolio/case-study page yet — intentionally skipped until there's real
  client work to show (see git history for the reasoning).

## Deployment

Static-friendly Next.js app; deploys cleanly to Vercel from the `main` branch.
No environment variables are currently required.
