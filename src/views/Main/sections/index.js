import { defineAsyncComponent } from "vue";

// Lazy load sections to reduce initial bundle size
// Only first section (Services) loads initially, others load on demand
export default {
  PageSectionServices: defineAsyncComponent(() => import("./services/index.vue")),
  PageSectionPrice: defineAsyncComponent(() => import("./price/index.vue")),
  PageSectionReviews: defineAsyncComponent(() => import("./reviews/index.vue")),
  PageSectionOrder: defineAsyncComponent(() => import("./order/index.vue")),
};
