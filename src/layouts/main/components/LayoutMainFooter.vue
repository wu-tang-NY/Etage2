<template>
  <ClientOnly>
    <footer
      class="lg:border-t lg:fixed bottom-0 left-0 w-full font-medium text-xs border-solid border-grey-200 bg-white dark:bg-dark"
    >
      <div class="container mx-auto">
        <div
          class="lg:py-2 lg:h-[50px] grid lg:grid-cols-3 lg:items-center gap-4"
        >
          <div
            class="flex items-center justify-center gap-6 lg:gap-4 flex-wrap lg:justify-end lg:order-3"
          >
            <social-icon
              v-for="icon in socialIcons"
              :key="icon.href"
              :href="icon.href"
              :icon-name="icon.iconName"
              :original="icon.original"
              :aria-label="icon.ariaLabel"
              class="size-7 lg:size-5"
            />
          </div>
          <div class="flex items-center justify-center gap-12 order-2"></div>
          <div class="text-center lg:text-left text-grey-600 lg:order-1">
            {{ $t("footer.copyright") }}
          </div>
        </div>
      </div>
    </footer>
  </ClientOnly>
</template>

<script>
import SocialIcon from "@/components/common/SocialIcon.vue";
export default {
  name: "LayoutMainFooter",
  components: {
    SocialIcon,
  },
  data() {
    return {
      socialIcons: [
        {
          href: "https://instagram.com/etage.com.ua/",
          iconName: "icon_in",
          ariaLabel: "Visit our Instagram",
        },
        {
          href: "https://www.facebook.com/groups/2522732927949314/?ref=share_group_link",
          iconName: "icon_fb",
          ariaLabel: "Visit our Facebook",
        },
        {
          href: "https://viber.click/380953560005",
          iconName: "icon_vb",
          ariaLabel: "Contact us on Viber",
        },
        {
          href: "https://wa.me/380953560005",
          iconName: "icon_wa",
          ariaLabel: "Contact us on WhatsApp",
        },
        {
          href: "https://t.me/+380953560005",
          iconName: "icon_tg",
          ariaLabel: "Contact us on Telegram",
        },
      ],
    };
  },
  methods: {},
};
</script>
