<script setup lang="ts">
withDefaults(defineProps<{
  vertical?: boolean
}>(), {
  vertical: false,
})
</script>

<template>
  <div :class="$style[`Divider${vertical ? '--vertical' : ''}`]" />
</template>

<style module lang="scss">
.Divider {
  @apply block h-[1px] w-full
  bg-current opacity-50;

  &--vertical {
    @apply block h-full w-[1px]
    bg-current opacity-50;
  }
}
</style>
