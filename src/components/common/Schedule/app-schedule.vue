<template functional>
  <div class="app-schedule">
    <div class="app-schedule__icon">
      <svg-icon name="label_schedule" original />
    </div>

    <div class="app-schedule__content">
      <div class="app-schedule__label">Наш график:</div>

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
};
</script>

<style lang="scss">
$schedule-text-color: rgba($colors-text--primary, .8);

.app-schedule {
  display: flex;
  font-size: rem(12);
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
</style>
