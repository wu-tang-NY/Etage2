import { defineAsyncComponent } from "vue";

// Lazy load sections to reduce initial bundle size
// Only first section (Services) loads initially, others load on demand
export default {
  PageSectionServices: defineAsyncComponent(() => import("./services")),
  PageSectionPrice: defineAsyncComponent(() => import("./price")),
  PageSectionReviews: defineAsyncComponent(() => import("./reviews")),
  PageSectionOrder: defineAsyncComponent(() => import("./order")),
};
