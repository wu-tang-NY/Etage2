<template>
  <li
    class="nav-item"
    :class="{
      'nav-item--active': active,
      'nav-item--visited': visited,
      'nav-item--hovered': hovered,
    }"
  >
    <NuxtLink
      :to="to"
      :id="id"
      class="nav-item__link"
      role="button"
      tabindex="0"
      @click.prevent="handleClick"
      @keydown="handleKeydown"
    >
      <div class="nav-item__inner">
        <slot>
          <span class="nav-item__icon" v-if="icon">
            <svg-icon :name="icon" :original="!active" />
          </span>

          <span class="nav-item__text">{{ title }}</span>
        </slot>

        <span class="nav-item__chevron" v-if="hasChildren"></span>
      </div>

      <div class="nav-item__bg"></div>
    </NuxtLink>

    <ul class="nav-inner" v-if="hasChildren" role="menu">
      <template v-for="(child, index) in children" :key="index">
        <li class="nav-inner__item" role="menuitem">
          <NuxtLink
            :to="getChildRoute(child.path)"
            class="nav-inner__link"
            role="button"
            tabindex="0"
            @click.prevent="handleChildClick(child.path)"
            @keydown="handleChildKeydown($event, child.path)"
          >
            {{ child.title }}
          </NuxtLink>
        </li>
      </template>
    </ul>
  </li>
</template>

<script>
export default {
  name: "AppNavItem",
  props: {
    id: {
      type: String,
    },

    title: {
      type: String,
    },

    icon: {
      type: String,
    },

    to: {
      type: String,
      default: "",
    },

    active: {
      type: Boolean,
      required: true,
    },

    visited: {
      type: Boolean,
      required: true,
    },

    children: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    hasChildren() {
      return Array.isArray(this.children) && this.children.length > 0;
    },
  },
  emits: ["click", "close"],
  data: () => ({
    hovered: false,
  }),
  methods: {
    handleClick(event) {
      this.hovered = false;
      this.$emit("click", event);
      // If this nav item has a route (to prop), emit close event for mobile menu
      if (this.to) {
        this.$emit("close");
      }
    },
    handleKeydown(event) {
      // Handle Enter and Space keys
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        this.handleClick(event);
      }
      // Handle Escape to close dropdown if open
      else if (event.key === "Escape" && this.hasChildren) {
        event.preventDefault();
        this.hovered = false;
        // Remove focus from the link
        event.target.blur();
      }
      // Handle ArrowDown to open dropdown and focus first child
      else if (event.key === "ArrowDown" && this.hasChildren) {
        event.preventDefault();
        this.hovered = true;
        const navItem = event.target.closest(".nav-item");
        const firstChild = navItem?.querySelector(".nav-inner__link");
        if (firstChild) {
          // Use setTimeout to ensure dropdown is visible
          setTimeout(() => {
            firstChild.focus();
          }, 0);
        }
      }
      // Handle ArrowUp to open dropdown and focus last child
      else if (event.key === "ArrowUp" && this.hasChildren) {
        event.preventDefault();
        this.hovered = true;
        const navItem = event.target.closest(".nav-item");
        const children = navItem?.querySelectorAll(".nav-inner__link");
        if (children && children.length > 0) {
          const lastChild = children[children.length - 1];
          // Use setTimeout to ensure dropdown is visible
          setTimeout(() => {
            lastChild.focus();
          }, 0);
        }
      }
    },
    getChildRoute(path) {
      const routeMap = {
        PopupContentFlatMove: "flat_move",
        PopupContentOfficeMove: "office_move",
        PopupContentStuffMove: "stuff_move",
        PopupContentSpecialists: "specialists",
        PopupContentPackage: "package",
      };

      const route = routeMap[path];
      const locale = this.$i18n?.locale || "ua";
      return `/${locale}/info/${route}`;
    },
    handleChildClick(path) {
      const routeMap = {
        PopupContentFlatMove: "flat_move",
        PopupContentOfficeMove: "office_move",
        PopupContentStuffMove: "stuff_move",
        PopupContentSpecialists: "specialists",
        PopupContentPackage: "package",
      };

      const route = routeMap[path];
      const locale = this.$i18n?.locale || "ua";
      this.$router.push(`/${locale}/info/${route}`);
      // Emit close event for mobile menu when child item is clicked
      this.$emit("close");
    },
    handleChildKeydown(event, path) {
      // Handle Enter and Space keys
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        this.handleChildClick(path);
      }
      // Handle Escape to close dropdown
      else if (event.key === "Escape") {
        event.preventDefault();
        this.hovered = false;
        // Return focus to parent link
        const parentLink = event.target
          .closest(".nav-item")
          .querySelector(".nav-item__link");
        if (parentLink) {
          parentLink.focus();
        }
      }
      // Handle ArrowUp to focus previous sibling or parent
      else if (event.key === "ArrowUp") {
        event.preventDefault();
        const siblings = Array.from(
          event.target
            .closest(".nav-inner")
            .querySelectorAll(".nav-inner__link")
        );
        const currentIndex = siblings.indexOf(event.target);
        if (currentIndex > 0) {
          siblings[currentIndex - 1].focus();
        } else {
          // Focus parent link
          const parentLink = event.target
            .closest(".nav-item")
            .querySelector(".nav-item__link");
          if (parentLink) {
            parentLink.focus();
          }
        }
      }
      // Handle ArrowDown to focus next sibling
      else if (event.key === "ArrowDown") {
        event.preventDefault();
        const siblings = Array.from(
          event.target
            .closest(".nav-inner")
            .querySelectorAll(".nav-inner__link")
        );
        const currentIndex = siblings.indexOf(event.target);
        if (currentIndex < siblings.length - 1) {
          siblings[currentIndex + 1].focus();
        }
      }
    },
  },
};
</script>

