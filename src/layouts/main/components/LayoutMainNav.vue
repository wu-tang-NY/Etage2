<template>
  <app-nav>
    <app-nav-item
      v-for="({ title, icon }, index) in pages"
      :key="title"
      :title="title"
      :icon="icon"
      :active="index === activePage"
      :visited="index < activePage"
      @click.native="handleClick(index)"
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
        icon: 'icon_1_c',
      },
      {
        title: 'Сколько стоит?',
        icon: 'icon_2_c',
      },
      {
        title: 'Почему нам доверяют?',
        icon: 'icon_3_c',
      },
      {
        title: 'Как заказать?',
        icon: 'icon_4_c',
      },
    ],
    activePage: 0,
  }),
  methods: {
    handleClick(index) {
      this.activePage = index;
      this.$eventbus.$emit('section:change', index + 1);
    },
  },
  mounted() {
    this.$eventbus.$on('section:scroll', index => {
      this.activePage = index - 1;
    });
  },
};
</script>
