<template>
  <div class="modal-info" v-show="openModal">
    <div class="container">
      <div class="row">
        <div class="sticky" :class="{ 'sticky--large': toggledNav }">
          <div
            class="sticky__close"
            v-if="mobile || tablet"
            @click="closeModal"
          />
          <div
            class="sticky__nav"
            @click="openMobileAccordion"
            v-if="mobile || tablet"
          >
            {{ $t("modal.navigation") }}
            <svg-icon original name="icon_nav-modal" />
            <!-- <div class="sticky__back" @click="closeModal" v-if="(mobile || tablet) && !toggledNav">
              <svg-icon name="arrow-next"/>
              Назад
            </div>
            <button class="sticky__ham menu-toggle__btn" @click="openMobileAccordion">
              <span class="menu-toggle__line sticky__ham-item"></span>
              <span class="menu-toggle__line sticky__ham-item"></span>
              <span class="menu-toggle__line sticky__ham-item"></span>
            </button> -->
          </div>
          <svg-icon
            name="logo_white"
            original
            class="modal-info__logo"
            v-if="!mobile && !tablet"
          />
          <div
            class="modal-info__nav"
            v-if="(!mobile && !tablet) || toggledNav"
          >
            <template v-if="nav && nav.length > 0">
              <template
                v-for="(item, index) in nav"
                :key="item.header || index"
              >
                <div
                  v-if="item"
                  class="modal-info__panel"
                  :class="{ 'modal-info__panel--active': item.isActive }"
                >
                  <div
                    class="modal-info__panel-header"
                    @click="toggleActive(item, index)"
                  >
                    {{ item.header }}
                    <svg-icon name="modal_dropdown" original />
                  </div>
                  <template v-if="item && item.links && item.links.length > 0">
                    <template
                      v-for="(link, linkIndex) in item.links"
                      :key="link.title || link.name || linkIndex"
                    >
                      <div v-if="link" class="modal-info__panel-content">
                        <!-- <a href="" @click.prevent="openSelectedInfo(item)" :class="{'modal-info__panel-link--active':link.activeLink}" class="modal-info__panel-link">{{link.title}}</a> -->
                        <a
                          v-if="link && link.title"
                          href=""
                          @click.prevent="scrollTo(link, item.header)"
                          :class="{
                            'modal-info__panel-link--active': link.activeLink,
                          }"
                          class="modal-info__panel-link"
                          >{{ link.title }}</a
                        >
                      </div>
                    </template>
                  </template>
                </div>
              </template>
            </template>
          </div>
        </div>
        <div class="col-lg-9 modal-conent">
          <div class="modal-info__header-wrapper">
            <!-- <div class="modal-info__header">{{activeTab}}</div> -->
            <div
              class="modal-info__close"
              @click="closeModal"
              v-if="!mobile && !tablet"
            />
          </div>
          <div class="modal-info__content" ref="sections">
            <!-- <component :is="activeTab.component" /> -->
            <template v-if="openModal && nav && nav.length > 0">
              <template
                v-for="(item, itemIndex) in nav"
                :key="item.header || itemIndex"
              >
                <div
                  v-if="item"
                  class="modal-info__component-group"
                  :id="item.header"
                >
                  <!-- Only render components when they're actually in viewport or about to be -->
                  <template v-if="item && item.links && item.links.length > 0">
                    <template
                      v-for="(link, linkIndex) in item.links"
                      :key="link.title || link.component || linkIndex"
                    >
                      <component
                        v-if="link && link.component"
                        :is="link.component"
                        :id="link.component"
                      />
                    </template>
                  </template>
                </div>
              </template>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pages from "~/src/views/Main/pages";

