<template>
  <div id="app">
    <router-view/>

    <portal-target name="modal" />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>