<style lang="scss">
.nav-item {
  &__link {
    display: block;
    padding: 7px rem(24) 8px;
    color: var(--colors-text-primary);
    font-weight: 600;
    font-size: rem(14);
    letter-spacing: 0.2px;
    position: relative;
    outline: none;
    text-decoration: none;

    &:focus {
      outline: none !important;
    }
  }

  &__inner {
    position: relative;
    z-index: 1;
  }

  &__icon {
    display: inline-block;
    @include size(22px);
    margin-right: 6px;
  }

  &__chevron {
    border: 4px solid transparent;
    border-top-color: var(--colors-text-primary);
    display: inline-block;
    margin-left: 5px;
    transform: translate(0, 2px);
  }

  &__text {
    vertical-align: middle;
  }

  &__bg {
    position: absolute;
    bottom: 0;
    left: 0;
    @include size(100%);
    overflow: hidden;
    clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 100%, 0 100%);

    &::before {
      content: "";
      background-color: var(--colors-grey-200);
      @include size(0, 100%);
      position: absolute;
      top: 0;
      left: auto;
      right: 0;
      transition: width 0.3s linear;
    }
  }

  .nav-inner {
    background-color: var(--colors-grey-200);
    padding: 10px;
    position: absolute;
    top: 100%;
    left: 0;
    width: 230px;
    display: none;
    list-style: none;

    &__link {
      display: block;
      padding: 9px 10px;
      color: var(--colors-text-primary);
      font-weight: 500;
      letter-spacing: 0.3px;
      transition: background-color 0.15s ease-in-out;
      outline: none;
      text-decoration: none;

      &:hover,
      &:focus {
        background-color: rgba(0, 0, 0, 0.05);
      }

      &:focus:not(:focus-visible) {
        outline: none;
      }
    }
  }

  &.nav-item:hover,
  &.nav-item:focus-within {
    .nav-item {
      &__link {
        color: var(--colors-text-primary);
      }
    }

    .nav-inner {
      display: block;
    }
  }

  &:focus,
  &.nav-item--active {
    .nav-item {
      &__link {
        color: var(--white);

        &:hover {
          color: var(--white);
        }
      }

      &__icon {
        color: var(--white) !important;

        svg {
          fill: var(--white) !important;

          path[fill="#fff"] {
            fill: var(--white) !important;
          }
        }
      }

      &__chevron {
        border-top-color: var(--white);
      }

      &__bg::before {
        background-color: var(--colors-accent);
        width: 100%;
        left: 0;
      }
    }

    .nav-inner {
      background-color: var(--colors-accent);

      &__link {
        color: var(--white);

        &:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
      }
    }
  }

  @include media-breakpoint-up(lg) {
    display: inline-block;

    &:not(:last-child) {
      margin-right: -15px;
    }

    &__link {
      &:hover {
        .nav-item__bg::before {
          width: 100%;
          left: 0;
        }
      }
    }

    &__bg {
      bottom: 2px;
      clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 100%, 20px 100%);
    }

    &__icon {
      @include size(26px);
    }

    &.nav-item--visited {
      .nav-item {
        &__bg::before {
          width: 100%;
        }
      }
    }
  }

  @media screen and (min-width: 993px) and (max-height: 890px) {
    .nav-item {
      &__link {
        padding: 4px rem(24) 6px;
      }

      &__icon {
        @include size(22px);
      }
    }
  }

  @media screen and (min-width: 993px) and (max-height: 730px) {
    display: block;
    margin: 0 !important;

    &__link {
      padding: 0 rem(24) !important;
      max-width: 300px;
      width: 300px;
      height: 36px;
      line-height: 36px;
      margin-bottom: 10px;
    }

    &__icon {
      @include size(20px);
    }

    &__bg {
      bottom: 0;
      clip-path: none !important;
    }

    &__chevron {
      display: none !important;
    }

    .nav-inner {
      display: none !important;
    }
  }

  @include media-breakpoint-down(md) {
    &__link {
      padding: 7px rem(24) 7px;
      max-width: 300px;
    }

    &__chevron {
      display: none !important;
    }

    .nav-inner {
      display: none !important;
    }
  }
}
</style>
