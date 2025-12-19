<template>
  <ClientOnly>
    <li id="information-modal-btn" class="nav-info">
      <NuxtLink to="/info" class="nav-info-btn">
        <svg-icon name="icon_5_c" original />
        {{ $t("navInfo.information") }}
      </NuxtLink>
    </li>
  </ClientOnly>
</template>

<script>
export default {
  name: "AppNavInfo",
};
</script>

<style lang="scss">
.nav-info-btn {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font-size: rem(14);
  font-weight: bold;
  letter-spacing: 0.3px;
  color: var(--colors-text-primary);
  cursor: pointer;
  outline: none;

  &:hover {
    color: var(--colors-accent);
  }

  &:focus {
    outline: 2px solid var(--colors-accent);
    outline-offset: 2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
}
.nav-info {
  display: inline-flex;
  align-items: center;
  margin-left: auto;
  font-size: rem(14);
  font-weight: bold;
  letter-spacing: 0.3px;
  color: var(--colors-text-primary);
  cursor: pointer;

  svg {
    @include size(20px);
    margin-right: 13px;
  }
}

@media screen and (min-width: 993px) and (max-height: 730px) {
  .nav-info {
    height: 36px;
    padding-left: 24px;
  }
}

@media screen and (max-width: 992px) {
  .nav-info {
    height: 36px;
    padding-left: 24px;
    font-weight: 600;
  }
}
</style>
