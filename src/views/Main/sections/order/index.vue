<template>
  <div class="section-order">
    <ClientOnly>
      <h2>{{ $t("order.title") }}</h2>

      <div class="subtitle dark:text-gray-400">
        {{ $t("order.subtitle") }}
      </div>

      <div class="section-order__tab-wrapper">
        <div class="section-order__tab-block">
          <button
            class="section-order__tab section-order__tab--left"
            :class="{
              'section-order__tab--active': tabs[activeTab] === 'call',
            }"
            @click="handleOpenOrderComponent"
          >
            {{ $t("order.leaveNumber") }}
          </button>

          <div
            class="section-order__tab-description"
            :class="{
              'section-order__tab-description--active':
                tabs[activeTab] === 'call',
            }"
          >
            {{ $t("order.leaveNumberDesc") }}
          </div>
        </div>

        <div class="section-order__tab-block">
          <div class="section-order__divider">
            {{ $t("common.or") }}
          </div>
        </div>

        <div class="section-order__tab-block">
          <button
            class="section-order__tab section-order__tab--right"
            :class="{
              'section-order__tab--active': tabs[activeTab] === 'order',
            }"
            @click="handleOpenPhoneComponent"
          >
            {{ $t("order.fillForm") }}
          </button>

          <div
            class="section-order__tab-description section-order__tab-description--right"
            :class="{
              'section-order__tab-description--active':
                tabs[activeTab] === 'order',
            }"
          >
            {{ $t("order.fillFormDesc") }}
          </div>
        </div>
      </div>

      <transition
        name="component-fade"
        mode="out-in"
        v-if="(!mobile && !tablet) || isModalOpen"
      >
        <component
          :is="tabs[activeTab]"
          :key="tabs[activeTab]"
          @closeModal="closeModal"
          :mobile="mobile"
          :tablet="tablet"
        />
      </transition>
    </ClientOnly>
  </div>
</template>

<script>
import OrderFormComponent from "./components/OrderFormComponent";
import CallFormComponent from "./components/CallFormComponent";

export default {
  name: "AppPageMainSectionOrder",
  components: {
    order: OrderFormComponent,
    call: CallFormComponent,
  },
  props: {
    active: {
      type: Boolean,
    },
    mobile: Boolean,
    tablet: Boolean,
  },
  data: () => ({
    tabs: ["call", "order"],
    activeTab: 0,
    isModalOpen: false,
    scrollPosition: 0,
  }),
  watch: {
    mobile() {
      if (this.isModalOpen) {
        document.body.classList.remove("modal-open");
        document.body.style.top = "";
        window.scrollTo(0, this.scrollPosition);
      }
      this.isModalOpen = false;
    },
    tablet() {
      if (this.isModalOpen) {
        document.body.classList.remove("modal-open");
        document.body.style.top = "";
        window.scrollTo(0, this.scrollPosition);
      }
      this.isModalOpen = false;
    },
  },
  methods: {
    handleOpenOrderComponent() {
      this.activeTab = 0;
      this.isModalOpen = true;
      if (this.mobile || this.tablet) {
        this.scrollPosition =
          window.pageYOffset || document.documentElement.scrollTop;
        document.body.classList.add("modal-open");
        document.body.style.top = `-${this.scrollPosition}px`;
      }
    },
    handleOpenPhoneComponent() {
      this.activeTab = 1;
      this.isModalOpen = true;
      if (this.mobile || this.tablet) {
        this.scrollPosition =
          window.pageYOffset || document.documentElement.scrollTop;
        document.body.classList.add("modal-open");
        document.body.style.top = `-${this.scrollPosition}px`;
      }
    },
    closeModal() {
      this.isModalOpen = false;
      if (this.mobile || this.tablet) {
        document.body.classList.remove("modal-open");
        document.body.style.top = "";
        window.scrollTo(0, this.scrollPosition);
      }
    },
  },
  created() {
    if (this.$eventbus) {
      this.$eventbus.$on("openFormModal", this.handleOpenPhoneComponent);
    }
  },
  beforeUnmount() {
    if (this.$eventbus) {
      this.$eventbus.$off("openFormModal", this.handleOpenPhoneComponent);
    }
  },
};
</script>

<style lang="scss">
.section-order {
  padding-top: 40px;

  h2 {
    margin-bottom: 16px;
  }

  .subtitle {
    margin-bottom: 40px;
  }

  &__tab-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }

  &__divider {
    font-size: rem(14);
    line-height: 36px;
    font-weight: bold;
    letter-spacing: 0.3px;
    color: var(--colors-text-primary);
    padding: 0 20px;
  }

  &__tab {
    display: inline-flex;
    align-items: center;
    height: 36px;
    color: var(--colors-text-primary);
    background-color: var(--colors-grey-200);
    line-height: 36px;
    border: none;
    outline: none;
    font-family: var(--font-family-secondary);
    font-size: rem(18);
    font-weight: 800;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    transition: 0.3s ease-in-out;
    margin-bottom: 12px;

    &:hover,
    &:active,
    &:focus {
      outline: none;
    }

    &--left {
      padding: 0 40px 0 20px;
      clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 100%, 0% 100%);
    }

    &--right {
      padding: 0 20px 0 40px;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 20px 100%);
    }

    &--active {
      color: #fff;
      background-color: var(--colors-dark-grey-300);
    }
  }

  &__tab-description {
    max-width: 222px;
    font-size: rem(14);
    color: var(--colors-text-secondary);
    transition: 0.3s ease-in-out;
    letter-spacing: 0.3px;

    &--active {
      color: var(--colors-text-primary);
    }

    &--right {
      padding-left: 20px;
    }
  }
}

@media screen and (min-width: 993px) and (max-height: 890px) {
  .section-order {
    padding-top: 0;

    &__tab-description {
      display: none;
    }

    .order-form__button {
      height: 38px;
    }
  }
}

@media screen and (min-width: 993px) and (max-height: 730px) {
  .section-order {
    padding-top: 10px;
  }
}

@media screen and (max-width: 992px) {
  .section-order {
    padding-top: 50px;
    padding-bottom: 20px;

    h2 {
      margin-bottom: 10px;
    }

    .subtitle {
      margin-bottom: 30px;
    }

    &__tab-wrapper {
      flex-wrap: wrap;
    }

    &__tab-block {
      width: 100%;
      text-align: center;
      margin-bottom: 8px;
    }

    &__tab {
      margin-bottom: 10px;
      text-transform: none;
      font-size: rem(20);
      font-weight: bold;
      height: 40px;
      line-height: 40px;

      &--left,
      &--right {
        clip-path: none;
        padding: 0 20px;
      }
    }

    &__tab-description {
      font-size: rem(14);
      line-height: 1.5;
      letter-spacing: 0.2px;
      text-align: center;
      margin: 0 auto;
    }
  }
}
</style>
