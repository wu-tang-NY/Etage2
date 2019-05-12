<template>
  <div class="modal-info">
    <svg-icon name="bg_dark" class="modal-info__bg" original/>
    <div class="container">
      <div class="row">
        <div class="sticky">
          <svg-icon name="logo_dark" class="modal-info__logo"/>
          <div class="modal-info__nav">
            <div class="modal-info__panel"
              :class="{'modal-info__panel--active': item.isActive}"
              @click="toggleActive(index)"
              v-for="(item, index) in nav"
              :key="item.header"
            >
              <div class="modal-info__panel-header">{{item.header}}
                <svg-icon name="modal_dropdown" original/>
              </div>
              <div class="modal-info__panel-content" v-for="link in item.links" :key="link.name">
                <a href="" @click.prevent class="modal-info__panel-link">{{link}}</a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-9 offset-lg-3">
          <div class="modal-info__header-wrapper">
            <div class="modal-info__header">Информация</div>
            <div class="modal-info__close" />
          </div>
          <div class="modal-info__content">
            <!-- <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <img src="http://stroibloger.com/wp-content/uploads/2016/03/upakovki23456789876321.jpg" alt="">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.</p> -->
              <popup-content-feedback></popup-content-feedback>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PopupContentAboutUs from '../Main/pages/PopupContentAboutUs';
import PopupContentHistory from '../Main/pages/PopupContentHistory';
import PopupContentOurGoal from '../Main/pages/PopupContentOurGoal';
import PopupContentFacts from '../Main/pages/PopupContentFacts';
import PopupContentFlatMove from '../Main/pages/PopupContentFlatMove';
import PopupContentOfficeMove from '../Main/pages/PopupContentOfficeMove';
import PopupContentStuffMove from '../Main/pages/PopupContentStuffMove';
import PopupContentSpecialists from '../Main/pages/PopupContentSpecialists';
import PopupContentPayment from '../Main/pages/PopupContentPayment';
import PopupContentSpecialOffers from '../Main/pages/PopupContentSpecialOffers';
import PopupContentAuto from '../Main/pages/PopupContentAuto';
import PopupContentPackage from '../Main/pages/PopupContentPackage';
import PopupContentContacts from '../Main/pages/PopupContentContacts';
import PopupContentJobs from '../Main/pages/PopupContentJobs';
import PopupContentFeedback from '../Main/pages/PopupContentFeedback';
import PopupContentPartners from '../Main/pages/PopupContentPartners';

export default {
  components: {
    PopupContentAboutUs,
    PopupContentHistory,
    PopupContentOurGoal,
    PopupContentFacts,
    PopupContentFlatMove,
    PopupContentOfficeMove,
    PopupContentStuffMove,
    PopupContentAuto,
    PopupContentPackage,
    PopupContentSpecialists,
    PopupContentPayment,
    PopupContentSpecialOffers,
    PopupContentContacts,
    PopupContentJobs,
    PopupContentFeedback,
    PopupContentPartners,
  },
  name: 'ModalInfo',
  data() {
    return {
      nav: [{
        header: 'Общая информация',
        links: ['О нас', 'История', 'Наша цель', 'Факты и цифры'],
        isActive: false,
      }, {
        header: 'Перевозки',
        links: ['Квартирный переезд', 'Офисный переезд', 'Перевозка имущества'],
        isActive: false,
      }, {
        header: 'Рабочий процесс',
        links: ['Специалисты', 'Оплата', 'Акции', 'Упаковка', 'Автопарк'],
        isActive: false,
      }, {
        header: 'Дополнительно',
        links: ['Партнеры', 'Вакансии', 'Отзывы', 'Контакты'],
        isActive: false,
      },
      ],
    };
  },
  methods: {
    toggleActive(index) {
      let prev = null;

      this.nav.forEach((item, i) => {
        if (item.isActive) prev = i;

        item.isActive = false;
      });

      this.nav[index].isActive = prev !== index;
    },
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
  position: relative;

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
</style>
