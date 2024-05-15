<script setup lang="ts">
import { appName } from '~/constants'

const { path } = useRoute()

const { data } = await useAsyncData(`content-${path}`, () => {
  return queryContent().where({ _path: path }).findOne()
})

const toc = data.value?.body.toc.links

definePageMeta({
  layout: 'base',
})

useContentHead(data)

useHead({
  titleTemplate: `%s | ${appName} Blog`,
  // meta: [
  //   {
  //     name: 'twitter:title',
  //     content: `${data.value?.title} | ${appName} Blog`,
  //   },
  //   {
  //     name: 'og:title',
  //     content: `${data.value?.title} | ${appName} Blog`,
  //   },
  //   {
  //     name: 'og:description',
  //     content: data.value?.description,
  //   },
  //   {
  //     name: 'og:image',
  //     content: data.value?.image.src,
  //   },
  //   {
  //     name: 'og:url',
  //     content: `${appUrl}${path}`,
  //   },
  //   {
  //     name: 'og:type',
  //     content: 'article',
  //   },
  //   {
  //     name: 'twitter:description',
  //     content: data.value?.description,
  //   },
  //   {
  //     name: 'twitter:image',
  //     content: data.value?.image.src,
  //   },
  //   {
  //     name: 'twitter:image:alt',
  //     content: data.value?.image.alt,
  //   },
  //   {
  //     name: 'twitter:domain',
  //     content: 'daxtil.com',
  //   },
  //   {
  //     name: 'twitter:url',
  //     content: `${appUrl}${path}`,
  //   },
  // ],
})

// const breadcrumbs = data.value?._path.split('/').filter((item: string) => item !== '').map((item: string, index: number, array: string[]) => {
//   // Add a slash to the beginning of the array
//   const to = `/${array.slice(0, index + 1).join('/')}`
//   return {
//     label: item.replace(/-/g, ' ').replace(/\w\S*/g, (txt: string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
//     to,
//   }
// })
</script>

<template>
  <main class="container space-y-4">
    <!-- <NavBreadcrumb :breadcrumbs="breadcrumbs" /> -->
    <div class="flex flex-col gap-8 lg:flex-row-reverse">
      <div
        v-if="toc.length" class="lg:flex(grow-0 shrink-0 basis-1/4) lg:(sticky top-20 h-fit max-w-1/4) space-y-1"
      >
        <div class="flex flex-col space-y-2">
          <h2 class="text-lg text-gray-500 font-bold">
            Table of Contents
          </h2>
          <NuxtLink
            v-for="item in toc" :key="item.id" :to="`#${item.id}`" class="line-clamp-1 text-gray-500 transition-colors duration-200 ease-in-out dark:text-gray-700 hover:text-gray-600 hover:underline dark:hover:text-gray-800"
          >
            {{ item.text }}
          </NuxtLink>
        </div>
      </div>
      <ContentDoc class="max-w-full grow prose" />
    </div>
    <!-- <div class="flex flex-col space-y-4">
        <h2 class="text-2xl font-bold">
          Related Posts
        </h2>
        <NavRelated />
      </div> -->
  </main>
</template>

<style lang="scss">
.prose :where(img, video):not(:where(.not-prose, .not-prose *)) {
  @apply rounded-lg aspect-ratio-21/9 object-cover object-center w-full;
}

.prose :where(h2):not(:where(.not-prose, .not-prose *)) {
  @apply scroll-mt-[4rem];
}
</style>
