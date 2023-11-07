<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'

import { socials } from '~/constants/nav'

const route = useRoute()

defineOgImage({
  component: 'Hero',
  eyebrow: 'About Us',
  title: 'Crafting Digital Dreams at Shaoula',
  subtitle: 'At Shaoula, we\'re more than just a web agency. We\'re the architects of digital dreams, dedicated to reshaping online experiences and empowering brands to reach new heights.',
})

// const copy = await queryContent('about').findOne()

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = computed(() => !breakpoints.lg.value)

// definePageMeta({
//   title: copy.title,
//   description: copy.description,
//   image: {
//     src: copy.image.src,
//     alt: copy.image.alt,
//   },
// })

const { data } = await useAsyncData(route.path, () => queryContent(route.path).only(['body']).findOne())

const sections = data.value?.body
</script>

<template>
  <NuxtLayout name="base">
    <template #hero>
      <div :class="$style.Hero">
        <p :class="$style.Hero__eyebrow">
          About Us
        </p>
        <h2 :class="$style.Hero__title">
          Crafting Digital Dreams at Shaoula
        </h2>
        <h5 :class="$style.Hero__subtitle">
          At Shaoula, we're more than just a web agency. We're the architects of digital dreams, dedicated to reshaping online experiences and empowering brands to reach new heights.
        </h5>
        <div :class="$style.Hero__actions">
          <p>Follow us on</p>
          <Button
            v-for="social in socials"
            :key="social.icon"
            :href="social.path"
            variant="soft"
            :size="isMobile ? 'md' : 'lg'"
            icon-only
            :aria-label="social.name"
            target="_blank"
          >
            <Icon :name="social.icon ?? 'i-ph-facebook-logo-bold' ?? 'i-ph-linkedin-logo-bold' ?? 'i-ph-twitter-logo-bold' ?? 'i-ph-instagram-logo-bold'" color="text-neutral" />
          </Button>
        </div>
      </div>
    </template>

    <template
      v-for="(section, idx) in sections"
      :key="idx"
    >
      <Divider class="text-neutral-2 dark:text-neutral-8" />

      <section :class="$style.Section">
        <h3 :class="$style.Section__title">
          {{ section.title }}
        </h3>
        <!-- <div :class="$style.Section__content"> -->
        <!-- <div :class="$style.Section__image">
            <NuxtImg
              :src="section.image.url"
              :alt="section.image.alt"
              :class="$style.Section__image"
            />
          </div> -->
        <div :class="$style.Section__description">
          <p>{{ section.description }}</p>
        </div>
        <div v-if="section.cta" class="$style.Section__description__cta">
          <Button
            :size="isMobile ? 'md' : 'lg'"
            target="_blank"
            v-bind="section.cta"
          />
        </div>
        <!-- </div> -->
      </section>
    </template>
  </nuxtlayout>
</template>

<style lang="scss" module>
.Hero{
    @apply flex flex-col items-center justify-center gap-8
    h-full;

    &__eyebrow {
        @apply text-md font-semibold text-neutral-500 text-center  tracking-wider uppercase

        md:(text-lg)
        lg:(text-xl)

        dark:(text-neutral-400);
    }

    &__title {
        @apply text-4xl font-bold text-neutral-900 text-center leading-normal

        md:(text-5xl)
        lg:(text-6xl)

        dark:(text-neutral-100);
        text-wrap: balance;
    }

    &__subtitle {
        @apply text-lg font-medium text-neutral-600 text-center

        md:(text-xl)
        lg:(text-2xl)

        dark:(text-neutral-400);
        text-wrap: balance;
    }

    &__actions {
      @apply flex items-center gap-4
      text-neutral-500

      dark:(text-neutral-400);
    }
}

// .Section {
//     @apply flex flex-col items-center justify-center gap-8
//     py-16;

//     &__title {
//         @apply text-4xl font-bold text-neutral-900 text-center leading-normal
//         dark:(text-neutral-100);
//     }

//     // &__content {
//     //     @apply grid grid-cols-1 md:(grid-cols-2) gap-8 h-full;
//     // }

//     // &__image {
//     //     @apply grid place-items-center
//     //     aspect-4/3
//     //     p-4
//     //     order-first

//     //     md:order-none

//     //     dark:ring-neutral-800;

//     //     img {
//     //         @apply max-w-full max-h-full;
//     //     }
//     // }

//     &__description {
//         @apply flex flex-col flex-grow justify-between gap-12
//         text-xl text-neutral-700 text-center

//         dark:text-neutral-2;
//     }

//     // &:nth-of-type(even) &__description {
//     //     @apply md:(order-first);
//     // }
// }
.Section {
  @apply flex flex-col items-center
  py-10 gap-8;

  &__title {
    @apply text-4xl font-bold text-center text-neutral-700

    lg:(text-5xl)

    dark:(text-neutral-300);
  }

  &__description {
    @apply text-center text-xl font-light text-neutral-500
    max-w-screen-lg

    lg:(text-2xl)

    dark:(text-neutral-400);
  }

  &__content {
    @apply grid grid-cols-1 gap-4

    lg:(grid-cols-2);
  }
}
</style>
