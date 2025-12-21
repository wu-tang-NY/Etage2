// Disable page transitions for info routes to prevent slot warnings
export default defineNuxtRouteMiddleware((to) => {
  // Check if the route is an info route
  // if (to.path.includes("/info")) {
  //   // Set page transition to false for info routes
  //   to.meta.pageTransition = false;
  // }
});
