<script setup lang="ts">
interface Toast {
  id: string
  message: string
  visual?: string
  action?: string
  onAction?: () => void
  undo?: () => void
  status?: 'success' | 'error' | 'warning'
  timeout?: number
  pauseOnFocusLoss?: boolean
  pauseOnHover?: boolean
  hideProgressBar?: false
  closeOnClick?: boolean
  closeButton?: boolean
  placement?: 'top-left' | 'top' | 'top-right' | 'bottom-right' | 'bottom' | 'bottom-left'
}

const props = withDefaults(defineProps<Toast>(), {
// withDefaults(defineProps<Toast>(), {
  // undo: false,
  timeout: 5000,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  hideProgressBar: false,
  closeOnClick: true,
  closeButton: true,
  placement: 'top-right',
})

const emit = defineEmits<{
  (e: 'close', id: string): void
}>()

const toasts = useToasts()

const toastEl = ref()

function close() {
  toasts.close(props.id)
  emit('close', props.id)
}

onMounted(() => {
  if (props.timeout) {
    setTimeout(() => {
      close()
    }, props.timeout)
  }
})
</script>

<template>
  <div ref="toastEl" :class="[$style.Toast, $style[`Toast--${props.status}`]]">
    <div v-if="visual" :class="$style.Toast__visual">
      <NuxtImg
        :src="visual"
        :alt="message"
        placeholder
      />
    </div>
    <div :class="$style.Toast__content">
      <div :class="$style.Toast__message">
        <slot>
          {{ status }}
          {{ message }}
          <Button
            v-if="closeButton && !undo && !action"
            variant="text"
            aria-label="Close"
            size="tiny"
            label="Dismiss"
            :icon-only="!undo || !action"
            @click="close"
          >
            <Icon name="i-ph:x-bold" />
          </Button>
        </slot>
      </div>
      <div
        v-if="action || undo"
        :class="$style.Toast__actions"
      >
        <Button
          v-if="closeButton && (action || !!undo)"
          variant="text"
          aria-label="Close"
          size="sm"
          label="Dismiss"
          @click="close"
        />
        <Button
          v-if="undo"
          variant="text"
          aria-label="Undo"
          size="sm"
          icon-only
          @click="undo"
        >
          <Icon name="i-ph:arrow-counter-clockwise-duotone" />
        </Button>
        <Button
          v-if="action"
          :label="action"
          size="sm"
          @click="(e) => onAction?.()"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.Toast {
    @apply w-full
    p-4
    bg-light-50
    border border-neutral-50 rounded-md shadow
    pointer-events-auto

    dark:(bg-dark-9 shadow-none border border-neutral-8);

  &__visual {
    @apply flex-shrink-0 mr-4
  }

  &__content {
    @apply flex flex-col gap-2
  }

  &__message {
    @apply text-sm
    flex items-center justify-between gap-2
  }

  &__actions {
    @apply flex items-center justify-end gap-2
  }

  &--success {
    @apply bg-blue-5 border-blue-4
    text-blue-1
    dark:(bg-blue-9 border-blue-8);
  }

  &--error {
    @apply bg-rose-6
    text-rose-1
    dark:(bg-red-9 border-red-8);
  }

  &--warning {
    @apply bg-amber-6
    text-amber-1;
  }
}
</style>
