<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'

const route = useRoute()

const { t } = useI18n()
const localePath = useLocalePath()

// defineOgImageScreenshot({
//   delay: 1000,
// })

defineOgImage({
  component: 'Hero',
  props: {
    title: t('home.hero.title'),
    subtitle: t('home.hero.subtitle'),
  },
})

useSeoMeta({
  title: t('home.seo.title'),
  description: t('home.seo.description'),

  // Open Graph
  ogTitle: t('home.seo.title'),
  ogType: 'website',
  ogImage: '/__og-image__/image' + route.fullPath + '/og.png',
  ogImageAlt: t('home.seo.title'),

  // Twitter Card
  twitterTitle: t('home.seo.title'),
  twitterDescription: t('home.seo.description'),
  twitterImage: '/__og-image__/image' + route.fullPath + '/og.png',
  twitterImageAlt: t('home.seo.title'),
})

// const services = await queryContent('services'
// {
//   fields: ['title', 'description', 'icon', 'slug'],
//   // filter: {
//   //   fields: {
//   //     slug: {
//   //       ne: 'home',
//   //     },
//   //   },
//   // },
//   // limit: 3,
//   sort: 'sys.createdAt',
//   order: 'asc',
// }
// )

const services = await queryContent(`${localePath('/services')}/`)
  .only(['title', 'description', 'icon', 'slug'])
  .sort({ order: 1 })
  .find()

const portfolios = await queryContent(localePath('/projects'))
  .only(['title', 'description', 'image', 'slug'])
  .limit(3)
  .find()

const testimonials = await queryContent(localePath('/testimonials'))
  .only(['name', 'title', 'text', 'image'])
  .sort({ order: 1 })
  .find()

const blogs = await queryContent(localePath('blog'))
  .only(['title', 'description', 'image', 'slug'])
  // .sort({ order: 1 })
  .limit(3)
  .find()

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = computed(() => !breakpoints.lg.value)
</script>

