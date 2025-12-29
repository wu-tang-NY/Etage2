<template>
  <ClientOnly>
    <h2 class="mb-4">{{ $t("order.title") }}</h2>

    <div class="text-gray-800 dark:text-gray-400 mb-8">
      {{ $t("order.subtitle") }}
    </div>

    <div
      class="flex items-center lg:items-start justify-start flex-wrap flex-col lg:flex-row lg:flex-nowrap mb-6"
    >
      <div
        class="flex items-center justify-center flex-col lg:items-start lg:justify-start mb-2 lg:mb-0"
      >
        <AppButton
          variant="secondary"
          size="lg"
          class="mb-3 lg:pr-10 lg:pl-5 lg:[clip-path:polygon(0_0,calc(100%_-_20px)_0,100%_100%,0%_100%)]"
          :active="activeTab === 'call'"
          @click="openModal('call')"
        >
          {{ $t("order.leaveNumber") }}
        </AppButton>

        <div
          class="text-sm leading-normal mx-auto text-gray-500"
          :class="{ 'text-gray-800 dark:text-gray-400': activeTab === 'call' }"
        >
          {{ $t("order.leaveNumberDesc") }}
        </div>
      </div>

      <div class="text-sm leading-9 font-bold py-2 px-5">
        {{ $t("common.or") }}
      </div>

      <div
        class="flex items-center justify-center flex-col lg:items-start lg:justify-start lg:text-left mb-2 lg:mb-0 max-w-[210px]"
      >
        <AppButton
          class="mb-3 lg:pl-10 lg:pr-5 lg:[clip-path:polygon(0_0,100%_0,100%_100%,20px_100%)]"
          variant="secondary"
          size="lg"
          :active="activeTab === 'order'"
          @click="openModal('order')"
        >
          {{ $t("order.fillForm") }}
        </AppButton>

        <div
          class="text-sm text-gray-400 text-center lg:text-left lg:pl-5"
          :class="{ 'text-gray-800 dark:text-gray-400': activeTab === 'order' }"
        >
          {{ $t("order.fillFormDesc") }}
        </div>
      </div>
    </div>

    <transition name="component-fade" mode="out-in" v-if="!mobile && !tablet">
      <component
        :is="tabs[activeTab].component"
        :key="tabs[activeTab].component"
        @closeModal="closeModal"
        :mobile="mobile"
        :tablet="tablet"
      />
    </transition>

    <app-modal
      v-if="mobile || tablet"
      :show="isModalOpen"
      :title="$t(tabs[activeTab].title)"
      :subtitle="$t(tabs[activeTab].subtitle)"
      @update:show="isModalOpen = false"
    >
      <component
        :is="tabs[activeTab].component"
        :key="tabs[activeTab].component"
        @closeModal="closeModal"
        :mobile="mobile"
        :tablet="tablet"
      />
    </app-modal>
  </ClientOnly>
</template>

<script>
import { unref } from "vue";
import OrderFormComponent from "./components/OrderFormComponent";
import CallFormComponent from "./components/CallFormComponent";
import AppButton from "../../../../components/ui/Button/app-button.vue";

export default {
  name: "AppPageMainSectionOrder",
  components: {
    AppButton,
    order: OrderFormComponent,
    call: CallFormComponent,
  },
  props: {
    active: {
      type: Boolean,
    },
  },
  computed: {
    mobile() {
      return unref(this.$mobile);
    },
    tablet() {
      return unref(this.$tablet);
    },
  },
  data: () => ({
    tabs: {
      call: {
        component: CallFormComponent,
        title: "callForm.title",
        subtitle: "callForm.subtitle",
      },
      order: {
        component: OrderFormComponent,
        title: "orderForm.title",
        subtitle: "orderForm.subtitle",
      },
    },
    activeTab: "call",
    isModalOpen: false,
  }),
  methods: {
    openModal(tab) {
      this.activeTab = tab;

      if (this.mobile || this.tablet) {
        this.isModalOpen = true;
      }
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
};
</script>
