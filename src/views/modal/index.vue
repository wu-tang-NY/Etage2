<template>
  <div class="modal-info" v-show="openModal">
    <svg-icon name="bg_dark" class="modal-info__bg" original/>
    <div class="container">
      <div class="row">
        <div class="sticky" :class="{'sticky--large':toggledNav}">
          <div class="sticky__close" v-if="mobile || tablet" @click="closeModal" />
          <div class="sticky__nav" @click="openMobileAccordion" v-if="mobile || tablet">
            Навигация
            <svg-icon original name="icon_nav-modal"/>
            <!-- <div class="sticky__back" @click="closeModal" v-if="(mobile || tablet) && !toggledNav">
              <svg-icon name="arrow-next"/>
              Назад
            </div>
            <button class="sticky__ham menu-toggle__btn" @click="openMobileAccordion">
              <span class="menu-toggle__line sticky__ham-item"></span>
              <span class="menu-toggle__line sticky__ham-item"></span>
              <span class="menu-toggle__line sticky__ham-item"></span>
            </button> -->
          </div>
          <svg-icon name="logo_white" original class="modal-info__logo" v-if="(!mobile && !tablet)"/>
          <div class="modal-info__nav" v-if="(!mobile && !tablet) || toggledNav">
            <div class="modal-info__panel"
              :class="{'modal-info__panel--active': item.isActive}"
              v-for="(item, index) in nav"
              :key="item.header"
            >
              <div
                class="modal-info__panel-header"
                @click="toggleActive(item, index)"
              >{{item.header}}
                <svg-icon name="modal_dropdown" original/>
              </div>
              <div class="modal-info__panel-content" v-for="link in item.links" :key="link.name">
                <!-- <a href="" @click.prevent="openSelectedInfo(item)" :class="{'modal-info__panel-link--active':link.activeLink}" class="modal-info__panel-link">{{link.title}}</a> -->
                <a href="" @click.prevent="scrollTo(link, item.header)" :class="{'modal-info__panel-link--active':link.activeLink}" class="modal-info__panel-link">{{link.title}}</a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-9 offset-lg-3 modal-conent">
          <div class="modal-info__header-wrapper">
            <!-- <div class="modal-info__header">{{activeTab}}</div> -->
            <div class="modal-info__close" @click="closeModal" v-if="(!mobile && !tablet)" />
          </div>
          <div class="modal-info__content" ref="sections">
            <!-- <component :is="activeTab.component" /> -->
            <div class="modal-info__component-group" v-for="item in nav" :key="item.header" :id="item.header">
              <component :is="link.component" v-for="link in item.links" :key="link.title" :id="link.component" />
           </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pages from '../Main/pages';

