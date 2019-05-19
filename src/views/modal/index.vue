<template>
  <div class="modal-info" v-if="openModal">
    <svg-icon name="bg_dark" class="modal-info__bg" original/>
    <div class="container">
      <div class="row">
        <div class="sticky" :class="{'sticky--large':toggledNav}">
          <div class="sticky__nav">
            <div class="sticky__back" @click="closeModal" v-if="isMobile && !toggledNav">
              <svg-icon name="arrow-next"/>
              Назад
            </div>
            <button class="sticky__ham menu-toggle__btn" @click="openMobileAccordion">
              <span class="menu-toggle__line sticky__ham-item"></span>
              <span class="menu-toggle__line sticky__ham-item"></span>
              <span class="menu-toggle__line sticky__ham-item"></span>
            </button>
          </div>
          <svg-icon name="logo_dark" class="modal-info__logo" v-if="!isMobile"/>
          <div class="modal-info__nav" v-if="!isMobile || toggledNav">
            <div class="modal-info__panel"
              :class="{'modal-info__panel--active': item.isActive}"
              v-for="(item, index) in nav"
              :key="item.header"
            >
              <div
                class="modal-info__panel-header"
                @click="toggleActive(index)"
              >{{item.header}}
                <svg-icon name="modal_dropdown" original/>
              </div>
              <div class="modal-info__panel-content" v-for="link in item.links" :key="link.name">
                <a href="" @click.prevent="activeTab = link" class="modal-info__panel-link">{{link.title}}</a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-9 offset-lg-3 modal-conent">
          <div class="modal-info__header-wrapper">
            <div class="modal-info__header">{{activeTab.title}}</div>
            <div class="modal-info__close" @click="closeModal" v-if="!isMobile"/>
          </div>
          <div class="modal-info__content">
            <component :is="activeTab.component"></component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pages from '../Main/pages';

export default {
  components: {
    ...pages,
  },
  name: 'ModalInfo',
  data() {
    return {
      openModal: false,
      activeTab: 'PopupContentAboutUs',
      toggledNav: false,
      nav: [{
        header: 'Общая информация',
        links: [{
          title: 'О нас',
          component: 'PopupContentAboutUs',
        }, {
          title: 'История',
          component: 'PopupContentHistory',
        }, {
          title: 'Наша цель',
          component: 'PopupContentOurGoal',
        }, {
          title: 'Факты и цифры',
          component: 'PopupContentFacts',
        }],
        isActive: false,
      }, {
        header: 'Перевозки',
        links: [{
          title: 'Квартирный переезд',
          component: 'PopupContentFlatMove',
        }, {
          title: 'Офисный переезд',
          component: 'PopupContentOfficeMove',
        }, {
          title: 'Перевозка имущества',
          component: 'PopupContentStuffMove',
        }],
        isActive: false,
      }, {
        header: 'Рабочий процесс',
        links: [{
          title: 'Специалисты',
          component: 'PopupContentSpecialists',
        }, {
          title: 'Оплата',
          component: 'PopupContentPayment',
        }, {
          title: 'Акции',
          component: 'PopupContentSpecialOffers',
        }, {
          title: 'Упаковка',
          component: 'PopupContentPackage',
        }, {
          title: 'Автопарк',
          component: 'PopupContentAuto',
        }],
        isActive: false,
      }, {
        header: 'Дополнительно',
        links: [{
          title: 'Партнеры',
          component: 'PopupContentPartners',
        }, {
          title: 'Вакансии',
          component: 'PopupContentJobs',
        }, {
          title: 'Отзывы',
          component: 'PopupContentFeedback',
        }, {
          title: 'Контакты',
          component: 'PopupContentContacts',
        }],
        isActive: false,
      },
      ],
    };
  },
  computed: {
    isMobile() {
      return window.innerWidth < 993;
    },
  },
  methods: {
    openMobileAccordion() {
      if (this.isMobile) {
        this.toggledNav = !this.toggledNav;
        document.body.classList.toggle('menu-open');
      }
    },
    toggleActive(index) {
      let prev = null;

      this.nav.forEach((item, i) => {
        if (item.isActive) prev = i;

        item.isActive = false;
      });

      this.nav[index].isActive = prev !== index;
    },
    closeModal() {
      this.openModal = false;
      document.body.classList.remove('modal-open');
    },
  },
  mounted() {
    this.$eventbus.$on('openPopup', component => {
      this.nav.some(nav => {
        return nav.links.some(item => {
          if (item.component === component) {
            this.activeTab = item;
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
  background-color: #0e1a28;
  padding: 50px 0;
  overflow: hidden;
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
  }

  &__bg {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }

  &__logo {
    fill: #ffffff;
    width: 130px;
    margin-top: 14px;
    margin-bottom: 70px;
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

    &:hover {
      opacity: 1;
    }
  }

  &__header-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
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
    p + p,
    img + p,
    img + img,
    p + img {
      margin-top: 20px;
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

    .modal-conent {
      margin-top: 60px;
    }

    &__nav {
      margin-top: 20px;
    }

    &__panel {
      max-width: 100%;
      width: 100%;
    }

    .sticky {
      max-width: 100%;
      width: 100%;
      min-width: 100%;
      max-height: 100vh;
      background-color: #0e1a28;
      z-index: 2;

      &--large {
        min-height: 100vh;
      }

      &__nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        background-color: #0e1a28;
        height: 56px;
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
