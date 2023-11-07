<script setup lang="ts">
const { toast } = useToasts()
// const services = await queryContent('services/')
//   .only(['title', 'description', 'icon', 'slug'])
//   .sort({ order: 1 })
//   .find()

defineOgImage({
  component: 'Hero',
  eyebrow: 'Contact Us',
  title: 'Let\'s Connect and Create Digital Magic Together',
  subtitle: 'At Shaoula, we\'re here to listen, collaborate, and turn your digital dreams into reality. Get in touch with us to start your next project or discuss how we can help you succeed in the digital realm.',
})

const randomTestimonial = await queryContent('testimonials').only(['name', 'title', 'text', 'image']).limit(1).find()
const testimonial = randomTestimonial[0]

const partners = computed(() => ([
  {
    name: 'Google',
    logo: 'i-logos-google?mask text-neutral',
  },
  {
    name: 'Next.js',
    logo: 'i-logos-nextjs?mask text-neutral',
  },
  {
    name: 'Nuxt',
    logo: 'i-logos-nuxt?mask text-neutral',
  },
  {
    name: 'Vercel',
    logo: 'i-logos-vercel?mask text-neutral',
  },
  {
    name: 'Webflow',
    logo: 'i-logos-webflow?mask text-neutral',
  },
  {
    name: 'OpenAI',
    logo: 'i-logos-openai?mask text-neutral',
  },
  {
    name: 'Storyblok',
    logo: 'i-logos-storyblok?mask text-neutral',
  },
  {
    name: 'Stripe',
    logo: 'i-logos-stripe?mask text-neutral',
  },
]))

const inputEl = resolveComponent('FormInput')
const textareaEl = resolveComponent('FormTextarea')

const contactForm = ref([
  {
    name: 'name',
    label: 'Full name',
    placeholder: 'John Doe',
    required: true,
    value: '',
  },
  {
    name: 'email',
    label: 'Email address',
    placeholder: 'you@company.com',
    type: 'email',
    required: true,
    value: '',
  },
  {
    name: 'phone',
    label: 'Phone number',
    placeholder: '123-456-7890',
    required: false,
    value: '',
  },
  {
    name: 'message',
    label: 'Message',
    placeholder: 'How can we help you?',
    required: true,
    value: '',
    el: textareaEl,
  },
])

const isFormValid = computed(() => {
  return contactForm.value.every(field => field.value !== '')
})

const isSubmitting = ref(false)

async function submitForm() {
  isSubmitting.value = true
  await new Promise(resolve => setTimeout(resolve, 2000))

  // const formData = contactForm.value.map(field => ({
  //   name: field.name,
  //   value: field.value,
  // }))

  const formData = contactForm.value.reduce((acc, field) => {
    acc[field.name] = field.value
    return acc
  }, {})

  const res = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  })

  if (res.ok) {
    contactForm.value.forEach(field => field.value = '')
    toast('Thank you for reaching out! We will get back to you shortly.')
  }
  else {
    console.error(res)
    toast('An error occurred. Please try again later.')
  }

  isSubmitting.value = false
}
</script>

