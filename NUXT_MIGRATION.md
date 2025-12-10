# Nuxt Migration Guide

This document outlines the migration from Vue.js to Nuxt.js.

## What Changed

### Structure Changes
- **Pages**: `src/views/Main/index.vue` → `pages/index.vue`
- **Layouts**: `src/layouts/main/index.vue` → `layouts/default.vue`
- **Plugins**: All Vue plugins moved to `plugins/` directory
- **Server API**: `server.js` → `server/api/index.js` (server middleware)
- **i18n**: Migrated to `@nuxtjs/i18n` module
- **Locales**: Moved to `locales/` directory at root

### Configuration
- **nuxt.config.js**: New Nuxt configuration file
- **package.json**: Updated with Nuxt dependencies and scripts

### Key Features Preserved
- All components remain in `src/components/`
- All styles remain in `src/styles/`
- All views remain in `src/views/` (except main page)
- Static files remain in `static/`

## Installation

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
npm start
```

## Important Notes

### Component Auto-Import
Nuxt automatically imports components from `~/components/`. Components are available without explicit imports.

### i18n
The i18n module is configured with:
- Default locale: `ua`
- Supported locales: `ru`, `ua`
- Browser language detection enabled
- Cookie-based locale persistence

### Server API
API endpoints are now available at:
- `/api/callback`
- `/api/feedback`
- `/api/order`

These are handled by Nuxt server middleware.

### Environment Variables
You can set these environment variables:
- `MAILGUN_API_KEY`: Mailgun API key
- `MAILGUN_DOMAIN`: Mailgun domain

### SVG Icons
SVG icons are loaded via the `icons.js` plugin. Make sure to run:
```bash
npm run svg
```
to generate icon files if needed.

## Troubleshooting

### Components Not Found
If components are not auto-imported, check:
1. Component files are in `src/components/` or `components/`
2. Component names follow PascalCase
3. Check `nuxt.config.js` components configuration

### Styles Not Loading
Ensure SCSS files are properly imported in `nuxt.config.js` CSS array.

### i18n Not Working
Check:
1. Locale files exist in `locales/` directory
2. `@nuxtjs/i18n` is in modules array
3. Locale files export default objects

## Next Steps

1. Test all functionality
2. Update any hardcoded paths that might reference old structure
3. Review and update any build/deployment scripts
4. Test API endpoints
5. Verify all components render correctly