export default {
  name: 'ModalInfo',
  components: {
    ...pages,
  },
  props: {
    mobile: Boolean,
    tablet: Boolean,
  },
  data() {
    return {
      openModal: false,
      activeTab: 'PopupContentAboutUs',
      toggledNav: false,
      nav: [{
        header: 'О компании',
        links: [{
          title: 'О нас',
          component: 'PopupContentAboutUs',
          activeLink: false,
        }, {
          title: 'История',
          component: 'PopupContentHistory',
          activeLink: false,
        }, {
          title: 'Наша цель',
          component: 'PopupContentOurGoal',
          activeLink: false,
        }, {
          title: 'Факты и цифры',
          component: 'PopupContentFacts',
          activeLink: false,
        }, {
          title: 'Автопарк',
          component: 'PopupContentAuto',
          activeLink: false,
        }],
        isActive: false,
      }, {
        header: 'Услуги',
        links: [{
          title: 'Квартирный переезд',
          component: 'PopupContentFlatMove',
          activeLink: false,
        }, {
          title: 'Офисный переезд',
          component: 'PopupContentOfficeMove',
          activeLink: false,
        }, {
          title: 'Перевозка имущества',
          component: 'PopupContentStuffMove',
          activeLink: false,
        }, {
          title: 'Специалисты',
          component: 'PopupContentSpecialists',
          activeLink: false,
        }, {
          title: 'Упаковка',
          component: 'PopupContentPackage',
          activeLink: false,
        }],
        isActive: false,
      }, {
        header: 'Информация',
        links: [
        //   {
        //   title: 'Партнеры',
        //   component: 'PopupContentPartners',
        //   activeLink: false,
        // },
          {
            title: 'Вакансии',
            component: 'PopupContentJobs',
            activeLink: false,
          }, {
            title: 'Отзывы',
            component: 'PopupContentFeedback',
            activeLink: false,
          }, {
            title: 'Контакты',
            component: 'PopupContentContacts',
            activeLink: false,
          },
        ],
        isActive: false,
      }, {
        header: 'Оплата',
        links: [{
          title: 'Оплата',
          component: 'PopupContentPayment',
          activeLink: false,
        }],
        isActive: false,
      }, {
        header: 'Акции',
        links: [{
          title: 'Акции',
          component: 'PopupContentSpecialOffers',
          activeLink: false,
        }],
        isActive: false,
      }],
    };
  },
  methods: {
    openSelectedInfo(link, header) {
      this.handeRemoveAllColoredLinks();
      this.activeTab = header;
      link.activeLink = true;
      if (this.toggledNav) {
        this.openMobileAccordion();
      }
    },

    async scrollTo(link, header) {
      await this.$nextTick();
      const elem = document.getElementById(link.component);
      const elemGroupOffset = elem.parentNode.offsetTop;
      const top = elem.offsetTop + elemGroupOffset - 60;
      this.$refs.sections.scrollTo({
        top,
      });
      this.openSelectedInfo(link, header);
    },

    handeRemoveAllColoredLinks() {
      this.nav.forEach(item => {
        item.links.forEach(componentLink => {
          componentLink.activeLink = false;
        });
      });
    },

    handeRemoveAllToggledPanels() {
      this.nav.forEach(item => {
        item.isActive = false;
      });
    },

    openMobileAccordion() {
      if (this.mobile || this.tablet) {
        this.toggledNav = !this.toggledNav;
      }
    },
    toggleActive(block, index) {
      let prev = null;

      this.nav.forEach((item, i) => {
        if (item.isActive) prev = i;

        item.isActive = false;
      });

      this.nav[index].isActive = prev !== index;

      const elem = document.getElementById(block.header);
      const top = elem.offsetTop - 60;
      this.$refs.sections.scrollTo({
        top,
      });
    },

    closeModal() {
      this.handeRemoveAllColoredLinks();
      this.handeRemoveAllToggledPanels();
      this.openModal = false;
      document.body.classList.remove('modal-open');
    },
  },
  mounted() {
    this.$eventbus.$on('openPopup', component => {
      this.nav.some(nav => {
        return nav.links.some(item => {
          if (item.component === component) {
            this.activeTab = nav.header;
            nav.isActive = true;
            item.activeLink = true;
            this.scrollTo(item, nav.header);
          }
          return item.component === component;
        });
      });
      this.openModal = true;

      document.body.classList.add('modal-open');
    });
  },
};
</script>

