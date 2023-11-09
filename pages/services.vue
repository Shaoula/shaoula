<script setup lang="ts">
const route = useRoute()

defineOgImage({
  component: 'Hero',
  eyebrow: 'Our Services',
  title: 'Crafting Digital Brilliance: Your Success, Our Expertise',
  subtitle: 'Welcome to Shaoula\'s comprehensive range of services. Explore the services we offer to see how we can help you succeed in the digital landscape.',
})

useSeoMeta({
  title: 'Explore Our Offerings',
  description: 'Explore our digital toolkit that includes web design, branding, marketing, and more. Let\'s shape your digital success story together.',
})

const services = await queryContent('services/')
  .only(['title', 'description'])
  .sort({ order: 1 })
  .find()

// const sections = await queryContent('services')
//   .only(['title', 'description', 'cta'])
//   .findOne()

const { data } = await useAsyncData(route.path, () => queryContent(route.path).only(['body']).findOne())

const sections = data.value?.body
</script>

<template>
  <NuxtLayout name="base">
    <template #hero>
      <div :class="$style.Hero">
        <p :class="$style.Hero__eyebrow">
          Our Services
        </p>
        <h2 :class="$style.Hero__title">
          Crafting Digital Brilliance:
          Your Success, Our Expertise
        </h2>
        <h5 :class="$style.Hero__subtitle">
          Welcome to Shaoula's comprehensive range of services. Explore the services we offer to see how we can help you succeed in the digital landscape.
        </h5>
      </div>
    </template>

    <div :class="$style.Services">
      <Card
        v-for="service in services"
        :key="service.slug"
        :class="$style.Services__card"
        v-bind="service"
        :clamp="false"
      />
      <Card
        title="Get a Free Quote"
        description="Get a qoute and empower your business now!"
        :action="{
          label: 'Get a Free Quote',
          href: '/contact',
        }"
        href="/contact"
        class="col-span-full"
      />
    </div>

    <section
      v-for="(section, idx) in sections"
      :key="idx"
      :class="$style.Section"
    >
      <h3 :class="$style.Section__title">
        {{ section.title }}
      </h3>
      <h4 :class="$style.Section__description">
        {{ section.description }}
      </h4>
      <Button
        v-if="section.cta"
        v-bind="section.cta"
      />
    </section>
  </NuxtLayout>
</template>

<style lang="scss" module>
.Hero {
  @apply flex flex-col items-center justify-center gap-8 h-full;

  &__eyebrow {
    @apply text-md font-semibold text-neutral-500 text-center tracking-wider uppercase

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
    @apply text-lg font-medium text-neutral-600 text-center dark:(text-neutral-400)

    md:(text-xl)
    lg:(text-2xl);
    text-wrap: balance;
  }
}

.Services {
  @apply container
  grid grid-cols-1 gap-x-4 gap-y-6
  my-4

  md:(grid-cols-2)
  lg:(grid-cols-3);

  &__card {
    @apply flex flex-col gap-4;

    &__title {
      @apply text-lg font-bold text-neutral-700 line-clamp-2

      dark:(text-neutral-300);
    }

    &__description {
      @apply text-neutral-500 line-clamp-3

      dark:(text-neutral-400);
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

    &__image {
      @apply relative
      w-full aspect-21/9
      rounded-lg
      overflow-hidden
      bg-neutral-100 bg-opacity-10

      dark:(bg-neutral-800);

      img {
        @apply absolute inset-0 object-cover
        w-full h-full
      }
    }
  }
}

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