<template>
  <NuxtLayout name="base">
    <template #hero>
      <div :class="$style.Hero">
        <p :class="$style.Hero__eyebrow">
          Contact Us
        </p>
        <h2 :class="$style.Hero__title">
          Let's Connect and Create Digital Magic Together
        </h2>
        <h5 :class="$style.Hero__subtitle">
          At Shaoula, we're here to listen, collaborate, and turn your digital dreams into reality. Get in touch with us to start your next project or discuss how we can help you succeed in the digital realm.
        </h5>
      </div>
    </template>

    <!-- <Divider class="text-neutral-2 dark:text-neutral-8" />

    <section :class="$style.Section">
      <div :class="$style.Section__content">
        <h5 :class="$style.Section__title">
          Let's Start a Conversation
        </h5>
        <p :class="$style.Section__description">
          Whether you have a project in mind or simply want to chat about your digital goals, we're here to make it happen. Fill out the form, give us a call, or drop by our office. We look forward to connecting with you.
        </p>
      </div>
      <div :class="$style.Section__content">
        <h5 :class="$style.Section__title">
          Have Questions?
        </h5>
        <p :class="$style.Section__description">
          If you have any questions or need assistance, don't hesitate to reach out. Our team is ready to assist you.
        </p>
      </div>
    </section> -->

    <!-- <Divider class="text-neutral-2 dark:text-neutral-8" /> -->

    <section :class="$style.Contact">
      <form :class="$style.Contact__form">
        <component
          :is="field.el ? textareaEl : inputEl"
          v-for="field in contactForm"
          :key="field.label"
          v-model="field.value"
          :label="field.label"
          :placeholder="field.placeholder"
          :required="field.required"
          :type="field.type"
        />
        <!-- <component
          :is="field.el ?? inputEl"
          v-for="field in contactForm"
          :key="field.label"
          v-model="field.value"
          :label="field.label"
          :placeholder="field.placeholder"
          :required="field.required"
          :type="field.type"
        /> -->
        <Button
          type="submit"
          label="Submit"
          :disabled="!isFormValid"
          :loading="isSubmitting"
          :class="$style.Contact__form__submit"
          @click.prevent="submitForm"
        />
      </form>

      <div :class="$style.Contact__info">
        <Card>
          <div :class="$style.Testimonial__card__description">
            <Icon name="i-ph-quotes-bold" />
            <p>
              {{ testimonial.text }}
            </p>
            <Icon name="i-ph-quotes-bold" />
          </div>
          <div :class="$style.Testimonial__card__header">
            <div :class="$style.Testimonial__card__header__image">
              <NuxtImg
                format="webp"
                fit="cover"
                loading="lazy"
                :src="testimonial.image.url"
                :alt="testimonial.image.alt"
                :placeholder="[50, 25, 75, 5]"
                quality="100"
              />
            </div>
            <div :class="$style.Testimonial__card__header__info">
              <h5 :class="$style.Testimonial__card__header__info__name">
                {{ testimonial.name }}
              </h5>
              <p :class="$style.Testimonial__card__header__info__title">
                {{ testimonial.title }}
              </p>
            </div>
          </div>
        </Card>

        <div :class="$style.Contact__info__partners">
          <p>Partnering with</p>
          <div :class="$style.Contact__info__partners__logos">
            <div
              v-for="partner in partners"
              :key="partner.name"
              :class="$style.Contact__info__partners__logos__logo"
            >
              <Icon
                :name="`${partner.logo}?mask`"
                size="8xl"
                color="text-neutral"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<style lang="scss" module>
.Hero {
    @apply flex flex-col items-center justify-center gap-8;

    &__eyebrow {
        @apply text-xl font-semibold text-neutral-500 text-center tracking-wider uppercase dark:(text-neutral-500);
    }

    &__title {
        @apply text-6xl font-bold text-neutral-900 text-center leading-normal dark:(text-neutral-100);
        text-wrap: balance;
    }

    &__subtitle {
        @apply text-2xl font-medium text-neutral-600 text-center dark:(text-neutral-400);
        text-wrap: balance;
    }
}

.Contact {
    @apply grid grid-cols-1 gap-8 py-16

    lg:(grid-cols-2);

    &__form {
        @apply flex flex-col gap-4;

        &__submit {
            @apply self-start;
        }
    }

    &__info {
        @apply grid gap-8;

        &__partners {
            @apply flex flex-col gap-2;

            & > p {
                @apply text-sm font-semibold text-neutral-6 dark:(text-neutral-5);
            }

            &__logos {
                @apply flex flex-wrap gap-x-8 items-center;

                &__logo {
                    @apply flex-shrink-0
                    text-neutral;

                    * {
                        @apply transition-all duration-500;
                    }
                }
            }
        }
    }
}

.Section {
    @apply grid grid-cols-1 gap-8 py-16

    lg:(grid-cols-2);

    &__content {
        @apply flex flex-col gap-4;
    }

    &__title {
        @apply text-3xl font-semibold text-neutral-900 dark:(text-neutral-100);
    }

    &__description {
        @apply text-lg text-neutral-600 dark:(text-neutral-400);
    }
}

.Testimonial{
  &__card {
    @apply flex flex-col gap-6;

    &__header {
      @apply flex items-center gap-4;

      &__image {
        @apply w-10 h-10
        rounded-full overflow-hidden
        bg-neutral-100 bg-opacity-10

        dark:(bg-neutral-800);
      }

      &__info {
        @apply flex flex-col gap-1;

        &__name {
          @apply text-sm font-semibold text-neutral-700

          dark:(text-neutral-300);
        }

        &__title {
          @apply text-xs font-medium text-neutral-500

          dark:(text-neutral-400);
        }
      }
    }

    &__description {
      @apply flex flex-col gap-2
      text-neutral-900 font-semibold

      dark:(text-neutral-100);

      & > i {
        @apply text-neutral-500

        dark:(text-neutral-400);

        &:last-child {
          @apply ml-auto;
        }
      }
    }
  }
}
</style>
