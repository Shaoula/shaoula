<script setup lang="ts">
import { useCssModule } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

const props = withDefaults(defineProps<{
  href?: string | RouteLocationRaw
  /* variant?: 'ghost' | 'outline' | 'soft' | 'solid' | 'link' | 'white' */
  variant?: 'contained' | 'outlined' | 'soft' | 'text'
  /* color?: 'dark' | 'info' | 'success' | 'primary' | 'danger' | 'warning' | 'light' */
  color?: 'default' | 'primary' | 'accent' | 'danger'
  size?: 'tiny' | 'sm' | 'md' | 'lg' // 24px | 32px | 40px | 48px
  disabled?: boolean
  /* rounded?: 'sm' | 'md' | 'lg' | 'full' */
  shape?: 'rounded' | 'pilled' | 'circle' | 'square'

  leading?: {
    icon?: string
    text?: string
    divider?: boolean
  }
  // leadingIcon?: string
  // leadingAvatar?: string
  // leadingDivider?: boolean
  placeholder?: string
  label?: string
  trailing?: {
    icon?: string
    text?: string
    divider?: boolean
  }
  // trailingIcon?: string
  // trailingAvatar?: string
  // trailingDivider?: boolean
  loading?: boolean
  loadingText?: string
  iconOnly?: boolean
  // badge?: string | BadgeProps
}>(), {
  // variant: 'solid',
  variant: 'contained',
  // color: 'primary',
  color: 'default',
  size: 'md',
  disabled: false,
  loading: false,
  // rounded: 'md',
  // shape: 'rounded',
  iconOnly: false,
})

const $style = useCssModule()
// console.log('props', props)

// const componentType = computed(() => (props.href ? 'NuxtLink' : 'button'))
const componentType = computed(() => (props.href ? resolveComponent('NuxtLink') : 'button'))
// const color = computed(() => (props.href ? 'link' : props.color))
const isDisabled = computed(() => (props.disabled || props.loading))
const isLoading = computed(() => props.loading)

const classes = computed(() => ([
  $style.Button,
  $style[`Button--v-${props.variant}`],
  $style[`Button--color-${props.color}`],
  $style[`Button--size-${props.size}`],
  $style[`Button--shape-${props.shape}`],
  // { [$style['Button--icon-only']]: props.iconOnly },
  props.iconOnly && $style['Button--icon-only'],
]))

const linkProps = computed(() => (props.href ? { to: props.href, activeClass: 'activePage', exactActiveClass: 'exactPage' } : {}))
</script>

<template>
  <component :is="componentType" :class="classes" v-bind="linkProps" :disabled="isDisabled">
    <template v-if="!isLoading">
      <slot name="leading">
        <slot name="leading-icon">
          <template v-if="leading?.icon">
            <Icon :name="leading.icon" />
          </template>
        </slot>
        <slot name="leading-divider">
          <template v-if="leading?.divider">
            <Divider vertical />
          </template>
        </slot>
      </slot>
      <slot>
        <span v-if="placeholder || label" :class="$style.Button__placeholder">
          {{ placeholder || label }}
        </span>
      </slot>
      <slot name="trailing">
        <slot name="trailing-divider">
          <template v-if="trailing?.divider">
            <Divider vertical />
          </template>
        </slot>
        <slot name="trailing-icon">
          <template v-if="trailing?.icon">
            <Icon :name="trailing.icon" />
          </template>
        </slot>
      </slot>
    </template>
    <template v-else>
      <LoadingSpinner :size="size" />
      <span v-if="loadingText && !iconOnly" :class="$style.Button__placeholder">
        {{ loadingText }}
      </span>
    </template>
  </component>
</template>