export default {
  name: "ModalInfo",
  components: {
    ...pages,
  },
  inject: {
    eventbus: {
      from: "eventbus",
      default: null,
    },
  },
  props: {
    mobile: Boolean,
    tablet: Boolean,
  },
  computed: {
    nav() {
      return this.navItems.map((item, index) => ({
        ...item,
        isActive: this.activeStates[index] || false,
        links: (item.links || [])
          .map((link, linkIndex) => ({
            ...link,
            activeLink: this.activeLinkStates[`${index}-${linkIndex}`] || false,
          }))
          .filter((link) => link && link.component), // Filter out any undefined links
      }));
    },
  },
  data() {
    return {
      openModal: false,
      activeTab: "PopupContentAboutUs",
      toggledNav: false,
      activeStates: {},
      activeLinkStates: {},
      navItems: [],
      scrollPosition: 0,
    };
  },
  created() {
    if (typeof window !== "undefined") {
      this.initializeNav();
    }
  },
  watch: {
    "$i18n.locale": {
      handler() {
        if (typeof window !== "undefined") {
          this.initializeNav();
        }
      },
      immediate: false,
    },
  },
  methods: {
    initializeNav() {
      this.navItems = [
        {
          header: this.$t("modal.aboutCompany"),
          links: [
            {
              title: this.$t("modal.aboutUs"),
              component: "PopupContentAboutUs",
              activeLink: false,
            },
            {
              title: this.$t("modal.history"),
              component: "PopupContentHistory",
              activeLink: false,
            },
            {
              title: this.$t("modal.ourGoal"),
              component: "PopupContentOurGoal",
              activeLink: false,
            },
            {
              title: this.$t("modal.facts"),
              component: "PopupContentFacts",
              activeLink: false,
            },
            {
              title: this.$t("modal.auto"),
              component: "PopupContentAuto",
              activeLink: false,
            },
          ],
          isActive: false,
        },
        {
          header: this.$t("modal.services"),
          links: [
            {
              title: this.$t("modal.flatMove"),
              component: "PopupContentFlatMove",
              activeLink: false,
            },
            {
              title: this.$t("modal.officeMove"),
              component: "PopupContentOfficeMove",
              activeLink: false,
            },
            {
              title: this.$t("modal.stuffMove"),
              component: "PopupContentStuffMove",
              activeLink: false,
            },
            {
              title: this.$t("modal.specialists"),
              component: "PopupContentSpecialists",
              activeLink: false,
            },
            {
              title: this.$t("modal.package"),
              component: "PopupContentPackage",
              activeLink: false,
            },
          ],
          isActive: false,
        },
        {
          header: this.$t("modal.information"),
          links: [
            {
              title: this.$t("modal.jobs"),
              component: "PopupContentJobs",
              activeLink: false,
            },
            {
              title: this.$t("modal.reviews"),
              component: "PopupContentFeedback",
              activeLink: false,
            },
            {
              title: this.$t("modal.contacts"),
              component: "PopupContentContacts",
              activeLink: false,
            },
          ],
          isActive: false,
        },
        {
          header: this.$t("modal.payment"),
          links: [
            {
              title: this.$t("modal.payment"),
              component: "PopupContentPayment",
              activeLink: false,
            },
          ],
          isActive: false,
        },
        {
          header: this.$t("modal.specialOffers"),
          links: [
            {
              title: this.$t("modal.specialOffers"),
              component: "PopupContentSpecialOffers",
              activeLink: false,
            },
          ],
          isActive: false,
        },
      ];
    },
    setupEventbusListener(eventbus) {
      this._eventbus = eventbus;
      eventbus.$on("openPopup", (component) => {
        this.navItems.some((nav, navIndex) => {
          return nav.links.some((item, linkIndex) => {
            if (item.component === component) {
              this.activeTab = nav.header;
              this.activeStates[navIndex] = true;
              this.activeLinkStates[`${navIndex}-${linkIndex}`] = true;
              this.scrollTo(item, nav.header);
            }
            return item.component === component;
          });
        });
        this.openModal = true;

        // Save current scroll position and block scrolling
        this.scrollPosition =
          window.pageYOffset || document.documentElement.scrollTop;
        document.body.classList.add("modal-open");
        document.body.style.top = `-${this.scrollPosition}px`;
      });
    },
    openSelectedInfo(link, header) {
      this.handeRemoveAllColoredLinks();
      this.activeTab = header;
      // Find the link index and set it as active
      this.navItems.forEach((item, itemIndex) => {
        item.links.forEach((l, linkIndex) => {
          if (l.component === link.component) {
            this.activeLinkStates[`${itemIndex}-${linkIndex}`] = true;
          }
        });
      });
      if (this.toggledNav) {
        this.openMobileAccordion();
      }
    },

    async scrollTo(link, header) {
      // Wait for component to render
      await this.$nextTick();
      // Wait a bit more for the component to be fully mounted
      await new Promise((resolve) => setTimeout(resolve, 100));

      const elem = document.getElementById(link.component);
      if (!elem || !elem.parentNode) {
        // If element still not found, wait a bit more and retry
        await new Promise((resolve) => setTimeout(resolve, 200));
        const retryElem = document.getElementById(link.component);
        if (!retryElem || !retryElem.parentNode) {
          console.warn(`Element ${link.component} not found after loading`);
          this.openSelectedInfo(link, header);
          return;
        }
        const elemGroupOffset = retryElem.parentNode.offsetTop;
        const top = retryElem.offsetTop + elemGroupOffset - 60;
        if (this.$refs.sections) {
          this.$refs.sections.scrollTo({
            top,
          });
        }
        this.openSelectedInfo(link, header);
        return;
      }

      const elemGroupOffset = elem.parentNode.offsetTop;
      const top = elem.offsetTop + elemGroupOffset - 60;
      if (this.$refs.sections) {
        this.$refs.sections.scrollTo({
          top,
        });
      }
      this.openSelectedInfo(link, header);
    },

    handeRemoveAllColoredLinks() {
      this.activeLinkStates = {};
    },

    handeRemoveAllToggledPanels() {
      this.activeStates = {};
    },

    openMobileAccordion() {
      if (this.mobile || this.tablet) {
        this.toggledNav = !this.toggledNav;
      }
    },
    toggleActive(block, index) {
      let prev = null;

      // Find which panel is currently active
      Object.keys(this.activeStates).forEach((key) => {
        if (this.activeStates[key]) {
          prev = parseInt(key);
        }
      });

      // Close all panels
      this.activeStates = {};

      // Open the clicked panel if it wasn't already open
      if (prev !== index) {
        this.activeStates[index] = true;
      }

      this.$nextTick(() => {
        const elem = document.getElementById(block.header);
        if (elem && this.$refs.sections) {
          const top = elem.offsetTop - 60;
          this.$refs.sections.scrollTo({
            top,
          });
        }
      });
    },

    closeModal() {
      this.handeRemoveAllColoredLinks();
      this.handeRemoveAllToggledPanels();
      this.openModal = false;
      // Restore scroll position
      document.body.classList.remove("modal-open");
      document.body.style.top = "";
      window.scrollTo(0, this.scrollPosition);
    },
  },
  mounted() {
    // Initialize nav on client side if not already done
    if (this.navItems.length === 0) {
      this.initializeNav();
    }

    // Get eventbus from inject or $eventbus
    const eventbus = this.eventbus || this.$eventbus;

    if (!eventbus) {
      console.warn(
        "Eventbus not available in modal component. Trying again in next tick..."
      );
      // Try again in next tick in case plugin hasn't finished loading
      this.$nextTick(() => {
        const retryEventbus = this.eventbus || this.$eventbus;
        if (retryEventbus) {
          this.setupEventbusListener(retryEventbus);
        } else {
          console.error("Eventbus still not available after retry");
        }
      });
      return;
    }

    this.setupEventbusListener(eventbus);
  },
  beforeUnmount() {
    const eventbus = this._eventbus || this.eventbus || this.$eventbus;
    if (eventbus) {
      eventbus.$off("openPopup");
    }
    // Cleanup: remove modal-open class if component is destroyed while modal is open
    if (typeof document !== "undefined" && this.openModal) {
      document.body.classList.remove("modal-open");
      document.body.style.top = "";
      window.scrollTo(0, this.scrollPosition);
    }
  },
};
</script>

