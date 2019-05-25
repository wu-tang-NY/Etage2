<template>
  <div class="app-page app-page--main page-main" ref="page">
    <div class="page-main__inner">
      <div class="page-main__sections" ref="sectionsWrapper" id="sections">
        <section
          class="app-section"
          :class="{'app-section--scroll': isScrollPresent()}"
          v-for="(section, index) in Object.keys(sectionsComponents)"
          :key="section"
          :id="`section-${index + 1}`"
        >
          <!-- <svg-icon name="mobile_bg" original v-if="section.id === 1" class="services__bg"></svg-icon> -->
          <div class="container">
            <component :is="section" :active="activeSectionIndex === index" />
          </div>
        </section>
      </div>

      <div class="page-main__bg">
        <div class="page-main__bg-inner">
          <div class="page-main__bg-image" :style="{ width: `${totalWidth}px` }" ref="bg">
            <div class="page-main__bg-home">
              <svg-icon name="home" class="page-main" original />
            </div>
          </div>

          <div class="page-main__bg-car bg-car" ref="car">
            <div class="bg-car__cloud" ref="clouds">
              <car-cloud
                title="При необходимости - выезжает оценщик!"
                icon="cloud_small"
                icon-width="270"
              />

              <car-cloud icon="cloud_large" icon-width="370">
                <div class="mb-2">
                  <span>123 семьи</span> переселились с нашей помощью в новое жилище в этом году
                </div>
                <div>
                  <span>123 тонны</span> личных вещей уже перевезено в этом году
                </div>
              </car-cloud>
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
import TweenMax from 'gsap/TweenMax';

// eslint-disable-next-line
import ScrollMagic from 'ScrollMagic';

import 'animation.gsap';
import 'debug.addIndicators';

import sectionsComponents from './sections';
import CarCloud from './components/PageMainCarCloud';

