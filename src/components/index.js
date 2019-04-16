import Vue from 'vue';

const requireComponent = require.context(
  // Look for files in the current directory
  './',
  // Look in subdirectories
  true,
  /[\w-]+\.vue$/,
);

// For each matching file name...
requireComponent.keys().forEach(fileName => {
  // Get the component config
  const componentConfig = requireComponent(fileName);
  // Get the PascalCase version of the component name
  let componentName = fileName.split('/');

  componentName = componentName[componentName.length - 1]
    .replace(/^\.\/[a-zA-Z]+\//, '')
    .replace(/\.\w+$/, '');
  // Globally register the component
  Vue.component(componentName, componentConfig.default || componentConfig);
});
