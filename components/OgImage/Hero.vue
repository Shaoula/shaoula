<script setup lang="ts">
// inherited attrs can mess up the satori parser
defineOptions({
  inheritAttrs: false,
})

// defineProps({
//   title: String,
//   subtitle: String,
//   eyebrow: String,
// })

defineProps<{
  title: string
  subtitle: string
  eyebrow?: string
}>()
</script>

<template>
  <div class="h-full w-full flex flex-col bg-gray-100 pt-20">
    <div class="mxa max-w-2xl flex flex-grow flex-col items-center justify-center gap-8 container">
      <p v-if="eyebrow" class="max-w-xl text-center text-xl text-neutral-500 font-semibold tracking-wider uppercase">
        {{ eyebrow }}
      </p>
      <h2 class="text-center text-balance text-5xl text-neutral-900 font-bold leading-normal">
        {{ title }}
      </h2>
      <h5 class="text-center text-2xl font-medium">
        {{ subtitle }}
      </h5>
      <Logo height="100" class="mta" />
    </div>

    <!-- <div class="flex items-center justify-center">
      <h1 class="text-center text-8xl font-brand">
        Shaoula
      </h1>
    </div> -->
  </div>
</template>
