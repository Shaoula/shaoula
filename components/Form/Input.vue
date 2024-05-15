<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'bordered' | 'underlined' | 'light' | 'outlined'
  size?: 'sm' | 'md' | 'lg'
  shape?: 'rounded' | 'pilled'
  label?: string | { label: string, secondaryLabel?: string }
  placeholder?: string
  type?: string
  hint?: string
  disabled?: boolean
  leading?: {
    icon?: string
    avatar?: string
    text?: string
    divider?: boolean
  }
  trailing?: {
    icon?: string
    avatar?: string
    text?: string
    divider?: boolean
  }
  modelValue?: string
  hasError?: boolean
}>(), {
  variant: 'bordered',
  size: 'md',
  shape: 'rounded',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)

defineExpose({
  inputRef,
})

const $style = useCssModule()

const label = computed(() => {
  if (typeof props.label !== 'string' && props.label?.label) {
    return {
      label: props.label.label,
      secondaryLabel: props.label.secondaryLabel,
    }
  }

  return {
    label: props.label,
    secondaryLabel: undefined,
  }
})

// const isDisabled = computed(() => props.disabled)

// const classes = computed(() => ([
//   $style.Input,
//   $style[`Input--${props.variant}`],
//   $style[`Input--size-${props.size}`],
//   $style[`Input--shape-${props.shape}`],
//   props.disabled && $style['Input--disabled'],
// ]))
</script>

<template>
  <div :class="$style.Input">
    <label v-if="label" :class="$style.Input__label">
      <span :class="$style.Input__label__text">
        {{ label.label }}
      </span>
      <span v-if="label.secondaryLabel" :class="$style['Input__label__secondary-text']">
        {{ label.secondaryLabel }}
      </span>
    </label>
    <div
      :class="[$style.Input__inner,
               $style[`Input__inner--${props.variant}`],
               $style[`Input__inner--size-${props.size}`],
               $style[`Input__inner--shape-${props.shape}`],
               { [$style['Input__inner--disabled']]: props.disabled },
               { [$style['Input__inner--error']]: props.hasError },
      ]"
    >
      <div
        v-if="props.leading" :class="[$style.Input__leading, { [$style['Input__leading--divider']]: props.leading.divider }]"
      >
        <template v-if="props.leading.icon">
          <Icon :name="props.leading.icon" />
        </template>
        <!-- <template v-if="props.leading.avatar">
          <Avatar :src="props.leading.avatar" size="xs" shape="circle" />
        </template> -->
        <div v-if="props.leading.text" :class="$style.Input__leading__text">
          {{ props.leading.text }}
        </div>
      </div>
      <input
        v-bind="$attrs"
        ref="inputRef"
        :class="$style.Input__input"
        :placeholder="props.placeholder"
        :type="props.type"
        :disabled="props.disabled"
        :value="props.modelValue"
        @input="(e : Event) => emit('update:modelValue', (e.target as HTMLInputElement).value)"
      >
      <div v-if="props.trailing" :class="[$style.Input__trailing, { [$style['Input__trailing--divider']]: props.trailing.divider }]">
        <div v-if="props.trailing.icon">
          <Icon :name="props.trailing.icon" />
        </div>
        <!-- <div v-if="props.trailing.avatar">
          <Avatar :src="props.trailing.avatar" size="xs" shape="circle" />
        </div> -->
        <div v-if="props.trailing.text" :class="$style.Input__trailing__text">
          {{ props.trailing.text }}
        </div>
        <div v-if="props.trailing.divider" :class="$style.Input__trailing__divider" />
      </div>
    </div>
    <slot name="hint">
      <span v-if="hint" :class="$style.Input__hint">
        {{ hint }}
      </span>
    </slot>
  </div>
</template>

<style module lang="scss">
.Input {
  @apply flex flex-col gap-1;

  &__label {
    @apply flex items-center justify-between;

    &__text {
      @apply text-sm font-medium text-neutral-800
      dark:(text-neutral-400);
    }

    &__secondary-text {
      @apply text-sm font-medium text-neutral-500
      dark:(text-neutral-700);
    }
  }

  &__inner {
    @apply flex items-center flex-grow gap-2
    bg-neutral-100
    text-dark-800
    ring-2 ring-transparent ring-offset ring-offset-neutral-200 ring-offset-opacity-15
    rounded border-none
    // border border-neutral-200 rounded
    shadow-sm
    transition-all duration-200 ease-in-out

    hover:(ring-offset-opacity-25)
    focus-within:(ring-blue-500 ring-opacity-50 ring-offset-opacity-50)

    dark:(bg-neutral-900 text-light-100);

    &--error:not(:focus-within),
    &:focus-within:has(:invalid) {
      @apply ring-2 ring-red-500 ring-opacity-25 border-red-500;
    }

    &--success:not(:focus-within),
    &:focus-within:has(:valid) {
      @apply ring-2 ring-green-500 ring-opacity-25 border-green-500;
    }

    &--disabled {
      @apply bg-neutral-50 text-neutral-300 placeholder-neutral-300
      cursor-not-allowed pointer-events-none;
      /* dark:(bg-gray-700 text-gray-500 placeholder-gray-500) */
    }

    &--outlined {
      @apply ring-offset-opacity-50;
    }

    // &--bordered {
    //   @apply border border-gray-300;
    //   /* dark:(border-gray-700) */;
    // }

    // &--underlined {
    //   @apply border-b border-gray-300;
    //   /* dark:(border-gray-700) */;
    // }

    // &--light {
    //   @apply bg-sky-50
    //   border border-sky-100

    //   hover:(bg-white border-sky-100);
    // }

    &--size {
      &-sm {
        @apply text-sm px-2 py-1;
      }

      &-md {
        @apply text-base px-3 py-2;
      }

      &-lg {
        @apply text-lg px-4 py-2;
      }
    }

    &--shape {
      &-rounded {
        @apply rounded-md;
      }

      &-pilled {
        @apply rounded-full;
      }
    }
  }

  &__leading,
  &__trailing {
    @apply flex items-center
    space-x-2
    text-neutral-400 font-medium;
    /* dark:(text-gray-400) */
  }

  &__leading {
    &--divider {
      @apply border-r border-neutral-200
      pr-2;
      /* dark:(border-gray-700) */
    }
  }

  &__trailing {
    &--divider {
      @apply border-l border-neutral-200
      pl-2;
      /* dark:(border-gray-700) */
    }
  }

  &__input {
    @apply flex-1
    bg-transparent
    text-dark-800
    placeholder-neutral-400
    ring-0 focus:(ring-0 outline-none)

    disabled:(text-neutral-300 placeholder-neutral-300)

    dark:(text-light-100 placeholder-neutral-600);
  }

  &__hint {
    @apply text-xs text-neutral-400
    dark:(text-neutral-500);
  }
}
</style>