<style lang="scss">
.modal-info {
  width: 100%;
  min-height: 100vh;
  max-width: 100vw;
  height: 100vh;
  background-color: #0e1a28;
  padding: 50px 0;
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  .sticky {
    position: fixed;
    overflow: auto;
    max-height: 80vh;
    width: 15%;
    max-width: 15%;
    min-width: 300px;
    flex-shrink: 0;

    &__close {
      position: relative;
      @include size(18px);
      overflow: hidden;
      margin-left: auto;
      margin-right: 16px;
      margin-top: 16px;
      margin-bottom: 31px;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 25px;
        height: 2px;
        transform: translate(-50%, -50%) rotateZ(-45deg);
        background-color: #fff;
      }

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 25px;
        height: 2px;
        transform: translate(-50%, -50%) rotateZ(45deg);
        background-color: #fff;
      }
    }
  }

  &__component-group {
    position: relative;

    & > div {
      position: relative;

      h2 {
        color: $colors-accent;
        margin-bottom: 20px;
      }
    }

    & > div + div {
      margin-top: 80px;
      &::before {
        content: '';
        position: absolute;
        top: -40px;
        @include size(100%, 2px);
        left: 0;
        background-color: rgba(#fff, .4);
      }
    }

    & + & {
      margin-top: 120px;
      &::before {
        content: '';
        position: absolute;
        top: -60px;
        @include size(100%, 2px);
        left: 0;
        background-color: rgba($colors-accent, .4);
      }
    }
  }

  &__bg {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }

  &__logo {
    width: 130px;
    margin-top: 14px;
    margin-bottom: 30px;
  }

  &__panel {
    margin-bottom: 10px;
    max-width: 210px;
    cursor: pointer;

    &--active {
      .modal-info__panel-header {
        background-color: rgba(#fff, .1);

        svg {
          transform: rotateZ(0);
        }
      }
      .modal-info__panel-content {
        max-height: 10000px;
      }

      .modal-info__panel-link {
        max-height: 36px;
      }
    }
  }

  &__panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 36px;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0.3px;
    color: #ffffff;
    padding: 0 16px;
    line-height: 36px;
    transition: .3s ease-in-out;

    &:hover {
      background-color: rgba(#fff, .1);
    }

    svg {
      @include size(8px, 5px);
      transform: rotateZ(180deg);
      transition: .3s ease-in-out;
    }
  }

  &__panel-content {
    max-height: 0;
    transition: .3s ease-in-out;
    overflow: hidden;
  }

  &__panel-link {
    display: block;
    height: 36px;
    padding-left: 26px;
    opacity: 0.5;
    font-size: rem(14);
    line-height: 36px;
    font-weight: 500;
    letter-spacing: 0.3px;
    color: #ffffff;
    max-height: 0;
    transition: .3s ease-in-out;

    &--active {
      color: $colors-accent;
      opacity: 1;
    }

    &:hover {
      opacity: 1;
    }
  }

  &__header-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 40px;
    position: absolute;
    width: calc(100% - 30px);
  }

  &__header {
    font-family: $font-family--secondary;
    font-size: rem(30);
    font-weight: 800;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.88;
    letter-spacing: 0.6px;
    color: #ffffff;
  }

  &__close {
    @include size(20px);
    position: relative;
    overflow: hidden;
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      @include size(25px, 3px);
      background-color: #fff;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotateZ(-45deg);
    }

    &::after {
      content: '';
      position: absolute;
      @include size(25px, 3px);
      background-color: #fff;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotateZ(45deg);
    }
  }
  &__content {
    height: calc(100vh - 200px);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    margin-top: 60px;
    p + p,
    img + p,
    img + img,
    p + img {
      margin-top: 20px;
    }

    h3 {
      color: $colors-accent;
      margin-bottom: 20px;
    }

    p, li {
      font-size: rem(15);
      line-height: 1.6;
      letter-spacing: 0.3px;
      color: #ffffff;
    }

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
      object-position: center;
    }
  }
}

@media screen and (max-width: 992px) {
  .modal-info {
    overflow: scroll;
    max-height: 100vh;
    padding-top: 0;

    &__header-wrapper {
      width: 100%;
    }

    &__content {
      margin-top: 24px;
    }

    .modal-conent {
      margin-top: 100px;
    }

    &__nav {
      margin-top: 40px;
    }

    &__panel {
      max-width: 100%;
      width: 100%;
    }

    .sticky {
      top: 0;
      left: 0;
      max-width: 100%;
      width: 100%;
      min-width: 100%;
      max-height: 100vh;
      background-color: #0e1a28;
      z-index: 2;
      padding-bottom: 16px;

      &--large {
        min-height: 100vh;
      }

      &__nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 16px;
        padding: 0 16px;
        background-color: rgba(255, 255, 255, 0.05);
        height: 44px;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.3px;
        color: #ffffff;

        svg {
          @include size(18px);
        }
      }

      &__ham {
        margin-left: auto;
      }

      &__ham-item {
        background: white;
      }

      &__back {
        font-size: rem(16);
        text-transform: uppercase;
        color: white;
        font-weight: 600;
        font-family: $font-family--secondary;
        display: inline-flex;
        align-items: center;

        svg {
          @include size(16px);
          fill: white;
          transform: rotateZ(180deg);
          margin-right: 8px;
          transition: .3s ease-in-out;
        }

        &:hover {
          svg {
            transform: rotateZ(180deg) translateX(4px);
          }
        }
      }
    }
  }
}
</style>
