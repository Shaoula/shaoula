<script setup lang="ts">
useHead({
  titleTemplate: title => title ? `${title} | Shaoula` : 'Shaoula',
})

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    }
  ]
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
html {
  @apply dark:(bg-dark-900 text-neutral-100);
}
</style>
