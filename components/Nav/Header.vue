<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'

import { navs } from '~/constants/nav'

// const isDark = useDark()
// const toggleDark = useToggle(isDark)

// definePageMeta({
//   colorMode: isDark ? 'dark-mode' : 'light-mode',
// })

const breakpoints = useBreakpoints(breakpointsTailwind)
// const isMobile = computed(() => !breakpoints.lg.value)
const isMobile = breakpoints.smaller('lg')

const [navOpen, toggleNav] = useToggle(false)
</script>

<template>
  <header :class="$style.Header">
    <div :class="$style.Header__container">
      <Button variant="text" href="/" :class="$style.Header__logo" tabindex="0" title="Shaoula">
        <Logo h-10 />
      </Button>
      <a class="sr-only focus:not-sr-only" href="#main">Skip to main content</a>
      <div :class="$style.Header__menu">
        <Button
          v-show="isMobile"
          variant="outlined"
          shape="circle"
          icon-only
          :class="$style.Header__menu__button"
          aria-expanded="false"
          aria-controls="menu"
          aria-label="Menu"
          role="button"
          @click="() => toggleNav()"
        >
          <div :class="$style.Header__menu__button__icon" :data-expanded="navOpen" />
        </Button>

        <div :class="[$style.Header__menu__nav]" :data-expanded="navOpen">
          <nav aria-label="Main navigation" :class="[$style.Header__menu__nav__nav, { container: isMobile }]">
            <Button
              v-for="nav in navs"
              :key="nav.name"
              :href="nav.path"
              variant="text"
              :class="[
                $style.Header__menu__nav__link,
                $route.path === nav.path && $style.Header__menu__nav__link__active,
              ]"
            >
              {{ nav.name }}
            </Button>
          </nav>

          <Button
            v-show="!isMobile"
            label="Get a Quote"
            href="/contact"
            size="sm"
          />

          <!-- <div :class="[$style.Header__menu__socials, { container: isMobile }]">
            <Button
              v-for="social in socials"
              :key="social.name"
              :href="social.path"
              variant="text"
              :class="$style.Header__menu__socials__link"
              :aria-label="social.name"
              target="_blank"
              icon-only
            >
              <Icon :name="social.icon" />
            </Button>
            <Divider :vertical="true" />
            <Button
              variant="text"
              :class="$style.Header__menu__socials__link"
              icon-only
              @click="() => toggleDark()"
            >
              <Icon :name="isDark ? 'i-ph-moon' : 'i-ph-sun'" />
            </Button>
          </div> -->
        </div>
      </div>
    </div>
  </header>
</template>

<style module lang="scss">
.Header {
  --header-height: 4rem;
    @apply w-full h-[var(--header-height)] bg-light-50
    sticky top-0 left-0 z-50
    flex items-center
    border-b border-neutral-100 shadow-sm

    dark:(bg-dark-900 text-white shadow-none border-b border-neutral-900);

    &__logo {
      @apply w-auto h-auto
      flex-shrink-0
      px-0
      text-gray-900

      dark:(text-gray-100);
    }

    &__container {
      @apply container
      flex items-center justify-between
      gap-x-6
      h-full;
    }

    &__menu {
      @apply flex items-center justify-end
      flex-grow
      h-full
      text-gray-900

      dark:(text-gray-100)

      lg:(justify-between);

      &__button {
        @apply flex-col items-center justify-center
        border-neutral-400

        lg:(hidden)

        dark:(border-neutral-600);

        &__icon {
            @apply flex flex-col items-center justify-center gap-2;

            &::before, &::after {
                content: '';
                @apply w-4 h-.5 bg-neutral-500
                rounded
                transition-transform duration-300 ease-in-out

                dark:(bg-neutral-400);
            }

            &[data-expanded="true"] {
                &::before {
                    @apply transform rotate-45 translate-y-1.5;
                }

                &::after {
                    @apply transform -rotate-45 -translate-y-1;
                }
            }
        }
      }

      &__nav {
        @apply flex flex-col justify-between
        fixed left-0 right-0 top-[var(--header-height)] bottom-0
        py-8
        bg-light-50
        invisible opacity-0 -translate-y-2
        transition-all duration-300 ease-in-out

        dark:(bg-dark-900)

        lg:(flex-grow flex-row items-center static visible opacity-100 translate-y-0 bg-transparent justify-between dark:(bg-transparent));

        &[data-expanded="true"] {
          @apply visible opacity-100 translate-y-0;
        }

        @screen lt-lg {
            @apply container;
          }

        &__nav {
          @apply flex flex-col gap-y-4

          lg:(flex-grow flex-row gap-x-4 py-0);

          // @screen lt-lg {
          //   @apply container;
          // }
        }

        &__link {
          @apply text-neutral-600 hover:text-neutral-900

          dark:(text-neutral-400 hover:text-neutral-100);

          &__active {
            @apply text-neutral-900 font-medium

            dark:(text-neutral-100);
          }
        }
      }

      &__socials {
          @apply flex items-center justify-evenly
          gap-x-2

          lg:(gap-x-4 justify-end);

          &__link {
            @apply text-neutral-600 hover:text-neutral-900

            dark:(text-neutral-400 hover:text-neutral-100);
          }
        }
    }
}
</style>
