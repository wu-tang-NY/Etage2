<template>
  <ul class="font-bold flex flex-col gap-2 lg:gap-0">
    <li
      v-for="phone in phones"
      :key="phone.phone"
      class="flex items-center gap-2 lg:gap-1"
    >
      <phone
        :phone="phone.phone"
        :operator-icon-name="phone.operatorIconName"
        :operator-icon-original="phone.operatorIconOriginal"
      />
      <social-icon
        :href="phone.link"
        :icon-name="phone.iconName"
        :original="phone.iconOriginal"
        size="size-4"
        :aria-label="phone.ariaLabel"
        class="hidden lg:flex"
        target="_blank"
      />
    </li>
  </ul>
</template>

<script>
import Phone from "./Phone.vue";
import SocialIcon from "@/components/common/SocialIcon.vue";

export default {
  name: "AppPhones",
  components: {
    Phone,
    SocialIcon,
  },
  data() {
    return {
      phones: [
        {
          phone: "0973560005",
          link: "https://viber.click/380953560005",
          operatorIconName: "operator_2",
          operatorIconOriginal: true,
          iconName: "icon_vb",
          iconOriginal: true,
          ariaLabel: "Contact us on Viber",
        },
        {
          phone: "0953560005",
          link: "https://t.me/+380953560005",
          operatorIconName: "operator_3",
          operatorIconOriginal: true,
          iconName: "icon_tg",
          iconOriginal: true,
          ariaLabel: "Contact us on Telegram",
        },
        {
          phone: "0733560005",
          link: "https://wa.me/380953560005",
          operatorIconName: "operator_1",
          operatorIconOriginal: true,
          iconName: "icon_wa",
          iconOriginal: true,
          ariaLabel: "Contact us on WhatsApp",
        },
      ],
    };
  },
};
</script>

<style lang="scss"></style>
