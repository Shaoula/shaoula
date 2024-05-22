import { pwa } from './config/pwa'
import { appDescription, appName, appUrl } from './constants/index'

export default defineNuxtConfig({
  // extends: ['nuxt-umami'],

  'modules': [
    '@nuxt/content',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    'nuxt-headlessui',
    '@nuxt/image',
    '@nuxtjs/seo',
    'nuxt-security',
    'nuxt-vercel-analytics',
    '@nuxtjs/i18n',
    'nuxt-icon',
    '@nuxt/eslint',
  ],

  'runtimeConfig': {
    brevo: {
      apiKey: '',
      smtpKey: '',
    },
    smtp: {
      host: '',
      port: '',
      user: '',
      pass: '',
    },
    contactEmail: '',
  },

  'experimental': {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    // inlineSSRStyles: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  'css': [
    '@unocss/reset/tailwind.css',
  ],

  'colorMode': {
    preference: 'system',
    fallback: 'dark',
  },

  'nitro': {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
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

  'content': {
    ignores: [
      '/de/',
      '/fr/',
      '/it/',
      '/ru/',
      '/tr/',
      '/es/',
      '/pt/',
      '/en/',
    ],
  },

  'app': {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
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

  'features': {
    inlineStyles: false,
  },

  'eslint': {
    config: {
      standalone: false,
    },
  },

  'headlessui': {
    prefix: 'Hui',
  },

  'site': {
    name: appName,
    url: appUrl,
    description: appDescription,
    identity: {
      type: 'Organization',
    },
    twitter: '@shaoulahq',
  },

  seo: {
    automaticDefaults: true,
    enabled: true,
    redirectToCanonicalSiteUrl: true,
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

  // I18n
  'i18n': {
    // Active locales: English, Turkish, French, German, Russian,
    locales: [
      // English
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en-US.json',
      },
      // Turkish
      /* {
        code: 'tr',
        iso: 'tr-TR',
        name: 'Türkçe',
        file: 'tr-TR.json',
      },
      // French
      {
        code: 'fr',
        iso: 'fr-FR',
        name: 'Français',
        file: 'fr-FR.json',
      },
      // German
      {
        code: 'de',
        iso: 'de-DE',
        name: 'Deutsch',
        file: 'de-DE.json',
      },
      // Russian
      {
        code: 'ru',
        iso: 'ru-RU',
        name: 'Русский',
        file: 'ru-RU.json',
      }, */
      // Portuguese
      /* {
        code: 'pt',
        iso: 'pt-PT',
        name: 'Português',
        file: 'pt-PT.json',
      }, */
      // Italian
      /* {
        code: 'it',
        iso: 'it-IT',
        name: 'Italiano',
        file: 'it-IT.json',
      }, */
      // Spanish
      /* {
        code: 'es',
        iso: 'es-ES',
        name: 'Español',
        file: 'es-ES.json',
      }, */
    ],
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
    },
  },
})
