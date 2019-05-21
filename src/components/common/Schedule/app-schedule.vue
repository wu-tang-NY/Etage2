<template functional>
  <div class="app-schedule">
    <div class="app-schedule__icon" v-if="!props.withoutLabel">
      <svg-icon name="label_schedule" original />
    </div>

    <div class="app-schedule__content">
      <div class="app-schedule__label" v-if="!props.withoutLabel">Наш график:</div>

      <div class="app-schedule__text">
        <div>С <strong>8:30</strong> до <strong>20:00</strong></div>
        <div>Без выходных</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppSchedule',
  props: {
    withoutLabel: Boolean,
  },
};
</script>

<style lang="scss">
$schedule-text-color: rgba($colors-text--primary, .8);

.app-schedule {
  display: flex;
  font-size: rem(14);
  letter-spacing: .2px;

  &__icon {
    color: $colors-accent;
    @include size(9px, 16px);
    margin: 3px 8px 0 0;
  }

  &__label {
    font-weight: 900;
    margin-bottom: 4px;
  }

  &__text {
    font-weight: 600;
    line-height: 1.35;
    color: $schedule-text-color;

    strong {
      font-weight: 900;
    }
  }
}

@include media-breakpoint-up(lg) {
  .app-schedule {
    font-size: rem(12);
  }
}

@media screen and (min-width: 993px) and (max-height: 920px) {
  .app-schedule {
    font-size: rem(14);
  }
}
</style>
