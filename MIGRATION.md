# Migration from Nuxt.js to Next.js 16

This document outlines the migration from Nuxt.js to Next.js 16.

## What Was Changed

### Core Framework
- **Nuxt.js** → **Next.js 16** with App Router
- **Vue.js** → **React 18** with TypeScript
- **Nuxt i18n** → **next-intl**

### Project Structure
- Pages moved from `pages/` to `src/app/[locale]/`
- Layouts moved from `layouts/` to `src/layouts/`
- Components remain in `src/components/` but converted to React
- API routes moved from `server/routes/` to `src/app/api/`

### Components
All Vue components have been converted to React functional components:
- All UI components (Button, Input, Modal, Select, etc.)
- All common components (Logo, Nav, Phones, Schedule, etc.)
- All page sections (Services, Price, Reviews, Order)
- All layouts (Main, Info)
- All info pages

### Configuration Files
- `nuxt.config.js` → `next.config.js`
- `.eslintrc.js` → `.eslintrc.json` (Next.js config)
- Added `tsconfig.json` for TypeScript
- Added `postcss.config.js` for Tailwind CSS
- Added `tailwind.config.js`

### Key Changes

1. **Routing**: Nuxt auto-routing → Next.js App Router with explicit route definitions
2. **i18n**: `@nuxtjs/i18n` → `next-intl` with middleware-based locale routing
3. **Styling**: SCSS + Tailwind CSS maintained, configured for Next.js
4. **State Management**: Vue reactivity → React hooks (useState, useEffect, etc.)
5. **Event Bus**: Vue event bus → Custom EventEmitter-based event bus
6. **Icons**: vue-svgicon → Custom icon registry with bridge compatibility
7. **API Routes**: Nuxt Nitro server routes → Next.js API routes
8. **Middleware**: Nuxt middleware → Next.js middleware for locale handling

### Files That Can Be Removed (Old Nuxt/Vue Files)
The following files/directories are no longer needed but kept for reference:
- `nuxt.config.js`
- `pages/` (old Vue pages)
- `layouts/` (old Vue layouts)
- `.babelrc` (Vue-specific)
- Old `.eslintrc.js` (if exists, replaced by `.eslintrc.json`)
- Vue component files in `src/components/` (React versions exist)

### Environment Variables
Create `.env.local` with:
- `MAILGUN_API_KEY` - For email form submissions
- `MAILGUN_DOMAIN` - Your Mailgun domain
- `NEXT_PUBLIC_SITE_URL` - Site URL for sitemap generation

### Running the Application

```bash
npm install
npm run dev
```

Visit http://localhost:3000

### Build for Production

```bash
npm run build
npm start
```

## Notes

- All functionality from the Nuxt.js version is preserved
- All styles and animations are maintained
- i18n routing works the same way
- Forms and API endpoints work identically
- SEO and metadata handling maintained