<template>
  <NuxtLayout name="base">
    <template #hero>
      <div :class="$style.Hero">
        <!-- <p :class="$style.Hero__eyebrow">
          Welcome to Shaoula
        </p> -->
        <h1 :class="$style.Hero__title" :aria-label="$t('home.hero.title')">
          <span v-for="text in $t('home.hero.title').split(' ')" :key="text" :data-text="text">
            {{ text }}
          </span>
        </h1>
        <!-- <h1 :class="$style.Hero__title">
          <span data-text="Crafting Digital Excellence.">Crafting Digital Excellence.</span>
        </h1> -->
        <h2 :class="$style.Hero__subtitle">
          {{ $t('home.hero.subtitle') }}
        </h2>
        <div :class="$style.Hero__actions">
          <Button variant="contained" :size="isMobile ? 'md' : 'lg'" :href="localePath('/services')">
            {{ $t('home.hero.actions.explore') }}
          </Button>
          <Button :size="isMobile ? 'md' : 'lg'" variant="outlined" :href="localePath('/contact')">
            {{ $t('home.hero.actions.contact') }}
          </Button>
        </div>
        <!-- <div flex flex-col items-center gap-4>
          <Button
            href="/clients"
            variant="text"
            size="sm"
            text-neutral-500
          >
            TRUSTED BY
          </Button>
          <div flex flex-wrap gap-6>
            <Logo h-8 />
            <Logo h-8 />
            <Logo h-8 />
            <Logo h-8 />
          </div>
        </div> -->
      </div>
    </template>
    <!-- <section :class="$style.Hero">
    <h1 :class="$style.Hero__title">
      <span data-text="Innovate.">Innovate.</span>
      <span data-text="Design.">Design.</span>
      <span data-text="Inspire.">Inspire.</span>
    </h1>
    <h2 :class="$style.Hero__subtitle">
      Welcome to Shaoula, where imagination meets expertise.
      We craft web solutions that make your brand shine online.
      Join us in turning ideas into digital success stories.
    </h2>
    <div flex gap-8>
      <Button
        variant="contained"
        :size="isMobile ? 'md' : 'lg'"
      >
        Explore Our Services
      </Button>
      <Button
        :size="isMobile ? 'md' : 'lg'"
        variant="outlined"
      >
        Get In Touch
      </Button>
    </div>
    <div flex flex-col items-center gap-4>
      <Button
        href="/clients"
        variant="text"
        size="sm"
        text-neutral-500
      >
        TRUSTED BY
      </Button>
      <div flex flex-wrap gap-6>
        <Logo h-8 />
        <Logo h-8 />
        <Logo h-8 />
        <Logo h-8 />
      </div>
    </div>
  </section> -->

    <!-- Services -->
    <section :class="$style.Section">
      <h3 :class="$style.Section__title">
        {{ $t('home.services.title') }}
      </h3>
      <h4 :class="$style.Section__subtitle">
        {{ $t('home.services.subtitle') }}
      </h4>
      <div :class="$style.Section__content">
        <Card v-for="service in services" :key="service.slug" :class="$style.Section__card" v-bind="service" />
        <!-- <Card
          v-for="service in services"
          :key="service.slug"
          :class="$style.Section__card"
        >
          <Button
            variant="text"
            :href="`/services/${service.slug}`"
            :class="$style.Service__card__header"
          >
            <h5 :class="$style.Section__card__title">
              {{ service.title }}
            </h5>
            <Icon name="i-ph:arrow-right-bold" />
          </Button>
          <p :class="$style.Section__card__description">
            {{ service.description }}
          </p>
        </Card> -->
      </div>
      <Button
        variant="soft" :size="isMobile ? 'md' : 'lg'" :href="localePath('/services')"
        :label="$t('home.services.button')" :trailing="{ icon: 'i-ph:arrow-right' }"
      />
      <!-- <div :class="$style.Section__content">
      <Card>
        <Icon name="i-ph:paint-brush-bold" size="xl" />
        <h5>Web Design Beyond Ordinary</h5>
        <p>Elevate your digital presence with captivating web designs that seamlessly blend aesthetics and functionality. Our designs not only engage users but also drive conversions, leaving a lasting impression on your audience.</p>
      </Card>
      <Card>
        <Icon name="i-ph:shopping-cart-bold" size="xl" />
        <h5>Innovative Development Solutions</h5>
        <p>From intricate e-commerce platforms to dynamic web applications, our in-house development team brings your digital dreams to life. With a focus on user experience and cutting-edge technology, we create solutions that deliver exceptional results.</p>
      </Card>
      <Card>
        <Icon name="i-ph:rocket-launch-bold" size="xl" />
        <h5>Strategic SEO and Digital Marketing</h5>
        <p>Maximize your online visibility with our strategic SEO and digital marketing expertise. We tailor data-driven strategies to boost your rankings, increase traffic, and convert visitors into loyal customers.</p>
      </Card>
      <Card>
        <Icon name="i-ph:globe-simple-bold" size="xl" />
        <h5>Responsive Mobile Solutions</h5>
        <p>In a mobile-centric world, we ensure your web presence is flawless across devices. Our responsive designs guarantee seamless experiences, allowing your audience to engage effortlessly with your brand on any screen.</p>
      </Card>
      <Card>
        <Icon name="i-ph:robot-bold" size="xl" />
        <h5>Engaging Content Creation</h5>
        <p>Compelling content is the heart of online success. Our creative storytellers craft meaningful narratives that resonate with your audience, driving engagement, and establishing your brand's authority.</p>
      </Card>
      <Card>
        <Icon name="i-ph:palette-bold" size="xl" />
        <h5>Engaging Content Creation</h5>
        <p>Compelling content is the heart of online success. Our creative storytellers craft meaningful narratives that resonate with your audience, driving engagement, and establishing your brand's authority.</p>
        <Button
          variant="text"
          size="sm"
          href="/services"
          label="Learn More"
          :trailing="{ icon: 'i-ph:arrow-right' }"
        />
      </Card>
    </div> -->
    </section>

    <!-- Portfolio -->
    <section :class="$style.Section">
      <h3 :class="$style.Section__title">
        {{ $t('home.portfolio.title') }}
      </h3>
      <h4 :class="$style.Section__subtitle">
        {{ $t('home.portfolio.subtitle') }}
        <!-- Unlock a world of possibilities with our comprehensive range of services. From visionary design to cutting-edge
        development, our solutions are tailored to elevate your brand's online presence. -->
      </h4>
      <div :class="$style.Section__content">
        <Card v-for="portfolio in portfolios" :key="portfolio.slug" v-bind="portfolio" />
      </div>
      <Button
        variant="soft" :size="isMobile ? 'md' : 'lg'" :href="localePath('/projects')"
        :label="$t('home.portfolio.button')" :trailing="{ icon: 'i-ph:arrow-right' }"
      />
    </section>

    <!-- Testimonials -->
    <section :class="$style.Section">
      <h3 :class="$style.Section__title">
        {{ $t('home.testimonials.title') }}
      </h3>
      <!-- <h4 :class="$style.Section__subtitle">
        Discover the real impact of our work through the words of our valued clients. These testimonials showcase the success stories and experiences of those who have partnered with Shaoula. We take pride in turning your vision into reality, and their words are a testament to our commitment to excellence.
      </h4> -->
      <div :class="$style.Section__content">
        <Card
          v-for="(testimonial, idx) in testimonials" :key="idx"
          :class="[$style.Section__card, $style.Testimonial__card]"
        >
          <div :class="$style.Testimonial__card__header">
            <div :class="$style.Testimonial__card__header__image">
              <NuxtImg
                format="webp" fit="cover" loading="lazy" :src="testimonial.image.url"
                :alt="testimonial.image.alt" placeholder quality="100" width="40" height="40"
              />
            </div>
            <div :class="$style.Testimonial__card__header__info">
              <span :class="$style.Testimonial__card__header__info__name">
                {{ testimonial.name }}
              </span>
              <p :class="$style.Testimonial__card__header__info__title">
                {{ testimonial.title }}
              </p>
            </div>
          </div>
          <div :class="$style.Testimonial__card__description">
            <Icon name="i-ph-quotes-bold" />
            <p>
              {{ testimonial.text }}
            </p>
            <Icon name="i-ph-quotes-bold" />
          </div>
        </Card>
      </div>
    </section>

    <!-- Team -->
    <section :class="$style.Section">
      <h3 :class="$style.Section__title">
        {{ $t('home.team.title') }}
      </h3>
      <h4 :class="$style.Section__subtitle">
        {{ $t('home.team.subtitle') }}}
      </h4>
      <Button
        variant="soft" :size="isMobile ? 'md' : 'lg'" :href="localePath('/about')" :label="$t('home.team.button')"
        :trailing="{ icon: 'i-ph:arrow-right' }"
      />
    </section>

    <!-- Blog -->
    <section :class="$style.Section">
      <h3 :class="$style.Section__title">
        {{ $t('home.blog.title') }}
      </h3>
      <h4 :class="$style.Section__subtitle">
        {{ $t('home.blog.subtitle') }}
      </h4>
      <div :class="$style.Section__content">
        <Card v-for="blog in blogs" :key="blog.slug" :class="$style.Section__card">
          <div :class="$style.Section__card__image">
            <NuxtLink :to="localePath(`/blog/${blog.slug}`)">
              <NuxtImg
                format="webp" fit="cover" loading="lazy" :src="blog.image.url" :alt="blog.image.alt" placeholder
                quality="100" width="natural" height="natural"
              />
            </NuxtLink>
          </div>
          <NuxtLink :to="localePath(`/blog/${blog.slug}`)">
            <h5 :class="$style.Section__card__title">
              {{ blog.title }}
            </h5>
          </NuxtLink>

          <p :class="$style.Section__card__description">
            {{ blog.description }}
          </p>
        </Card>
      </div>
      <Button
        variant="soft" :size="isMobile ? 'md' : 'lg'" :href="localePath('/blog')" :label="$t('home.blog.button')"
        :trailing="{ icon: 'i-ph:arrow-right' }"
      />
    </section>
  </NuxtLayout>
