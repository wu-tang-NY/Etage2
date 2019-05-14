<template>
  <portal to="modal" v-if="show">
    <div class="modal" tabindex="-1" role="dialog" aria-hidden="true">
      <div :class="modalDialogClasses" role="document">
        <div class="modal-content">
          <div class="modal-header" v-if="title">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="modal-close" data-dismiss="modal" aria-label="Close">
              <svg-icon name="x" />
            </button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer" v-if="$slots.footer">
            <slot name="footer">
            </slot>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop show"></div>
  </portal>
</template>

<script>
export default {
  name: 'AppModal',
  model: {
    prop: 'show',
  },
  props: {
    show: {
      type: Boolean,
    },
    title: String,
    small: Boolean,
    large: Boolean,
    centered: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    show(value) {
      const className = 'modal-open';
      if (value) {
        document.body.classList.add(className);
      } else {
        document.body.classList.remove(className);
      }
    },
  },
  computed: {
    modalDialogClasses() {
      return {
        'modal-dialog': true,
        'modal-dialog-sm': this.small,
        'modal-dialog-lg': this.large,
        'modal-dialog-centered': this.centered,
      };
    },
  },
};
</script>

<style lang="scss">
  .modal {
    &-header {
      align-items: center;
    }

    &-close {
      padding: 0;
      margin: -1rem -1rem -1rem 0;
    }
  }
</style>
