<template>
  <app-nav>
    <app-nav-item
      v-for="({ title, icon }, index) in pages"
      :key="title"
      :title="title"
      :icon="icon"
      :active="index === activePage"
      :visited="index < activePage"
    />
  </app-nav>
</template>

<script>
export default {
  name: 'LayoutMainNav',
  data: () => ({
    pages: [
      {
        title: 'Услуги',
        icon: '',
      },
      {
        title: 'Сколько стоит?',
        icon: '',
      },
      {
        title: 'Почему нам доверяют?',
        icon: '',
      },
      {
        title: 'Как заказать?',
        icon: '',
      },
    ],
    activePage: 2,
  }),
};
</script>
