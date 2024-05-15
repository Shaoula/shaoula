<script setup lang="ts">
const { locales, locale, setLocale } = useI18n()

const currentLocale = computed(() => {
  return locales.value.find(item => item.code === locale.value)
})

function onLocaleChange(locale: any) {
  setLocale(locale.code)
}
</script>

<template>
  <div class="relative">
    <HuiListbox :model-value="currentLocale" @update:model-value="onLocaleChange">
      <HuiListboxButton
        class="flex cursor-pointer items-center gap-2 border border-neutral-100 rounded px-4 py-2 transition-colors duration-200 ease-in-out dark:(border-neutral-900 hover:border-neutral-800) hover:border-neutral-200"
      >
        <Icon :name="`i-circle-flags-${locale}`" />
        <!-- <span>{{ currentLocale?.name }}</span> -->
        <IconCSS name="i-ph-caret-down-bold" class="text-neutral-400 dark:text-neutral-500" />
      </HuiListboxButton>

      <!-- <HuiListboxButton :class="$style.Select__button" :disabled="props.disabled" as="template">
            <FormInput :value="picked" :trailing="{ icon: 'i-mdi-chevron-down' }" :placeholder="placeholder" />
        </HuiListboxButton> -->
      <Transition
        leave-active-class="transition duration-100 ease-in origin-top"
        leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-y-75"
        enter-active-class="transition duration-100 ease-out origin-top" enter-from-class="opacity-0 scale-y-75"
        enter-to-class="opacity-100 scale-100"
      >
        <HuiListboxOptions
          class="absolute right-0 top-full mt-2 min-w-full border border-neutral-100 rounded bg-white px-1 py1 shadow-sm dark:(border-neutral-900 bg-dark-900)"
        >
          <HuiListboxOption
            v-for="item, index in locales" v-slot="{ selected, active }" :key="index"
            :value="item" as="template"
          >
            <li
              class="flex cursor-pointer items-center gap-2 rounded px-2 py-1 transition-colors duration-200 ease-in-out hover:bg-neutral-100"
              :class="[{
                'bg-neutral-50 dark:bg-dark-900': active,
                'bg-neutral-100 dark:(bg-dark-800 border-neutral-8) border-neutral-200': selected,
              }]"
            >
              <Icon :name="`i-circle-flags-${item.code}`" dynamic />
              <span>{{ item.name }}</span>
              <Icon
                v-if="selected" name="i-ph-check-bold"
                class="text-neutral-500 dark:text-neutral-400"
              />
            </li>
          </HuiListboxOption>
        </HuiListboxOptions>
      </Transition>
    </HuiListbox>
  </div>
</template>