<style lang="scss">
.modal-info {
  width: 100%;
  min-height: 100vh;
  max-width: 100vw;
  height: 100vh;
  background-color: #0e1a28;
  padding: 50px 0;
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  &::before {
    content: "";
    position: absolute;
    bottom: 20px;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("/static/images/bg_dark.png") repeat-x center bottom;
    background-size: 75%;
  }

  .sticky {
    position: fixed;
    overflow: auto;
    max-height: 80vh;
    width: 15%;
    max-width: 15%;
    min-width: 300px;
    flex-shrink: 0;

    &__close {
      position: relative;
      @include size(18px);
      overflow: hidden;
      margin-left: auto;
      margin-right: 16px;
      margin-top: 16px;
      margin-bottom: 31px;

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 25px;
        height: 2px;
        transform: translate(-50%, -50%) rotateZ(-45deg);
        background-color: #fff;
      }

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 25px;
        height: 2px;
        transform: translate(-50%, -50%) rotateZ(45deg);
        background-color: #fff;
      }
    }
  }

  &__component-group {
    position: relative;

    & > div {
      position: relative;

      h2 {
        color: var(--colors-accent);
        margin-bottom: 20px;
      }
    }

    & > div + div {
      margin-top: 80px;
      &::before {
        content: "";
        position: absolute;
        top: -40px;
        @include size(100%, 2px);
        left: 0;
        background-color: rgba(#fff, 0.4);
      }
    }

    & + & {
      margin-top: 120px;
      &::before {
        content: "";
        position: absolute;
        top: -60px;
        @include size(100%, 2px);
        left: 0;
        background-color: color-mix(
          in srgb,
          var(--colors-accent) 40%,
          transparent
        );
      }
    }
  }

  &__bg {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }

  &__logo {
    width: 130px;
    margin-top: 14px;
    margin-bottom: 30px;
  }

  &__panel {
    margin-bottom: 10px;
    max-width: 210px;
    cursor: pointer;

    &--active {
      .modal-info__panel-header {
        background-color: rgba(#fff, 0.1);

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
    transition: 0.3s ease-in-out;

    &:hover {
      background-color: rgba(#fff, 0.1);
    }

    svg {
      @include size(8px, 5px);
      transform: rotateZ(180deg);
      transition: 0.3s ease-in-out;
    }
  }

  &__panel-content {
    max-height: 0;
    transition: 0.3s ease-in-out;
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
    transition: 0.3s ease-in-out;

    &--active {
      color: var(--colors-accent);
      opacity: 1;
    }

    &:hover {
      opacity: 1;
    }
  }

  &__header-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 40px;
    position: absolute;
    width: calc(100% - 30px);
  }

  &__header {
    font-family: var(--font-family-secondary);
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
      content: "";
      position: absolute;
      @include size(25px, 3px);
      background-color: #fff;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotateZ(-45deg);
    }

    &::after {
      content: "";
      position: absolute;
      @include size(25px, 3px);
      background-color: #fff;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotateZ(45deg);
    }
  }
  &__content {
    height: calc(100vh - 200px);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    margin-top: 60px;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 100px;
    }

    p + p,
    img + p,
    img + img,
    p + img {
      margin-top: 20px;
    }

    h3 {
      color: var(--colors-accent);
      margin-bottom: 20px;
    }

    p,
    li {
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

    ul,
    ol {
      padding-left: 20px;
      margin: 20px 0;

      li {
        margin-bottom: 10px;
      }
    }

    ul {
      list-style: disc;
    }

    ol {
      list-style: decimal;
    }
  }
}

.modal-conent {
  margin-left: 25%;
}

@media screen and (max-width: 992px) {
  .modal-info {
    overflow: scroll;
    max-height: 100vh;
    padding-top: 0;
    width: 100%;
    max-width: 100vw;

    &__header-wrapper {
      width: 100%;
    }

    &__content {
      margin-top: 24px;
    }

    .modal-conent {
      margin-top: 100px;
      margin-left: 0;
    }

    &__nav {
      margin-top: 40px;
    }

    &__panel {
      max-width: 100%;
      width: 100%;
    }

    .sticky {
      top: 0;
      left: 0;
      max-width: 100%;
      width: 100%;
      min-width: 100%;
      max-height: 100vh;
      background-color: #0e1a28;
      z-index: 2;
      padding-bottom: 16px;

      &--large {
        min-height: 100vh;
      }

      &__nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 16px;
        padding: 0 16px;
        background-color: rgba(255, 255, 255, 0.05);
        height: 44px;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.3px;
        color: #ffffff;

        svg {
          @include size(18px);
        }
      }

      &__ham {
        margin-left: auto;
      }

      &__ham-item {
        background: white;
      }

      &__back {
        font-size: rem(16);
        text-transform: uppercase;
        color: white;
        font-weight: 600;
        font-family: var(--font-family-secondary);
        display: inline-flex;
        align-items: center;

        svg {
          @include size(16px);
          fill: white;
          transform: rotateZ(180deg);
          margin-right: 8px;
          transition: 0.3s ease-in-out;
        }

        &:hover {
          svg {
            transform: rotateZ(180deg) translateX(4px);
          }
        }
      }
    }
  }

  // Add padding-top when New Year decorations are active
  body.has-christmas-lights .modal-info {
    padding-top: 50px;
  }

  // Add padding-top to close button when New Year decorations are active
  body.has-christmas-lights .modal-info .sticky__close {
    margin-top: 66px; // 16px original + 50px for decorations
  }
}
</style>