export default {
  name: 'AppPageMain',
  components: {
    CarCloud,
    ...sectionsComponents,
  },
  props: {
    mobile: Boolean,
    tablet: Boolean,
  },
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

    onSpacePress(e) {
      if (e.keyCode === 32) {
        e.preventDefault();
        const sections = document.querySelector('#sections');
        const el = sections.querySelector('section.active');

        this.activeSectionIndex = Array.from(sections.children).indexOf(el);

        if (this.activeSectionIndex < 4) {
          const top = window.innerWidth * (this.activeSectionIndex + 1);
          document.documentElement.scrollTo({ top, behavior: 'smooth' });
        }
      }
    },

    onSectionChange(index) {
      document.body.classList.remove('menu-open');
      let top = window.innerWidth * index;

      if (this.mobile || this.tablet) {
        const section = document.getElementById(`section-${index + 1}`);

        if (section) {
          top = section.getBoundingClientRect().top + window.pageYOffset - 50;
        }
      }

      document.documentElement.scrollTo({ top, behavior: 'smooth' });
    },

    initAnimations() {
      if (!this.mobile && !this.tablet) {
        const { sectionsWrapper, bg, car, clouds } = this.$refs;

        const [cloud1, cloud2] = clouds.children;
        const sections = sectionsWrapper.children;

        const pageWidth = document.documentElement.clientWidth;

        this.ScrollMagicController = new ScrollMagic.Controller({
          // addIndicators: process.env.NODE_ENV === 'development',
        });

        // SECTION 1

        const timeline1 = new TimelineMax()
          .set(car, { left: 320, x: 0, immediateRender: true })
          .set(cloud2, { opacity: 0, immediateRender: true })
          .add(TweenMax.to(sectionsWrapper, 1, { x: -pageWidth }), 0.1)
          .add(TweenMax.to(sections[0], 0.5, { opacity: 0 }), 0.2)
          .add(TweenMax.fromTo(sections[1], 0.5, { opacity: 0 }, { opacity: 1 }), 0.4)
          .add(TweenMax.fromTo(cloud1, 0.15, { opacity: 0, y: -20 }, { opacity: 1, y: 0 }), 0.7);

        this.scrollMagicScenes.push(
          new ScrollMagic.Scene({
            duration: pageWidth,
          })
            .setPin(this.$refs.page)
            .setTween(timeline1)
            .setClassToggle('#section-1', 'active')
            .addTo(this.ScrollMagicController),
        );


        // SECTION 2

        const timeline2 = new TimelineMax()
          .add(TweenMax.to(sectionsWrapper, 1, { x: -pageWidth * 2 }), 0)
          .add(TweenMax.to(sections[1], 0.5, { opacity: 0 }), 0.6)
          .add(TweenMax.fromTo(sections[2], 0.5, { opacity: 0 }, { opacity: 1 }), 0.7)
          .add(TweenMax.to(cloud1, 0.15, { opacity: 0, y: -20 }), 0.7)
          .add(TweenMax.fromTo(cloud2, 0.15, { opacity: 0, y: -20 }, { opacity: 1, y: 0 }), 1);

        this.scrollMagicScenes.push(
          new ScrollMagic.Scene({
            duration: pageWidth,
            offset: pageWidth,
          })
            .setPin(this.$refs.page)
            .setTween(timeline2)
            .setClassToggle('#section-2', 'active')
            .addTo(this.ScrollMagicController),
        );


        // SECTION 3

        const timeline3 = new TimelineMax()
          .add(TweenMax.to(sectionsWrapper, 1, { x: -pageWidth * 3 }), 0)
          .add(TweenMax.to(sections[2], 0.5, { opacity: 0 }), 0.6)
          .add(TweenMax.fromTo(sections[3], 0.5, { opacity: 0 }, { opacity: 1 }), 0.7)
          .add(TweenMax.to(cloud2, 0.15, { opacity: 0, y: -20 }), 0.7);

        this.scrollMagicScenes.push(
          new ScrollMagic.Scene({
            duration: pageWidth,
            offset: pageWidth * 2,
          })
            .setPin(this.$refs.page)
            .setTween(timeline3)
            .setClassToggle('#section-3', 'active')
            .addTo(this.ScrollMagicController),
        );


        // SECTION 4

        const timeline4 = new TimelineMax()
          .to(car, 0.1, { x: pageWidth - (pageWidth / 4) });

        this.scrollMagicScenes.push(
          new ScrollMagic.Scene({
            duration: pageWidth,
            offset: pageWidth * 3,
          })
            .setPin(this.$refs.page)
            .setTween(timeline4)
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
      }
      this.isScrollPresent();
    },
    isScrollPresent() {
      return window.innerWidth > document.body.clientWidth;
    },
  },
  mounted() {
    this.onResize();
    this.isScrollPresent();

    if (!this.mobile) {
      this.initAnimations();
      window.addEventListener('scroll', this.onScroll);
    }

    window.addEventListener('resize', this.onResize);
    document.addEventListener('keypress', this.onSpacePress);

    this.$eventbus.$on('section:change', this.onSectionChange);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  },
};
</script>

<style lang="scss">
.app-page {
  position: relative;
}

.page-main {
  &__sections {
    display: flex;
  }

  &__bg {
    z-index: -1;

    &-inner {
      overflow: hidden;
    }

    &-image {
      background: url('/static/icons/bg.svg') -100px 12px repeat-x;
      background-size: auto 150px;
      height: 150px;
      position: relative;
    }

    &-home {
      @include size(170px, 95px);
      @include absolute(null, 120px, 10px);
    }

    &-car {
      position: absolute;
      bottom: 10px; left: 0;
      @include size(130px, 58px);
    }
  }
}

.bg-car {
  &__cloud {
    position: absolute;
    left: 100%;
    bottom: 100%;
    margin-bottom: -10px;
    transform: translate(-35px, 0);

    .cloud {
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }

  &__image {
    svg {
      @include size(100%);
    }
  }
}

.app-section {
  height: 100%;
  flex: 0 0 auto;
}


@include media-breakpoint-up(lg) {
  .page-main {
    &__inner {
      position: fixed;
      overflow: hidden;
    }

    &__bg {
      position: fixed;
      left: 0; bottom: 60px;

      &-image {
        background-size: auto 200px;
        height: 200px;
      }
    }
  }

  .modal-open {
    .app-section {
      padding-right: 34px;
    }
  }

  .app-section {
    width: 100vw;
    &--scroll {
      padding-right: 17px;
    }
  }
}

@media screen and (min-width: 993px) and (max-height: 760px) {
  .page-main {
    &__bg {
      bottom: -3px;
    }
  }
}


@include media-breakpoint-down(md) {
  .page-main {
    &__sections {
      flex-direction: column;
    }

    &__bg {
      &-car {
        display: none;
      }

      &-home {
        display: none;
      }
    }
  }
}
</style>
