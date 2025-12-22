<template>
  <ClientOnly>
    <div class="app-schedule flex text-sm lg:text-xs">
      <div
        class="text-[var(--colors-accent)] w-[9px] h-[16px] mt-[3px] mr-2"
        v-if="!withoutLabel"
      >
        <svg-icon name="label_schedule" original />
      </div>

      <div>
        <div class="font-black mb-1" v-if="!withoutLabel">
          {{ $t("schedule.label") }}
        </div>

        <div class="font-semibold">
          <div>{{ $t("schedule.time", { from: "5:00", to: "23:00" }) }}</div>
          <div>{{ $t("schedule.noDaysOff") }}</div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script>
export default {
  name: "AppSchedule",
  props: {
    withoutLabel: Boolean,
  },
};
</script>

<style lang="scss"></style>
