<script setup>
import { navs, socials } from '~/constants/nav'

const isOpen = ref(true)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}
</script>

<template>
  <Button
    :class="$style.Menu__button"
    variant="outlined"
    icon-only
    @click="openModal"
  >
    <div :class="$style.Button__icon" :data-expanded="isOpen" />
  </Button>
  <HuiTransitionRoot appear :show="isOpen" as="template">
    <HuiDialog as="div" :class="$style.Menu__dialog" @close="closeModal">
      <!-- <HuiTransitionChild
        as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0"
      >
        <div :class="$style.Menu__overlay" />
      </HuiTransitionChild> -->

      <div :class="$style.Menu__container">
        <div :class="$style.Menu__content">
          <HuiTransitionChild
            as="template" enter="duration-300 ease-out transform" enter-from="-translate-y-full"
            enter-to="translate-y-0" leave="duration-200 ease-in" leave-from="translate-y-0"
            leave-to="-translate-y-full"
          >
            <HuiDialogPanel
              :class="$style.Menu__panel"
            >
              <nav
                :class="$style.Menu__nav"
                aria-label="Main navigation"
              >
                <Button
                  v-for="nav in navs"
                  :key="nav.name"
                  :href="nav.path"
                  variant="text"
                  :class="[
                    $style.Menu__nav__link,
                    { active: $route.path === nav.path },
                  ]"
                >
                  {{ nav.name }}
                </Button>
              </nav>

              <div :class="$style.Menu__socials">
                <Button
                  v-for="social in socials"
                  :key="social.name"
                  :href="social.path"
                  variant="text"
                  size="sm"
                  :class="[$style.Menu__social__link]"
                  icon-only
                >
                  <Icon :name="social.icon" />
                </Button>
              </div>
            </HuiDialogPanel>
          </HuiTransitionChild>
        </div>
      </div>
    </HuiDialog>
  </HuiTransitionRoot>
</template>

<style lang="scss" module>
.Menu {
  &__button {
    @apply flex-col items-center justify-center;

    &__icon {
      @apply flex flex-col items-center justify-center gap-2;

      &::before,
      &::after {
        content: '';
        @apply w-4 h-.5 bg-neutral-900
                rounded
                transition-transform duration-300 ease-in-out

                dark:(bg-neutral-100);
      }

      &[data-expanded='true'] {
        &::before {
          @apply transform rotate-45 translate-y-1.5;
        }

        &::after {
          @apply transform -rotate-45 -translate-y-1;
        }
      }
    }
  }

  &__dialog {
    @apply relative z-10;
  }

  &__overlay {
    @apply fixed inset-0 bg-black bg-opacity-25;
  }

  &__container {
    @apply fixed inset-0 overflow-y-auto;
  }

  &__content {
    @apply min-h-full flex pt-16 text-center;
  }

  &__panel {
    @apply w-full flex flex-col transform justify-between overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all;
  }

  &__nav {
    @apply flex flex-col gap-y-4;

    &__link {
      @apply text-gray-600 hover:text-gray-900

            dark:(text-gray-400 hover:text-gray-200);

      &.active,
      &[aria-current='page'] {
        @apply text-gray-900 font-medium

                dark:(text-gray-100);
      }
    }
  }

  &__socials {
    @apply flex items-center justify-evenly gap-4 mt-8;
  }
}
</style>
