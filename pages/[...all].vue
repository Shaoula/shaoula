<script setup lang="ts">
</script>

<template>
  <NuxtLayout name="base">
    <div class="py-40 flex flex-col items-center justify-center gap-10">
      <div>
        <Icon name="i-ph-warning-bold" class="text-9xl text-neutral-500 dark:text-neutral-400" />
      </div>
      <h1 class="text-9xl font-bold text-white">404</h1>
      <p class="text-lg text-neutral-500 dark:text-neutral-400">The page you are looking for does not exist.</p>
      <div class="flex items-center gap-4">
        <Button label="Services" href="/services" variant="soft" color="accent" size="sm" />
        <Divider vertical />
        <Button label="Portfolio" href="/portfolio" variant="soft" color="accent" size="sm" />
        <Divider vertical />
        <Button label="Contact" href="/contact" variant="soft" color="accent" size="sm" />
      </div>
    </div>
  </NuxtLayout>
</template>
