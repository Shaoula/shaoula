<script setup lang="ts">
import { navs, socials } from '~/constants/nav'

const { t } = useI18n()
const localePath = useLocalePath()

const email = ref('')
const emailError = ref(false)
const [isLoading, toggleIsLoading] = useToggle(false)

const { toast } = useToasts()

function validateEmail(email: string) {
  const re = /\S[^\s@]*@\S+\.\S+/
  return re.test(email)
}

async function onSubscribe(e: Event) {
  e.preventDefault()

  toggleIsLoading(true)

  const isEmailValid = validateEmail(email.value)

  if (!isEmailValid) {
    emailError.value = true
    toggleIsLoading(false)
    toast(t('newsletter.invalidEmail'))
    return
  }

  const res = await fetch('/api/email/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email: email.value }),
  })
  if (res.ok) {
    toggleIsLoading(false)
    email.value = ''
    toast(t('newsletter.success'))
  }
  else {
    toggleIsLoading(false)
    console.error(res)
    toast(t('newsletter.error'))
  }
}
</script>

<template>
  <!-- <footer :class="$style.Footer">
    <div :class="$style.Footer__container">
      <div>
        <div :class="$style.Footer__logo">
          <Button
            variant="text"
            href="/"
            aria-label="Go to homepage"
            :class="$style.Footer__logo__link"
          >
            <Logo />
          </Button>
          <p>Shaoula is a digital agency that crafts digital dreams.</p>
        </div>
      </div>
      <div :class="$style.Footer__menu">
        <div :class="$style.Footer__nav">
          <h3 :class="$style.Footer__nav__title">
            Links
          </h3>
          <nav :class="$style.Footer__nav__nav">
            <Button
              v-for="nav in navs"
              :key="nav.path"
              variant="text"
              :href="nav.path"
              :aria-label="nav.name"
              :label="nav.name"
              :class="$style.Footer__nav__link"
            />
          </nav>
        </div>
        <div :class="$style.Footer__socials">
          <h3 :class="$style.Footer__nav__title">
            Socials
          </h3>
          <Button
            v-for="social in socials"
            :key="social.path"
            variant="text"
            :href="social.path"
            :aria-label="social.name"
            :class="$style.Footer__socials__link"
          />
        </div>
        <div :class="$style.Footer__subscribe">
          <h3 :class="$style.Footer__nav__title">
            Subscribe
          </h3>
          <Button
            variant="text"
            href="/"
            aria-label="Go to homepage"
            :class="$style.Footer__logo__link"
          >
            <Logo />
          </Button>
          <p>Shaoula is a digital agency that crafts digital dreams.</p>
        </div>
      </div>
      <div :class="$style.Footer__copright">
        © 2021 Shaoula. All rights reserved.
      </div>
    </div>
  </footer> -->
  <footer :class="$style.Footer">
    <nav :class="$style.Footer__container">
      <!-- Logo -->
      <div :class="[$style.Footer__section, $style['Footer__section--logo']]">
        <Button
          variant="text" :href="localePath('/')" :aria-label="t('goToHomepage')"
          :class="[$style.Footer__section__link, $style['Footer__section__link--logo']]"
          class="px0"
        >
          <Logo class="text-5xl" />
        </Button>
        <!-- <p>Shaoula is a digital agency that crafts digital dreams.</p> -->
        <p><strong>Shaoula</strong> {{ t('footerDescription') }}</p>
      </div>

      <!-- Quick Links -->
      <div :class="$style.Footer__section">
        <h3 :class="$style.Footer__section__title">
          {{ t('quickLinks') }}
        </h3>
        <div :class="$style.Footer__section__nav">
          <Button
            v-for="nav in navs" :key="nav.path" variant="text" :href="localePath(nav.path)"
            :aria-label="t(nav.name)" :label="t(nav.name)" :class="$style.Footer__section__link"
          />
        </div>
      </div>

      <!-- Follow Us -->
      <div :class="$style.Footer__section">
        <h3 :class="$style.Footer__section__title">
          {{ t('followUs') }}
        </h3>
        <div :class="$style.Footer__section__nav">
          <Button
            v-for="social in socials" :key="social.path" variant="text" :href="social.path"
            :leading="{ icon: social.icon }" :label="social.name" :class="$style.Footer__section__link"
            :aria-label="social.name"
          />
        </div>
      </div>

      <!-- Newsletter -->
      <div :class="[$style.Footer__section, $style['Footer__section--newsletter']]">
        <h3 :class="$style.Footer__section__title">
          {{ t('newsletter.title') }}
        </h3>
        <form :class="$style.Footer__section__nav" @submit.prevent="onSubscribe">
          <p>{{ t('newsletter.description') }}</p>
          <div class="flex items-center gap-2">
            <FormInput
              v-model="email" :class="$style.Footer__section__input" :has-error="emailError" type="email"
              required :placeholder="t('newsletter.placeholder')" class="flex-grow"
            />
            <Button :label="t('newsletter.submit')" :loading="isLoading" type="submit" @click="onSubscribe" />
          </div>
          <I18nT
            tag="small" keypath="newsletter.consent" class="text-xs text-neutral-500 dark:(text-neutral-400)"
            scope="global"
          >
            <NuxtLink to="#" class="underline">
              {{ t('privacyPolicy') }}
            </NuxtLink>
          </I18nT>
        </form>
      </div>
    </nav>

    <Divider :class="[$style.Footer__container, $style['Footer__container--divider']]" />

    <div :class="[$style.Footer__container, $style['Footer__container--signature']]">
      <!-- All Rights Reserved -->
      <div class="col-span-2" :class="[$style.Footer__section]">
        <p class="text-sm text-neutral-500">
          {{ t('allRightsReserved', { year: new Date().getFullYear() }) }}
        </p>
      </div>
      <!-- Made with Love -->
      <div class="col-span-2 justify-self-end" :class="$style.Footer__section">
        <I18nT
          tag="p" keypath="madeWithLove" class="flex items-center justify-end gap-1 text-sm text-neutral-500"
          scope="global"
        >
          <Icon name="i-ph-heart-straight-fill" class="text-lg text-red-500" />
        </I18nT>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" module>
