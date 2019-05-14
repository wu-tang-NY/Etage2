import Vue from 'vue';

Vue.directive('modal', {
  bind(el, binding) {
    const modal = binding.expression || Object.keys(binding.modifiers)[0];

    if (modal) {
      el.setAttribute('data-toggle', 'modal');
      el.setAttribute('data-target', `#${modal}`);
    }
  },
});
