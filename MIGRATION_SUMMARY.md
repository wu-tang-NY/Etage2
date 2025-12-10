# Migration Summary: Nuxt 2 → Nuxt 4 & Vue 2 → Vue 3

## ✅ Completed Changes

### 1. Package Dependencies Updated
- **Nuxt**: 2.17.3 → 4.0.0
- **Vue**: 2.6.14 → 3.5.0
- **Vue Router**: Added 4.4.0 (Nuxt 4 requires explicit dependency)
- **Node.js**: Updated engine requirement to >=18.0.0
- **npm**: Updated engine requirement to >=9.0.0

### 2. Plugin Migrations
- ✅ **vue-awesome-swiper** → **swiper** (v11) with Vue 3 components
- ✅ **vue-multiselect** → **@vueform/multiselect** (Vue 3 compatible)
- ✅ **portal-vue** → **Vue 3 Teleport** (built-in)
- ✅ **vue-the-mask** → **maska** (Vue 3 compatible)
- ✅ **vue-line-clamp** → Custom CSS-based directive
- ✅ **vue-svgicon** → Updated to v4 (Vue 3 compatible)
- ✅ **EventBus** → Custom Vue 3 compatible implementation
- ✅ **Bootstrap** → Updated to v5.3.3

### 3. Component Updates
- ✅ Updated all components using `model` option to Vue 3 v-model syntax
- ✅ Fixed `@click.native` → `@click` (Vue 3 removes .native modifier)
- ✅ Updated `beforeDestroy` → `beforeUnmount` lifecycle hooks
- ✅ Added `emits` declarations to all components
- ✅ Updated v-model to use `update:modelValue` events

### 4. Configuration Updates
- ✅ **nuxt.config.js**: Migrated to Nuxt 4 format
  - Changed `head` to `app.head`
  - Updated `publicRuntimeConfig` to `runtimeConfig.public`
  - Updated router configuration
  - Updated Vite configuration for SCSS
- ✅ **i18n**: Created Vue 3 compatible config file

### 5. Server API Migration
- ✅ Migrated Express-based server middleware to Nuxt 4 Nitro server routes
- ✅ Updated Mailgun integration to use mailgun.js v10
- ✅ Created individual API route files: `callback.post.js`, `feedback.post.js`, `order.post.js`

### 6. Swiper Component Updates
- ✅ Updated Swiper usage from vue-awesome-swiper syntax to Swiper.js v11 Vue 3 components
- ✅ Updated component props and event handlers

## ⚠️ Important Notes

### Breaking Changes to Be Aware Of

1. **v-model Changes**: Components now use `modelValue` prop and `update:modelValue` event. Old `value` prop still supported for backward compatibility.

2. **Event Handling**: `.native` modifier removed - all component events are native by default in Vue 3.

3. **Portal → Teleport**: Replaced `portal-vue` with Vue 3's built-in `<Teleport>` component.

4. **Swiper API**: Swiper now uses component props instead of `:options` prop. See `src/views/Main/sections/reviews/index.vue` for example.

5. **Server API**: API routes now use Nitro server format. Old Express middleware in `server/api/index.js` can be removed.

### Files That May Need Manual Review

1. **src/main.js** - May not be needed in Nuxt 4 (Nuxt handles app initialization)
2. **src/router/index.js** - May not be needed (Nuxt auto-generates routes from `pages/`)
3. **src/App.vue** - May need adjustment for Nuxt 4 app structure
4. **src/i18n/index.js** - May be redundant with @nuxtjs/i18n module

### Next Steps

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Test the Application**:
   ```bash
   npm run dev
   ```

3. **Check for Runtime Errors**:
   - Test all forms and modals
   - Test Swiper carousels
   - Test i18n language switching
   - Test API endpoints

4. **Potential Issues to Watch For**:
   - SVG icon rendering (vue-svgicon v4 compatibility)
   - Bootstrap 5 breaking changes (if any custom Bootstrap code exists)
   - GSAP animations (should be compatible but verify)
   - Vee-validate v4 API changes (if validation is used)

5. **Clean Up** (after testing):
   - Remove `server/api/index.js` (old Express middleware)
   - Remove or update `src/main.js` if not needed
   - Remove or update `src/router/index.js` if not needed
   - Remove old build config files in `build/` directory if not used

## Dependencies Added

- `form-data` - Required for mailgun.js v10
- `@vueuse/core` - Utility library (optional, can be used for additional features)
- `@vueform/multiselect` - Vue 3 multiselect component
- `maska` - Input masking for Vue 3
- `swiper` - Swiper.js library

## Dependencies Removed

- `vue-awesome-swiper` (replaced with swiper)
- `vue-multiselect` (replaced with @vueform/multiselect)
- `portal-vue` (replaced with Vue 3 Teleport)
- `vue-the-mask` (replaced with maska)
- `vue-line-clamp` (replaced with custom directive)
- `mailgun-js` (replaced with mailgun.js)
- `popper.js` (included in Bootstrap 5)
- `jquery` (Bootstrap 5 doesn't require jQuery)
- `core-js` (Nuxt 4 handles polyfills)

## Testing Checklist

- [ ] Application starts without errors
- [ ] All pages render correctly
- [ ] Forms submit correctly
- [ ] Modals open/close correctly
- [ ] Swiper carousels work
- [ ] i18n language switching works
- [ ] API endpoints respond correctly
- [ ] SVG icons display correctly
- [ ] Theme switching works (if applicable)
- [ ] Responsive design works on mobile/tablet
- [ ] All animations work correctly

