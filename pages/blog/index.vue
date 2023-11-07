<script setup lang="ts">
import { appName } from '~/constants'

// const articles = await queryContent('blog').find()

defineOgImage({
  component: 'Hero',
  eyebrow: `${appName} Blog`,
  title: 'Explore Our Digital Playground',
  subtitle: 'Dive into the world of digital innovation, design trends, and business strategies with our blog. Join us on a journey of discovery, learning, and inspiration.',
})

useHead({
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: `Read the latest news and updates from ${appName}`,
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: `${appName} Blog`,
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: `Read the latest news and updates from ${appName}`,
    },
    // {
    //   hid: 'og:image',
    //   property: 'og:image',
    //   content: 'https://daxtil.com/images/og-image.png'
    // },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: `${appName} Blog`,
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: `Read the latest news and updates from ${appName}`,
    },
    // {
    //   hid: 'twitter:image',
    //   name: 'twitter:image',
    //   content: 'https://daxtil.com/images/og-image.png'
    // },
  ],
})

const email = ref('')
const emailError = ref(false)
const [isLoading, toggleIsLoading] = useToggle(false)

const { toast } = useToasts()

function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/
  return re.test(email)
}

async function onSubscribe(e: Event) {
  e.preventDefault()

  toggleIsLoading(true)

  const isEmailValid = validateEmail(email.value)

  if (!isEmailValid) {
    emailError.value = true
    toggleIsLoading(false)
    toast('Please enter a valid email address.')
    return
  }

  const res = await fetch('/api/email/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email: email.value }),
  })
  if (res.ok) {
    toggleIsLoading(false)
    email.value = ''
    toast('Thank you for joining the waiting list!')
  }
  else {
    toggleIsLoading(false)
    console.error(res)
    toast('An error occurred. Please try again later.')
  }
}
</script>

<template>
  <NuxtLayout name="base">
    <template #hero>
      <div :class="$style.Hero">
        <p :class="$style.Hero__eyebrow">
          Blog
        </p>
        <h2 :class="$style.Hero__title">
          Explore Our Digital Playground
        </h2>
        <h5 :class="$style.Hero__subtitle">
          Dive into the world of digital innovation, design trends, and business strategies with our blog. Join us on a journey of discovery, learning, and inspiration.
        </h5>
        <form @submit.prevent="onSubscribe">
          <!-- <p class="text-sm text-neutral-500 dark:text-neutral-400">
            Suscribe to our newsletter
          </p> -->
          <div class="flex items-center gap-4">
            <FormInput
              v-model="email"
              :has-error="emailError"
              required
              type="email"
              placeholder="Enter your email"
            />
            <Button
              label="Subscribe"
              :loading="isLoading"
              type="submit"
            />
          </div>
        </form>
      </div>
    </template>
    <div
      :class="$style.Blog"
    >
      <ContentList v-slot="{ list: articles }" path="/blog">
        <!-- <section v-for="article in list" :key="article._path">
          <pre>{{ article }}</pre>
          <h2>{{ article.title }}</h2>
          <p>{{ article.description }}</p>
        </section> -->
        <!-- <div v-for="article in articles" :key="article._id" class="rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
          <div v-if="article.image">
            <NuxtLink :to="article._path">
              <NuxtImg
                :src="article.image.url" :alt="article.image.alt" format="webp"
                class="h-48 w-full overflow-hidden rounded-lg object-cover" loading="lazy"
              />
            </NuxtLink>
          </div>
          <div class="mt-2">
            <NuxtLink class="text-sm font-light text-gray-600 dark:text-gray-400">
              {{ article.category }}
            </NuxtLink>
          </div>
          <NuxtLink :to="article._path">
            <h1 class="line-clamp-2 my-2 text-xl font-bold">
              {{ article.title }}
            </h1>
          </NuxtLink>
          <p v-if="article.description" class="line-clamp-3 text-sm font-light text-gray-600 dark:text-gray-400">
            {{ article.description }}
          </p>
        </div> -->

        <Card
          v-for="article in articles"
          :key="article.slug"
          :class="$style.Blog__card"
        >
          <div :class="$style.Blog__card__image">
            <!-- <NuxtImg
              :src="portfolio.image.url"
              :alt="portfolio.image.alt"
              :width="portfolio.image.width"
              :height="portfolio.image.height"
              sizes="(min-width: 1024px) 33vw, 100vw"
              placeholder="blur"
              :blur="20"
              :quality="100"
            /> -->
            <NuxtLink :to="article._path">
              <NuxtImg
                format="webp"
                fit="cover"
                loading="lazy"
                :src="article.image.url"
                :alt="article.image.alt"
                :placeholder="[200, 100, 75, 5]"
                quality="100"
              />
            </NuxtLink>
          </div>
          <NuxtLink :to="article._path">
            <h5 :class="$style.Blog__card__title">
              {{ article.title }}
            </h5>
          </NuxtLink>
          <p :class="$style.Blog__card__description">
            {{ article.description }}
          </p>
        </Card>
      </ContentList>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" module>
.Hero{
    @apply flex flex-col items-center justify-center gap-8
    h-full;

    &__eyebrow {
        @apply text-xl font-semibold text-neutral-500 text-center  tracking-wider uppercase

        dark:(text-neutral-500);
    }

    &__title {
        @apply text-6xl font-bold text-neutral-900 text-center leading-normal

        dark:(text-neutral-100);
    }

    &__subtitle {
        @apply text-2xl font-medium text-neutral-600 text-center

        dark:(text-neutral-400);
    }
}

.Blog {
  @apply container
  grid grid-cols-1 gap-x-4 gap-y-6
  my-4

  md:(grid-cols-2)
  xl:(grid-cols-3);

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
</style>
