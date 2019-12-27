<template>
  <portal to="modal" v-if="show">
    <div class="modal" tabindex="-1" role="dialog" @click.self="handleCloseModal">
      <div :class="modalDialogClasses" role="document">
        <div class="modal-content" v-if="show">
          <div class="modal-header" v-if="title">
            <h5 class="modal-title">{{ title }}</h5>

            <button type="button" class="modal-close" data-dismiss="modal" aria-label="Close" @click="handleCloseModal">
              <span class="modal-close__line"></span>
              <span class="modal-close__line"></span>
            </button>
          </div>

          <div class="modal-body">
            <slot></slot>
          </div>

          <div class="modal-footer" v-if="$slots.footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
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
  methods: {
    handleCloseModal() {
      this.$emit('input', false);
    },
  },
};
</script>

<style lang="scss">
.modal {
  background-color: rgba($black, .5);
  display: block;

  &-header {
    align-items: center;
  }

  &-title {
    font-size: rem(20);
    font-weight: 900;
  }

  &-content {
    width: 400px;
  }

  &-close {
    background-color: transparent;
    border: none;
    padding: 0;
    margin: -1rem -1rem -1rem 0;
    color: rgba($black, .5);
    position: relative;
    @include size(20px);
    margin-right: 0px;

    &::before,
    &::after {
      content: '';
      background-color: $colors-text--primary;
      @include absolute(0, 0);
      @include size(100%, 2px);
      transform-origin: 50% 50%;
      margin-top: 10px;
    }

    &::before {
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }
  }

  .welcome-block {
    text-align: center;

    .svg-icon {
      width: 36px;
      height: 36px;
      margin-bottom: 12px;
    }

    .btn {
      margin-top: 24px;
    }
  }
}

@include media-breakpoint-up(lg) {
  .modal-open {
    padding-right: 17px;
  }
}

@include media-breakpoint-down(sm) {
  .modal {
    overflow: hidden;
    height: 100vh;
    &-dialog {
      background-color: $white;
      margin: 0;
      height: 100%;
      align-items: flex-start;
    }

    .btn {
      margin-bottom: 40px;
    }

    &-content {
      border: none;
      @include size(100%);
      height: 100vh;
      overflow: auto;
     }
  }
}
</style>
