<template>
  <app-nav>
    <app-nav-item
      v-for="({ title, icon, children }, index) in pages"
      :key="title"
      :title="title"
      :icon="icon"
      :children="children"
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
        children: [{
          title: 'Основная информация',
          path: 'PopupContentAboutUs',
        }, {
          title: 'Другая информация 1',
          path: 'PopupContentHistory',
        }, {
          title: 'Другая информация 2',
          path: 'PopupContentOurGoal',
        }, {
          title: 'Другая информация 3',
          path: 'PopupContentFacts',
        }],
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

      this.$emit('click');
      this.$eventbus.$emit('section:change', index);
    },
  },
  mounted() {
    this.$eventbus.$on('section:scroll', index => {
      this.activePage = index;
    });

    const sections = document.querySelector('#sections');
    const el = sections.querySelector('section.active');

    this.activePage = Array.from(sections.children).indexOf(el);
  },
};
</script>
