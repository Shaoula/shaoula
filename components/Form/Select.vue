<script setup lang="ts">
const props = defineProps<{
  label?: string | { label: string, secondaryLabel?: string }
  placeholder?: string
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
  //   multiple?: boolean
  //   value?: string | string[]
  options: string[]
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const picked = ref<string>(props.modelValue)

// Watch for changes in the modelValue prop
watch(
  () => props.modelValue,
  (value) => {
    picked.value = value
  },
)

// Watch for changes in the picked value
watch(
  () => picked.value,
  (value) => {
    emit('update:modelValue', value)
  },
)
</script>

<template>
  <div :class="$style.Select">
    <HuiListbox
      v-model="picked"
      as="template"
    >
      <HuiListboxLabel
        v-if="label"
        :class="$style.Select__label"
        as="template"
      >
        <span :class="$style.Select__label__text">{{ label }}</span>
      </HuiListboxLabel>

      <HuiListboxButton
        :class="$style.Select__button"
        :disabled="props.disabled"
        as="template"
      >
        <FormInput
          :value="picked"
          :trailing="{ icon: 'i-mdi-chevron-down' }"
          :placeholder="placeholder"
        />
      </HuiListboxButton>
      <!-- <Transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      > -->
      <HuiListboxOptions
        :class="$style.Select__options"
      >
        <HuiListboxOption
          v-for="item, index in options"
          v-slot="{ selected, active }"
          :key="index"
          :value="item"
          as="template"
        >
          <li
            :class="[
              $style.Select__options__option,
              active ? $style['Select__options__option--active'] : '',
              selected ? $style['Select__options__option--selected'] : '',
            ]"
          >
            <span :class="$style.Select__options__option__text">{{ item }}</span>
            <Icon
              v-if="selected"
              name="i-mdi-check"
              :class="$style.Select__options__option__icon"
            />
          </li>
        </HuiListboxOption>
      </HuiListboxOptions>
      <!-- </Transition> -->
    </HuiListbox>
  </div>
</template>

<style module lang="scss">
.Select {
  @apply flex flex-col items-center
  w-full
  relative
  space-y-2;

  &__label {
    @apply w-full
        text-sm font-semibold text-gray-800;
  }

  &__button {
    @apply w-full;
  }

  &__options {
    @apply absolute top-full left-0
        w-full max-h-60
        z-10 mt-2 p-2
        bg-white
        overflow-y-auto
        border border-gray-200 rounded-md
        shadow-lg;

    &__option {
      @apply flex items-center justify-between
            w-full h-9
            px-3 py-2
            text-sm text-gray-800
            rounded-md
            cursor-pointer;

      &--active {
        @apply bg-gray-100;
      }

      &--selected {
        @apply font-semibold;
      }

      &__text {
        @apply truncate;
      }

      &__icon {
        @apply text-blue-500;
      }
    }
  }
}
</style>
