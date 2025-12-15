#!/bin/bash
echo "🧹 Cleaning Nuxt cache..."
rm -rf .nuxt .output node_modules/.vite node_modules/.cache

echo "✅ Cache cleaned!"
echo ""
echo "📝 To restart dev server:"
echo "   1. Stop current dev server (Ctrl+C in terminal)"
echo "   2. Run: npm run dev"
echo "   3. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)"
echo "   4. Visit: http://localhost:3000?showInstall=true"

