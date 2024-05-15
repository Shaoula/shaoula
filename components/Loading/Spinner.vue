<script setup lang="ts">
withDefaults(defineProps<{
  size?: 'tiny' | 'sm' | 'md' | 'lg'
  color?: 'dark' | 'info' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'light' | 'white' | 'black'
  border?: 'sm' | 'md' | 'lg'
}>(), {
  size: 'md',
  color: 'light',
  border: 'md',
})
</script>

<template>
  <div
    :class="[
      $style.Spinner,
      $style[`Spinner--size-${size}`],
      $style[`Spinner--color-${color}`],
      $style[`Spinner--border-${border}`],
    ]"
  />
</template>

<style module lang="scss">
.Spinner {
  @apply w-6 h-6 border-2 border-gray-300 border-solid border-opacity-25 rounded-full animate-spin;
  @apply border-r-transparent;

  &--size {
    &-tiny {
      @apply w-2 h-2;
    }
    &-sm {
      @apply w-4 h-4;
    }

    &-md {
      @apply w-6 h-6;
    }

    &-lg {
      @apply w-8 h-8;
    }
  }

  &--color {
    &-dark {
      @apply border-gray-800/75 border-t-transparent;
    }

    &-info {
      @apply border-gray-500 border-t-transparent;
    }

    &-primary {
      @apply border-blue-500/75 border-t-transparent;
    }

    &-success {
      @apply border-teal-500/75 border-t-transparent;
    }

    &-warning {
      @apply border-yellow-500/75 border-t-transparent;
    }

    &-danger {
      @apply border-red-500/75 border-t-transparent;
    }

    &-light {
      @apply border-gray-300/75 border-t-transparent;
    }

    &-white {
      @apply border-white/75 border-t-transparent;
    }

    &-black {
      @apply border-black/75 border-t-transparent;
    }
  }

  &--border {
    &-sm {
      @apply border-1;
    }

    &-md {
      @apply border-2;
    }

    &-lg {
      @apply border-4;
    }
  }
}
</style>
