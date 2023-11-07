import process from 'node:process'
import { pwa } from './config/pwa'
import { appDescription } from './constants/index'

export default defineNuxtConfig({
  // extends: ['nuxt-umami'],

  'modules': [
    '@nuxt/content',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    // '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    'nuxt-headlessui',
    '@nuxt/image',
    '@nuxtseo/module',
    // 'nuxt-security',
    'nuxt-vercel-analytics',
  ],

  // appConfig: {
  //   umami: {
  //     id: 'ca446218-f75b-457f-973a-07bb30c5c2ce',
  //     host: 'https://analytics.eu.umami.is',
  //   },
  // },

  'runtimeConfig': {
    brevoApiKey: process.env.NUXT_BREVO_API_KEY,
    brevoSmtpKey: process.env.NUXT_BREVO_SMTP_KEY,
    smtpHost: process.env.NUXT_SMTP_HOST,
    smtpPort: process.env.NUXT_SMTP_PORT,
    smtpUser: process.env.NUXT_SMTP_USER,
    smtpPass: process.env.NUXT_SMTP_PASS,
    contactEmail: process.env.NUXT_CONTACT_EMAIL,
  },

  'experimental': {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  'css': [
    '@unocss/reset/tailwind.css',
  ],

  // colorMode: {
  // },

  'nitro': {
    prerender: {
      crawlLinks: true,
    },
  },

  'routeRules': {
    '/blog/**': {
      sitemap: {
        priority: 0.7,
        changefreq: 'daily',
      },
    },
  },

  'app': {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },

  pwa,

  'devtools': {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  'headlessui': {
    prefix: 'Hui',
  },

  'site': {
    name: 'Shaoula',
    identity: {
      type: 'Organization',
    },
    twitter: '@shaoulagroup',
  },

  'sitemap': {
    enabled: true,
    strictNuxtContentPaths: true,
    credits: false,
  },

  'ogImage': {
    enabled: true,
    // runtimeBrowser: true,
    // debug: true,
  },

  // security: {
  //   corsHandler: { origin: '*', methods: '*' },
  // },

  'nuxt-vercel-analytics': {
    mode: 'auto',
    debug: true,
  },
})
