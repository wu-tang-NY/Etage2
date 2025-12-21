<template>
  <div class="font-bold flex">
    <span class="size-4">
      <svg-icon
        :name="operatorIconName"
        :original="operatorIconOriginal"
        class="size-full vertical-align-middle"
      />
    </span>
    <a
      :href="'tel:+' + phone"
      class="app-phones__code-text mx-3 flex items-center gap-1 lg:text-sm"
    >
      <span class="w-8">{{ operator }}</span>
      <span class="text-grey-200"> {{ phoneNumber }}</span>
    </a>
  </div>
</template>

<script>
export default {
  name: "Phone",
  props: {
    phone: {
      type: String,
      required: true,
    },
    operatorIconName: {
      type: String,
      required: true,
    },
    operatorIconOriginal: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    operator() {
      return this.phone.slice(0, 3);
    },
    phoneNumber() {
      return (
        this.phone.slice(3, 6) +
        "-" +
        this.phone.slice(6, 8) +
        "-" +
        this.phone.slice(8)
      );
    },
  },
};
</script>
