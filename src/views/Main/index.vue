<template>
  <div class="app-page app-page--main page-main" ref="page">
    <div class="page-main__inner">
      <div class="page-main__sections" ref="sectionsWrapper" id="sections">
        <section
          class="app-section"
          v-for="(section, index) in Object.keys(sectionsComponents)"
          :style="{ width: `${windowWidth}px` }"
          :key="section"
          :id="`section-${index + 1}`"
        >
          <div class="container">
            <component :is="section" :active="activeSectionIndex === index" />
          </div>
        </section>
      </div>

      <div class="page-main__bg">
        <div class="page-main__bg-inner">
          <div class="page-main__bg-image" :style="{ width: `${totalWidth}px` }" ref="bg">
            <!-- <svg-icon name="bg" original /> -->
          </div>

          <div class="page-main__bg-car bg-car" ref="car">
            <div class="bg-car__cloud" ref="cloud">
              <portal-target name="car-cloud">
                <!--
                This component can be located anwhere in your App.
                The slot content of the above portal component will be rendered here.
                -->
              </portal-target>
            </div>

            <div class="bg-car__image">
              <svg-icon name="car" original />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimelineMax from 'gsap/TimelineMax';

// eslint-disable-next-line
import ScrollMagic from 'ScrollMagic';

import 'animation.gsap';
import 'debug.addIndicators';

import sectionsComponents from './sections';

export default {
  name: 'AppPageMain',
  components: { ...sectionsComponents },
  data: () => ({
    windowWidth: 0,
    totalWidth: 0,

    activeSectionIndex: 0,

    ScrollMagicController: null,
    scrollMagicScenes: [],
  }),
  computed: {
    sectionsComponents() {
      return sectionsComponents;
    },

    getCarPos() {
      return this.$refs.car.getBoundingClientRect();
    },
  },
  methods: {
    onScroll() {
      setImmediate(() => {
        const sections = document.querySelector('#sections');
        const el = sections.querySelector('section.active');

        this.activeSectionIndex = Array.from(sections.children).indexOf(el);

        this.$eventbus.$emit('section:scroll', this.activeSectionIndex);
      });
    },

    onResize() {
      this.windowWidth = document.documentElement.clientWidth;
      this.totalWidth = Object.keys(sectionsComponents).length * this.windowWidth;
    },

    onSectionChange(index) {
      this.ScrollMagicController.scrollTo(this.scrollMagicScenes[index]);
    },

    initAnimations() {
      const { sectionsWrapper, bg, car, cloud } = this.$refs;
      const carWidth = car.offsetWidth;
      const pageWidth = document.documentElement.clientWidth;


      this.ScrollMagicController = new ScrollMagic.Controller({
        // addIndicators: process.env.NODE_ENV === 'development',
      });

      // SECTION 1

      const tween1 = new TimelineMax()
        .set(car, { left: 150, x: 0, immediateRender: true })
        .to(sectionsWrapper, 0.2, { x: -pageWidth }, 1);

      this.scrollMagicScenes.push(
        new ScrollMagic.Scene({
          duration: pageWidth,
        })
          .setPin(this.$refs.page)
          .setTween(tween1)
          .setClassToggle('#section-1', 'active')
          .addTo(this.ScrollMagicController),
      );


      // SECTION 2

      const tween2 = new TimelineMax()
        .fromTo(cloud, 0.15, { opacity: 0, y: -20 }, { opacity: 1, y: 0 })
        .to(cloud, 0.15, { opacity: 0, y: -20 }, 1)
        .to(sectionsWrapper, 0.2, { x: -pageWidth * 2 });

      this.scrollMagicScenes.push(
        new ScrollMagic.Scene({
          duration: pageWidth,
          offset: pageWidth,
        })
          .setPin(this.$refs.page)
          .setTween(tween2)
          .setClassToggle('#section-2', 'active')
          .addTo(this.ScrollMagicController),
      );


      // SECTION 3

      const tween3 = new TimelineMax()
        .fromTo(cloud, 0.15, { opacity: 0, y: -20 }, { opacity: 1, y: 0 })
        .to(cloud, 0.15, { opacity: 0, y: -20 }, 1)
        .to(sectionsWrapper, 0.2, { x: -pageWidth * 3 });

      this.scrollMagicScenes.push(
        new ScrollMagic.Scene({
          duration: pageWidth,
          offset: pageWidth * 2,
        })
          .setPin(this.$refs.page)
          .setTween(tween3)
          .setClassToggle('#section-3', 'active')
          .addTo(this.ScrollMagicController),
      );


      // SECTION 4

      const tween4 = new TimelineMax()
        .to(car, 1, { x: pageWidth })
        .set(car, { opacity: 0, x: -carWidth, immediateRender: true });

      this.scrollMagicScenes.push(
        new ScrollMagic.Scene({
          duration: pageWidth,
          offset: pageWidth * 3,
        })
          .setPin(this.$refs.page)
          .setTween(tween4)
          .setClassToggle('#section-4', 'active')
          .addTo(this.ScrollMagicController),
      );


      const bgTween = new TimelineMax()
        .to(bg, 1, { ease: 'linear', x: -(pageWidth * 3) });

      new ScrollMagic.Scene({
        duration: pageWidth * 4,
      })
        .setTween(bgTween)
        .addTo(this.ScrollMagicController);
    },
  },
  mounted() {
    this.onResize();
    this.initAnimations();

    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);

    this.$eventbus.$on('section:change', this.onSectionChange);
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
    // left: 0; right: 0;
    // height: calc(100% - 200px);
    overflow: hidden;
  }

  &__sections {
    display: flex;
  }

  &__bg {
    position: fixed;
    left: 0; bottom: 40px;
    z-index: -1;

    &-inner {
      overflow: hidden;
    }

    &-image {
      background: url('/static/icons/bg.svg') repeat-x;
      background-size: auto 275px;
      height: 275px;
    }

    &-car {
      position: absolute;
      bottom: 0; left: 0;
      @include size(220px, 100px);
    }
  }
}

.bg-car {
  &__cloud {
    position: absolute;
    left: 100%;
    bottom: 100%;
    margin-bottom: -10px;
    transform: translate(-60px, 0);
  }

  &__image {
    height: 70px;

    svg {
      @include size(100%);
    }
  }
}

.app-section {
  height: 100%;
  flex: 0 0 auto;
}
</style>
