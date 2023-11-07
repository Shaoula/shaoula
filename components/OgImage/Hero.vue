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
  <div class="h-full w-full flex flex-col bg-gray-100">
    <div class="flex flex-grow flex-col items-center justify-center gap-8">
      <p v-if="eyebrow" class="max-w-xl text-center text-xl font-semibold tracking-wider uppercase text-neutral-500">
        {{ eyebrow }}
      </p>
      <h2 class="max-w-4xl text-center text-4xl font-bold leading-normal text-neutral-900 -text-6xl">
        {{ title }}
      </h2>
      <h5 class="max-w-4xl text-center text-2xl font-medium text-neutral-600">
        {{ subtitle }}
      </h5>
    </div>

    <!-- <div class="flex items-center justify-center">
      <h1 class="text-center text-8xl font-brand">
        Shaoula
      </h1>
    </div> -->
  </div>
</template>
