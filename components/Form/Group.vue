<template>
  <div :class="$style.Group">
    <slot />
  </div>
</template>

<style module lang="scss">
.Group {
    @apply flex items-center;

    & * {
        @apply flex-shrink-0
        rounded-none;

        &:first-child {
            @apply rounded-l;
        }

        &:last-child {
            @apply rounded-r;
        }
    }

    /*  */

}
</style>
