<script setup lang="ts">
const localePath = useLocalePath()
// const tabs = usePurpose()
// const types = useType()

// const { search, results, loading } = useSearch()
function handleSearch(e: Event) {
  e.preventDefault()
  // TODO: search
  // console.log('search', fields)
}
</script>

<template>
  <form
    :action="localePath({ name: 'search' })"
    :class="$style.Search"
    @submit.prevent="handleSearch"
  >
    <!-- Tabs for purpose -->
    <!-- <HuiRadioGroup
      v-model="fields.purpose"
      :options="tabs"
      :class="$style.Tabs"
    >
      <HuiRadioGroupOption
        v-for="tab, index in tabs"
        :key="index"
        :value="index"
        :class="$style.Tabs__tab"
      >
        <span>{{ $t(tab) }}</span>
      </HuiRadioGroupOption>
    </HuiRadioGroup> -->

    <!-- <NavTabs :tabs="tabs" variant="bordered" w-full /> -->
    <!-- Type of property -->
    <!-- <FormSelect
      v-model="fields.type"
      :options="types"
      :class="$style.Select"
      :label="$t('Ad.type')"
      :placeholder="$t('Ad.type')"
    /> -->

    <!-- Search -->
    <FormGroup>
      <FormInput flex-grow name="q" :placeholder="$t('Search.placeholder')" />
      <ButtonIcon name="i-mdi-magnify" />
    </FormGroup>
    <FormInput
      name="q"
      :placeholder="$t('Search.placeholder')"
      :trailing="{ icon: 'i-mdi-magnify' }"
    />
  </form>
</template>

<style module lang="scss">
.Tabs {
  @apply flex items-center justify-evenly
  w-full h-10
  bg-blue-900/20
  p-1 space-x-1
  rounded-lg shadow;

  &__tab {
    @apply flex items-center justify-center
    flex-1 h-full
    text-sm text-blue-100 leading-5
    rounded-lg
    cursor-pointer;

    @apply hover:(bg-white/0.12 text-white)
    focus:(outline-none ring-2);

    &[aria-checked='true'] {
      @apply bg-white shadow
      text-blue-900 font-medium;
    }
  }
}

.Search {
  @apply flex flex-col items-center
  space-y-4;

  &__box {
    @apply flex items-center
    w-full h-min
    rounded-lg
    shadow
    overflow-hidden;
  }

  &__input {
    @apply border-none rounded-none
    focus:outline-none
    focus:ring-0;
  }

  &__button {
    @apply flex-shrink-0
    p-0
    border-none rounded-none
    focus:outline-none
    focus:ring-0;
  }
}
</style>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
</style>
