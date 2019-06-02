<template>
  <app-nav>
    <div class="app-nav__block">
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
    </div>
    <app-nav-info @click.native="openModal"/>
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
          title: 'Квартирный переезд',
          path: 'PopupContentFlatMove',
        }, {
          title: 'Оффисный переезд',
          path: 'PopupContentOfficeMove',
        }, {
          title: 'Перевозка имущества',
          path: 'PopupContentStuffMove',
        }, {
          title: 'Услуги грузчиков',
          path: 'PopupContentSpecialists',
        }, {
          title: 'Упаковочные материалы',
          path: 'PopupContentPackage',
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
    openModal() {
      this.$emit('click');
      this.$eventbus.$emit('openPopup', 'PopupContentAboutUs');
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
