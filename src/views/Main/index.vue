<template>
  <div class="app-page app-page--main page-main" ref="page">
    <div class="page-main__inner">
      <div class="page-main__sections" ref="sectionsWrapper" id="sections">
        <section
          class="app-section"
          :class="{ 'app-section--scroll': isScrollPresent() }"
          :style="{ 'width': !mobile && !tablet ? `${windowWidth}px` : '100%' }"
          v-for="(section, index) in Object.keys(sectionsComponents)"
          :key="section"
          :id="`section-${index + 1}`"
        >
          <!-- <svg-icon name="mobile_bg" original v-if="section.id === 1" class="services__bg"></svg-icon> -->
          <div class="container">
            <component
              :is="section"
              :active="activeSectionIndex === index"
              :mobile="mobile"
              :tablet="tablet"
            />
          </div>
        </section>
      </div>

      <div class="page-main__bg bg">
        <div class="page-main__bg-inner">
          <div class="page-main__bg-image" :style="{ width: `${totalWidth}px` }" ref="bg">
            <div class="page-main__bg-home">
              <svg-icon name="home" class="page-main" original />
            </div>

            <div class="bg__from">
              <div class="bg__home">
                <svg-icon name="home_1" original />
              </div>
              <div class="bg__workers">
                <svg-icon name="workers_1" original />
              </div>
            </div>

            <div class="bg__to">
              <div class="bg__home">
                <svg-icon name="home_2" original />
              </div>
              <div class="bg__workers">
                <svg-icon name="workers_2" original />
              </div>
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
    device: String,
  },
  data: () => ({
    windowWidth: 0,
    totalWidth: 0,

    activeSectionIndex: 0,

    ScrollMagicController: null,
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
      this.windowWidth = window.innerWidth;
      this.totalWidth = Object.keys(sectionsComponents).length * this.windowWidth;

      if (this.ScrollMagicController) {
        this.ScrollMagicController.destroy(true);
      }

      this.initAnimations();
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

        const pageWidth = window.innerWidth;

        this.ScrollMagicController = new ScrollMagic.Controller({
          addIndicators: process.env.NODE_ENV === 'development',
        });

        // SECTION 1

        const tween1 = new TimelineMax()
          .set(sections[0], { opacity: 1, immediateRender: true })
          .add(TweenMax.to(sectionsWrapper, 1, { x: -pageWidth }), 0)
          .add(TweenMax.to(sections[0], 0.5, { opacity: 0 }), 0.1)
          .add(TweenMax.fromTo(sections[1], 0.5, { opacity: 0 }, { opacity: 1 }), 0.4)
          .add(TweenMax.fromTo(cloud1, 0.15, { opacity: 0, y: -20 }, { opacity: 1, y: 0 }), 0.7);


        // SECTION 2

        const tween2 = new TimelineMax()
          .add(TweenMax.to(sectionsWrapper, 1, { x: -pageWidth * 2 }))
          .add(TweenMax.to(sections[1], 0.5, { opacity: 0 }), 0.1)
          .add(TweenMax.to(sections[2], 0.5, { opacity: 1 }), 0.4)
          .add(TweenMax.to(cloud1, 0.15, { opacity: 0, y: -20 }), 0.7)
          .add(TweenMax.fromTo(cloud2, 0.15, { opacity: 0, y: -20 }, { opacity: 1, y: 0 }), 0.9);


        // SECTION 3

        const tween3 = new TimelineMax()
          .add(TweenMax.to(sectionsWrapper, 1, { x: -pageWidth * 3 }))
          .add(TweenMax.to(sections[2], 0.5, { opacity: 0 }), 0.1)
          .add(TweenMax.to(sections[3], 0.5, { opacity: 1 }), 0.4)
          .add(TweenMax.to(cloud2, 0.15, { opacity: 0, y: -20 }), 0.7);


        // SECTION 4

        const tween4 = new TimelineMax()
          .to(car, 1, { x: pageWidth - pageWidth / 2 });


        // TIMELINE

        const timeline = new TimelineMax()
          .set(car, { left: 320, x: 0, immediateRender: true })
          .set(cloud2, { opacity: 0, immediateRender: true })
          .add([tween1, tween2, tween3, tween4], 0, 'sequence', 0.5);

        new ScrollMagic.Scene({
          duration: pageWidth * 4,
        })
          .setPin(this.$refs.page)
          .setTween(timeline)
          .addTo(this.ScrollMagicController);


        Array.from(sections).forEach((section, index) => {
          new ScrollMagic.Scene({
            duration: pageWidth,
            offset: pageWidth * index,
          })
            .setClassToggle(`#section-${index + 1}`, 'active')
            .addTo(this.ScrollMagicController);

          console.log(`#section-${index + 1}`, pageWidth * index);
        });


        const bgTween = new TimelineMax()
          .to(bg, 1, { ease: 'linear', x: -pageWidth * 3.25 });

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

.bg {
  &__from,
  &__to {
    position: absolute;
    bottom: 22px;
  }

  &__from {
    left: 50%;

    .bg__home {
      left: 50%;
    }
  }

  &__to {
    right: 300px;
    @include size(160px, 100px);

    .bg__home {
      right: 0;
    }
  }

  &__home {
    position: absolute;
    bottom: 0;
    @include size(90px);

    svg {
      @include size(100%);
    }
  }

  &__workers {
    position: absolute;
    left: 0;
    bottom: 0;
    @include size(70px, 35px);

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


@include media-breakpoint-down(lg) {
  .page-main {
    .app-section {
      opacity: 1 !important;
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
