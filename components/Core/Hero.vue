<template>
  <section :class="$style.Hero">
    <div :class="$style.Hero__content">
      <slot />
    </div>
  </section>
</template>

<style lang="scss" module>
.Hero {
  // background-image: url('/assets/backgrounds/hero.png');
  // background-size: cover;
  // background-position: center;

  // &::before, &::after {
  //     content: '';
  //     box-shadow: 0 0 12rem 6rem rgba(0, 0, 0, .3);

  //     @apply absolute;

  //     // Dark mode
  //     @media (prefers-color-scheme: dark) {
  //         box-shadow: 0 0 12rem 6rem hsla(0, 0%, 90%, .15);
  //     }
  // }

  &::before {
    @apply bottom-0 left-0;
  }

  &::after {
    @apply bottom-0 right-0;
  }

  @apply flex py-16 relative
    overflow-hidden

    md:(py-20)
    lg:(py-24)
    xl:(py-32);

  // & > * {
  //     grid-column: 1 / -1;
  //     grid-row: 1 / -1;
  // }

  // &__background {
  //     @apply -z-1;
  // }

  &__content {
    @apply container flex-1;
  }
}
</style>
