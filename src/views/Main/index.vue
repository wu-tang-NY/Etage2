<template>
  <div class="app-page app-page--main page-main" :style="{ height: pageHeight }" ref="page">
    <div class="page-main__inner">
      <swiper class="page-main__sections" :options="options" ref="sections">
        <swiper-slide
          class="page-main__section"
          v-for="section in Object.keys(sections)"
          :key="section"
        >
          <component :is="section" />
        </swiper-slide>
      </swiper>

      <div class="page-main__bg" :style="{ width: pageHeight }">
        <div class="page-main__bg-inner">
          <div class="page-main__bg-image" :style="{ transform: `translateX(-${(currentSectionIndex - 1) * clientWidth}px)` }">
            <svg-icon name="bg" original />
          </div>

          <div class="page-main__bg-car">
            <svg-icon name="car" original />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sections from './sections';

export default {
  name: 'AppPageMain',
  components: { ...sections },
  data: () => ({
    options: {
      allowTouchMove: false,
      loop: true,
    },

    pageHeight: null,
    currentSectionIndex: 0,
  }),
  watch: {
    currentSectionIndex(index) {
      if (index) {
        this.swiper.slideNext();
        this.$eventbus.$emit('section:scroll', index);
      }
    },
  },
  computed: {
    sections() {
      return sections;
    },

    swiper() {
      return this.$refs.sections.swiper;
    },

    clientWidth() {
      return document.documentElement.clientWidth;
    },
  },
  methods: {
    handleScrollPage() {
      const { pageYOffset } = window;
      const { clientHeight } = document.documentElement;

      const scrolled = pageYOffset + this.clientWidth;

      const currentSectionIndex = Math.ceil(scrolled / this.clientWidth);

      console.log(scrolled / this.clientWidth);

      if (currentSectionIndex > Object.keys(this.sections).length) {
        window.scrollTo({ top: 0 });
      }

      this.currentSectionIndex = currentSectionIndex;
    },

    setPageHeight() {
      const sectionsAmount = Object.keys(sections).length;

      const windowHeight = this.clientWidth * sectionsAmount;

      this.pageHeight = `${windowHeight}px`;
    },

    slideTo(index) {
      window.scrollTo({ top: this.clientWidth * index });
    },
  },
  mounted() {
    this.setPageHeight();

    window.addEventListener('resize', this.setPageHeight, { passive: true });
    window.addEventListener('scroll', this.handleScrollPage, { passive: true });

    this.$eventbus.$on('section:change', this.slideTo);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setPageHeight);
    window.removeEventListener('scroll', this.handleScrollPage);
  },
};
</script>

<style lang="scss">
.app-page {
  position: relative;
}

.page-main {
  &__inner {
    position: fixed;
    left: 0; right: 0;
    height: calc(100% - 200px);
  }

  &__sections {
  }

  &__bg {
    position: absolute;
    left: 0; bottom: 0;

    &-image {
      margin: 0 0 -25px -140px;
      transition: .7s;
    }

    &-car {
      position: absolute;
      bottom: 20px; left: 300px;
      @include size(220px, 100px);
    }
  }
}
</style>