<style module lang="scss">
.Button {
    @apply flex items-center gap-2 px-3 cursor-pointer rounded-sm transition-all duration-200;

    &:focus {
        @apply ring-2 ring-blue outline-none ring-offset;
    }

    /* Hovering while focused */
    &:focus:hover {
        @apply ring-offset ring-offset-[var(--border-color)];
    }

    &--size {
        &-tiny {
            @apply h-6 text-xs;

            &.Button--icon-only {
                @apply w-6;

                &>* {
                    @apply text-xs;
                }
            }
        }

        &-sm {
            @apply h-8 text-sm;

            &.Button--icon-only {
                @apply w-8;

                &>* {
                    @apply text-sm;
                }
            }
        }

        &-md {
            @apply h-10;

            &.Button--icon-only {
                @apply w-10;
            }
        }

        &-lg {
            @apply h-12 text-lg;

            &.Button--icon-only {
                @apply w-12;

                &>* {
                    @apply text-lg;
                }
            }
        }
    }

    &--shape {
        &-rounded {
            @apply rounded;
        }

        &-pill {
            @apply rounded-lg;
        }

        &-circle {
            @apply rounded-full;
        }

        &-none {
            @apply rounded-none;
        }
    }

    &--v {
        &-contained {
            @apply bg-[var(--bg-color)] text-[var(--text-color)];

            &:hover {
                @apply bg-[var(--bg-color-hover)] ring ring-[var(--border-color)];
            }

            &[aria-current="page"] {
                @apply bg-[var(--bg-color-active)];
            }
        }

        &-outlined {
            @apply bg-transparent text-[var(--bg-color)] border border-[var(--border-color)];

            /* hover:(bg-[var(--bg-color-hover)] text-[var(--text-color-hover)]); */
            &:hover {
                @apply text-[var(--bg-color-hover)] border-[var(--bg-color)];
            }

            &[aria-current="page"] {
                @apply text-[var(--bg-color-active)] border-[var(--bg-color-active)];
            }
        }

        &-soft {
            @apply bg-transparent text-[var(--bg-color)] hover: (bg-[var(--border-color)]);

            &[aria-current="page"] {
                @apply bg-[var(--border-color)];
            }
        }

        &-text {
            @apply bg-transparent text-[var(--bg-color)];

            &:hover {
                @apply text-[var(--bg-color-hover)];
            }

            &:active {
                @apply text-[var(--bg-color-active)];
            }
        }
    }

    &--color {
        &-default {
            /* Default */
            --bg-color: theme('colors.neutral.900');
            --text-color: theme('colors.light.100');
            --border-color: theme('colors.neutral.200');
            /* Hover */
            --bg-color-hover: theme('colors.neutral.800');
            --text-color-hover: theme('colors.blue.500');
            /* Active */
            --bg-color-active: theme('colors.neutral.700');

            /* Dark */
            @media (prefers-color-scheme: dark) {
                /* Defaukt */
                --bg-color: theme('colors.neutral.100');
                --text-color: theme('colors.dark.800');
                --border-color: theme('colors.neutral.200');
                /* Hover */
                --bg-color-hover: theme('colors.neutral.200');
                --text-color-hover: theme('colors.blue.500');
                /* Active */
                --bg-color-active: theme('colors.neutral.300');
            }
        }

        // &-primary {
        //     /* Default */
        //     --bg-color: theme('colors.primary.500');
        //     --text-color: theme('colors.white');
        //     --border-color: theme('colors.primary.200');
        //     /* Hover */
        //     --bg-color-hover: theme('colors.primary.600');
        //     --text-color-hover: theme('colors.white');
        //     /* Active */
        //     --bg-color-active: theme('colors.primary.700');
        // }

        &-accent {
            /* Default */
            --bg-color: theme('colors.teal.500');
            --text-color: theme('colors.white');
            --border-color: theme('colors.teal.200');
            /* Hover */
            --bg-color-hover: theme('colors.teal.600');
            --text-color-hover: theme('colors.white');
            /* Active */
            --bg-color-active: theme('colors.teal.700');
        }

        &-danger {
            /* Default */
            --bg-color: theme('colors.red.500');
            --text-color: theme('colors.white');
            --border-color: theme('colors.red.200');
            /* Hover */
            --bg-color-hover: theme('colors.red.600');
            --text-color-hover: theme('colors.white');
            /* Active */
            --bg-color-active: theme('colors.red.700');
        }
    }

    &--icon-only {
        @apply aspect-square p-0 items-center justify-center;
    }

    &:disabled {
      @apply opacity-40 cursor-not-allowed;
    }
}
</style>
