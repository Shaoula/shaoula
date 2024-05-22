<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
  image?: {
    url: string
    alt?: string
  }
  action?: {
    label?: string
    icon?: string
    iconOnly?: boolean
    href?: string
    onClick?: () => void
  }
  href?: string
  target?: '_blank' | '_self'
  rel?: 'noopener noreferrer'
  clamp?: boolean
}>(), {
  clamp: true,
})

const nuxtLinkComponent = resolveComponent('NuxtLink')
</script>

<template>
  <div :class="$style.Card">
    <slot>
      <div :class="$style.Card__content">
        <div v-if="image" :class="$style.Card__content__image">
          <NuxtImg
            format="webp"
            fit="cover"
            loading="lazy"
            :src="image.url"
            :alt="image.alt"
            placeholder
            quality="100"
            width="natural"
            height="natural"
          />
        </div>
        <component
          :is="href ? nuxtLinkComponent : 'div'"
          :to="href"
          :rel="rel"
          :class="$style.Card__content__header"
        >
          <h4 :class="[$style.Card__content__title, !clamp && $style['Card__content__title--no-clamp']]">
            {{ title }}
          </h4>
        </component>
        <p :class="[$style.Card__content__description, !clamp && $style['Card__content__description--no-clamp']]">
          {{ description }}
        </p>
        <Button
          v-if="action"
          v-bind="action"
          :class="$style.Card__content__action"
        />
      </div>
    </slot>
  </div>
</template>

<style lang="scss" module>
.Card {
  @apply py-8 px-6
    bg-light-50
    border border-neutral-50 rounded shadow

    dark:(bg-dark-9 shadow-none border border-neutral-8);

  &__content {
    @apply flex flex-col gap-4;

    // &__image {
    //   @apply relative
    //   w-full
    //   h-64
    //   rounded-lg
    //   overflow-hidden;

    //   img {
    //     @apply max-w-full max-h-full
    //   }
    // }

    &__image {
      @apply grid place-items-center
        w-full aspect-16/9
        p-4

        dark:ring-neutral-800;

      img {
        @apply max-w-full max-h-full;
      }
    }

    &__title {
      @apply text-lg font-bold text-neutral-700 line-clamp-2

      dark:(text-neutral-300);

      &--no-clamp {
        @apply line-clamp-none;
      }
    }

    &__description {
      @apply text-neutral-500 line-clamp-3

      dark:(text-neutral-400);

      &--no-clamp {
        @apply line-clamp-none;
      }
    }

    &__icon {
      @apply flex items-center justify-center
      w-fit
      p-4
      text-4xl text-neutral-400
      rounded-full
      bg-neutral-100 bg-opacity-10

      dark:(text-neutral-300 bg-neutral-800);
    }

    // &__image {
    //   @apply relative
    //   w-full aspect-21/9
    //   rounded-lg
    //   overflow-hidden
    //   bg-neutral-100 bg-opacity-10

    //   dark:(bg-neutral-800);

    //   img {
    //     @apply absolute inset-0 object-cover
    //     w-full h-full
    //   }
    // }

    &__action {
      @apply w-fit;
    }
  }
}
</style>
