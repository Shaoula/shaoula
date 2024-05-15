<template>
  <div>
    <NavHeader />
    <main id="main">
      <!-- <Suspense> -->
      <CoreHero v-if="$slots.hero">
        <slot name="hero" />
      </CoreHero>

      <!-- <template #fallback>
          Loading...
        </template> -->
      <!-- </Suspense> -->
      <div :class="$style.main">
        <slot />
      </div>
    </main>
    <NavFooter />
  </div>
</template>

<style lang="scss" module>
.main {
  @apply container grid gap-20 pb-20;
}
</style>