// .Footer {
//   @apply py-4 bg-white border-t border-gray-100

//   dark:(bg-dark-900 text-white shadow-none border-t border-dark-800);

//   &__container {
//     @apply container flex flex-col-reverse gap-8
//     py-8;

//     > div {
//       @apply flex-1;
//     }
//   }

//   &__logo {
//     @apply flex flex-col;

//     &__link {
//       @apply px-0;
//     }

//     p {
//       @apply mt-4 text-sm text-neutral-600;
//     }
//   }

//   &__menu {
//     @apply flex flex-col md:flex-row justify-between gap-8;

//     & > div {
//       @apply flex-1;
//     }
//   }

//   &__nav {
//     @apply flex flex-col gap-4;

//     &__title {
//       @apply text-lg font-bold;
//     }

//     &__nav {
//       @apply flex flex-col gap-2;
//     }

//     &__link {
//         @apply px-0 text-neutral-600 hover:text-neutral-900

//         dark:(text-neutral-400 hover:text-neutral-100);

//         &__active {
//           @apply text-neutral-900 font-medium

//           dark:(text-neutral-100);
//         }
//       }
//   }

//   &__socials {
//     @apply flex flex-col gap-4;

//     &__link {
//       @apply px-0 text-neutral-600 hover:text-neutral-900

//       dark:(text-neutral-400 hover:text-neutral-100);
//     }
//   }

//   &__copright {
//     @apply container text-sm text-center text-neutral-500
//     py-4;

//     dark:(text-dark-400);
//   }
// }

.Footer {
  @apply pt-10 pb-8 border-t border-neutral-100 space-y-8 dark:(border-neutral-900);

  &__container {
    @apply container grid grid-cols-2 gap-8 lg:(flex flex-wrap);

    &--divider {
      @apply text-neutral-100 dark:(text-neutral-800);
    }

    &--signature {
      @apply flex items-center justify-between;

      & > div {
        @apply flex-1;
      }
    }
  }

  &__section {
    @apply flex flex-col gap-4 flex-1;

    &__title {
      @apply text-lg font-semibold;
    }

    &__nav {
      @apply flex flex-col gap-2;
    }

    &__link {
      @apply px-0 text-neutral-600 hover:text-neutral-900 dark:(text-neutral-400 hover:text-neutral-100);

      &--logo {
        @apply text-dark-900 hover:(text-dark-900) dark:(text-neutral-100) dark:hover:(text-neutral-100);
      }
    }

    p {
      @apply text-sm text-neutral-600 dark:(text-neutral-400);
    }

    &--newsletter,
    &--logo {
      @apply col-span-full;
    }
  }
}
</style>
