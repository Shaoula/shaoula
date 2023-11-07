<script setup lang="ts">
withDefaults(defineProps<{
  name: string
  size?: number | string
  color?: string
  collection?: string
}>(), {
  size: 'md',
  color: 'currentColor',
  collection: 'ph',
})
</script>

<template>
  <slot>
    <i
      :class="[
        $style.Icon,
        `${name}`,
        $style[`Icon--size-${size}`],
        color,
      ]"
    />
  </slot>
</template>

<style module lang='scss'>
.Icon {
    @apply inline-block;

    &--size {
        &-xs {
            @apply text-xs;
        }

        &-sm {
            @apply text-sm;
        }

        &-md {
            @apply text-base;
        }

        &-lg {
            @apply text-lg;
        }

        &-xl {
            @apply text-xl;
        }

        &-2xl {
            @apply text-2xl;
        }

        &-3xl {
            @apply text-3xl;
        }

        &-4xl {
            @apply text-4xl;
        }

        &-5xl {
            @apply text-5xl;
        }

        &-6xl {
            @apply text-6xl;
        }

        &-7xl {
            @apply text-7xl;
        }

        &-8xl {
            @apply text-8xl;
        }

        &-9xl {
            @apply text-9xl;
        }
    }
}
</style>
