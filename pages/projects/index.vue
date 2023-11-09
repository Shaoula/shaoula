<script setup lang="ts">
defineOgImage({
  component: 'Hero',
  eyebrow: 'Projects',
  title: 'Where Creativity Meets Excellence.',
  subtitle: 'Explore our diverse range of design, development, and marketing endeavors, and discover how Shaoula transforms ideas into extraordinary digital experiences.',
})

useSeoMeta({
  title: 'Our Creative Showcase',
  description: 'Dive into our creative universe and witness the projects that define us. Each work is a testament to our commitment to excellence.',
})
</script>

<template>
  <NuxtLayout name="base">
    <template #hero>
      <div :class="$style.Hero">
        <p :class="$style.Hero__eyebrow">
          Projects
        </p>
        <h2 :class="$style.Hero__title">
          Where Creativity Meets Excellence.
        </h2>
        <h5 :class="$style.Hero__subtitle">
          Explore our diverse range of design, development, and marketing endeavors, and discover how Shaoula transforms ideas into extraordinary digital experiences.
          <!-- Join us on a journey where creativity knows no bounds, and where your vision becomes our masterpiece. -->
        </h5>
      </div>
    </template>

    <ContentList v-slot="{ list: sections }" path="/portfolios" :only="['title', 'image', 'description', 'slug', 'achievements']">
      <template
        v-for="(section, index) in sections"
        :key="section.slug"
      >
        <Divider v-if="index !== 0" class="text-neutral-2 dark:text-neutral-8" />

        <section :class="$style.Section">
          <h3 :class="$style.Section__title">
            {{ section.title }}
          </h3>
          <div :class="$style.Section__content">
            <div :class="$style.Section__image">
              <NuxtImg
                :src="section.image.url"
                :alt="section.image.alt"
                :class="$style.Section__image"
              />
            </div>
            <div :class="$style.Section__description">
              <p>{{ section.description }}</p>
              <div v-if="section.achievements" class="$style.Section__description__achievements">
                <h4 :class="$style.Section__description__achievements__title">
                  We achieved
                </h4>
                <ul :class="$style.Section__description__achievements__list">
                  <li
                    v-for="(achievement, idx) in section.achievements"
                    :key="idx"
                    :class="$style.Section__description__achievements__list__item"
                  >
                    {{ achievement }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </template>
    </ContentList>
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
    }

    &__subtitle {
        @apply text-lg font-medium text-neutral-600 text-center

        md:(text-xl)
        lg:(text-2xl)

        dark:(text-neutral-400);
        text-wrap: balance;
    }

    &__actions {
        @apply flex flex-col items-center gap-4 text-neutral-500 md:(flex-row) dark:(text-neutral-400);
    }
}

.Section {
    @apply flex flex-col items-center justify-center gap-8
    py-16;

    &__title {
        @apply text-4xl font-bold text-neutral-900 text-center leading-normal
        dark:(text-neutral-100);
    }

    &__content {
        // @apply flex items-center gap-8 h-full;
        @apply grid grid-cols-1 md:(grid-cols-2) gap-8 h-full;

        // & > * {
        //     @apply flex-grow flex-shrink-0;
        // }

        &:nth-child(even) {
            @apply grid-flow-row-dense;
        }
    }

    &__image {
        @apply grid place-items-center
        aspect-4/3
        p-4
        order-first

        md:order-none

        dark:ring-neutral-800;

        img {
            @apply max-w-full max-h-full;
        }
    }

    &__description {
        @apply flex flex-col flex-grow justify-between gap-12
        text-xl text-neutral-700

        dark:text-neutral-2;

        &__achievements {
          &__title {
            @apply text-lg font-semibold text-neutral-700 dark:(text-neutral-300);
          }

          &__list {
            @apply flex flex-col gap-2;
          }

          &__list__item {
            @apply text-base text-neutral-600 dark:(text-neutral-400);

            &::before {
              @apply text-neutral-500 dark:(text-neutral-500);
              content: '•';
              margin-right: 0.5rem;
            }
          }
        }
    }

    &:nth-of-type(even) &__description {
        @apply md:order-first;
    }
}
</style>