</template>

<style module lang="scss">
.Hero {
  @apply flex flex-col items-center gap-8;

  // &__eyebrow {
  //   @apply text-center font-medium text-neutral-400

  //   dark:(text-neutral-700);
  // }

  &__title {
    @apply flex items-center justify-center flex-wrap gap-4 text-center // lg:(flex-row gap-4)

    dark:(text-neutral-700);

    span {
      // --gradient-color-1: hsl(325, 100%, 45%);
      // --gradient-color-2: hsl(202, 86%, 69%);
      // --gradient-color-3: #7038ff;
      // --gradient-color-4: #c9c9c9;
      // --gradient-color-1: #0061ff;
      // --gradient-color-2: #0278d8;
      // --gradient-color-3: #F11712;
      // --gradient-color-4: #f89b29;

      --start-color-1: #0061ff;
      --end-color-1: #60efff;
      --start-color-2: #c81d77;
      --end-color-2: #6710c2;
      --start-color-3: #f11712;
      --end-color-3: #f89b29;

      @apply relative text-6xl font-bold text-neutral-400 leading-tight tracking-wide md:(text-7xl leading-snug) lg:(text-8xl leading-snug);

      // &:is(.active) {
      //   @apply text-neutral-900

      //   dark:(text-neutral-100);
      // }

      // &.active {
      //   @apply bg-gradient-to-tr from-neutral-900 to-neutral-600 bg-clip-text text-transparent

      //   dark:(bg-gradient-to-tr from-neutral-100 to-neutral-400 bg-clip-text text-transparent);
      // }

      @for $i from 1 through 3 {
        &:nth-child(#{$i}) {
          @apply relative;
          // animation: glow 5s ease-in-out infinite;

          &::after {
            content: attr(data-text);
            @apply absolute inset-0 opacity-100 bg-clip-text text-transparent w-full h-full;

            animation: animated-gradient-title-#{$i} 12s ease-in-out infinite;
            background-image: linear-gradient(
              90deg,
              var(--start-color-#{$i}),
              var(--end-color-#{$i})
            );
          }
        }
      }
    }
  }

  &__subtitle {
    @apply text-center text-lg text-neutral-600 max-w-screen-md dark:(text-neutral-400) md:(text-xl) lg:(text-2xl);
  }

  &__actions {
    @apply flex flex-col items-center gap-4 md:(flex-row);
  }
}

.Section {
  @apply flex flex-col items-center py-10 gap-8;

  &__title {
    @apply text-4xl font-bold text-center text-neutral-700 lg:(text-5xl) dark:(text-neutral-300);
  }

  &__subtitle {
    @apply text-center text-xl font-light text-neutral-500 max-w-screen-lg lg:(text-2xl) dark:(text-neutral-400);
  }

  &__content {
    @apply grid grid-cols-1 gap-4 lg:(grid-cols-2);
  }

  &__card {
    @apply flex flex-col gap-4;

    &__title {
      @apply text-lg font-bold text-neutral-700 dark:(text-neutral-300);
    }

    &__description {
      @apply text-neutral-500 dark:(text-neutral-400);
    }

    &__icon {
      @apply flex items-center justify-center w-fit p-4 text-4xl text-neutral-400 rounded-full bg-neutral-100 bg-opacity-10 dark:(text-neutral-300 bg-neutral-800);
    }

    &__image {
      @apply relative w-full h-64 rounded-lg overflow-hidden bg-neutral-100 bg-opacity-10 dark:(bg-neutral-800);

      img {
        @apply absolute inset-0 object-cover w-full h-full;
      }
    }
  }
}

// .Service {
//   &__card {
//     &__header{
//       @apply flex items-center justify-between
//       px-0;
//     }
//   }
// }

.Testimonial {
  &__card {
    @apply flex flex-col gap-6;

    &__header {
      @apply flex items-center gap-4;

      &__image {
        @apply w-10 h-10 rounded-full overflow-hidden bg-neutral-100 bg-opacity-10 dark:(bg-neutral-800);
      }

      &__info {
        @apply flex flex-col gap-1;

        &__name {
          @apply text-sm font-semibold text-neutral-700 dark:(text-neutral-300);
        }

        &__title {
          @apply text-xs font-medium text-neutral-500 dark:(text-neutral-400);
        }
      }
    }

    &__description {
      @apply flex flex-col gap-2 text-neutral-900 font-semibold dark:(text-neutral-100);

      & > i {
        @apply text-neutral-500 dark:(text-neutral-400);

        &:last-child {
          @apply ml-auto;
        }
      }
    }
  }
}

@keyframes animated-gradient-title-1 {
  0%,
  16.667%,
  100% {
    opacity: 1;
  }

  33.333%,
  83.333% {
    opacity: 0;
  }
}

@keyframes animated-gradient-title-2 {
  0%,
  16.667%,
  66.667%,
  100% {
    opacity: 0;
  }

  33.333%,
  50% {
    opacity: 1;
  }
}

@keyframes animated-gradient-title-3 {
  0%,
  50%,
  100% {
    opacity: 0;
  }

  66.667%,
  83.333% {
    opacity: 1;
  }
}
</style>
