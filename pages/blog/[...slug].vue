<script setup lang="ts">
import { appName } from '~/constants'

const route = useRoute()

const { data } = await useAsyncData(route.path, () => {
  return queryContent().where({ _path: route.path }).findOne()
})

// defineOgImage({
//   component: 'Hero',
//   eyebrow: `${appName} Blog`,
//   title: data.value?.title ?? 'Blog',
//   subtitle: data.value?.description ?? 'Read the latest news and updates from Shaoula',
// })

useSeoMeta({
  titleTemplate: `%s | ${appName} Blog`,
})

useContentHead(data.value!)

const toc = data.value?.body?.toc?.links ?? []
</script>

<template>
  <NuxtLayout name="base">
    <!-- <template #hero /> -->
    <div :class="$style.Article__container">
      <div
        v-if="toc.length"
        :class="$style.Article__toc__container"
      >
        <div :class="$style.Article__toc">
          <h2 :class="[$style.Article__toc__title]">
            {{ $t('article.toc.title') }}
          </h2>
          <NuxtLink
            v-for="item in toc"
            :key="item.id"
            :to="`#${item.id}`"
            :class="[$style.Article__toc__link]"
          >
            {{ item.text }}
          </NuxtLink>
        </div>
      </div>
      <div>
        <NuxtImg
          v-if="data?.image"
          format="webp"
          fit="cover"
          loading="lazy"
          placeholder
          quality="100"
          :src="data.image.url"
          :alt="data.image.alt"
          :class="[$style.Article__hero]"
        />
        <ContentDoc class="prose" :class="[$style.Article__content]" />
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss">
.prose :where(img, video):not(:where(.not-prose, .not-prose *)) {
  @apply rounded-lg aspect-ratio-21/9 object-cover object-center w-full;
}

.prose :where(h2):not(:where(.not-prose, .not-prose *)) {
  @apply scroll-mt-[4rem];
}
</style>

<style lang="scss" module>
.Article {
  &__hero {
    @apply rounded-lg aspect-ratio-21/9 object-cover object-center
        w-full
        mb-8;
  }

  &__container {
    @apply container
        flex flex-col gap-8
        py-8

        lg:flex-row-reverse;
  }

  &__content {
    @apply max-w-full grow;
  }

  &__toc {
    &__container {
      @apply w-full space-y-1

            lg:(flex:(grow-0 shrink-0 basis-1/4))
            lg:(sticky top-20 h-fit max-w-1/4);
    }

    @apply flex flex-col gap-2;

    &__title {
      @apply text-lg font-bold text-neutral-500;
    }

    &__link {
      @apply w-full
            line-clamp-1 text-neutral-500
            transition-colors duration-200 ease-in-out

            hover:(text-neutral-600 underline)

            dark:text-neutral-600
            dark:hover:text-neutral-500;
    }
  }
}
</style>
