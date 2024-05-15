<script setup lang="ts">
const toasts = useToasts()
</script>

<template>
  <div>
    <slot />
    <Teleport to="body">
      <div v-if="toasts.toasts.length" :class="$style.Toast__container">
        <ClientOnly>
          <TransitionGroup
            tag="div" appear type="animation" enter-from-class="transform translate-x-full"
            leave-to-class="transform translate-x-full"
            enter-active-class="transition transition-all ease duration-300 "
            leave-active-class="transition transition-all ease duration-300"
            move-class="transition transition-all ease duration-300" :class="[$style.Toast__wrapper]"
          >
            <template v-for="toast in toasts.toasts" :key="toast.id">
              <Toast v-bind="toast" />
            </template>
          </TransitionGroup>
        </ClientOnly>
      </div>
    </Teleport>
  </div>
</template>

<style lang="scss" module>
.Toast {
  &__container {
    @apply fixed inset-0 z-51 pointer-events-none;
  }

  &__wrapper {
    @apply w-1/3 h-full fixed flex flex-col gap-4 top-4 right-4 pointer-events-none;

    &--top-left {
      @apply items-start justify-start top-4 left-4;
    }

    &--top-right {
      @apply items-end justify-start top-4 right-4;
    }

    &--bottom-left {
      @apply items-start justify-end bottom-4 left-4;
    }

    &--bottom-right {
      @apply items-end justify-end bottom-4 right-4;
    }

    &--bottom {
      @apply items-center justify-end bottom-4 inset-x-1/2 transform -translate-x-1/2;
    }

    &--top {
      @apply items-center top-4 inset-x-1/2 transform -translate-x-1/2;
    }
  }
}
</style>
