# Etage - Moving Company Website

> A Next.js 16 project with React, TypeScript, and Tailwind CSS

## Features

- 🚀 Next.js 16 with App Router
- ⚛️ React 18 with TypeScript
- 🌍 Internationalization (i18n) with next-intl
- 🎨 Tailwind CSS + SCSS
- 📱 Fully responsive design
- 🌙 Dark mode support
- ✨ GSAP animations
- 📧 Mailgun integration for forms

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local and add your configuration
# - MAILGUN_API_KEY: Your Mailgun API key
# - MAILGUN_DOMAIN: Your Mailgun domain
# - NEXT_PUBLIC_SITE_URL: Your site URL (for sitemap)
```

### Development

```bash
# Run development server
npm run dev

# The app will be available at http://localhost:3000
```

### Production

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages and layouts
│   ├── [locale]/     # Localized routes
│   └── api/          # API routes
├── components/       # React components
│   ├── common/       # Shared components
│   └── ui/           # UI components
├── layouts/          # Layout components
├── hooks/            # Custom React hooks
├── lib/              # Library utilities
├── styles/           # Global styles and SCSS
├── utils/            # Utility functions
└── views/            # Page-specific components
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run optimize:images` - Optimize images
- `npm run generate:sitemap` - Generate sitemap
- `npm run optimize:all` - Run all optimization scripts

## Internationalization

The project supports multiple locales:
- Ukrainian (ua) - default
- Russian (ru)

Translations are located in `locales/` directory.

## Styling

- **Tailwind CSS** - Utility-first CSS framework
- **SCSS** - For component-specific styles
- **CSS Variables** - For theme support (light/dark mode)

## API Routes

- `/api/callback` - Handle callback form submissions
- `/api/order` - Handle order form submissions
- `/api/feedback` - Handle feedback form submissions
- `/api/sitemap.xml` - Generate sitemap dynamically

## Environment Variables

See `.env.example` for required environment variables.

## Migration from Nuxt.js

This project has been migrated from Nuxt.js to Next.js 16. All Vue components have been converted to React components while maintaining the same functionality and design.

## License

Private project
